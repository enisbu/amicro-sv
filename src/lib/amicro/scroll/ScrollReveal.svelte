<script lang="ts">
	import { motion } from 'motion-sv';
	import type { Snippet } from 'svelte';

	const Div = motion.div;

	interface Props {
		children?: Snippet;
		duration?: number;
		yOffset?: number;
		xOffset?: number;
		scale?: number;
		margin?: `${number}%` | `${number}px`;
		once?: boolean;
		class?: string;
	}

	let {
		children,
		duration = 0.6,
		yOffset = 30,
		xOffset = 0,
		scale = 0.95,
		margin = '-15%',
		once = true,
		class: className = ''
	}: Props = $props();
</script>

<Div
	initial={{ opacity: 0, y: yOffset, x: xOffset, scale }}
	whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
	inViewOptions={{ once, margin }}
	transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
	class={className}
>
	{@render children?.()}
</Div>
