<script lang="ts">
	import { motion } from 'motion-sv';
	import { BASE_COLOR, type VariantProps } from './types.js';
	import { cn } from '$lib/app/utils.js';

	let { config, isHovered, isMatrix, isLightTheme }: VariantProps = $props();

	const Icon1 = $derived(config.icon1);
	const gradient = $derived(
		isLightTheme
			? 'linear-gradient(90deg, transparent, rgba(0,0,0,0.12), transparent)'
			: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)'
	);
</script>

<Icon1 class={cn('w-[16px] h-[16px]', !isMatrix && 'mr-2.5', BASE_COLOR)} />

{#if !isMatrix}
	<span class="font-medium tracking-tight text-[13px] whitespace-nowrap">{config.label}</span>
{/if}

<motion.div
	animate={{ x: isHovered ? ['-150%', '150%'] : '-150%' }}
	transition={{
		duration: 0.85,
		ease: 'easeInOut',
		repeat: isHovered ? Infinity : 0,
		repeatDelay: 1
	}}
	class="absolute top-0 bottom-0 w-[50px] skew-x-[-20deg] pointer-events-none z-10"
	style={{ background: gradient }}
/>
