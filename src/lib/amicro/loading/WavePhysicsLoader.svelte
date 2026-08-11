<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;

	interface Props {
		theme?: 'light' | 'dark';
	}

	let { theme = 'light' }: Props = $props();

	const frames = $derived(berechneFrames(theme));

	interface BarData {
		heights: string[];
		colors: string[];
	}

	interface Frames {
		bars: BarData[];
		ballX: string[];
		ballY: string[];
		ballScaleX: number[];
		ballScaleY: number[];
		times: number[];
	}

	function berechneFrames(themeVal: 'light' | 'dark'): Frames {
		const numBars = 15;
		const barWidth = 12;
		const barGap = 8;
		const barTotalWidth = barWidth + barGap;

		const numFrames = 201;
		const B = 4;
		const maxBounce = 60;
		const baseBarH = 16;
		const wavePeakH = 48;

		const barsData: BarData[] = Array.from({ length: numBars }, () => ({
			heights: [],
			colors: []
		}));
		const bX: string[] = [];
		const bY: string[] = [];
		const bScaleX: number[] = [];
		const bScaleY: number[] = [];
		const tArr: number[] = [];

		for (let k = 0; k < numFrames; k++) {
			const t = k / (numFrames - 1);
			tArr.push(t);

			const x_frac = t < 0.5 ? t / 0.5 : (1 - t) / 0.5;
			const ball_idx = x_frac * (numBars - 1);

			bX.push(`${ball_idx * barTotalWidth}px`);

			let bounce_f = (x_frac * B) % 1.0;
			if (x_frac === 1 || x_frac === 0) bounce_f = 0;

			const bounce_h = 4 * bounce_f * (1 - bounce_f);
			const height_factor = Math.max(0, 1 - bounce_h * 2);

			const ball_indent = height_factor * 20;
			const ball_y = baseBarH + wavePeakH - ball_indent + bounce_h * maxBounce;
			bY.push(`-${ball_y}px`);

			const squish = height_factor;
			bScaleY.push(1 - squish * 0.3);
			bScaleX.push(1 + squish * 0.25);

			for (let i = 0; i < numBars; i++) {
				const dist = Math.abs(i - ball_idx);

				let wave_val = 0;
				if (dist < 3) {
					wave_val = Math.cos((dist / 3) * (Math.PI / 2));
				}

				let indent = 0;
				if (dist < 1.5) {
					const indent_dist = Math.cos((dist / 1.5) * (Math.PI / 2));
					indent = indent_dist * height_factor * 20;
				}

				const bar_h = baseBarH + wave_val * wavePeakH - indent;
				barsData[i].heights.push(`${Math.max(4, bar_h)}px`);

				const isDark = themeVal === 'dark';
				let r: number, g: number, b: number;
				if (isDark) {
					r = Math.round(39 + wave_val * (228 - 39));
					g = Math.round(39 + wave_val * (228 - 39));
					b = Math.round(42 + wave_val * (231 - 42));
				} else {
					r = Math.round(228 - wave_val * (228 - 39));
					g = Math.round(228 - wave_val * (228 - 39));
					b = Math.round(231 - wave_val * (231 - 42));
				}
				barsData[i].colors.push(`rgb(${r}, ${g}, ${b})`);
			}
		}

		return { bars: barsData, ballX: bX, ballY: bY, ballScaleX: bScaleX, ballScaleY: bScaleY, times: tArr };
	}
</script>

<div class="relative flex flex-col items-center justify-center w-full scale-[0.6] sm:scale-75 md:scale-100">
	<div class="relative flex items-end justify-start h-48 space-x-2 w-[292px]">
		{#each frames.bars as bar, i}
			<Div
				class="w-3 rounded-full origin-bottom"
				style={{
					height: '16px',
					backgroundColor: theme === 'dark' ? 'rgb(39, 39, 42)' : 'rgb(228, 228, 231)'
				}}
				animate={{
					height: bar.heights,
					backgroundColor: bar.colors
				}}
				transition={{
					duration: 4,
					repeat: Infinity,
					times: frames.times,
					ease: 'linear'
				}}
			/>
		{/each}

		<Div
			class="absolute w-3 h-3 bg-zinc-900 dark:bg-white rounded-full z-10 shadow-sm"
			style={{ bottom: 0, left: 0, transformOrigin: 'bottom center' }}
			animate={{
				x: frames.ballX,
				y: frames.ballY,
				scaleX: frames.ballScaleX,
				scaleY: frames.ballScaleY
			}}
			transition={{
				duration: 4,
				repeat: Infinity,
				times: frames.times,
				ease: 'linear'
			}}
		/>
	</div>
</div>
