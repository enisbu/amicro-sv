<script lang="ts">
	import { motion, AnimatePresence } from 'motion-sv';
	import { BASE_COLOR, type VariantProps } from './types.js';

	let { config, isHovered, isMatrix }: VariantProps = $props();

	const Icon1 = $derived(config.icon1);
	const Icon2 = $derived(config.icon2);
	const STAR = 'M12 2l2.4 7.6H22l-6.2 4.5 2.4 7.6-6.2-4.5-6.2 4.5 2.4-7.6L2 9.6h7.6z';
</script>

<div class="relative w-[16px] h-[16px] flex items-center justify-center shrink-0">
	<AnimatePresence mode="popLayout" initial={false}>
		{#if !isHovered}
			<motion.div
				initial={{ y: -15, opacity: 0, scale: 0.8 }}
				animate={{ y: 0, opacity: 1, scale: 1 }}
				exit={{ y: -15, opacity: 0, scale: 0.8 }}
				transition={{ type: 'spring', stiffness: 600, damping: 25 }}
				class="absolute inset-0 flex items-center justify-center"
			>
				<Icon1 class="w-[16px] h-[16px] {BASE_COLOR}" />
			</motion.div>
		{:else}
			<motion.div
				initial={{ y: 15, opacity: 0, scale: 0.8 }}
				animate={{ y: 0, opacity: 1, scale: 1 }}
				exit={{ y: 15, opacity: 0, scale: 0.8 }}
				transition={{ type: 'spring', stiffness: 600, damping: 25 }}
				class="absolute inset-0 flex items-center justify-center"
			>
				{#if Icon2}
					<Icon2 class="w-[16px] h-[16px] {config.icon2Color || BASE_COLOR}" />
				{/if}
				<motion.div
					initial={{ opacity: 0, scale: 0, rotate: -45, y: 10 }}
					animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
					exit={{ opacity: 0, scale: 0, rotate: 45, y: 10 }}
					transition={{ type: 'spring', stiffness: 600, damping: 25, delay: 0.05 }}
					class="absolute -top-3 -right-2"
				>
					<svg class="w-2.5 h-2.5 text-yellow-200" viewBox="0 0 24 24" fill="currentColor">
						<path d={STAR} />
					</svg>
				</motion.div>
				<motion.div
					initial={{ opacity: 0, scale: 0, rotate: 45, x: 10 }}
					animate={{ opacity: 1, scale: 1, rotate: 0, x: 0 }}
					exit={{ opacity: 0, scale: 0, rotate: -45, x: 10 }}
					transition={{ type: 'spring', stiffness: 600, damping: 25, delay: 0.1 }}
					class="absolute -top-1 -left-3"
				>
					<svg class="w-1.5 h-1.5 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
						<path d={STAR} />
					</svg>
				</motion.div>
			</motion.div>
		{/if}
	</AnimatePresence>
</div>

{#if !isMatrix}
	<span class="font-medium tracking-tight text-[13px] whitespace-nowrap ml-2.5">{config.label}</span>
{/if}
