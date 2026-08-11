<script lang="ts">
	import { motion, AnimatePresence } from 'motion-sv';
	import { LayoutGrid } from '@lucide/svelte';
	import { AnimationFrames } from 'runed';

	export interface Props {
		theme?: 'dark' | 'light';
		compact?: boolean;
	}

	let { theme = 'dark', compact = false }: Props = $props();

	const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
	const HOURS = 12;

	let hoveredCell = $state<{ day: number; hour: number } | null>(null);
	let canvas = $state<HTMLCanvasElement | null>(null);

	let time = 0;

	const matrixData = DAYS.map((_, d) =>
		Array.from({ length: HOURS }, (_, h) =>
			Math.round(20 + Math.sin(d * 1.5 + h * 0.8) * 35 + Math.random() * 40)
		)
	);

	$effect(() => {
		const currentHover = hoveredCell;
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
			const cellW = w / HOURS;
			const cellH = h / DAYS.length;
			const dotCell = Math.max(3, Math.round(w / 160));

			matrixData.forEach((row, d) => {
				row.forEach((val, hIdx) => {
					const x0 = hIdx * cellW;
					const y0 = d * cellH;
					const isHovered = currentHover?.day === d && currentHover?.hour === hIdx;
					const intensity = val / 100;

					for (let bx = Math.floor(x0); bx < Math.ceil(x0 + cellW - 2); bx += dotCell) {
						for (let by = Math.floor(y0); by < Math.ceil(y0 + cellH - 2); by += dotCell) {
							const shimmer = Math.sin(bx * 0.1 + time * 2) * 0.1;
							if (Math.random() < intensity + shimmer || isHovered) {
								ctx.fillStyle = isHovered
									? '#FFFFFF'
									: `rgba(255, 255, 255, ${Math.min(1, Math.max(0.2, intensity))})`;
								const sz = dotCell * (isHovered ? 0.95 : 0.75);
								ctx.fillRect(bx, by, sz, sz);
							}
						}
					}
				});
			});

			ctx.restore();
		};

		new AnimationFrames(draw);
	});

	function onPointerMove(event: PointerEvent) {
		const target = event.currentTarget as HTMLDivElement;
		const rect = target.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;
		const hIdx = Math.min(Math.max(0, Math.floor((x / rect.width) * HOURS)), HOURS - 1);
		const dIdx = Math.min(Math.max(0, Math.floor((y / rect.height) * DAYS.length)), DAYS.length - 1);
		hoveredCell = { day: dIdx, hour: hIdx };
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
				<LayoutGrid class="w-4 h-4 text-neutral-400" />
				<span class="text-xs font-semibold uppercase tracking-wider text-neutral-400"
					>Dither Heatmap Grid</span
				>
			</div>
			<span class="text-xs font-semibold text-emerald-400">Peak Active</span>
		</div>

		<div
			class="relative h-[160px] w-full touch-none cursor-pointer"
			role="presentation"
			onpointermove={onPointerMove}
			onpointerleave={() => (hoveredCell = null)}
		>
			<canvas bind:this={canvas} class="w-full h-full pointer-events-none"></canvas>

			<AnimatePresence>
				{#if hoveredCell !== null}
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.9 }}
						class="absolute bg-neutral-900 border border-neutral-700 text-white rounded-lg px-2.5 py-1 text-xs font-semibold shadow-xl pointer-events-none transform -translate-x-1/2 -translate-y-full top-2"
						style={{ left: `${((hoveredCell.hour + 0.5) / HOURS) * 100}%` }}
					>
						{DAYS[hoveredCell.day]} @ {hoveredCell.hour * 2}:00 - {matrixData[hoveredCell.day][
							hoveredCell.hour
						]} ops/s
					</motion.div>
				{/if}
			</AnimatePresence>
		</div>
	</div>
</div>
