<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;

	interface Props {
		angle?: number;
		gap?: number;
		yOffset?: number;
		duration?: number;
		hoverIntensity?: number;
		hovered?: boolean;
		spring?: boolean;
		cardClass?: string;
		class?: string;
		images?: string[];
	}

	let {
		angle = 30,
		gap = 70,
		yOffset = 10,
		duration = 0.5,
		hoverIntensity = 1,
		hovered = undefined,
		spring = true,
		cardClass = '',
		class: className = '',
		images
	}: Props = $props();

	const cards = [0, 1, 2, 3, 4];
	const center = 2;

	let isHovered = $state(false);

	let active = $derived(hovered !== undefined ? hovered : isHovered);

	const transition = $derived(
		spring
			? { type: 'spring' as const, stiffness: 180, damping: 20, mass: 0.8 }
			: { duration, ease: [0.2, 0.8, 0.2, 1] as [number, number, number, number] }
	);

	function target(index: number, isActive: boolean) {
		const dist = index - center;

		if (!isActive) {
			return { rotate: 0, x: 0, y: 0, scale: 1 };
		}

		let y: number;
		if (Math.abs(dist) === 2) y = yOffset;
		else if (Math.abs(dist) === 1) y = -0.2 * yOffset;
		else y = -yOffset;

		return {
			rotate: dist * (angle / center) * hoverIntensity,
			x: dist * (gap / center) * hoverIntensity,
			y: y * hoverIntensity,
			scale: dist === 0 ? 1.05 : 1
		};
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class={`card-arc-5 ${className}`}
	onpointerenter={() => (isHovered = true)}
	onpointerleave={() => (isHovered = false)}
	data-testid="card-arc-5"
	data-active={active}
>
	{#each cards as i (i)}
		<Div
			animate={target(i, active)}
			{transition}
			style={{ zIndex: 3 - Math.abs(i - center) }}
			class={`arc-card ${cardClass}`}
			data-card={i}
		>
			{#if images?.length}
				<img src={images[i % images.length]} alt="" />
			{/if}
		</Div>
	{/each}
</div>

<style>
	.card-arc-5 {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 8rem;
		height: 11rem;
		cursor: pointer;
	}

	:global(.card-arc-5 .arc-card) {
		position: absolute;
		inset: 0;
		overflow: hidden;
		border: 1px solid rgb(255 255 255 / 0.2);
		border-radius: 1rem;
		background: var(--gray-6);
		box-shadow:
			0 4px 10px -2px rgb(0 0 0 / 0.15),
			0 2px 6px -2px rgb(0 0 0 / 0.1);
		
		transform-origin: 50% 100%;
	}

	:global(.card-arc-5 .arc-card img) {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
</style>
