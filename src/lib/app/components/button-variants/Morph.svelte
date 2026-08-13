<script lang="ts">
	import { motion, AnimatePresence, useSpring } from 'motion-sv';
	import { prefersReducedMotion } from 'svelte/motion';
	import { BASE_COLOR, type VariantProps } from './types.js';

	let { config, isHovered, isMatrix, showIcon2 }: VariantProps = $props();

	const Icon1 = $derived(config.icon1);
	const Icon2 = $derived(config.icon2);
	const label = $derived(config.id === '4' && showIcon2 ? 'Copied' : config.label);

	let restWidth = $state(0);
	let doneWidth = $state(0);

	const LABEL_CLASS = 'font-medium tracking-tight text-[13px] whitespace-nowrap';

	const labelWidth = useSpring(0, { stiffness: 500, damping: 25 });
	const targetWidth = $derived(showIcon2 && doneWidth ? doneWidth : restWidth);

	let primed = false;
	$effect(() => {
		if (!targetWidth) return;
		if (primed && !prefersReducedMotion.current) labelWidth.set(targetWidth);
		else labelWidth.jump(targetWidth);
		primed = true;
	});
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
	{#if config.id === '4'}
		<motion.span style={{ width: labelWidth }} class="relative block h-[18px] ml-2.5">
			<AnimatePresence mode="popLayout" initial={false}>
				{#if showIcon2}
					<motion.span
						initial={{ opacity: 0, y: 8 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -8 }}
						transition={{ type: 'spring', stiffness: 600, damping: 25 }}
						class="absolute left-0 top-0 w-max leading-[18px] {LABEL_CLASS}"
					>
						Copied
					</motion.span>
				{:else}
					<motion.span
						initial={{ opacity: 0, y: 8 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -8 }}
						transition={{ type: 'spring', stiffness: 600, damping: 25 }}
						class="absolute left-0 top-0 w-max leading-[18px] {LABEL_CLASS}"
					>
						{config.label}
					</motion.span>
				{/if}
			</AnimatePresence>
			<span
				bind:clientWidth={restWidth}
				aria-hidden="true"
				class="absolute left-0 top-0 w-max opacity-0 leading-[18px] {LABEL_CLASS}"
			>
				{config.label}
			</span>
			<span
				bind:clientWidth={doneWidth}
				aria-hidden="true"
				class="absolute left-0 top-0 w-max opacity-0 leading-[18px] {LABEL_CLASS}"
			>
				Copied
			</span>
		</motion.span>
	{:else}
		<span class="{LABEL_CLASS} ml-2.5">{label}</span>
	{/if}
{/if}
