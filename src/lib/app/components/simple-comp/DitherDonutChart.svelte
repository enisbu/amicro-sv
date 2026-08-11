<script lang="ts">
	import { untrack } from 'svelte';
	import { prefersReducedMotion } from 'svelte/motion';
	import { Users } from '@lucide/svelte';
	import { AnimationFrames } from 'runed';
	import { smoothstep, hash, hexToRgba } from './dither-math.js';

	export interface Props {
		theme?: 'dark' | 'light';
		compact?: boolean;
	}

	let { theme = 'dark', compact = false }: Props = $props();

	type Plan = { name: string; color: string; base: number };
	const PLANS: Plan[] = [
		{ name: 'Unlimited', color: '#FFFFFF', base: 1240 },
		{ name: '30-day pass', color: '#E2E8F0', base: 980 },
		{ name: '10-class pack', color: '#CBD5E1', base: 620 },
		{ name: 'Drop-in', color: '#94A3B8', base: 410 },
		{ name: 'Student', color: '#64748B', base: 300 }
	];

	type Period = { name: string; mult: number };
	const PERIODS: Period[] = [
		{ name: 'Week', mult: 0.42 },
		{ name: 'Month', mult: 1 },
		{ name: 'Quarter', mult: 2.6 },
		{ name: 'Year', mult: 8.4 }
	];

	function drawRoundedWedge(
		ctx: CanvasRenderingContext2D,
		cx: number,
		cy: number,
		rIn: number,
		rOut: number,
		aStart: number,
		aEnd: number,
		cr: number
	) {
		const sweep = aEnd - aStart;
		const maxCr = Math.min(cr, (rOut - rIn) / 2, (sweep * rIn) / 2);
		if (sweep <= 0.001) return;
		const crIn = maxCr;
		const crOut = maxCr;

		const aStartIn = aStart + crIn / rIn;
		const aEndIn = aEnd - crIn / rIn;
		const aStartOut = aStart + crOut / rOut;
		const aEndOut = aEnd - crOut / rOut;

		ctx.moveTo(cx + rIn * Math.cos(aStartIn), cy + rIn * Math.sin(aStartIn));
		ctx.arc(cx, cy, rIn, aStartIn, aEndIn);
		ctx.arcTo(
			cx + rIn * Math.cos(aEnd),
			cy + rIn * Math.sin(aEnd),
			cx + rOut * Math.cos(aEnd),
			cy + rOut * Math.sin(aEnd),
			crIn
		);
		ctx.arcTo(
			cx + rOut * Math.cos(aEnd),
			cy + rOut * Math.sin(aEnd),
			cx + rOut * Math.cos(aEndOut),
			cy + rOut * Math.sin(aEndOut),
			crOut
		);
		ctx.arc(cx, cy, rOut, aEndOut, aStartOut, true);
		ctx.arcTo(
			cx + rOut * Math.cos(aStart),
			cy + rOut * Math.sin(aStart),
			cx + rIn * Math.cos(aStart),
			cy + rIn * Math.sin(aStart),
			crOut
		);
		ctx.arcTo(
			cx + rIn * Math.cos(aStart),
			cy + rIn * Math.sin(aStart),
			cx + rIn * Math.cos(aStartIn),
			cy + rIn * Math.sin(aStartIn),
			crIn
		);
	}

	let periodIndex = $state(1); 
	let hoverIndex = $state<number | null>(null);
	let canvas = $state<HTMLCanvasElement | null>(null);

	const period = $derived(PERIODS[periodIndex]);

	const values = $derived(
		PLANS.map((plan, i) => {
			const w = 0.78 + 0.4 * (0.5 + 0.5 * Math.sin(i * 1.9 + periodIndex * 1.3));
			return Math.round(plan.base * period.mult * w);
		})
	);
	const total = $derived(values.reduce((a, b) => a + b, 0));
	const shares = $derived(values.map((v) => v / total));

	let time = 0;
	let morphStartTime = 0;
	let fromShares: number[] = [];
	let targetShares: number[] = [];
	let dispShares: number[] = [];

	$effect(() => {
		const next = shares;
		if (dispShares.length === 0) {
			dispShares = [...next];
			fromShares = [...next];
			targetShares = [...next];
		} else {
			fromShares = [...dispShares];
			targetShares = [...next];
			morphStartTime = performance.now();
		}
	});

	$effect(() => {
		const el = canvas;
		if (!el) return;

		const draw = () => {
			time += 0.02;
			const ctx = el.getContext('2d');
			if (!ctx) return;

			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			const logicalSize = 200;
			const rect = el.getBoundingClientRect();

			if (el.width !== rect.width * dpr || el.height !== rect.height * dpr) {
				el.width = rect.width * dpr;
				el.height = rect.height * dpr;
			}

			ctx.save();
			ctx.clearRect(0, 0, el.width, el.height);
			ctx.scale((rect.width * dpr) / logicalSize, (rect.height * dpr) / logicalSize);

			let t = 0;
			if (morphStartTime > 0) {
				t = (performance.now() - morphStartTime) / 500;
				if (t > 1) t = 1;
			} else {
				t = 1;
			}

			const reducedMotion = untrack(() => prefersReducedMotion.current);
			if (reducedMotion) {
				t = 1;
				time = 0;
			}

			const e = 1 - Math.pow(2, -10 * t);
			for (let i = 0; i < targetShares.length; i++) {
				dispShares[i] = fromShares[i] + (targetShares[i] - fromShares[i]) * e;
			}

			let startAngle = -Math.PI / 2;
			const gap = 0.07;
			const currentHover = untrack(() => hoverIndex);

			for (let i = 0; i < dispShares.length; i++) {
				const share = dispShares[i];
				if (share === 0) continue;

				const sweep = share * Math.PI * 2;
				const aStart = startAngle + gap / 2;
				let aEnd = startAngle + sweep - gap / 2;

				if (aEnd < aStart) aEnd = aStart;

				ctx.save();
				const isHovered = currentHover === i;
				const isAnyHovered = currentHover !== null;

				if (isHovered) {
					const mid = (aStart + aEnd) / 2;
					ctx.translate(Math.cos(mid) * 6, Math.sin(mid) * 6);
				}

				ctx.beginPath();
				drawRoundedWedge(ctx, 100, 100, 55, 86, aStart, aEnd, 6);
				ctx.clip();

				ctx.globalAlpha = isHovered ? 1.0 : isAnyHovered ? 0.3 * 0.72 : 0.72;
				ctx.fillStyle = PLANS[i].color;

				if (isHovered) {
					ctx.shadowColor = hexToRgba(PLANS[i].color, 0.55);
					ctx.shadowBlur = 5;
					ctx.shadowOffsetX = 0;
					ctx.shadowOffsetY = 0;
				}

				const cell = 4.6;
				for (let x = 14; x <= 186; x += cell) {
					for (let y = 14; y <= 186; y += cell) {
						const dx = x - 100;
						const dy = y - 100;
						const dist = Math.sqrt(dx * dx + dy * dy);
						if (dist < 55 - cell || dist > 86 + cell) continue;

						const a = Math.atan2(dy, dx);
						let normalizedA = a - aStart;
						while (normalizedA < 0) normalizedA += Math.PI * 2;
						while (normalizedA >= Math.PI * 2) normalizedA -= Math.PI * 2;
						if (normalizedA > aEnd - aStart) continue;

						const fullness = smoothstep(0.62, 1.0, (dist - 55) / (86 - 55));
						const waveRaw =
							Math.sin(dist * 0.1 - time) +
							Math.sin(a * 3 + time * 1.5) +
							Math.sin(dx * 0.05 + dy * 0.05 + time * 2);
						const wave = smoothstep(-1.5, 1.5, waveRaw);
						const jitter = hash(x, y);

						const size =
							cell *
							((isHovered ? 0.46 : 0.34) + 0.36 * fullness + 0.26 * wave) *
							(0.78 + 0.42 * jitter);

						ctx.fillRect(x - size / 2, y - size / 2, size, size);
					}
				}

				ctx.restore();
				startAngle += sweep;
			}

			ctx.restore();
		};

		new AnimationFrames(draw);
	});
