<script lang="ts">
	import { motion, AnimatePresence, createLayoutMotion, useSpring } from 'motion-sv';
	import { MediaQuery } from 'svelte/reactivity';
	import { untrack } from 'svelte';
	import { Users } from '@lucide/svelte';
	import { AnimationFrames } from 'runed';
	import AnimatedNumber from './AnimatedNumber.svelte';
	import { smoothstep, clamp } from './dither-math.js';
	import { cn } from '$lib/app/utils.js';

	const RANGES = [
		{ name: '7D', days: 7 },
		{ name: '14D', days: 14 },
		{ name: '30D', days: 30 },
		{ name: '90D', days: 90 }
	];

	function formatDate(offsetDays: number): string {
		const date = new Date(2026, 6, 14);
		date.setDate(date.getDate() - offsetDays);
		return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
	}

	let rangeIndex = $state(2); 
	let scrubIndex = $state<number | null>(null);

	const range = $derived(RANGES[rangeIndex]);
	const reducedMotion = new MediaQuery('(prefers-reduced-motion: reduce)');
	const layout = createLayoutMotion(motion);

	const targetX = useSpring(0, { stiffness: 650, damping: 42, mass: 0.5 });
	const targetY = useSpring(0, { stiffness: 650, damping: 42, mass: 0.5 });

	const computed = $derived.by(() => {
		const days = RANGES[rangeIndex].days;
		const newData: number[] = [];
		const newDates: string[] = [];
		let tot = 0;
		let mv = 3;
		for (let i = 0; i < days; i++) {
			const t = i / (days - 1);
			const base = 9 + t * 23;
			const wave = 6 * Math.sin(i * 0.7 + 1) + 3 * Math.sin(i * 1.9);
			const val = Math.max(3, Math.round(base + wave));
			newData.push(val);
			tot += val;
			if (val > mv) mv = val;
			newDates.push(formatDate(days - 1 - i));
		}
		return { data: newData, dates: newDates, total: tot, maxVal: mv };
	});

	let isMounted = $state(false);
	$effect(() => {
		isMounted = true;
	});

	let canvas: HTMLCanvasElement;
	let wrapper: HTMLDivElement;

	let time = 0;
	let pointerPos = { x: -100, y: -100 };
	let pointerActive = false;

	let targetData = untrack(() => [...computed.data]);
	let fromData = [...targetData];
	let targetMax = untrack(() => computed.maxVal);
	let fromMax = targetMax;
	let morphStartTime = 0;

	$effect(() => {
		const nextData = computed.data;
		const nextMax = computed.maxVal;

		fromData = [...targetData];
		fromMax = targetMax;

		targetData = [...nextData];
		targetMax = nextMax;

		if (fromData.length !== targetData.length) {
			const len = targetData.length;
			const old = fromData;
			fromData = Array(len)
				.fill(0)
				.map((_, i) => {
					const t = i / (len - 1);
					const oldIdx = Math.round(t * (old.length - 1));
					return old[oldIdx];
				});
		}

		morphStartTime = performance.now();
	});

	$effect(() => {
		const draw = () => {
			time += 0.03;
			const ctx = canvas.getContext('2d');
			if (!ctx) return;

			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			const rect = canvas.getBoundingClientRect();
			if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
				canvas.width = rect.width * dpr;
				canvas.height = rect.height * dpr;
				ctx.imageSmoothingEnabled = false;
			}

			ctx.save();
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.scale(dpr, dpr);

			const w = rect.width;
			const h = rect.height;
			const cell = Math.max(3, Math.round(w / 180));

			let prog = 0;
			if (morphStartTime > 0) {
				prog = (performance.now() - morphStartTime) / 460;
				if (prog > 1) prog = 1;
			} else {
				prog = 1;
			}

			const isReduced = reducedMotion.current;
			if (isReduced) {
				prog = 1;
				time = 0;
			}

			const curMax = fromMax + (targetMax - fromMax) * prog;
			const curData = targetData.map((v, i) => fromData[i] + (v - fromData[i]) * prog);

			const px = pointerPos.x;
			const py = pointerPos.y;
			const isActive = pointerActive;

			for (let x = 0; x < w; x += cell) {
				const t = x / w;
				const exactIdx = t * (curData.length - 1);
				const i0 = Math.floor(exactIdx);
				const i1 = Math.min(i0 + 1, curData.length - 1);
				const frac = exactIdx - i0;
				const val = curData[i0] + (curData[i1] - curData[i0]) * frac;

				const headroom = 0.16 * h;
				const plotH = h - headroom;
				const curveY = h - plotH * (val / curMax);

				for (let y = h; y >= 0; y -= cell) {

					ctx.fillStyle = 'rgba(230, 230, 240, 0.5)'; 
					ctx.fillRect(x + 1, y + 1, cell - 1, cell - 1);

					if (y < curveY) continue;

					const dx = x - px;
					const dy = y - py;
					const dist = Math.sqrt(dx * dx + dy * dy);

					let glow = 0;
					if (isActive && !isReduced) {

						const rad = h * 0.35;
						glow = 1 - smoothstep(0, rad, dist);
					}

					const shimmer = isReduced ? 0 : Math.sin(y * 0.1 - time * 2) * 0.07;

					ctx.fillStyle = '#FFFFFF';
					const sz = cell * (0.7 + shimmer + glow * 0.3);
					const alpha = 0.6 + glow * 0.4;
					ctx.globalAlpha = alpha;

					const offset = (cell - sz) / 2;
					ctx.fillRect(x + offset, y + offset, sz, sz);
					ctx.globalAlpha = 1;
				}
			}

			ctx.restore();
		};

		new AnimationFrames(draw);
	});

	function handlePointer(e: PointerEvent) {
		if (!wrapper) return;
		const rect = wrapper.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		pointerPos = { x, y };
		pointerActive = true;

		const w = rect.width;
		const h = rect.height;

		const t = clamp(x / w, 0, 1);
		const idx = Math.round(t * (computed.data.length - 1));
		scrubIndex = idx;

		const actualT = computed.data.length > 1 ? idx / (computed.data.length - 1) : 0.5;
		targetX.set(actualT * w);

		const val = computed.data[idx];
		const headroom = 0.16 * h;
		const plotH = h - headroom;
		const curveY = h - plotH * (val / computed.maxVal);
		targetY.set(curveY);
	}

	function handlePointerLeave() {
		pointerActive = false;
		scrubIndex = null;
	}

	const ticks = $derived([
		computed.maxVal,
		Math.round(computed.maxVal * 0.66),
		Math.round(computed.maxVal * 0.33),
		0
	]);

	const dateLabels = $derived([
		computed.dates[0],
		computed.dates[Math.floor(computed.dates.length * 0.25)],
		computed.dates[Math.floor(computed.dates.length * 0.5)],
		computed.dates[Math.floor(computed.dates.length * 0.75)],
		computed.dates[computed.dates.length - 1]
	]);

	const selectRange = layout.update.with((i: number) => {
		rangeIndex = i;
		scrubIndex = null;
	});
