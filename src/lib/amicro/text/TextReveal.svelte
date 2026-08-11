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

	let { text, duration = 0.8, staggerDelay = 0.15, class: className = '' }: Props = $props();

	const lines = $derived(text.split('\n'));

	const containerVariants = $derived({
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { staggerChildren: staggerDelay }
		}
	});

	const itemVariants = $derived({

		hidden: { y: '100%' },
		visible: {
			y: 0,
			transition: {
				duration,

				ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
			}
		}
	});
</script>

<Div
	variants={containerVariants}
	initial="hidden"
	whileInView="visible"
	inViewOptions={{ once: true, margin: '-20% 0%' }}
	class={`text-reveal ${className}`}
	data-testid="text-reveal"
>
	{#each lines as line, index (index)}
		<div class="text-reveal-mask">
			<Span variants={itemVariants} class="text-reveal-line">{line}</Span>
		</div>
	{/each}
</Div>

<style>
	:global(.text-reveal) {
		display: flex;
		flex-direction: column;
	}

	.text-reveal-mask {
		overflow: hidden;
		padding-block: 0.25rem;
	}

	:global(.text-reveal .text-reveal-line) {
		display: block;
	}
</style>
