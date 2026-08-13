<script lang="ts">
	import { AnimationFrames } from 'runed';
	import { smoothstep, hash } from './dither-math.js';

	export interface Props {
		theme?: 'dark' | 'light';
		compact?: boolean;
	}

	let { theme = 'dark', compact = false }: Props = $props();

	type Stage = { label: string; val: number; color: string };

	const STAGES_DATA: { name: string; stages: Stage[] }[] = [
		{
			name: 'Q1 Funnel',
			stages: [
				{ label: 'Visitors', val: 100, color: '#FFFFFF' },
				{ label: 'Leads', val: 62, color: '#E2E8F0' },
				{ label: 'Deals', val: 38, color: '#CBD5E1' },
				{ label: 'Won', val: 18, color: '#94A3B8' }
			]
		},
		{
			name: 'Q2 Funnel',
			stages: [
				{ label: 'Visitors', val: 100, color: '#FFFFFF' },
				{ label: 'Leads', val: 74, color: '#E2E8F0' },
				{ label: 'Deals', val: 45, color: '#CBD5E1' },
				{ label: 'Won', val: 24, color: '#94A3B8' }
			]
		}
	];

	const periodIndex = $state(0);
	const period = $derived(STAGES_DATA[periodIndex]);
	let canvas = $state<HTMLCanvasElement | null>(null);

	let targetData: Stage[] = STAGES_DATA[0].stages;
	let fromData: Stage[] = STAGES_DATA[0].stages;
	let morphStartTime = 0;

	$effect(() => {
		fromData = targetData;
		targetData = period.stages;
		morphStartTime = performance.now();
	});

	$effect(() => {
		const stages = period.stages;
		const el = canvas;
		if (!el) return;

		let time = 0;

		const draw = () => {
			time += 0.02;
			const ctx = el.getContext('2d');
			if (!ctx) return;

			const dpr = window.devicePixelRatio || 1;
			const rect = el.getBoundingClientRect();
			if (el.width !== rect.width * dpr || el.height !== rect.height * dpr) {
				el.width = rect.width * dpr;
				el.height = rect.height * dpr;
			}
			ctx.save();
			ctx.scale(dpr, dpr);
			ctx.clearRect(0, 0, rect.width, rect.height);

			const prog = Math.min(1, (performance.now() - morphStartTime) / 500);
			const e = 1 - Math.pow(2, -10 * prog);

			const count = stages.length;
			const w = rect.width;
			const h = rect.height;
			const rowH = (h - (count - 1) * 6) / count;
			const cell = Math.max(2, Math.round(rect.width / 200));

			for (let i = 0; i < count; i++) {
				const target = targetData[i];
				const from = fromData[i];
				const val = from.val + (target.val - from.val) * e;

				const stageW = (val / 100) * w;
				const yTop = i * (rowH + 6);

				ctx.save();
				ctx.beginPath();
				ctx.rect(0, yTop, stageW, rowH);
				ctx.clip();

				ctx.globalAlpha = 0.85;
				ctx.fillStyle = target.color;

				for (let bx = 0; bx <= Math.ceil(stageW); bx += cell) {
					for (let by = Math.floor(yTop); by <= Math.ceil(yTop + rowH); by += cell) {
						const jx = bx + cell / 2;
						const jy = by + cell / 2;
						const jit = hash(jx, jy);

						const waveRaw = Math.sin(jx * 0.05 + time) + Math.sin(jy * 0.05 + time * 0.7);
						const mod = smoothstep(-1.5, 1.5, waveRaw);

						const sz = cell * (0.35 + 0.35 * mod) * (0.8 + 0.4 * jit);
						ctx.fillRect(bx + (cell - sz) / 2, by + (cell - sz) / 2, sz, sz);
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
	<div class="relative w-full h-[140px] flex items-center justify-center">
		<canvas bind:this={canvas} class="w-full h-full pointer-events-none"></canvas>
	</div>
</div>
