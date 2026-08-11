<script lang="ts">
	import type { Snippet } from 'svelte';
	import { motion, AnimatePresence } from 'motion-sv';

	export interface Props {
		key: string;
		class?: string;
		children: Snippet;
	}

	let { key, class: className, children }: Props = $props();
</script>

<AnimatePresence mode="popLayout" initial={false}>
	{#key key}
		<motion.span
			initial={{ opacity: 0, scale: 0.25, filter: 'blur(4px)' }}
			animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
			exit={{ opacity: 0, scale: 0.25, filter: 'blur(4px)' }}
			transition={{ type: 'spring', duration: 0.3, bounce: 0 }}
			style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
			class={className}
		>
			{@render children()}
		</motion.span>
	{/key}
</AnimatePresence>
