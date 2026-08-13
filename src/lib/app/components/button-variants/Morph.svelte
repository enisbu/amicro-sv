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
	// The visible label ends its enter animation on letter-spacing 0, not on the
	// tracking of the class. The hidden spans the width is measured from have to match
	// that, otherwise the box comes out narrower than the text and clips the last letter.
	const MEASURE_CLASS = LABEL_CLASS.replace('tracking-tight', 'tracking-normal');

	const labelWidth = useSpring(0, { stiffness: 500, damping: 25 });
	// One pixel of slack: clientWidth rounds down, and the label spreads out while it
	// enters, so without it the last letter clips against the box. Zero stays zero,
	// it means the hidden spans have not been measured yet.
	const measured = $derived(showIcon2 && doneWidth ? doneWidth : restWidth);
	const targetWidth = $derived(measured ? measured + 1 : 0);

	let primed = false;
	$effect(() => {
		// In the matrix layout the label collapses instead of unmounting, see below.
		const target = isMatrix ? 0 : targetWidth;
		if (!isMatrix && !targetWidth) return;
		if (primed && !prefersReducedMotion.current) labelWidth.set(target);
		else labelWidth.jump(target);
		primed = true;
	});

	const enterSpacing = $derived.by(() => {
		const from = showIcon2 ? restWidth : doneWidth;
		const to = showIcon2 ? doneWidth : restWidth;
		const chars = (showIcon2 ? 'Copied' : config.label).length;
		if (!from || !to || !chars) return 0;
		return (from - to) / chars;
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

{#if config.id === '4'}
	<!--
		This label stays mounted in every layout and collapses to width 0 in the matrix.
		Unmounting it would remount the presence below on the way back, and that mount
		eats the FLIP snapshot of the tile around it: the matrix -> list switch then
		jumps instead of animating.
	-->
	<motion.span
		style={{ width: labelWidth }}
		class="relative block h-[18px] overflow-hidden {isMatrix ? '' : 'ml-2.5'}"
	>
		<AnimatePresence mode="popLayout" initial={false}>
			{#if showIcon2}
				<motion.span
					initial={{ opacity: 0, letterSpacing: `${enterSpacing}px` }}
					animate={{ opacity: 1, letterSpacing: '0px' }}
					exit={{ opacity: 0 }}
					transition={{ type: 'spring', stiffness: 500, damping: 25 }}
					class="absolute left-0 top-0 w-max leading-[18px] {LABEL_CLASS}"
				>
					Copied
				</motion.span>
			{:else}
				<motion.span
					initial={{ opacity: 0, letterSpacing: `${enterSpacing}px` }}
					animate={{ opacity: 1, letterSpacing: '0px' }}
					exit={{ opacity: 0 }}
					transition={{ type: 'spring', stiffness: 500, damping: 25 }}
					class="absolute left-0 top-0 w-max leading-[18px] {LABEL_CLASS}"
				>
					{config.label}
				</motion.span>
			{/if}
		</AnimatePresence>
		<span
			bind:clientWidth={restWidth}
			aria-hidden="true"
			class="absolute left-0 top-0 w-max opacity-0 leading-[18px] {MEASURE_CLASS}"
		>
			{config.label}
		</span>
		<span
			bind:clientWidth={doneWidth}
			aria-hidden="true"
			class="absolute left-0 top-0 w-max opacity-0 leading-[18px] {MEASURE_CLASS}"
		>
			Copied
		</span>
	</motion.span>
{:else if !isMatrix}
	<span class="{LABEL_CLASS} ml-2.5">{label}</span>
{/if}
