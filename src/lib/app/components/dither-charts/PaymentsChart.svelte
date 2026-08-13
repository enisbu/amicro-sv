<script lang="ts">
	import {
		motion,
		AnimatePresence,
		createLayoutMotion,
		useSpring,
		useTransform,
		useCurrentMotionValue
	} from 'motion-sv';
	import { MediaQuery } from 'svelte/reactivity';
	import { untrack } from 'svelte';
	import { AnimationFrames } from 'runed';
	import AnimatedNumber from './AnimatedNumber.svelte';
	import { smoothstep, hash, clamp, hexToRgba } from './dither-math.js';
	import { cn } from '$lib/app/utils.js';

	const PERIODS = [
		{ name: 'Week', mult: 1 },
		{ name: 'Month', mult: 4 },
		{ name: 'Quarter', mult: 13 },
		{ name: 'Year', mult: 52 }
	];

	const BRANCHES = ['Bishkek', 'Osh', 'Jalal-Abad', 'Karakol'];
	const BANDS = [
		{ name: 'Cash', color: '#FFFFFF', share: 0.46 },
		{ name: 'QR', color: '#CBD5E1', share: 0.31 },
		{ name: 'Bank', color: '#94A3B8', share: 0.23 }
	];

	const BASE_TOTAL = 150000;
	const BRANCH_WEIGHTS = [0.45, 0.25, 0.18, 0.12];

	function formatAxisLabel(val: number): string {
		if (val === 0) return '$0';
		if (val >= 1000000) return '$' + (val / 1000000).toPrecision(3).replace(/\.0+$/, '') + 'M';
		if (val >= 1000) return '$' + (val / 1000).toPrecision(3).replace(/\.0+$/, '') + 'k';
		return '$' + val;
	}

	function getAxisMax(maxVal: number): number {
		if (maxVal === 0) return 100;
		const target = maxVal * 1.05;
		const power = Math.pow(10, Math.floor(Math.log10(target)));
		const normalized = target / power;
		let multiplier = 10;
		if (normalized <= 1.0) multiplier = 1;
		else if (normalized <= 2.0) multiplier = 2;
		else if (normalized <= 5.0) multiplier = 5;

		return multiplier * power;
	}

	function drawRoundedRect(
		ctx: CanvasRenderingContext2D,
		x: number,
		y: number,
		w: number,
		h: number,
		rTop: number,
		rBottom: number
	) {
		ctx.beginPath();
		ctx.moveTo(x + rTop, y);
		ctx.lineTo(x + w - rTop, y);
		ctx.arcTo(x + w, y, x + w, y + rTop, rTop);
		ctx.lineTo(x + w, y + h - rBottom);
		ctx.arcTo(x + w, y + h, x + w - rBottom, y + h, rBottom);
		ctx.lineTo(x + rBottom, y + h);
		ctx.arcTo(x, y + h, x, y + h - rBottom, rBottom);
		ctx.lineTo(x, y + rTop);
		ctx.arcTo(x, y, x + rTop, y, rTop);
		ctx.closePath();
	}

	let periodIndex = $state(1); 
	let hoverBranch = $state<number | null>(null);
	let hoverBand = $state<number | null>(null);

	const period = $derived(PERIODS[periodIndex]);
	const reducedMotion = new MediaQuery('(prefers-reduced-motion: reduce)');
	const layout = createLayoutMotion(motion);

	const computed = $derived.by(() => {
		let tot = 0;
		const branches = BRANCHES.map((b, bIdx) => {
			const branchBase = BASE_TOTAL * BRANCH_WEIGHTS[bIdx];
			let branchTotal = 0;
			const bands = BANDS.map((band, bandIdx) => {
				const wobble = 0.9 + 0.14 * Math.sin(bIdx * 3.1 + bandIdx * 1.7);
				const val = Math.round(branchBase * PERIODS[periodIndex].mult * band.share * wobble);
				branchTotal += Math.max(6, val);
				return { value: Math.max(6, val) };
			});
			tot += branchTotal;
			return { total: branchTotal, bands };
		});

		const maxBranchTotal = Math.max(...branches.map((b) => b.total));
		const axMax = getAxisMax(maxBranchTotal);

		return { data: branches, totalValue: tot, axisMax: axMax };
	});

	const initialAxisMax = untrack(() => computed.axisMax);
	const axisSprings = [
		useSpring(0, { stiffness: 190, damping: 27 }),
		useSpring(initialAxisMax * 0.25, { stiffness: 190, damping: 27 }),
		useSpring(initialAxisMax * 0.5, { stiffness: 190, damping: 27 }),
		useSpring(initialAxisMax * 0.75, { stiffness: 190, damping: 27 }),
		useSpring(initialAxisMax, { stiffness: 190, damping: 27 })
	] as const;

	$effect(() => {
		const axisMax = computed.axisMax;
		axisSprings[1].set(axisMax * 0.25);
		axisSprings[2].set(axisMax * 0.5);
		axisSprings[3].set(axisMax * 0.75);
		axisSprings[4].set(axisMax);
	});

	const axisDisplays = axisSprings.map((spring) =>
		useCurrentMotionValue(
			useTransform(spring, (v: string | number) => formatAxisLabel(Number(v)))
		)
	);

	let canvas: HTMLCanvasElement;

	let time = 0;
	let morphStartTime = 0;
	let drawn = new Map<string, number>();
	let fromState = new Map<string, number>();

	let hoverForDraw: { b: number | null; band: number | null } = { b: null, band: null };
	$effect(() => {
		hoverForDraw = { b: hoverBranch, band: hoverBand };
	});

	$effect(() => {

		void computed.data;
		fromState = new Map(drawn);
		morphStartTime = performance.now();
	});

	$effect(() => {
		const data = computed.data;
		const axisMax = computed.axisMax;

		const draw = () => {
			time += 0.02;
			const ctx = canvas.getContext('2d');
			if (!ctx) return;

			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			const rect = canvas.getBoundingClientRect();
			if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
				canvas.width = rect.width * dpr;
				canvas.height = rect.height * dpr;
			}

			ctx.save();
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.scale(dpr, dpr);

			const w = rect.width;
			const h = rect.height;
			const colW = w / BRANCHES.length;
			const barW = Math.min(colW * 0.62, 54);
			const cell = Math.max(3, Math.round(w / 200));
			const HIGHLIGHT = '#FFFFFF';

			let prog = 0;
			if (morphStartTime > 0) {
				prog = (performance.now() - morphStartTime) / 620;
				if (prog > 1) prog = 1;
			} else {
				prog = 1;
			}

			if (reducedMotion.current) {
				prog = 1;
				time = 0;
			}

			const n = BRANCHES.length;

			for (let i = 0; i < n; i++) {
				const bp =
					1 - Math.pow(1 - clamp((prog - i * 0.05) / (1 - (n - 1) * 0.05), 0, 1), 3);
				const colX = i * colW;
				const cx = colX + colW / 2;
				const x0 = cx - barW / 2;

				let currentY = h;

				for (let j = 0; j < BANDS.length; j++) {
					const key = `${i}-${j}`;
					const targetH = (data[i].bands[j].value / axisMax) * h;
					const fromH = fromState.get(key) || 0;
					const segH = Math.max(0.1, fromH + (targetH - fromH) * bp);

					drawn.set(key, segH);

					const yBottom = currentY;
					const yTop = currentY - segH;
					const rTop = j === BANDS.length - 1 ? 8 : 5;
					const rBottom = j === 0 ? 7 : 5;

					const hb = hoverForDraw.b;
					const hband = hoverForDraw.band;

					const isHot = hb === i && hband === j;
					const isOtherBranch = hb !== null && hb !== i;
					const isOtherBandInBranch = hb === i && hband !== null && hband !== j;

					let alpha = 1.0;
					if (isOtherBranch) alpha = 0.3;
					else if (isOtherBandInBranch) alpha = 0.48;

					const color = isHot ? HIGHLIGHT : BANDS[j].color;

					ctx.save();
					drawRoundedRect(ctx, x0, yTop, barW, segH, rTop, rBottom);

					if (isHot) {
						ctx.shadowColor = hexToRgba(HIGHLIGHT, 0.55);
						ctx.shadowBlur = 10;
						ctx.shadowOffsetX = 0;
						ctx.shadowOffsetY = 0;
						ctx.strokeStyle = HIGHLIGHT;
						ctx.lineWidth = 1.75;
						ctx.stroke();
						ctx.shadowColor = 'transparent';
					}

					ctx.clip();
					ctx.globalAlpha = alpha;
					ctx.fillStyle = color;

					const actualCell = cell * (isHot ? 1.4 : 1);

					for (let tx = Math.floor(x0); tx <= Math.ceil(x0 + barW); tx += actualCell) {
						for (let ty = Math.floor(yTop); ty <= Math.ceil(yBottom); ty += actualCell) {
							const jx = tx + actualCell / 2;
							const jy = ty + actualCell / 2;
							const jit = hash(jx, jy);

							const falloff = smoothstep(0, 1, 1 - (ty - yTop) / segH);
							const waveRaw =
								Math.sin(jx * 0.05 + time) +
								Math.sin(jy * 0.05 + time * 0.7) +
								Math.sin((jx - jy) * 0.02 - time * 0.4);
							const mod = smoothstep(-1.5, 1.5, waveRaw);

							const sz =
								actualCell * (0.3 + 0.4 * falloff + 0.3 * mod) * (0.8 + 0.4 * jit);
							ctx.fillRect(
								tx + (actualCell - sz) / 2,
								ty + (actualCell - sz) / 2,
								sz,
								sz
							);
						}
					}

					ctx.restore();

					currentY = yTop - 4; 
				}
			}

		};
		new AnimationFrames(draw);
	});

	function handlePointer(e: PointerEvent) {
		if (!canvas) return;
		const rect = canvas.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		if (x < 0 || x > rect.width || y < 0 || y > rect.height) {
			hoverBranch = null;
			hoverBand = null;
			return;
		}

		const colW = rect.width / BRANCHES.length;
		const bIdx = Math.floor(x / colW);
		const clampIdx = clamp(bIdx, 0, BRANCHES.length - 1);

		const cx = clampIdx * colW + colW / 2;
		const barW = Math.min(colW * 0.62, 54);
		const x0 = cx - barW / 2;

		if (x >= x0 && x <= x0 + barW) {
			let currentY = rect.height;
			let foundBand: number | null = null;
			for (let j = 0; j < BANDS.length; j++) {
				const key = `${clampIdx}-${j}`;
				const segH = drawn.get(key) || 0;
				const yTop = currentY - segH;
				if (y <= currentY && y >= yTop) {
					foundBand = j;
					break;
				}
				currentY = yTop - 4;
			}
			hoverBranch = clampIdx;
			hoverBand = foundBand;
		} else {
			hoverBranch = clampIdx;
			hoverBand = null;
		}
	}

	function handlePointerLeave() {
		hoverBranch = null;
		hoverBand = null;
	}

	const subLine = $derived.by(() => {
		if (hoverBranch !== null && hoverBand !== null)
			return `paid by ${BANDS[hoverBand].name} this ${period.name.toLowerCase()}`;
		if (hoverBranch !== null)
			return `at ${BRANCHES[hoverBranch]} this ${period.name.toLowerCase()}`;
		return `processed this ${period.name.toLowerCase()}`;
	});

	const badgeText = $derived.by(() => {
		if (hoverBranch !== null && hoverBand !== null)
			return `${BRANCHES[hoverBranch]} · ${BANDS[hoverBand].name}`;
		if (hoverBranch !== null) return BRANCHES[hoverBranch];
		return '↑ 14%';
	});

	const selectPeriod = layout.update.with((i: number) => {
		periodIndex = i;
		hoverBranch = null;
		hoverBand = null;
	});
