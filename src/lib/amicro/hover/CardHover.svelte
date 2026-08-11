<script lang="ts">
	import { AnimatePresence, createLayoutMotion } from 'motion-sv';

	interface Item {
		id: string;
		title: string;
		description: string;
		link?: string;
	}

	interface Props {
		items: Item[];
		class?: string;
		cardClass?: string;
	}

	let { items, class: className = '', cardClass = '' }: Props = $props();

	const layout = createLayoutMotion();

	let hoveredIndex = $state<number | null>(null);

	const setHovered = (index: number | null) => layout.update.with(() => (hoveredIndex = index))();
</script>

<div class={`card-hover ${className}`} data-testid="card-hover">
	<AnimatePresence>
		{#each items as item, idx (item.id)}
			<a
				href={item.link || '#'}
				class="card-hover-item"
				onpointerenter={() => setHovered(idx)}
				onpointerleave={() => setHovered(null)}
				onfocus={() => setHovered(idx)}
				onblur={() => setHovered(null)}
				data-hovered={hoveredIndex === idx}
			>
				{#if hoveredIndex === idx}
					<layout.span
						layoutId="hoverBackground"
						layoutDependency={hoveredIndex}
						class="card-hover-bg"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1, transition: { duration: 0.15 } }}
						exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.1 } }}
					/>
				{/if}
				<div class={`card-hover-card ${cardClass}`}>
					<h4>{item.title}</h4>
					<p>{item.description}</p>
				</div>
			</a>
		{/each}
	</AnimatePresence>
</div>

<style>
	.card-hover {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
		width: 100%;
	}

	@media (min-width: 768px) {
		.card-hover {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}

	.card-hover-item {
		position: relative;
		display: block;
		height: 100%;
		width: 100%;
		padding: 0.5rem;
		text-decoration: none;
		color: inherit;
	}

	:global(.card-hover-item .card-hover-bg) {
		position: absolute;
		inset: 0;
		z-index: 0;
		display: block;
		height: 100%;
		width: 100%;
		border-radius: 1.5rem;
		background: var(--surface-2);
	}

	.card-hover-card {
		position: relative;
		z-index: 1;
		height: 100%;
		width: 100%;
		overflow: hidden;
		padding: 1.25rem;
		border: 1px solid var(--line);
		border-radius: 1rem;
		background: var(--bg);
		transition: border-color 200ms var(--ease-swift);
	}

	.card-hover-item[data-hovered='true'] .card-hover-card {
		border-color: var(--gray-6);
	}

	.card-hover-card h4 {
		margin: 0.5rem 0 0;
		color: var(--ink);
		font-weight: 700;
		letter-spacing: 0.01em;
	}

	.card-hover-card p {
		margin: 0.5rem 0 0;
		color: var(--muted-foreground);
		font-size: 0.875rem;
		line-height: 1.625;
		letter-spacing: 0.01em;
	}
</style>