</script>

{#if compact}
	<div class="relative w-full h-full flex items-center justify-center p-2">
		<div class="relative w-[130px] h-[130px]">
			<canvas bind:this={canvas} class="w-full h-full block"></canvas>
		</div>
	</div>
{:else}
	<div
		class="relative w-full rounded-3xl p-6 transition-colors border {theme === 'dark'
			? 'bg-[#181818] border-white/5 text-white'
			: 'bg-white border-neutral-200 text-black shadow-lg'}"
	>
		<div class="flex items-center justify-between mb-4">
			<div class="flex items-center gap-2">
				<div
					class="p-2 rounded-xl {theme === 'dark'
						? 'bg-blue-500/10 text-blue-400'
						: 'bg-blue-50 text-blue-600'}"
				>
					<Users class="w-4 h-4" />
				</div>
				<div>
					<h4 class="text-sm font-bold">Plan Distribution</h4>
					<p class="text-[11px] {theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}">
						Dithered canvas chart with real-time spring physics
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
						class="px-2.5 py-1 rounded-full transition-all cursor-pointer {periodIndex === idx
							? 'bg-blue-600 text-white'
							: theme === 'dark'
								? 'text-neutral-400 hover:text-white'
								: 'text-neutral-600 hover:text-black'}"
					>
						{p.name}
					</button>
				{/each}
			</div>
		</div>

		<div class="flex flex-col sm:flex-row items-center gap-6">
			<div class="relative w-[180px] h-[180px] shrink-0">
				<canvas bind:this={canvas} class="w-full h-full block"></canvas>
			</div>

			<div class="flex-1 w-full space-y-2">
				{#each PLANS as plan, idx (plan.name)}
					{@const val = values[idx]}
					{@const pct = Math.round(shares[idx] * 100)}
					{@const isHovered = hoverIndex === idx}
					<div
						role="presentation"
						onmouseenter={() => (hoverIndex = idx)}
						onmouseleave={() => (hoverIndex = null)}
						class="flex items-center justify-between p-2 rounded-xl transition-all cursor-pointer border {isHovered
							? theme === 'dark'
								? 'bg-white/10 border-white/20'
								: 'bg-neutral-100 border-neutral-300'
							: 'border-transparent hover:bg-white/5'}"
					>
						<div class="flex items-center gap-2.5">
							<div class="w-2.5 h-2.5 rounded-full" style="background-color: {plan.color}"></div>
							<span class="text-xs font-medium">{plan.name}</span>
						</div>
						<div class="flex items-center gap-3 text-xs">
							<span
								class="font-semibold {theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'}"
							>
								{val.toLocaleString()}
							</span>
							<span
								class="text-[10px] w-8 text-right font-mono {theme === 'dark'
									? 'text-neutral-500'
									: 'text-neutral-400'}"
							>
								{pct}%
							</span>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
{/if}
