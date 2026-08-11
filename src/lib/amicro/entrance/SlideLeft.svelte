<script lang="ts">
	import { motion } from 'motion-sv';
	import type { Snippet } from 'svelte';

	const Div = motion.div;

	interface Props {
		children?: Snippet;
		duration?: number;
		delay?: number;
		xOffset?: number;
		class?: string;
		replayKey?: number;
	}

	let {
		children,
		duration = 0.6,
		delay = 0,
		xOffset = 40,
		class: className = '',
		replayKey = 0
	}: Props = $props();
</script>

{#key replayKey}
	<Div
		initial={{ opacity: 0, x: xOffset }}
		animate={{ opacity: 1, x: 0 }}
		transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
		class={className}
	>
		{@render children?.()}
	</Div>
{/key}
