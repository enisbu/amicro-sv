<script lang="ts">
	import type { Component } from 'svelte';
	import { motion, createLayoutMotion } from 'motion-sv';
	import { Copy, LayoutTemplate } from '@lucide/svelte';
	import { getAppState } from '$lib/app/app-state.svelte.js';
	import { getCardComponentCode } from '$lib/app/code-generator.js';
	import type { CardConfig, CardInteractionType } from '$lib/app/data/cards.js';
	import {
		CardArc5,
		CardArc7,
		CardLongArc5,
		CardLinearSpread,
		CardCornerFan,
		CardStampArc,
		CardCascadeStagger,
		CardScatterSpread,
		CardWheelFan,
		CardCarousel,
		CardCoverFlow,
		CardTimeMachine
	} from '../cards/index.js';

	export interface Props {
		cards: CardConfig[];
		layout: 'list' | 'grid' | 'matrix';
		active: boolean;
	}

	let { cards, layout, active }: Props = $props();

	const layoutMotion = createLayoutMotion(motion);

	let wasActive = false;

	$effect.pre(() => {
		const order = cards;
		const mode = layout;
		const visible = active;
		void order;
		void mode;
		if (visible && wasActive) layoutMotion.update();
		wasActive = visible;
	});

	/**
	 * Snapshot the current card positions from outside this component.
	 * Same reason as in ButtonsSection: a keyed reorder needs its snapshot in
	 * the handler that changes the state, not in the render cycle.
	 */
	export function snapshot() {
		if (active) layoutMotion.update();
	}

	const app = getAppState();
	const isDark = $derived(app.theme === 'dark');

	const tileShell = $derived(
		isDark
			? 'shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] hover:bg-[#202020]'
			: 'shadow-[0_4px_20px_rgba(0,0,0,0.04),0_1px_3px_rgba(0,0,0,0.02)] border border-neutral-100/85 hover:shadow-[0_6px_24px_rgba(0,0,0,0.06)] text-black'
	);

	const copyButton =
		'bg-neutral-100 hover:bg-neutral-200 text-black dark:bg-white/[0.08] dark:hover:bg-white/[0.12] dark:text-[#ededed]/60 dark:hover:text-[#ededed]';

	let hoveredCardId = $state<string | null>(null);

	interface Preview {
		component: Component<{ hovered?: boolean; class?: string; isMonochrome?: boolean }>;
		class: string;
		mono?: boolean;
	}

	const SPREAD_SCALE = 'scale-[0.55] sm:scale-[1.2] origin-center';
	const ARC7_SCALE = 'scale-[0.5] sm:scale-[1.2] origin-center';
	const CAROUSEL_SCALE = 'scale-[0.45] sm:scale-[1.0] origin-center';

	const PREVIEW: Record<CardInteractionType, Preview> = {
		'card-arc-5': { component: CardArc5, class: SPREAD_SCALE },
		'card-arc-7': { component: CardArc7, class: ARC7_SCALE },
		'card-long-arc-5': { component: CardLongArc5, class: ARC7_SCALE },
		'card-linear-spread': { component: CardLinearSpread, class: SPREAD_SCALE },
		'card-corner-fan': { component: CardCornerFan, class: SPREAD_SCALE },
		'card-stamp-arc': { component: CardStampArc, class: SPREAD_SCALE },
		'card-cascade-stagger': { component: CardCascadeStagger, class: SPREAD_SCALE },
		'card-scatter-spread': { component: CardScatterSpread, class: SPREAD_SCALE },
		'card-wheel-fan': { component: CardWheelFan, class: SPREAD_SCALE },
		'card-carousel': { component: CardCarousel, class: CAROUSEL_SCALE },
		'card-cover-flow': { component: CardCoverFlow, class: CAROUSEL_SCALE },
		'card-time-machine': { component: CardTimeMachine, class: CAROUSEL_SCALE },
		'card-carousel-mono': { component: CardCarousel, class: CAROUSEL_SCALE, mono: true },
		'card-cover-flow-mono': { component: CardCoverFlow, class: CAROUSEL_SCALE, mono: true },
		'card-time-machine-mono': { component: CardTimeMachine, class: CAROUSEL_SCALE, mono: true }
	};

	function copyCode(card: CardConfig) {
		app.copy(getCardComponentCode(card), `Copied ${card.label} component code!`);
	}
