<script lang="ts">
	import { useSpring } from 'motion-sv';
	import { AnimationFrames } from 'runed';
	import { smoothstep, hash } from './dither-math.js';

	export interface Props {
		theme?: 'dark' | 'light';
		compact?: boolean;
	}

	let { theme = 'dark', compact = false }: Props = $props();

	const METRICS = [
		{ name: 'CPU Load', base: 65, color: '#FFFFFF' },
		{ name: 'Memory', base: 82, color: '#E2E8F0' },
		{ name: 'Network', base: 45, color: '#CBD5E1' }
	];

	const metricIndex = 0;
	const metric = METRICS[metricIndex];

	let canvas: HTMLCanvasElement;
	const valSpring = useSpring(metric.base, { stiffness: 120, damping: 20 });

	$effect(() => {
		valSpring.set(metric.base);
	});

	$effect(() => {
		let time = 0;
		const draw = () => {
			time += 0.05;
			const ctx = canvas.getContext('2d');
			if (!ctx) return;
			const dpr = window.devicePixelRatio || 1;
			const rect = canvas.getBoundingClientRect();
			if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
				canvas.width = rect.width * dpr;
				canvas.height = rect.height * dpr;
			}
			ctx.save();
			ctx.scale(dpr, dpr);
			ctx.clearRect(0, 0, rect.width, rect.height);

			const cx = rect.width / 2;
			const cy = rect.height * 0.8;
			const rOut = Math.min(rect.width * 0.4, rect.height * 0.7);
			const rIn = rOut - 10;

			const jitter = Math.sin(time) * 2 + Math.cos(time * 2.3) * 1.5;
			const currentVal = Number(valSpring.get()) + jitter;

			const startAngle = Math.PI;
			const endAngle = Math.PI * 2;
			const valAngle = startAngle + (currentVal / 100) * Math.PI;

			ctx.beginPath();
			ctx.arc(cx, cy, rOut, startAngle, endAngle);
			ctx.arc(cx, cy, rIn, endAngle, startAngle, true);
			ctx.closePath();
			ctx.fillStyle = 'rgba(255,255,255,0.1)';
			ctx.fill();

			if (currentVal > 0) {
				ctx.save();
				ctx.beginPath();
				ctx.arc(cx, cy, rOut, startAngle, valAngle);
				ctx.arc(cx, cy, rIn, valAngle, startAngle, true);
				ctx.closePath();
				ctx.clip();

				ctx.globalAlpha = 0.9;
				ctx.fillStyle = '#FFFFFF';

				const cell = Math.max(2, Math.round(rect.width / 200));

				for (let x = Math.floor(cx - rOut); x <= Math.ceil(cx + rOut); x += cell) {
					for (let y = Math.floor(cy - rOut); y <= Math.ceil(cy); y += cell) {
						const jx = x + cell / 2;
						const jy = y + cell / 2;
						const jit = hash(jx, jy);

						const dx = jx - cx;
						const dy = jy - cy;
						const dist = Math.sqrt(dx * dx + dy * dy);

						if (dist < rIn - cell || dist > rOut + cell) continue;

						const waveRaw = Math.sin(jx * 0.05 + time) + Math.sin(jy * 0.05 + time * 0.7);
						const mod = smoothstep(-1.5, 1.5, waveRaw);

						const sz = cell * (0.4 + 0.4 * mod) * (0.8 + 0.4 * jit);
						ctx.fillRect(x + (cell - sz) / 2, y + (cell - sz) / 2, sz, sz);
					}
				}
				ctx.restore();
			}

			ctx.restore();
		};
		new AnimationFrames(draw);
	});
</script>

<div class="w-full h-full flex flex-col items-center justify-center p-2">
	<div class="relative w-full h-[120px] flex items-center justify-center">
		<canvas bind:this={canvas} class="w-full h-full"></canvas>
	</div>
</div>
