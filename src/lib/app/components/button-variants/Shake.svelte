<script lang="ts">
	import { motion } from 'motion-sv';
	import { BASE_COLOR, type VariantProps } from './types.js';

	let { config, isHovered, isMatrix }: VariantProps = $props();

	const Icon1 = $derived(config.icon1);
	const active = $derived(isHovered && config.icon1Color ? config.icon1Color : BASE_COLOR);
</script>

<div class="relative w-[16px] h-[16px] flex items-center justify-center shrink-0">
	<motion.div
		animate={{
			y: isHovered ? [0, -2, 0, -2, 0] : 0,
			rotate: isHovered ? [0, -10, 10, -10, 0] : 0
		}}
		transition={{ duration: 0.4 }}
	>
		<Icon1 class="w-[16px] h-[16px] transition-colors duration-300 {active}" />
	</motion.div>
</div>

{#if !isMatrix}
	<span
		class="font-medium tracking-tight text-[13px] whitespace-nowrap transition-colors duration-300 ml-2.5 {active}"
	>
		{config.label}
	</span>
{/if}
