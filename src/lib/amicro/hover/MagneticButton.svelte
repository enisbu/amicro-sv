<script lang="ts">
	import { motion } from 'motion-sv';
	import type { Snippet } from 'svelte';

	const Button = motion.button;

	interface Props {
		children?: Snippet;
		range?: number;
		strength?: number;
		class?: string;
		onclick?: () => void;
	}

	let { children, range = 45, strength = 0.35, class: className = '', onclick }: Props = $props();

	let node = $state<HTMLElement | null>(null);
	let x = $state(0);
	let y = $state(0);

	const springConfig = { type: 'spring', stiffness: 150, damping: 15, mass: 0.6 } as const;

	function onpointermove(event: PointerEvent) {
		if (!node) return;
		const { left, top, width, height } = node.getBoundingClientRect();
		const centerX = left + width / 2;
		const centerY = top + height / 2;
		const dist = Math.hypot(event.clientX - centerX, event.clientY - centerY);

		if (dist < range) {
			x = (event.clientX - centerX) * strength;
			y = (event.clientY - centerY) * strength;
		} else {
			x = 0;
			y = 0;
		}
	}

	function onpointerleave() {
		x = 0;
		y = 0;
	}
</script>

<Button
	bind:ref={node}
	{onpointermove}
	{onpointerleave}
	{onclick}
	animate={{ x, y }}
	transition={springConfig}
	whileHover={{ scale: 1.03 }}
	whilePress={{ scale: 0.97 }}
	class={`magnetic-btn ${className}`}
	data-testid="magnetic-button"
>
	<span class="label">{@render children?.()}</span>
</Button>

<style>
	:global(.magnetic-btn) {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		height: 2.75rem;
		padding-inline: 1.5rem;
		border: 0;
		border-radius: 999px;
		background: var(--gray-12);
		color: var(--gray-1);
		font-family: inherit;
		font-size: 0.875rem;
		font-weight: 600;
		cursor: pointer;
		user-select: none;
		box-shadow: 0 1px 2px rgb(0 0 0 / 0.12);
	}

	.label {
		position: relative;
		z-index: 1;
		display: block;
		pointer-events: none;
	}
</style>
