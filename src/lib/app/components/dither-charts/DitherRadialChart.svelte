<script lang="ts">
	import { Target } from '@lucide/svelte';
	import { AnimationFrames } from 'runed';
	import DitherAnimatedValue from './DitherAnimatedValue.svelte';

	export interface Props {
		theme?: 'dark' | 'light';
		compact?: boolean;
	}

	let { theme = 'dark', compact = false }: Props = $props();

	const TARGETS = [
		{ name: '50%', val: 50 },
		{ name: '75%', val: 75 },
		{ name: '90%', val: 90 },
		{ name: '100%', val: 100 }
	];

	let targetIdx = $state(1);
	let canvas = $state<HTMLCanvasElement | null>(null);

	let time = 0;

	const currentTarget = $derived(TARGETS[targetIdx]);

	$effect(() => {
		const targetVal = currentTarget.val;
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
			const cx = w / 2;
			const cy = h / 2;
			const outerR = Math.min(w, h) * 0.42;
			const innerR = outerR * 0.58;
			const cell = Math.max(3, Math.round(w / 160));

			const fillSweep = (targetVal / 100) * (Math.PI * 2);

			for (let x = cx - outerR; x <= cx + outerR; x += cell) {
				for (let y = cy - outerR; y <= cy + outerR; y += cell) {
					const dx = x - cx;
					const dy = y - cy;
					const dist = Math.sqrt(dx * dx + dy * dy);
					if (dist < innerR || dist > outerR) continue;

					let angle = Math.atan2(dy, dx) + Math.PI / 2;
					if (angle < 0) angle += Math.PI * 2;

					const isFilled = angle <= fillSweep;
					const shimmer = Math.sin(dist * 0.1 - time * 3) * 0.1;

					if (isFilled) {
						const alpha = 0.65 + shimmer + (dist / outerR) * 0.35;
						ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, Math.max(0.2, alpha))})`;
						const sz = cell * 0.82;
						ctx.fillRect(x, y, sz, sz);
					} else {
						ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
						ctx.fillRect(x + 1, y + 1, cell - 2, cell - 2);
					}
				}
			}

			ctx.restore();
		};

		new AnimationFrames(draw);
	});
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
				<Target class="w-4 h-4 text-neutral-400" />
				<span class="text-xs font-semibold uppercase tracking-wider text-neutral-400"
					>Dither Radial Gauge</span
				>
			</div>
			<span class="text-xs font-semibold text-emerald-400">Active</span>
		</div>

		<div class="relative h-[160px] w-full flex items-center justify-center">
			<canvas bind:this={canvas} class="w-full h-full pointer-events-none"></canvas>
			<div class="absolute flex flex-col items-center justify-center">
				<span class="text-3xl font-black tracking-tight">
					<DitherAnimatedValue
						value={currentTarget.val}
						format={(current) => Math.round(current) + '%'}
						spring={{ stiffness: 180, damping: 24 }}
					/>
				</span>
				<span class="text-[11px] uppercase tracking-widest text-neutral-400 font-semibold"
					>Target</span
				>
			</div>
		</div>
	</div>

	<div class="inline-flex bg-neutral-800/60 rounded-lg p-1 gap-1 border border-white/10">
		{#each TARGETS as t, idx (t.name)}
			<button
				onclick={() => (targetIdx = idx)}
				class="px-3 py-1 rounded-md text-xs font-semibold transition-all {targetIdx === idx
					? 'bg-white text-black shadow-sm'
					: 'text-neutral-400 hover:text-white'}"
			>
				{t.name}
			</button>
		{/each}
	</div>
</div>
