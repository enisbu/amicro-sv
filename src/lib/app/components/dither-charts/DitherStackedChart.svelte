<script lang="ts">
	import { untrack } from 'svelte';
	import { prefersReducedMotion } from 'svelte/motion';
	import { CreditCard } from '@lucide/svelte';
	import { AnimationFrames } from 'runed';
	import DitherAnimatedValue from './DitherAnimatedValue.svelte';
	import { hash, clamp } from './dither-math.js';

	export interface Props {
		theme?: 'dark' | 'light';
		compact?: boolean;
	}

	let { theme = 'dark', compact = false }: Props = $props();

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

	const getAxisMax = (maxVal: number) => {
		if (maxVal === 0) return 100;
		const target = maxVal * 1.05;
		const power = Math.pow(10, Math.floor(Math.log10(target)));
		const normalized = target / power;
		let multiplier = 10;
		if (normalized <= 1.0) multiplier = 1;
		else if (normalized <= 2.0) multiplier = 2;
		else if (normalized <= 5.0) multiplier = 5;

		return multiplier * power;
	};

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
	let canvas = $state<HTMLCanvasElement | null>(null);

	const period = $derived(PERIODS[periodIndex]);

	const computed = $derived.by(() => {
		let tot = 0;
		const branches = BRANCHES.map((b, bIdx) => {
			const branchBase = BASE_TOTAL * BRANCH_WEIGHTS[bIdx];
			let branchTotal = 0;
			const bands = BANDS.map((band, bandIdx) => {
				const wobble = 0.9 + 0.14 * Math.sin(bIdx * 3.1 + bandIdx * 1.7);
				const val = Math.round(branchBase * period.mult * band.share * wobble);
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

	const data = $derived(computed.data);
	const totalValue = $derived(computed.totalValue);
	const axisMax = $derived(computed.axisMax);

	let time = 0;
	let drawn = new Map<string, number>();
	let morphStartTime = 0;
	let fromState = new Map<string, number>();

	$effect(() => {

		void data;
		fromState = new Map(drawn);
		morphStartTime = performance.now();
	});

	$effect(() => {
		const currentData = data;
		const currentAxisMax = axisMax;
		const el = canvas;
		if (!el) return;

		const draw = () => {
			time += 0.02;
			const ctx = el.getContext('2d');
			if (!ctx) return;

			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			const rect = el.getBoundingClientRect();
			if (el.width !== rect.width * dpr || el.height !== rect.height * dpr) {
				el.width = rect.width * dpr;
				el.height = rect.height * dpr;
			}

			ctx.save();
			ctx.clearRect(0, 0, el.width, el.height);
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

			const reducedMotion = untrack(() => prefersReducedMotion.current);
			if (reducedMotion) {
				prog = 1;
				time = 0;
			}

			const n = BRANCHES.length;

			for (let i = 0; i < n; i++) {
				const bp = 1 - Math.pow(1 - clamp((prog - i * 0.05) / (1 - (n - 1) * 0.05), 0, 1), 3);
				const colX = i * colW;
				const cx = colX + colW / 2;
				const x0 = cx - barW / 2;

				let currentY = h;

				for (let j = 0; j < BANDS.length; j++) {
					const key = `${i}-${j}`;
					const targetH = (currentData[i].bands[j].value / currentAxisMax) * h;
					const fromH = fromState.get(key) || 0;
					const segH = Math.max(0.1, fromH + (targetH - fromH) * bp);

					drawn.set(key, segH);

					const yBottom = currentY;
					const yTop = currentY - segH;
					const rTop = j === BANDS.length - 1 ? 8 : 5;
					const rBottom = j === 0 ? 7 : 5;

					const hb = untrack(() => hoverBranch);
					const hband = untrack(() => hoverBand);

					const isHot = hb === i && hband === j;
					const isOtherBranch = hb !== null && hb !== i;
					const isOtherBandInBranch = hb === i && hband !== null && hband !== j;

					let alpha = 1.0;
					if (isOtherBranch) alpha = 0.3;
					else if (isOtherBandInBranch) alpha = 0.48;

					const color = isHot ? HIGHLIGHT : BANDS[j].color;

					ctx.save();
					drawRoundedRect(ctx, x0, yTop, barW, segH, rTop, rBottom);
					ctx.clip();

					ctx.globalAlpha = alpha * 0.85;
					ctx.fillStyle = color;

					for (let bx = x0; bx < x0 + barW; bx += cell) {
						for (let by = yTop; by < yBottom; by += cell) {
							const dx = bx - (x0 + barW / 2);
							const dy = by - (yTop + segH / 2);
							const dist = Math.sqrt(dx * dx + dy * dy);

							const jitter = hash(bx, by);
							const wave = Math.sin(dist * 0.1 - time * 2) * 0.15;
							const sz = cell * (0.68 + wave + jitter * 0.2);

							ctx.fillRect(bx + (cell - sz) / 2, by + (cell - sz) / 2, sz, sz);
						}
					}

					ctx.restore();
					currentY = yTop;
				}
			}

			ctx.restore();
		};

		new AnimationFrames(draw);
	});
</script>

{#if compact}
	<div class="relative w-full h-full flex items-center justify-center p-2">
		<div class="relative w-full h-[120px]">
			<canvas bind:this={canvas} class="w-full h-full block"></canvas>
		</div>
	</div>
{:else}
	<div
		class="relative w-full rounded-3xl p-6 transition-colors border {theme === 'dark'
			? 'bg-[#181818] border-white/5 text-white'
			: 'bg-white border-neutral-200 text-black shadow-lg'}"
	>
		<div
			class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6"
		>
			<div class="flex items-center gap-3">
				<div
					class="p-2.5 rounded-2xl {theme === 'dark'
						? 'bg-blue-500/10 text-blue-400'
						: 'bg-blue-50 text-blue-600'}"
				>
					<CreditCard class="w-5 h-5" />
				</div>
				<div>
					<div class="flex items-baseline gap-2">
						<span class="text-2xl font-bold tracking-tight">
							<DitherAnimatedValue
								value={totalValue}
								format={(current) => '$' + Math.round(current).toLocaleString('en-US')}
							/>
						</span>
						<span class="text-xs {theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}"
							>total revenue</span
						>
					</div>
					<p class="text-xs {theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}">
						Stacked payment channels per regional branch
					</p>
				</div>
			</div>

			<div
				class="flex items-center p-1 rounded-full border text-xs font-medium {theme === 'dark'
					? 'bg-[#131313] border-white/10'
					: 'bg-neutral-100 border-neutral-200'}"
			>
				{#each PERIODS as p, idx (p.name)}
					<button
						onclick={() => (periodIndex = idx)}
						class="px-3 py-1 rounded-full transition-all cursor-pointer {periodIndex === idx
							? 'bg-blue-600 text-white shadow-sm'
							: theme === 'dark'
								? 'text-neutral-400 hover:text-white'
								: 'text-neutral-600 hover:text-black'}"
					>
						{p.name}
					</button>
				{/each}
			</div>
		</div>

		<div class="flex items-center gap-4 mb-4 text-xs font-medium">
			{#each BANDS as band, idx (band.name)}
				<div
					role="presentation"
					onmouseenter={() => (hoverBand = idx)}
					onmouseleave={() => (hoverBand = null)}
					class="flex items-center gap-1.5 cursor-pointer opacity-80 hover:opacity-100"
				>
					<div class="w-2.5 h-2.5 rounded-full" style="background-color: {band.color}"></div>
					<span>{band.name}</span>
				</div>
			{/each}
		</div>

		<div class="relative h-[200px] w-full rounded-xl overflow-hidden">
			<canvas bind:this={canvas} class="w-full h-full block"></canvas>
		</div>

		<div class="grid grid-cols-4 gap-2 mt-3 text-center text-xs font-semibold">
			{#each BRANCHES as branch, idx (branch)}
				<div
					role="presentation"
					onmouseenter={() => (hoverBranch = idx)}
					onmouseleave={() => (hoverBranch = null)}
					class="py-1.5 rounded-lg cursor-pointer transition-all {hoverBranch === idx
						? theme === 'dark'
							? 'bg-white/10 text-white'
							: 'bg-neutral-200 text-black'
						: theme === 'dark'
							? 'text-neutral-400 hover:text-white'
							: 'text-neutral-600 hover:text-black'}"
				>
					{branch}
				</div>
			{/each}
		</div>
	</div>
{/if}
