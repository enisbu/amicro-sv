<script lang="ts">
	import { AnimationFrames } from 'runed';
	import { smoothstep, hash } from './dither-math.js';

	export interface Props {
		theme?: 'dark' | 'light';
		compact?: boolean;
	}

	let { theme = 'dark', compact = false }: Props = $props();

	const DEVICES = [
		{
			name: 'Today',
			data: [
				{ label: 'Mobile', val: 65, color: '#FFFFFF' },
				{ label: 'Desktop', val: 25, color: '#E2E8F0' },
				{ label: 'Tablet', val: 10, color: '#94A3B8' }
			]
		},
		{
			name: 'Last 7D',
			data: [
				{ label: 'Mobile', val: 55, color: '#FFFFFF' },
				{ label: 'Desktop', val: 35, color: '#E2E8F0' },
				{ label: 'Tablet', val: 10, color: '#94A3B8' }
			]
		}
	];

	const periodIndex = 0;
	const period = DEVICES[periodIndex];

	let canvas: HTMLCanvasElement;

	const targetData = period.data;
	const fromData = period.data;
	const morphStartTime = 0;

	$effect(() => {
		let time = 0;
		const draw = () => {
			time += 0.02;
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

			const prog = Math.min(1, (performance.now() - morphStartTime) / 500);
			const e = 1 - Math.pow(2, -10 * prog);

			const cx = rect.width / 2;
			const cy = rect.height / 2;
			const r = Math.min(cx, cy) * 0.85;
			const rInner = r * 0.65;
			const cell = Math.max(2, Math.round(rect.width / 200));

			let startAngle = -Math.PI / 2;

			for (let i = 0; i < period.data.length; i++) {
				const target = targetData[i];
				const from = fromData[i];

				const val = from.val + (target.val - from.val) * e;
				const angle = (val / 100) * Math.PI * 2;
				const endAngle = startAngle + angle;

				ctx.save();
				ctx.beginPath();
				ctx.arc(cx, cy, r, startAngle, endAngle);
				ctx.arc(cx, cy, rInner, endAngle, startAngle, true);
				ctx.closePath();
				ctx.clip();

				ctx.globalAlpha = 0.85;
				ctx.fillStyle = target.color;

				for (let x = Math.floor(cx - r); x <= Math.ceil(cx + r); x += cell) {
					for (let y = Math.floor(cy - r); y <= Math.ceil(cy + r); y += cell) {
						const jx = x + cell / 2;
						const jy = y + cell / 2;
						const jit = hash(jx, jy);

						const dx = jx - cx;
						const dy = jy - cy;
						const dist = Math.sqrt(dx * dx + dy * dy);
						if (dist < rInner - cell || dist > r + cell) continue;

						const waveRaw = Math.sin(jx * 0.05 + time) + Math.sin(jy * 0.05 + time * 0.7);
						const mod = smoothstep(-1.5, 1.5, waveRaw);

						const sz = cell * (0.4 + 0.4 * mod) * (0.8 + 0.4 * jit);
						ctx.fillRect(x + (cell - sz) / 2, y + (cell - sz) / 2, sz, sz);
					}
				}

				ctx.restore();
				startAngle = endAngle;
			}

			ctx.restore();
		};
		new AnimationFrames(draw);
	});
</script>

<div class="w-full h-full flex flex-col items-center justify-center p-2">
	<div class="relative w-[130px] h-[130px] flex items-center justify-center">
		<canvas bind:this={canvas} class="absolute inset-0 w-full h-full"></canvas>
	</div>
</div>
