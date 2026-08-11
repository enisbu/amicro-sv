<script lang="ts">
	import { untrack } from 'svelte';
	import { AnimationFrames } from 'runed';
	import AnimatedNumber from './AnimatedNumber.svelte';
	import { smoothstep, hash } from './dither-math.js';

	export interface Props {
		theme?: 'dark' | 'light';
		compact?: boolean;
	}

	let { theme = 'dark', compact = false }: Props = $props();

	const PERIODS = [
		{ name: 'Last 3 Months', weeks: 12 },
		{ name: 'Last 6 Months', weeks: 24 }
	];

	const periodIndex = 0;
	const period = PERIODS[periodIndex];

	const computed = $derived.by(() => {
		const weeks = period.weeks;
		const newData: number[][] = [];
		let tot = 0;
		for (let w = 0; w < weeks; w++) {
			const col: number[] = [];
			for (let d = 0; d < 7; d++) {
				const val = Math.floor(Math.sin(w * 0.5 + d * 0.2) * 2 + Math.cos(w * 1.2) * 1.5 + 2);
				const clamped = Math.max(0, Math.min(4, val));
				col.push(clamped);
				tot += clamped * 10;
			}
			newData.push(col);
		}
		return { data: newData, total: tot };
	});

	let canvas: HTMLCanvasElement;

	let targetData = untrack(() => computed.data);
	let fromData = targetData;
	let morphStartTime = 0;
	let time = 0;

	$effect(() => {
		const next = computed.data;
		fromData = targetData;
		targetData = next;
		morphStartTime = performance.now();
	});

	$effect(() => {
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

			const weeks = Math.max(fromData.length, targetData.length);
			const cellSize = 10;
			const gap = 2.5;
			const totalW = weeks * (cellSize + gap) - gap;
			const totalH = 7 * (cellSize + gap) - gap;

			const startX = (rect.width - totalW) / 2;
			const startY = (rect.height - totalH) / 2;

			const colors = [
				'rgba(255,255,255,0.15)',
				'rgba(255,255,255,0.35)',
				'rgba(255,255,255,0.55)',
				'rgba(255,255,255,0.75)',
				'#FFFFFF'
			];
			const cell = Math.max(2, Math.round(rect.width / 250));

			for (let w = 0; w < weeks; w++) {
				for (let d = 0; d < 7; d++) {
					const targetVal = targetData[w]?.[d] || 0;
					const fromVal = fromData[w]?.[d] || 0;
					const val = fromVal + (targetVal - fromVal) * e;

					const x = startX + w * (cellSize + gap);
					const y = startY + d * (cellSize + gap);

					const colorIdx = Math.max(0, Math.min(4, Math.round(val)));

					ctx.save();
					ctx.beginPath();
					ctx.rect(x, y, cellSize, cellSize);
					ctx.clip();

					ctx.globalAlpha = 0.85;
					ctx.fillStyle = colors[colorIdx];

					for (let tx = Math.floor(x); tx <= Math.ceil(x + cellSize); tx += cell) {
						for (let ty = Math.floor(y); ty <= Math.ceil(y + cellSize); ty += cell) {
							const jx = tx + cell / 2;
							const jy = ty + cell / 2;
							const jit = hash(jx, jy);

							const waveRaw = Math.sin(jx * 0.05 + time) + Math.sin(jy * 0.05 + time * 0.7);
							const mod = smoothstep(-1.5, 1.5, waveRaw);

							const sz = cell * (0.4 + 0.4 * mod) * (0.8 + 0.4 * jit);
							ctx.fillRect(tx + (cell - sz) / 2, ty + (cell - sz) / 2, sz, sz);
						}
					}
					ctx.restore();
				}
			}
			ctx.restore();
		};
		new AnimationFrames(draw);
	});
</script>

<div class="w-full h-full flex flex-col items-center justify-center p-2">
	<div class="w-full flex flex-col items-center gap-2">
		{#if !compact}
			<div class="flex items-center justify-between w-full px-2">
				<span
					class="text-xs font-semibold {theme === 'dark' ? 'text-white' : 'text-black'}"
				>
					<AnimatedNumber value={computed.total} /> contributions
				</span>
			</div>
		{/if}
		<div class="w-full flex justify-center">
			<canvas bind:this={canvas} class="w-full h-[120px]"></canvas>
		</div>
	</div>
</div>
