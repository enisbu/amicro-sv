<script lang="ts">
	import { motion } from 'motion-sv';
	import { BASE_COLOR, type VariantProps } from './types.js';

	let { config, isHovered, isMatrix }: VariantProps = $props();

	const Icon1 = $derived(config.icon1);

	const LINE = `block h-[18px] leading-[18px] font-medium tracking-tight text-[13px] whitespace-nowrap ${BASE_COLOR}`;
</script>

<div class="relative w-[16px] h-[16px] flex items-center justify-center shrink-0 mr-2.5">
	<motion.div
		animate={{ rotate: isHovered ? 45 : 0 }}
		transition={{ type: 'spring', stiffness: 400, damping: 25 }}
	>
		<Icon1 class="w-[16px] h-[16px] {BASE_COLOR}" />
	</motion.div>
</div>

{#if !isMatrix}
	<div class="relative h-[18px] overflow-hidden">
		<motion.div
			animate={{ y: isHovered ? -18 : 0 }}
			transition={{ type: 'spring', stiffness: 400, damping: 25 }}
			class="flex flex-col"
		>
			<span class={LINE}>
				{config.label}
			</span>
			<span class={LINE}>
				{config.label}
			</span>
		</motion.div>
	</div>
{/if}