</script>

<layoutMotion.div class="contents">
	{#each cards as card, index (card.id)}
	{@const preview = PREVIEW[card.interactionType]}
	<motion.div
		layout="position"
		layoutDependency={index}
		transition={{ type: 'spring', stiffness: 400, damping: 25 }}
		class="{layout === 'list' ? 'w-full' : ''} {layout === 'grid' || layout === 'matrix'
			? 'w-full flex justify-center sm:w-auto sm:block'
			: ''}"
	>
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				onmouseenter={() => (hoveredCardId = card.id)}
				onmouseleave={() => (hoveredCardId = null)}
				class={layout === 'list'
					? 'hidden'
					: `relative w-full max-w-[480px] sm:w-[480px] h-[280px] sm:h-[380px] rounded-[24px] transition-all duration-300 group bg-card ${tileShell}`}
			>
				<div
					class="absolute left-[12px] top-[12px] right-[12px] h-[200px] sm:h-[300px] rounded-[14px] flex items-center justify-center transition-colors duration-300 bg-muted"
				>
					<div
						class="absolute inset-0 rounded-[14px] pointer-events-none z-10 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.03)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]"
					></div>
					{#if preview && layout !== 'list'}
						<preview.component
							hovered={hoveredCardId === card.id}
							class={preview.class}
							isMonochrome={preview.mono}
						/>
					{/if}
				</div>
				<div class="absolute left-[20px] bottom-[14px] w-[calc(100%-80px)] flex flex-col gap-[2px]">
					<div
						class="text-[13px] font-semibold leading-[18px] transition-colors text-foreground"
					>
						{card.label}
					</div>
					<div
						class="text-[11px] font-normal leading-[13px] transition-colors text-black opacity-70 dark:text-[#767676] dark:opacity-100"
					>
						{card.description}
					</div>
				</div>
				<button
					onclick={() => copyCode(card)}
					type="button"
					class="absolute right-[20px] bottom-[12px] w-[32px] h-[32px] rounded-full flex items-center justify-center transition-colors cursor-pointer border-0 focus-visible:outline focus-visible:outline-2 {copyButton}"
					aria-label="Copy card code"
				>
					<Copy class="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110" />
				</button>
			</div>
			<div
				class={layout !== 'list'
					? 'hidden'
					: `w-full max-w-[500px] flex items-center justify-between p-4 rounded-xl border transition-colors bg-card text-black shadow-sm dark:text-white dark:shadow-none ${
							isDark ? 'border-neutral-850' : 'border-neutral-200'
						}`}
			>
				<div class="flex items-center gap-4">
					<div
						class="w-12 h-12 rounded-lg flex items-center justify-center shrink-0 bg-neutral-100 dark:bg-[#131313]"
					>
						<LayoutTemplate class="w-5 h-5 text-neutral-400" />
					</div>
					<div>
						<div class="text-[14px] font-semibold">{card.label}</div>
						<div class="text-[11px] text-neutral-400 dark:text-neutral-500">
							{card.description}
						</div>
					</div>
				</div>
				<button
					onclick={() => copyCode(card)}
					aria-label="Copy card code"
					class="p-2 rounded-lg cursor-pointer border-0 bg-neutral-150 text-neutral-750 hover:bg-neutral-200 dark:bg-white/[0.06] dark:text-neutral-300 dark:hover:bg-white/[0.1]"
				>
					<Copy class="w-4 h-4" />
				</button>
			</div>
	</motion.div>
{/each}
</layoutMotion.div>
