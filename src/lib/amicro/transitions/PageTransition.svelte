<script lang="ts">
	import { motion } from 'motion-sv';
	import type { Variants } from 'motion-sv';

	const Div = motion.div;

	export type TransitionType =
		| 'double-stairs'
		| 'shutter-stairs'
		| 'split-stairs'
		| 'horizontal-split'
		| 'vertical-split'
		| 'slash'
		| 'lattice'
		| 'curtain-shred'
		| 'pixel'
		| 'pixel-wave'
		| 'pixel-spiral'
		| 'vortex'
		| 'cross-fade'
		| 'expand-grow'
		| 'push-slide'
		| 'pop-over'
		| 'depth-forward'
		| 'liquid-wave';

	interface Props {
		type?: TransitionType;
		isVisible: boolean;
		onComplete?: () => void;
		class?: string;
	}

	let { type = 'double-stairs', isVisible, onComplete, class: className = '' }: Props = $props();

	const COLUMNS = 5;
	const NUM_POINTS = 12;
	const NUM_PATHS = 3;
	const WAVE_MS = 1300;

	const ease: [number, number, number, number] = [0.76, 0, 0.24, 1];

	const variants: Variants = {
		initial: (i: number) => ({ y: i % 2 === 0 ? '-100%' : '100%' }),
		enter: (i: number) => ({
			y: '0%',
			transition: { duration: 0.8, ease, delay: i * 0.05 }
		}),
		exit: (i: number) => ({
			y: i % 2 === 0 ? '100%' : '-100%',
			transition: { duration: 0.8, ease, delay: i * 0.05 }
		})
	};

	let paths = $state<Array<SVGPathElement | null>>([]);

	$effect(() => {
		if (type !== 'liquid-wave' || !isVisible) return;

		const startTime = performance.now();
		const stepX = 100 / (NUM_POINTS - 1);

		const delays = Array.from({ length: NUM_PATHS }, (_, i) =>
			Array.from({ length: NUM_POINTS }, () => i * 0.08 + Math.random() * 0.15)
		);

		let frame = 0;

		const draw = (now: number) => {
			const elapsed = (now - startTime) / 1000;

			paths.forEach((path, i) => {
				if (!path) return;

				const pointsY = delays[i].map((delay) => {
					const raw = Math.max(0, Math.min(1, (elapsed - delay) / 0.65));

					const eased = raw < 0.5 ? 2 * raw * raw : 1 - Math.pow(-2 * raw + 2, 2) / 2;
					return 100 - eased * 110;
				});

				let d = `M 0 100 V ${pointsY[0]}`;
				for (let j = 0; j < NUM_POINTS - 1; j++) {
					const currentX = j * stepX;
					const nextX = (j + 1) * stepX;
					const cpX = currentX + stepX * 0.5;
					d += ` C ${cpX} ${pointsY[j]} ${cpX} ${pointsY[j + 1]} ${nextX} ${pointsY[j + 1]}`;
				}
				d += ' V 100 H 0 Z';
				path.setAttribute('d', d);
			});

			if (now - startTime < WAVE_MS) frame = requestAnimationFrame(draw);
			else onComplete?.();
		};

		frame = requestAnimationFrame(draw);
		return () => cancelAnimationFrame(frame);
	});
</script>

{#if type === 'liquid-wave'}
	<svg
		class={['page-transition-wave', className]}
		viewBox="0 0 100 100"
		preserveAspectRatio="none"
		aria-hidden="true"
	>
		<path bind:this={paths[0]} fill="#3f3f46" opacity="0.4"></path>
		<path bind:this={paths[1]} fill="#27272a" opacity="0.75"></path>
		<path bind:this={paths[2]} fill="#09090b"></path>
	</svg>
{:else if isVisible && type === 'double-stairs'}
	<div class={['page-transition-stairs', className]} aria-hidden="true">
		{#each Array(COLUMNS) as _, i (i)}
			<Div
				{variants}
				custom={i}
				initial="initial"
				animate="enter"
				exit="exit"
				class="page-transition-column"
				onAnimationComplete={i === 0 ? onComplete : undefined}
			></Div>
		{/each}
	</div>
{:else if isVisible}
	<Div
		class={['page-transition-fade', className]}
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		transition={{ duration: 0.4 }}
		onAnimationComplete={onComplete}
		aria-hidden="true"
	></Div>
{/if}

<style>
	.page-transition-wave,
	.page-transition-stairs,
	:global(.page-transition-fade) {
		position: fixed;
		inset: 0;
		z-index: 50;
		pointer-events: none;
	}

	.page-transition-wave {
		width: 100%;
		height: 100%;
	}

	.page-transition-stairs {
		display: flex;
		width: 100vw;
		height: 100vh;
	}

	:global(.page-transition-column) {
		position: relative;
		flex: 1;
		height: 100%;
		border-right: 1px solid #262626;
		background: #171717;
	}

	:global(.page-transition-column:last-child) {
		border-right: 0;
	}

	:global(.page-transition-fade) {
		background: #171717;
	}
</style>
