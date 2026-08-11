<script lang="ts">
	import { motion } from 'motion-sv';
	import type { Snippet } from 'svelte';

	const Div = motion.div;

	interface Props {
		children?: Snippet;
		maxTilt?: number;
		class?: string;
		cardClass?: string;
	}

	let { children, maxTilt = 15, class: className = '', cardClass = '' }: Props = $props();

	let node = $state<HTMLDivElement | null>(null);
	let isHovered = $state(false);

	let offsetX = $state(0);
	let offsetY = $state(0);

	let rotateX = $derived(-offsetY * 2 * maxTilt);
	let rotateY = $derived(offsetX * 2 * maxTilt);

	const springConfig = { type: 'spring', damping: 20, stiffness: 200, mass: 0.5 } as const;

	function onpointermove(event: PointerEvent) {
		if (!node) return;
		const rect = node.getBoundingClientRect();
		offsetX = (event.clientX - rect.left) / rect.width - 0.5;
		offsetY = (event.clientY - rect.top) / rect.height - 0.5;
	}

	function onpointerleave() {
		isHovered = false;
		offsetX = 0;
		offsetY = 0;
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	bind:this={node}
	{onpointermove}
	onpointerenter={() => (isHovered = true)}
	{onpointerleave}
	class={`tilt-card ${className}`}
	data-testid="tilt-card"
	data-hovered={isHovered}
>
	<Div
		animate={{ rotateX, rotateY }}
		transition={springConfig}
		class={`tilt-card-face ${cardClass}`}
	>
		<div class="tilt-card-content">
			{@render children?.()}
		</div>
	</Div>
</div>

<style>
	.tilt-card {
		position: relative;
		width: 100%;
		max-width: 320px;
		aspect-ratio: 4 / 3;
		cursor: pointer;
		
		perspective: 800px;
	}

	:global(.tilt-card .tilt-card-face) {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		padding: 1.5rem;
		border: 1px solid var(--line);
		border-radius: 1rem;
		background: linear-gradient(to bottom right, var(--surface), var(--surface-2));
		box-shadow: 0 10px 24px -8px rgb(0 0 0 / 0.2);
		user-select: none;
		transform-style: preserve-3d;
	}

	.tilt-card-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		
		transform: translateZ(40px);
		transform-style: preserve-3d;
	}
</style>
