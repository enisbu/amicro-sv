<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
		class?: string;
		glowColor?: string;
		glowSize?: number;
	}

	let {
		children,
		class: className = '',
		glowColor = 'rgba(255, 255, 255, 0.08)',
		glowSize = 250
	}: Props = $props();

	let node = $state<HTMLDivElement | null>(null);
	let x = $state(0);
	let y = $state(0);
	let opacity = $state(0);

	function onpointermove(event: PointerEvent) {
		if (!node) return;
		const rect = node.getBoundingClientRect();
		x = event.clientX - rect.left;
		y = event.clientY - rect.top;
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	bind:this={node}
	{onpointermove}
	onpointerenter={() => (opacity = 1)}
	onpointerleave={() => (opacity = 0)}
	class={`spotlight ${className}`}
	data-testid="spotlight"
>
	<div
		class="spotlight-layer"
		style:opacity
		style:background={`radial-gradient(${glowSize}px circle at ${x}px ${y}px, ${glowColor}, transparent 80%)`}
	></div>

	<div class="spotlight-content">{@render children?.()}</div>
</div>

<style>
	.spotlight {
		position: relative;
		overflow: hidden;
		padding: 1.5rem;
		border: 1px solid var(--line);
		border-radius: 1rem;
		background: var(--gray-12);
		color: var(--gray-1);
	}

	.spotlight-layer {
		position: absolute;
		inset: -1px;
		pointer-events: none;
		transition: opacity 300ms var(--ease-swift);
	}

	.spotlight-content {
		position: relative;
		z-index: 1;
	}
</style>
