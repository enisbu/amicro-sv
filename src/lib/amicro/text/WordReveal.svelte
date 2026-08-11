<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;
	const Span = motion.span;

	interface Props {
		text: string;
		duration?: number;
		staggerDelay?: number;
		class?: string;
	}

	let { text, duration = 0.5, staggerDelay = 0.04, class: className = '' }: Props = $props();

	const words = $derived(text.split(/\s+/));

	const containerVariants = $derived({
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { staggerChildren: staggerDelay }
		}
	});

	const wordVariants = $derived({
		hidden: { opacity: 0, y: 15, scale: 0.9 },
		visible: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: {
				duration,

				ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number]
			}
		}
	});
</script>

<Div
	variants={containerVariants}
	initial="hidden"
	whileInView="visible"
	inViewOptions={{ once: true, margin: '-10% 0%' }}
	class={`word-reveal ${className}`}
	data-testid="word-reveal"
>
	{#each words as word, index (index)}
		<Span variants={wordVariants} class="word-reveal-word">{word}</Span>
	{/each}
</Div>

<style>
	:global(.word-reveal) {
		display: flex;
		flex-wrap: wrap;
		column-gap: 0.5rem;
		row-gap: 0.375rem;
	}

	:global(.word-reveal .word-reveal-word) {
		display: inline-block;
	}
</style>
