<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;

	interface Props {
		color?: string;
		size?: number;
		count?: number;
	}

	let { color = 'var(--signal)', size = 8, count = 6 }: Props = $props();

	let x = $state(0);
	let y = $state(0);
	let isVisible = $state(false);

	const dots = $derived(
		Array.from({ length: count }, (_, index) => ({
			index,

			transition: {
				type: 'spring' as const,
				stiffness: 300 - index * 30,
				damping: 25 + index * 2,
				mass: 0.2 + index * 0.1
			},

			dotSize: size * (1 - index / count),
			opacity: 1 - index / count
		}))
	);

	$effect(() => {
		const onMove = (event: MouseEvent) => {
			x = event.clientX;
			y = event.clientY;
			isVisible = true;
		};
		const onLeave = () => (isVisible = false);

		window.addEventListener('mousemove', onMove, { passive: true });
		document.addEventListener('mouseleave', onLeave);

		return () => {
			window.removeEventListener('mousemove', onMove);
			document.removeEventListener('mouseleave', onLeave);
		};
	});
</script>

{#if isVisible}
	{#each dots as dot (dot.index)}
		<Div
			animate={{ x, y }}
			transition={dot.transition}
			style={{
				width: `${dot.dotSize}px`,
				height: `${dot.dotSize}px`,
				opacity: dot.opacity,
				backgroundColor: color
			}}
			class="cursor-trail-dot"
			data-testid="cursor-trail-dot"
			data-index={dot.index}
		/>
	{/each}
{/if}

<style>
	:global(.cursor-trail-dot) {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9999;
		border-radius: 999px;
		pointer-events: none;
		
		translate: -50% -50%;
	}
</style>
