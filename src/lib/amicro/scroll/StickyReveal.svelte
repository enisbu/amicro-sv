<script lang="ts">
	import { motion, useScroll, useMotionValueEvent } from 'motion-sv';
	import type { UseScrollOptions, ScrollOffset } from 'motion-sv';
	import type { Snippet } from 'svelte';

	const H2 = motion.h2;
	const P = motion.p;
	const Div = motion.div;

	export interface StickyRevealItem {
		title: string;
		description: string;
		
		content?: Snippet;
	}

	interface Props {
		content: StickyRevealItem[];
		class?: string;
	}

	let { content, class: className = '' }: Props = $props();

	let container = $state<HTMLDivElement | null>(null);
	let activeCard = $state(0);

	const scrollOptions = (() => ({
		target: container ?? undefined,
		offset: ['start start', 'end end'] as ScrollOffset
	})) as unknown as UseScrollOptions;

	const { scrollYProgress } = useScroll(scrollOptions);

	$effect(() =>
		useMotionValueEvent(scrollYProgress, 'change', (latest) => {

			activeCard = content.reduce(
				(acc, _, index) => (latest >= index / content.length ? index : acc),
				0
			);
		})
	);
</script>

<div bind:this={container} class={['sticky-reveal', className]}>
	<div class="sticky-reveal-copy">
		{#each content as item, index (index)}
			<div class="sticky-reveal-slot">
				<H2 animate={{ opacity: activeCard === index ? 1 : 0.3 }} class="sticky-reveal-title">
					{item.title}
				</H2>
				<P animate={{ opacity: activeCard === index ? 1 : 0.3 }} class="sticky-reveal-text">
					{item.description}
				</P>
			</div>
		{/each}
	</div>

	<div class="sticky-reveal-stage">
		{#each content as item, index (index)}
			<Div
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{
					opacity: activeCard === index ? 1 : 0,
					scale: activeCard === index ? 1 : 0.9
				}}
				transition={{ duration: 0.4 }}
				class="sticky-reveal-card"
			>
				{#if item.content}
					{@render item.content()}
				{:else}
					<div class="sticky-reveal-placeholder">Card {index + 1}</div>
				{/if}
			</Div>
		{/each}
	</div>
</div>

<style>
	.sticky-reveal {
		position: relative;
		display: flex;
		justify-content: space-between;
		gap: 2.5rem;
		max-width: 64rem;
		margin-inline: auto;
		padding: 2.5rem 1rem;
	}

	.sticky-reveal-copy {
		display: flex;
		flex-direction: column;
		gap: 8rem;
		width: 50%;
		padding-block: 2.5rem;
	}

	.sticky-reveal-slot {
		display: flex;
		flex-direction: column;
		justify-content: center;
		min-height: 50vh;
	}

	:global(.sticky-reveal-title) {
		margin: 0 0 1rem;
		font-size: 1.5rem;
		font-weight: 700;
	}

	:global(.sticky-reveal-text) {
		margin: 0;
		color: var(--gray-9, #6b6b6b);
		line-height: 1.65;
	}

	.sticky-reveal-stage {
		position: sticky;
		top: 5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 50%;
		height: 60vh;
		overflow: hidden;
		border: 1px solid var(--gray-4, #e5e5e5);
		border-radius: 1rem;
		background: var(--gray-2, #f5f5f5);
	}

	:global(.sticky-reveal-card) {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1.5rem;
	}

	.sticky-reveal-placeholder {
		color: var(--gray-9, #6b6b6b);
		font-size: 1.125rem;
		font-weight: 600;
	}
</style>
