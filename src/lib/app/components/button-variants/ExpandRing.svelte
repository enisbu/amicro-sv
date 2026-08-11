<script lang="ts">
	import { motion, AnimatePresence } from 'motion-sv';
	import { BASE_COLOR, type VariantProps } from './types.js';

	let { config, isHovered, isMatrix }: VariantProps = $props();

	const Icon1 = $derived(config.icon1);
</script>

<div class="relative w-[16px] h-[16px] flex items-center justify-center shrink-0">
	<motion.div
		animate={{ scale: isHovered ? 1.1 : 1 }}
		transition={{ type: 'spring', stiffness: 400, damping: 20 }}
	>
		<Icon1 class="w-[16px] h-[16px] {BASE_COLOR}" />
	</motion.div>
</div>

{#if !isMatrix}
	<span class="font-medium tracking-tight text-[13px] whitespace-nowrap ml-2.5">{config.label}</span>
{/if}

<AnimatePresence>
	{#if isHovered}
		<motion.div
			initial={{ opacity: 1, scale: 1 }}
			animate={{ opacity: 0, scale: 1.15 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.6, ease: 'easeOut' }}
			class="absolute inset-0 rounded-[40px] pointer-events-none border border-black/25 dark:border-white/25"
		/>
	{/if}
</AnimatePresence>
