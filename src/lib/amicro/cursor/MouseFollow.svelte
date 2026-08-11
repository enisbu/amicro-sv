<script lang="ts">
	import { motion } from 'motion-sv';
	import type { Snippet } from 'svelte';

	const Div = motion.div;

	interface Props {
		children?: Snippet;
		stiffness?: number;
		damping?: number;
		class?: string;
	}

	let { children, stiffness = 180, damping = 20, class: className = '' }: Props = $props();

	let x = $state(0);
	let y = $state(0);
	let isVisible = $state(false);

	const springConfig = $derived({ type: 'spring' as const, stiffness, damping });

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
	<Div
		animate={{ x, y }}
		transition={springConfig}
		class={`mouse-follow ${className}`}
		data-testid="mouse-follow"
	>
		{#if children}
			{@render children()}
		{:else}
			<div class="mouse-follow-ring"></div>
		{/if}
	</Div>
{/if}

<style>
	:global(.mouse-follow) {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9998;
		pointer-events: none;
		
		translate: -50% -50%;
	}

	.mouse-follow-ring {
		width: 1.5rem;
		height: 1.5rem;
		border: 1px solid color-mix(in oklch, var(--signal) 50%, transparent);
		border-radius: 999px;
		background: color-mix(in oklch, var(--signal) 10%, transparent);
	}
</style>
