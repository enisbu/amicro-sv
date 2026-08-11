<script lang="ts">
	import { motion } from 'motion-sv';
	import { AnimationFrames } from 'runed';
	import { getAppState } from '$lib/app/app-state.svelte.js';

	export interface Props {
		transitionId: string;
		isAnimating: boolean;
		speedMultiplier?: number;
	}

	let { transitionId, isAnimating, speedMultiplier = 1 }: Props = $props();

	const app = getAppState();
	const isDark = $derived(app.theme === 'dark');

	const EASING: [number, number, number, number] = [0.83, 0, 0.17, 1];

	const door = 'bg-card border-neutral-300 dark:border-white/10';
	const frenchDoor = 'bg-neutral-100 border-neutral-300 dark:bg-[#1c1c1e] dark:border-white/15';

	const isWave = $derived(
		transitionId === 'obsidian-liquid-wave' || transitionId === 'liquid-wave'
	);

	let paths = $state<(SVGPathElement | undefined)[]>([]);

	const WAVE_LAYERS = [
		{ dark: '#262626', light: '#e5e5e5', opacity: 0.6 },
		{ dark: '#1c1c1c', light: '#f4f4f6', opacity: 0.85 },
		{ dark: '#121212', light: '#ffffff', opacity: 1 }
	];

	$effect(() => {
		if (!isWave) return;

		const animating = isAnimating;
		const speed = speedMultiplier;
		const current = paths;

		if (!animating) {
			for (const path of current) {
				path?.setAttribute('d', 'M 0 100 V 100 H 100 V 100 Z');
			}
			return;
		}

		const numPoints = 14;
		const numPaths = 3;
		const startTime = performance.now();
		const durationMs = 1200 * speed;

		const delays = Array.from({ length: numPaths }, (_, i) =>
			Array.from({ length: numPoints }, () => i * 0.07 + Math.random() * 0.12)
		);

		const frames = new AnimationFrames(({ timestamp }) => {
			const elapsedSec = (timestamp - startTime) / 1000;

			current.forEach((path, i) => {
				if (!path) return;
				const stepX = 100 / (numPoints - 1);
				const pointsY = delays[i].map((delay) => {
					const rawProgress = Math.max(0, Math.min(1, (elapsedSec - delay) / (0.6 * speed)));
					const easeProgress =
						rawProgress < 0.5
							? 2 * rawProgress * rawProgress
							: 1 - Math.pow(-2 * rawProgress + 2, 2) / 2;
					return 100 - easeProgress * 112;
				});

				let d = `M 0 100 V ${pointsY[0]}`;
				for (let j = 0; j < numPoints - 1; j++) {
					const currentX = j * stepX;
					const nextX = (j + 1) * stepX;
					const cpX = currentX + stepX * 0.5;
					d += ` C ${cpX} ${pointsY[j]} ${cpX} ${pointsY[j + 1]} ${nextX} ${pointsY[j + 1]}`;
				}
				d += ` V 100 H 0 Z`;
				path.setAttribute('d', d);
			});

			if (timestamp - startTime >= durationMs) {
				frames.stop();
			}
		});
	});

	const hidden = $derived(!isAnimating && !isWave);
</script>

{#if !hidden}
	{#if transitionId === 'spatial-door-portal' || transitionId === 'double-doors'}
		<div
			class="absolute inset-0 z-40 pointer-events-none [perspective:800px] flex overflow-hidden rounded-[inherit]"
		>
			<motion.div
				initial={{ rotateY: 0 }}
				animate={{ rotateY: -85, x: '-10%' }}
				transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
				class="w-1/2 h-full origin-left border-r shadow-2xl {door}"
			/>
			<motion.div
				initial={{ rotateY: 0 }}
				animate={{ rotateY: 85, x: '10%' }}
				transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
				class="w-1/2 h-full origin-right border-l shadow-2xl {door}"
			/>
		</div>
	{:else if transitionId === 'french-doors-3d' || transitionId === 'french-doors'}
		<div
			class="absolute inset-0 z-40 pointer-events-none [perspective:900px] flex overflow-hidden rounded-[inherit]"
		>
			<motion.div
				initial={{ rotateY: 90, opacity: 0 }}
				animate={{ rotateY: 0, opacity: 1 }}
				transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
				class="w-1/2 h-full origin-right border-r shadow-2xl {frenchDoor}"
			/>
			<motion.div
				initial={{ rotateY: -90, opacity: 0 }}
				animate={{ rotateY: 0, opacity: 1 }}
				transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
				class="w-1/2 h-full origin-left border-l shadow-2xl {frenchDoor}"
			/>
		</div>
	{:else if transitionId === 'radial-iris-mask'}
		<motion.div
			class="absolute inset-0 z-40 pointer-events-none origin-center rounded-[inherit] bg-[#ffffff] dark:bg-[#121212]"
			style={{ clipPath: 'circle(0% at 50% 50%)' }}
			animate={{ clipPath: 'circle(150% at 50% 50%)' }}
			transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
		/>
	{:else if transitionId === 'perspective-flip-stage'}
		<div
			class="absolute inset-0 z-40 pointer-events-none [perspective:700px] flex items-center justify-center rounded-[inherit]"
		>
			<motion.div
				initial={{ rotateX: 90, scale: 0.85, opacity: 0 }}
				animate={{ rotateX: 0, scale: 1, opacity: 1 }}
				transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
				class="w-full h-full border shadow-2xl bg-card border-neutral-200 dark:border-white/10"
			/>
		</div>
	{:else if transitionId === 'staggered-glass-curtain'}
		<motion.div
			class="absolute inset-0 z-40 flex pointer-events-none overflow-hidden rounded-[inherit]"
		>
			{#each [0, 1, 2, 3, 4] as i (i)}
				<motion.div
					initial={{ y: '-105%' }}
					animate={{ y: '0%' }}
					transition={{ duration: 0.65, ease: EASING, delay: i * 0.05 }}
					class="h-full flex-1 backdrop-blur-md border-r last:border-r-0 bg-card/95 border-neutral-200 dark:border-white/5"
				/>
			{/each}
		</motion.div>
	{:else if isWave}
		<svg
			class="absolute inset-0 w-full h-full pointer-events-none z-40 rounded-[inherit]"
			viewBox="0 0 100 100"
			preserveAspectRatio="none"
		>
			{#each WAVE_LAYERS as layer, i (i)}
				<path
					bind:this={paths[i]}
					fill={isDark ? layer.dark : layer.light}
					style="opacity: {layer.opacity}"
				/>
			{/each}
		</svg>
	{/if}
{/if}
