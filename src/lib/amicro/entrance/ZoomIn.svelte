<script lang="ts">
	import { motion } from 'motion-sv';
	import type { Snippet } from 'svelte';

	const Div = motion.div;

	interface Props {
		children?: Snippet;
		duration?: number;
		delay?: number;
		initialScale?: number;
		initialBlur?: string;
		class?: string;
		replayKey?: number;
	}

	let {
		children,
		duration = 0.7,
		delay = 0,
		initialScale = 0.85,
		initialBlur = '12px',
		class: className = '',
		replayKey = 0
	}: Props = $props();
</script>

{#key replayKey}
	<Div
		initial={{ opacity: 0, scale: initialScale, filter: `blur(${initialBlur})` }}
		animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
		transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
		class={className}
	>
		{@render children?.()}
	</Div>
{/key}
