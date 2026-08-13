<script lang="ts">
	import { motion, AnimatePresence } from 'motion-sv';
	import { BarChart3 } from '@lucide/svelte';
	import { AnimationFrames } from 'runed';
	import DitherAnimatedValue from './DitherAnimatedValue.svelte';

	export interface Props {
		theme?: 'dark' | 'light';
		compact?: boolean;
	}

	let { theme = 'dark', compact = false }: Props = $props();

	const PERIODS = [
		{ name: '7D', mult: 1 },
		{ name: '30D', mult: 3.8 },
		{ name: '90D', mult: 11.2 },
		{ name: '1Y', mult: 42.5 }
	];

	const LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
	const BASE_VALUES = [42, 68, 55, 92, 85, 110, 74];

	let periodIdx = $state(1);
	let hoveredIdx = $state<number | null>(null);
	let canvas = $state<HTMLCanvasElement | null>(null);

	let time = 0;

	const period = $derived(PERIODS[periodIdx]);
	const data = $derived(BASE_VALUES.map((v) => Math.round(v * period.mult)));
	const total = $derived(data.reduce((a, b) => a + b, 0));
	const maxVal = $derived(Math.max(...data));

	$effect(() => {

		const currentData = data;
		const currentMax = maxVal;
		const currentHover = hoveredIdx;
		const el = canvas;
		if (!el) return;

		const draw = () => {
			time += 0.03;
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
			const colW = w / currentData.length;
			const barW = Math.min(colW * 0.55, 36);
			const cell = Math.max(3, Math.round(w / 160));

			currentData.forEach((val, i) => {
				const cx = i * colW + colW / 2;
				const x0 = cx - barW / 2;
				const barH = (val / currentMax) * (h * 0.82);
				const yTop = h - barH;
				const isHovered = currentHover === i;

				for (let bx = Math.floor(x0); bx < Math.ceil(x0 + barW); bx += cell) {
					for (let by = Math.floor(yTop); by < h; by += cell) {
						const distToTop = (by - yTop) / barH;
						const wave = Math.sin(bx * 0.08 + time * 2) * 0.1;
						const density = 0.4 + 0.6 * (1 - distToTop) + wave;

						if (Math.random() < density || isHovered) {
							ctx.fillStyle = isHovered ? '#FFFFFF' : 'rgba(255, 255, 255, 0.75)';
							const sz = cell * (isHovered ? 0.95 : 0.75);
							const offset = (cell - sz) / 2;
							ctx.fillRect(bx + offset, by + offset, sz, sz);
						}
					}
				}
			});

			ctx.restore();
		};

		new AnimationFrames(draw);
	});

	function onPointerMove(event: PointerEvent) {
		const target = event.currentTarget as HTMLDivElement;
		const rect = target.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const colW = rect.width / data.length;
		hoveredIdx = Math.min(Math.max(0, Math.floor(x / colW)), data.length - 1);
	}
</script>

<div class="w-full flex flex-col items-center gap-3 font-sans">
	<div
		class="w-full rounded-2xl p-4 flex flex-col gap-3 shadow-lg border transition-colors {theme ===
		'dark'
			? 'bg-[#181818] border-white/10 text-white'
			: 'bg-white border-neutral-200 text-black'}"
	>
		<div class="flex items-center justify-between">
			<div class="flex items-center gap-2">
				<BarChart3 class="w-4 h-4 text-neutral-400" />
				<span class="text-xs font-semibold uppercase tracking-wider text-neutral-400"
					>Dither Vertical Bars</span
				>
			</div>
			<span class="text-xs font-semibold text-emerald-400">↑ 18.4%</span>
		</div>

		<div class="flex items-baseline gap-2">
			<span class="text-2xl font-bold tracking-tight">
				<DitherAnimatedValue value={total} />
			</span>
			<span class="text-xs text-neutral-400">total events</span>
		</div>

		<div
			class="relative h-[160px] w-full touch-none cursor-pointer"
			role="presentation"
			onpointermove={onPointerMove}
			onpointerleave={() => (hoveredIdx = null)}
		>
			<canvas bind:this={canvas} class="w-full h-full pointer-events-none"></canvas>

			<AnimatePresence>
				{#if hoveredIdx !== null}
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.9 }}
						class="absolute bg-neutral-900 border border-neutral-700 text-white rounded-lg px-2.5 py-1 text-xs font-semibold shadow-xl pointer-events-none transform -translate-x-1/2 -translate-y-full top-2"
						style={{ left: `${((hoveredIdx + 0.5) / data.length) * 100}%` }}
					>
						{LABELS[hoveredIdx]}: {data[hoveredIdx]}
					</motion.div>
				{/if}
			</AnimatePresence>
		</div>

		<div class="flex justify-between text-[11px] text-neutral-400 px-1 pt-1">
			{#each LABELS as lbl, idx (lbl)}
				<span class={hoveredIdx === idx ? 'text-white font-bold' : ''}>{lbl}</span>
			{/each}
		</div>
	</div>

	<div class="inline-flex bg-neutral-800/60 rounded-lg p-1 gap-1 border border-white/10">
		{#each PERIODS as p, idx (p.name)}
			<button
				onclick={() => (periodIdx = idx)}
				class="px-3 py-1 rounded-md text-xs font-semibold transition-all {periodIdx === idx
					? 'bg-white text-black shadow-sm'
					: 'text-neutral-400 hover:text-white'}"
			>
				{p.name}
			</button>
		{/each}
	</div>
</div>
