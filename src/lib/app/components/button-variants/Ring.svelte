<script lang="ts">
	import { motion, AnimatePresence } from 'motion-sv';
	import { BASE_COLOR, type VariantProps } from './types.js';

	let { config, isHovered, isMatrix }: VariantProps = $props();

	const Icon1 = $derived(config.icon1);
	const Icon2 = $derived(config.icon2);
</script>

<div class="relative w-[16px] h-[16px] flex items-center justify-center shrink-0">
	<AnimatePresence mode="popLayout" initial={false}>
		{#if !isHovered}
			<motion.div
				initial={{ rotate: -15, scale: 0.8, opacity: 0 }}
				animate={{ rotate: 0, scale: 1, opacity: 1 }}
				exit={{ rotate: 15, scale: 0.8, opacity: 0 }}
				transition={{ type: 'spring', stiffness: 600, damping: 25 }}
				class="absolute inset-0 flex items-center justify-center"
			>
				<Icon1 class="w-[16px] h-[16px] {BASE_COLOR}" />
			</motion.div>
		{:else}
			<motion.div
				initial={{ rotate: -15, scale: 0.8, opacity: 0 }}
				animate={{ rotate: 0, scale: 1, opacity: 1 }}
				exit={{ rotate: 15, scale: 0.8, opacity: 0 }}
				transition={{ type: 'spring', stiffness: 600, damping: 25 }}
				class="absolute inset-0 flex items-center justify-center"
			>
				{#if Icon2}
					<Icon2 class="w-[16px] h-[16px] {config.icon2Color || BASE_COLOR}" />
				{/if}
				<motion.div
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					transition={{ type: 'spring', stiffness: 600, damping: 15, delay: 0.1 }}
					class="absolute top-0 right-0 w-1.5 h-1.5 bg-red-500 rounded-full border border-transparent"
				/>
			</motion.div>
		{/if}
	</AnimatePresence>
</div>

{#if !isMatrix}
	<span class="font-medium tracking-tight text-[13px] whitespace-nowrap ml-2.5">{config.label}</span>
{/if}
