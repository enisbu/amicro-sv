<script lang="ts">
	import { motion } from 'motion-sv';
	import type { Snippet } from 'svelte';

	const Div = motion.div;

	interface Props {
		children?: Snippet;
		duration?: number;
		delay?: number;
		initialScale?: number;
		class?: string;
		replayKey?: number;
	}

	let {
		children,
		duration = 0.5,
		delay = 0,
		initialScale = 0.92,
		class: className = '',
		replayKey = 0
	}: Props = $props();
</script>

{#key replayKey}
	<Div
		initial={{ opacity: 0, scale: initialScale }}
		animate={{ opacity: 1, scale: 1 }}
		transition={{ duration, delay, ease: [0.34, 1.56, 0.64, 1] }}
		class={className}
	>
		{@render children?.()}
	</Div>
{/key}