</script>

<div class="chart-stage-in">
	<div class="chart-frame">
		<div style="width: 440px; zoom: 0.781818">
			<div class="flex justify-center w-full font-sans">
				<div class="w-full max-w-[440px] flex flex-col items-center gap-[14px]">
					<motion.div
						initial={{ opacity: 0, y: 12 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
						class="w-full bg-[#FAFAFB] rounded-[14px] p-1.5 flex flex-col gap-1.5 shadow-[0_24px_50px_-34px_rgba(15,23,42,0.3)]"
					>
						<motion.div
							initial={{ opacity: 0, y: 8 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.26, ease: [0.19, 1, 0.22, 1], delay: 0.03 }}
							class="bg-white rounded-[10px] p-[14px_20px] flex flex-col gap-1.5 shadow-[0_0_1.76px_rgba(0,0,0,0.08),0_1px_1.76px_rgba(25,28,33,0.06),0_0_0_1px_rgba(25,28,33,0.04)]"
						>
							<div class="flex items-center justify-between gap-3">
								<div class="flex items-center gap-1.5">
									<span class="text-[13px] font-medium tracking-tight text-[#171717]"
										>Payments</span
									>
									<svg
										viewBox="0 0 16 16"
										fill="none"
										aria-hidden="true"
										class="w-[14px] h-[14px] shrink-0"
									>
										<path
											d="M1.3335 7.99984C1.3335 5.64152 1.3335 4.46235 2.03536 3.6751C2.14762 3.54919 2.27135 3.43274 2.40514 3.32708C3.24158 2.6665 4.49444 2.6665 7.00016 2.6665H9.00016C11.5059 2.6665 12.7588 2.6665 13.5952 3.32708C13.729 3.43274 13.8527 3.54919 13.965 3.6751C14.6668 4.46235 14.6668 5.64152 14.6668 7.99984C14.6668 10.3582 14.6668 11.5373 13.965 12.3246C13.8527 12.4505 13.729 12.5669 13.5952 12.6726C12.7588 13.3332 11.5059 13.3332 9.00016 13.3332H7.00016C4.49444 13.3332 3.24158 13.3332 2.40514 12.6726C2.27135 12.5669 2.14762 12.4505 2.03536 12.3246C1.3335 11.5373 1.3335 10.3582 1.3335 7.99984Z"
											fill="#B6B8BF"
											stroke="#B6B8BF"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
										<path
											d="M6.6665 10.6665H7.6665"
											stroke="#FFFFFF"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
										<path
											d="M9.6665 10.6665H11.9998"
											stroke="#FFFFFF"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
										<path
											d="M1.3335 6H14.6668"
											stroke="#FFFFFF"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
									</svg>
								</div>
								<div class="relative h-4 overflow-hidden w-24 flex justify-end">
									<AnimatePresence mode="popLayout" initial={false}>
										{#key period.name}
											<motion.span
												initial={{ opacity: 0, y: -5, filter: 'blur(3px)' }}
												animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
												exit={{ opacity: 0, y: 5, filter: 'blur(3px)' }}
												transition={{ duration: 0.18, ease: [0.19, 1, 0.22, 1] }}
												class="absolute right-0 text-[12px] text-[#8A90A0] whitespace-nowrap"
											>
												This {period.name.toLowerCase()}
											</motion.span>
										{/key}
									</AnimatePresence>
								</div>
							</div>
							<div class="flex items-baseline gap-2">
								<span
									class="text-[31px] font-semibold tracking-[-0.015em] text-[#171717] leading-[1.15]"
								>
									<AnimatedNumber value={computed.totalValue} prefix="$" />
								</span>
								<span
									class={cn(
										'text-[13px] font-medium tabular-nums transition-colors duration-150',
										hoverBranch === null ? 'text-[#2563EB]' : 'text-[#8A8F98]'
									)}
								>
									{badgeText}
								</span>
							</div>
							<span class="text-[12.5px] font-normal text-[#8A90A0] transition-all"
								>{subLine}</span
							>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 8 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.26, ease: [0.19, 1, 0.22, 1], delay: 0.06 }}
							class="bg-white rounded-[10px] p-[14px_18px_16px] flex flex-col gap-3 shadow-[0_0_1.76px_rgba(0,0,0,0.08),0_1px_1.76px_rgba(25,28,33,0.06),0_0_0_1px_rgba(25,28,33,0.04)]"
						>
							<div class="flex flex-wrap gap-[5px_16px] pl-[2px]">
								{#each BANDS as band, j (band.name)}
									<div
										class="flex items-center gap-1.5 transition-opacity duration-150"
										style="opacity: {hoverBand !== null && hoverBand !== j ? 0.4 : 1.0}"
									>
										<span
											class="w-[9px] h-[9px] rounded-[3px] shrink-0"
											style="background-color: {band.color}"
										></span>
										<span class="text-[11.5px] font-[450] text-[#5F6675] whitespace-nowrap"
											>{band.name}</span
										>
									</div>
								{/each}
							</div>

							<div class="flex gap-[10px]">
								<div class="relative w-[30px] h-[140px] shrink-0">
									{#each [0, 1, 2, 3, 4] as idx (idx)}
										<motion.span
											class="absolute right-0 text-[10px] text-[#A1A6B4] tabular-nums whitespace-nowrap"
											style={{ top: `${(1 - idx / 4) * 100}%`, y: '-50%' }}
										>
											{axisDisplays[idx].current}
										</motion.span>
									{/each}
								</div>

								<div class="relative flex-1 h-[140px]">
									<div
										class="absolute inset-0 rounded-[5px] pointer-events-none"
										style="background: repeating-linear-gradient(-45deg, rgba(79, 96, 132, 0.04) 0px, rgba(79, 96, 132, 0.04) 1px, transparent 1px, transparent 7px)"
									></div>
									<div
										class="absolute left-0 right-0 top-[100%] border-t-[1.5px] border-[#E7E9EE] pointer-events-none"
									></div>
									<div
										class="absolute left-0 right-0 top-[75%] border-t border-dashed border-[#78829629] pointer-events-none"
									></div>
									<div
										class="absolute left-0 right-0 top-[50%] border-t border-dashed border-[#78829629] pointer-events-none"
									></div>
									<div
										class="absolute left-0 right-0 top-[25%] border-t border-dashed border-[#78829629] pointer-events-none"
									></div>
									<div
										class="absolute left-0 right-0 top-[0%] border-t border-dashed border-[#78829629] pointer-events-none"
									></div>

									<canvas
										bind:this={canvas}
										class="absolute inset-0 w-full h-full z-10 touch-none cursor-default"
										onpointermove={handlePointer}
										onpointerleave={handlePointerLeave}
									></canvas>
								</div>
							</div>

							<div class="flex pl-[40px]">
								{#each BRANCHES as b, i (b)}
									<span
										class={cn(
											'flex-1 min-w-0 text-center truncate text-[11px] tracking-[-0.006em] transition-colors duration-180',
											hoverBranch === i
												? 'text-[#171717] font-semibold'
												: 'text-[#8A90A0] font-normal'
										)}
									>
										{b}
									</span>
								{/each}
							</div>
						</motion.div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 8 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.26, ease: [0.19, 1, 0.22, 1], delay: 0.1 }}
						class="inline-flex bg-[#F3F4F6] rounded-[9px] p-[3px] gap-[2px]"
					>
						{#each PERIODS as p, i (p.name)}
							<button
								onclick={() => selectPeriod(i)}
								class={cn(
									'relative px-[12px] py-[5px] rounded-[7px] text-[12px] transition-colors outline-none',
									period.name === p.name
										? 'text-[#171717] font-semibold'
										: 'text-[#8A90A0] font-medium hover:text-[#5F5F6F]'
								)}
							>
								{#if period.name === p.name}
									<layout.div
										layoutId="activePeriodPayment"
										class="absolute inset-0 bg-white rounded-[7px] shadow-[0_0_0_1px_rgba(25,28,33,0.05),0_1px_2px_rgba(25,28,33,0.08)] z-0"
										transition={{ duration: 0.32, bounce: 0.2, type: 'spring' }}
									/>
								{/if}
								<span class="relative z-10">{p.name}</span>
							</button>
						{/each}
					</motion.div>
				</div>
			</div>
		</div>
	</div>
</div>
