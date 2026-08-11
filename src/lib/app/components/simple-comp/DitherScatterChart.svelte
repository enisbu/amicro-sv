<script lang="ts">
	import { motion, AnimatePresence } from 'motion-sv';
	import { TrendingUp } from '@lucide/svelte';
	import { AnimationFrames } from 'runed';

	export interface Props {
		theme?: 'dark' | 'light';
		compact?: boolean;
	}

	let { theme = 'dark', compact = false }: Props = $props();

	const MODES = [
		{ name: 'Scatter', mult: 1 },
		{ name: 'Trend', mult: 1.4 },
		{ name: 'Peak', mult: 2.1 }
	];

	const POINTS = [
		{ x: 15, y: 35, label: 'Node A' },
		{ x: 28, y: 62, label: 'Node B' },
		{ x: 42, y: 48, label: 'Node C' },
		{ x: 58, y: 84, label: 'Node D' },
		{ x: 72, y: 70, label: 'Node E' },
		{ x: 88, y: 92, label: 'Node F' }
	];

	let modeIdx = $state(0);
	let hoverIdx = $state<number | null>(null);
	let canvas = $state<HTMLCanvasElement | null>(null);

	let time = 0;

	const mode = $derived(MODES[modeIdx]);

	$effect(() => {
		const mult = mode.mult;
		const currentHover = hoverIdx;
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
			const cell = Math.max(3, Math.round(w / 160));

			ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
			for (let gx = 0; gx < w; gx += cell * 4) {
				for (let gy = 0; gy < h; gy += cell * 4) {
					ctx.fillRect(gx, gy, cell, cell);
				}
			}

			ctx.beginPath();
			POINTS.forEach((p, idx) => {
				const px = (p.x / 100) * w;
				const py = h - (p.y / 100) * h * (mult / 2.1);
				if (idx === 0) ctx.moveTo(px, py);
				else ctx.lineTo(px, py);
			});
			ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
			ctx.lineWidth = 1.5;
			ctx.stroke();

			POINTS.forEach((p, idx) => {
				const px = (p.x / 100) * w;
				const py = h - (p.y / 100) * h * (mult / 2.1);
				const isHovered = currentHover === idx;
				const radius = isHovered ? cell * 3.5 : cell * 2.2;

				for (let dx = -radius; dx <= radius; dx += cell) {
					for (let dy = -radius; dy <= radius; dy += cell) {
						const dist = Math.sqrt(dx * dx + dy * dy);
						if (dist > radius) continue;

						const shimmer = Math.sin(time * 4 + idx) * 0.15;
						const alpha = 1 - dist / radius + shimmer;

						ctx.fillStyle = isHovered
							? '#FFFFFF'
							: `rgba(255, 255, 255, ${Math.min(1, Math.max(0.3, alpha))})`;
						const sz = cell * (isHovered ? 0.9 : 0.75);
						ctx.fillRect(px + dx, py + dy, sz, sz);
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
		const x = ((event.clientX - rect.left) / rect.width) * 100;
		let closestIdx = 0;
		let minDist = Infinity;
		POINTS.forEach((p, idx) => {
			const d = Math.abs(p.x - x);
			if (d < minDist) {
				minDist = d;
				closestIdx = idx;
			}
		});
		hoverIdx = closestIdx;
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
				<TrendingUp class="w-4 h-4 text-neutral-400" />
				<span class="text-xs font-semibold uppercase tracking-wider text-neutral-400"
					>Dither Scatter Plot</span
				>
			</div>
			<span class="text-xs font-semibold text-emerald-400">Live Trend</span>
		</div>

		<div
			class="relative h-[160px] w-full touch-none cursor-pointer"
			role="presentation"
			onpointermove={onPointerMove}
			onpointerleave={() => (hoverIdx = null)}
		>
			<canvas bind:this={canvas} class="w-full h-full pointer-events-none"></canvas>

			<AnimatePresence>
				{#if hoverIdx !== null}
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.9 }}
						class="absolute bg-neutral-900 border border-neutral-700 text-white rounded-lg px-2.5 py-1 text-xs font-semibold shadow-xl pointer-events-none transform -translate-x-1/2 -translate-y-full top-2"
						style={{ left: `${POINTS[hoverIdx].x}%` }}
					>
						{POINTS[hoverIdx].label}: {Math.round(POINTS[hoverIdx].y * mode.mult)} pts
					</motion.div>
				{/if}
			</AnimatePresence>
		</div>
	</div>

	<div class="inline-flex bg-neutral-800/60 rounded-lg p-1 gap-1 border border-white/10">
		{#each MODES as m, idx (m.name)}
			<button
				onclick={() => (modeIdx = idx)}
				class="px-3 py-1 rounded-md text-xs font-semibold transition-all {modeIdx === idx
					? 'bg-white text-black shadow-sm'
					: 'text-neutral-400 hover:text-white'}"
			>
				{m.name}
			</button>
		{/each}
	</div>
</div>
