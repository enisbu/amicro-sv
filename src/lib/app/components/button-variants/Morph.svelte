<script lang="ts">
	import { motion, AnimatePresence } from 'motion-sv';
	import { BASE_COLOR, type VariantProps } from './types.js';

	let { config, isHovered, isMatrix, showIcon2 }: VariantProps = $props();

	const Icon1 = $derived(config.icon1);
	const Icon2 = $derived(config.icon2);
</script>

<div class="relative w-[16px] h-[16px] flex items-center justify-center shrink-0">
	<AnimatePresence mode="popLayout" initial={false}>
		{#if !showIcon2}
			<motion.div
				initial={{ scale: 0.5, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				exit={{ scale: 0.5, opacity: 0 }}
				transition={{ type: 'spring', stiffness: 600, damping: 25 }}
				class="absolute inset-0 flex items-center justify-center"
			>
				<Icon1
					class="w-[16px] h-[16px] {isHovered && config.icon1Color ? config.icon1Color : BASE_COLOR}"
				/>
			</motion.div>
		{:else}
			<motion.div
				initial={{ scale: 0.5, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				exit={{ scale: 0.5, opacity: 0 }}
				transition={{ type: 'spring', stiffness: 600, damping: 25 }}
				class="absolute inset-0 flex items-center justify-center"
			>
				{#if Icon2}
					<Icon2 class="w-[16px] h-[16px] {config.icon2Color || BASE_COLOR}" />
				{/if}
			</motion.div>
		{/if}
	</AnimatePresence>
</div>

{#if !isMatrix}
	<motion.span layout class="font-medium tracking-tight text-[13px] whitespace-nowrap ml-2.5">
		{config.id === '4' && showIcon2 ? 'Copied' : config.label}
	</motion.span>
{/if}
