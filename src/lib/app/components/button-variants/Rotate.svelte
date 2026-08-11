<script lang="ts">
	import { motion } from 'motion-sv';
	import { BASE_COLOR, type VariantProps } from './types.js';

	let { config, isHovered, isMatrix }: VariantProps = $props();

	const Icon1 = $derived(config.icon1);
</script>

<div class="relative w-[16px] h-[16px] flex items-center justify-center shrink-0">
	<motion.div
		animate={{ rotate: isHovered ? 180 : 0 }}
		transition={{ type: 'spring', stiffness: 400, damping: 25 }}
	>
		<Icon1 class="w-[16px] h-[16px] {BASE_COLOR}" />
	</motion.div>
</div>

{#if !isMatrix}
	<span class="font-medium tracking-tight text-[13px] whitespace-nowrap ml-2.5">{config.label}</span>
{/if}
