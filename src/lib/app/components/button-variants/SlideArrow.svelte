<script lang="ts">
	import { motion } from 'motion-sv';
	import { prefersReducedMotion } from 'svelte/motion';
	import { BASE_COLOR, type VariantProps } from './types.js';

	let { config, isHovered, isMatrix }: VariantProps = $props();

	const Icon1 = $derived(config.icon1);
	const Icon2 = $derived(config.icon2);

	const ICON = 16;
	const GAP = 10;

	const swap = $derived(
		prefersReducedMotion.current
			? { duration: 0 }
			: { type: 'spring' as const, stiffness: 500, damping: 34, mass: 0.7 }
	);
</script>

{#if isMatrix}
	<div class="relative w-[16px] h-[16px] shrink-0">
		<motion.div
			animate={{ opacity: isHovered ? 0 : 1, scale: isHovered ? 0.7 : 1 }}
			transition={swap}
			class="absolute inset-0 flex items-center justify-center"
		>
			<Icon1 class="w-[16px] h-[16px] {BASE_COLOR}" />
		</motion.div>
		{#if Icon2}
			<motion.div
				animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.7 }}
				transition={swap}
				class="absolute inset-0 flex items-center justify-center"
			>
				<Icon2 class="w-[16px] h-[16px] {BASE_COLOR}" />
			</motion.div>
		{/if}
	</div>
{:else}
	<motion.div
		animate={{
			width: isHovered ? 0 : ICON,
			marginRight: isHovered ? 0 : GAP,
			opacity: isHovered ? 0 : 1,
			x: isHovered ? -6 : 0
		}}
		transition={swap}
		class="flex items-center shrink-0 overflow-hidden h-[16px]"
	>
		<Icon1 class="w-[16px] h-[16px] shrink-0 {BASE_COLOR}" />
	</motion.div>

	<span class="font-medium tracking-tight text-[13px] whitespace-nowrap">{config.label}</span>

	{#if Icon2}
		<motion.div
			animate={{
				width: isHovered ? ICON : 0,
				marginLeft: isHovered ? GAP : 0,
				opacity: isHovered ? 1 : 0,
				x: isHovered ? 0 : -6
			}}
			transition={swap}
			class="flex items-center shrink-0 overflow-hidden h-[16px]"
		>
			<Icon2 class="w-[16px] h-[16px] shrink-0 {BASE_COLOR}" />
		</motion.div>
	{/if}
{/if}
