<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
		class?: string;
		glowColor?: string;
		onclick?: () => void;
	}

	let {
		children,
		class: className = '',
		glowColor = 'rgba(59, 130, 246, 0.15)',
		onclick
	}: Props = $props();

	let node = $state<HTMLButtonElement | null>(null);
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

<button
	bind:this={node}
	{onpointermove}
	onpointerenter={() => (opacity = 1)}
	onpointerleave={() => (opacity = 0)}
	{onclick}
	class={`glow-btn ${className}`}
	data-testid="glow-button"
>
	<div
		class="glow-layer"
		style:opacity
		style:background={`radial-gradient(120px circle at ${x}px ${y}px, ${glowColor}, transparent 80%)`}
	></div>

	<span class="glow-label">{@render children?.()}</span>
</button>

<style>
	.glow-btn {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		height: 2.75rem;
		padding-inline: 1.5rem;
		border: 1px solid var(--gray-11);
		border-radius: 0.75rem;
		background: var(--gray-12);
		color: var(--gray-1);
		font-family: inherit;
		font-size: 0.875rem;
		font-weight: 500;
		cursor: pointer;
		box-shadow: 0 2px 6px rgb(0 0 0 / 0.14);
		transition: border-color 200ms var(--ease-swift);
	}

	.glow-btn:hover {
		border-color: var(--gray-9);
	}

	.glow-layer {
		position: absolute;
		inset: -1px;
		border-radius: 0.75rem;
		pointer-events: none;
		transition: opacity 300ms var(--ease-swift);
	}

	.glow-label {
		position: relative;
		z-index: 1;
	}
</style>