</script>

<div class="chart-stage-in pt-8">
	<div class="chart-frame">
		<div style="width: 500px; zoom: 0.688">
			<div class="flex justify-center w-full font-sans">
				<div class="w-full max-w-[500px] flex flex-col items-center gap-[14px]">
					<div class="w-full bg-[#FAFAFB] rounded-[14px] p-1.5 flex flex-col gap-1.5">
						<div class="flex gap-1.5">
							<button
								class="flex-1 bg-white rounded-[10px] p-[12px_14px] flex flex-col gap-1 text-left shadow-[0_0_1.76px_rgba(0,0,0,0.08),0_1px_1.76px_rgba(25,28,33,0.06),0_0_0_1px_rgba(25,28,33,0.04)] outline-none border-none cursor-pointer"
							>
								<div class="flex items-center gap-2">
									<Users size={13} class="text-[#8A90A0]" />
									<span class="text-[12.5px] font-medium tracking-[-0.006em] text-[#171717]"
										>New members</span
									>
								</div>
								<div class="flex items-baseline gap-[7px]">
									<span
										class="text-[27px] font-semibold tracking-[-0.015em] text-[#171717] leading-[1.15]"
									>
										<AnimatedNumber value={computed.total} prefix="+" />
									</span>
									<span class="text-[12px] font-medium text-[#2563EB] tabular-nums">↑ 12%</span>
								</div>
							</button>
						</div>

						<div
							class="bg-white rounded-[10px] p-[16px] flex flex-col shadow-[0_0_1.76px_rgba(0,0,0,0.08),0_1px_1.76px_rgba(25,28,33,0.06),0_0_0_1px_rgba(25,28,33,0.04)]"
						>
							<div class="flex gap-2 items-start">
								<div class="relative w-[30px] h-[194px] shrink-0">
									{#each ticks as t, i (i)}
										<span
											class="absolute right-0 text-[10px] font-normal text-[#9AA0A6] tabular-nums"
											style="top: {(i / 3) * 84 + 16}%; transform: translateY(-50%)"
										>
											{t}
										</span>
									{/each}
								</div>

								<div class="flex-1 min-w-0 flex flex-col">
									<div
										bind:this={wrapper}
										role="presentation"
										class="relative h-[194px] touch-none cursor-crosshair"
										onpointermove={handlePointer}
										onpointerleave={handlePointerLeave}
									>
										<div
											class="absolute inset-0 rounded-[5px] pointer-events-none"
											style="background: repeating-linear-gradient(-45deg, rgba(79, 96, 132, 0.04) 0px, rgba(79, 96, 132, 0.04) 1px, transparent 1px, transparent 7px)"
										></div>
										<div
											class="absolute left-0 right-0 top-[16%] border-t border-dashed border-[#7882962E] pointer-events-none"
										></div>
										<div
											class="absolute left-0 right-0 top-[44%] border-t border-dashed border-[#7882962E] pointer-events-none"
										></div>
										<div
											class="absolute left-0 right-0 top-[72%] border-t border-dashed border-[#7882962E] pointer-events-none"
										></div>
										<div
											class="absolute left-0 right-0 top-[100%] border-t-[1.5px] border-[#E7E9EE] pointer-events-none"
										></div>

										<motion.div
											class="absolute inset-0 overflow-hidden"
											initial={isMounted
												? false
												: { clipPath: 'inset(0 100% 0 0)', filter: 'blur(9px)', opacity: 0 }}
											animate={{ clipPath: 'inset(0 0% 0 0)', filter: 'blur(0px)', opacity: 1 }}
											transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
										>
											<canvas
												bind:this={canvas}
												class="w-full h-full pointer-events-none"
											></canvas>
										</motion.div>

										<AnimatePresence>
											{#if scrubIndex !== null}
												<motion.div
													initial={{ opacity: 0 }}
													animate={{ opacity: 1 }}
													exit={{ opacity: 0 }}
													transition={{ duration: 0.16, ease: 'easeOut' }}
													class="absolute inset-0 pointer-events-none"
												>
													<motion.div
														class="absolute top-0 bottom-0 w-px bg-[#2563EB47]"
														style={{ x: targetX }}
													/>
													<motion.div
														class="absolute w-[11px] h-[11px] -ml-[5.5px] -mt-[5.5px] rounded-full bg-[#2563EB] border-2 border-white shadow-[0_1px_5px_rgba(15,23,42,0.28)]"
														style={{ x: targetX, y: targetY }}
													/>
													<motion.div
														class="absolute bg-white border border-[#E5E7EB] rounded-[10px] shadow-[0_6px_20px_-6px_rgba(15,23,42,0.22)] p-[7px_11px] whitespace-nowrap text-center transform -translate-x-1/2 -translate-y-[calc(100%+16px)]"
														style={{ x: targetX, y: targetY }}
													>
														<div class="text-[11px] font-medium text-[#6B7280] mb-0.5">
															{computed.dates[scrubIndex]}
														</div>
														<div class="text-[14px] font-semibold text-[#171717] tabular-nums">
															+{computed.data[scrubIndex]} joined
														</div>
													</motion.div>
												</motion.div>
											{/if}
										</AnimatePresence>
									</div>

									<div class="flex justify-between pt-[6px]">
										{#each dateLabels as d, i (i)}
											<span class="text-[10px] font-normal text-[#5F5F6F] tabular-nums">{d}</span>
										{/each}
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="inline-flex bg-[#F3F4F6] rounded-[9px] p-[3px] gap-[2px]">
						{#each RANGES as r, i (r.name)}
							<button
								onclick={() => selectRange(i)}
								class={cn(
									'relative px-[12px] py-[5px] rounded-[7px] text-[12px] tabular-nums outline-none transition-colors',
									range.name === r.name
										? 'text-[#171717] font-semibold'
										: 'text-[#8A90A0] font-medium hover:text-[#5F5F6F]'
								)}
							>
								{#if range.name === r.name}
									<layout.div
										layoutId="activeRangeMembers"
										class="absolute inset-0 bg-white rounded-[7px] shadow-[0_0_0_1px_rgba(25,28,33,0.05),0_1px_2px_rgba(25,28,33,0.08)] z-0"
										transition={{ duration: 0.32, bounce: 0.2, type: 'spring' }}
									/>
								{/if}
								<span class="relative z-10">{r.name}</span>
							</button>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
