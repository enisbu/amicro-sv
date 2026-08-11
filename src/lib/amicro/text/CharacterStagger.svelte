<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;
	const Span = motion.span;

	interface Props {
		text: string;
		duration?: number;
		staggerDelay?: number;
		yOffset?: number;
		class?: string;
	}

	let {
		text,
		duration = 0.4,
		staggerDelay = 0.015,
		yOffset = 15,
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
		hidden: { opacity: 0, y: yOffset, scale: 0.8 },
		visible: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: {
				type: 'spring' as const,
				stiffness: 300,
				damping: 18,
				mass: 0.8,
				duration
			}
		}
	});
</script>

<Div
	variants={containerVariants}
	initial="hidden"
	whileInView="visible"
	inViewOptions={{ once: true, margin: '-10% 0%' }}
	class={`character-stagger ${className}`}
	data-testid="character-stagger"
>
	{#each characters as char, index (index)}
		<Span variants={charVariants} class="character-stagger-char">{char}</Span>
	{/each}
</Div>

<style>
	:global(.character-stagger) {
		display: inline-block;
	}

	:global(.character-stagger .character-stagger-char) {
		display: inline-block;
		
		white-space: pre;
	}
</style>
