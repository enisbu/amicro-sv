<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;
	const Span = motion.span;

	interface Props {
		text: string;
		duration?: number;
		staggerDelay?: number;
		initialBlur?: string;
		class?: string;
	}

	let {
		text,
		duration = 0.5,
		staggerDelay = 0.02,
		initialBlur = '8px',
		class: className = ''
	}: Props = $props();

	const characters = $derived(Array.from(text));

	const containerVariants = $derived({
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { staggerChildren: staggerDelay }
		}
	});

	const charVariants = $derived({
		hidden: { opacity: 0, filter: `blur(${initialBlur})` },
		visible: {
			opacity: 1,
			filter: 'blur(0px)',
			transition: { duration, ease: 'easeOut' as const }
		}
	});
</script>

<Div
	variants={containerVariants}
	initial="hidden"
	whileInView="visible"
	inViewOptions={{ once: true, margin: '-10% 0%' }}
	class={`blur-text ${className}`}
	data-testid="blur-text"
>
	{#each characters as char, index (index)}
		<Span variants={charVariants} class="blur-text-char">{char}</Span>
	{/each}
</Div>

<style>
	:global(.blur-text) {
		display: inline-block;
	}

	:global(.blur-text .blur-text-char) {
		display: inline-block;
		
		white-space: pre;
	}
</style>
