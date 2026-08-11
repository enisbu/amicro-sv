<script lang="ts">
	import { motion } from 'motion-sv';
	import type { Snippet } from 'svelte';

	const Div = motion.div;

	interface Props {
		children?: Snippet;
		duration?: number;
		delay?: number;
		class?: string;
		replayKey?: number;
	}

	let { children, duration = 0.5, delay = 0, class: className = '', replayKey = 0 }: Props = $props();
</script>

{#key replayKey}
	<Div
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		transition={{ duration, delay, ease: [0.215, 0.61, 0.355, 1] }}
		class={className}
	>
		{@render children?.()}
	</Div>
{/key}
