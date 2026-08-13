<script lang="ts">
	import { untrack } from 'svelte';
	import { motion } from 'motion-sv';
	import { ChevronLeft, ChevronRight } from '@lucide/svelte';
	import type { BookPage, BookSettings } from './book-data.js';
	import { PAGES } from './book-data.js';

	export interface Props {
		pages?: BookPage[];
		currentIndex: number;
		isFlipping?: boolean;
		direction: number;
		onFlipComplete?: () => void;
		settings: BookSettings;
		isIntro: boolean;
		onPrevPage?: () => void;
		onNextPage?: () => void;
	}

	let {
		pages = PAGES,
		currentIndex,
		isFlipping = false,
		direction,
		onFlipComplete,
		settings,
		isIntro,
		onPrevPage,
		onNextPage
	}: Props = $props();

	let localIndex = $state(untrack(() => currentIndex));
	let flipState = $state<{ active: boolean; from: number; to: number; dir: number }>({
		active: false,
		from: 0,
		to: 0,
		dir: 1
	});

	const animDuration = $derived(isIntro ? 0.14 : 0.45);
	const animEase = $derived<'linear' | [number, number, number, number]>(
		isIntro ? 'linear' : [0.33, 1, 0.68, 1]
	);

	$effect(() => {
		if (currentIndex !== localIndex) {
			flipState = { active: true, from: localIndex, to: currentIndex, dir: direction };
		}
	});

	function handleAnimationComplete() {
		localIndex = flipState.to;
		flipState = { active: false, from: flipState.to, to: flipState.to, dir: 1 };
		onFlipComplete?.();
	}

	const getIndex = (index: number) => ((index % pages.length) + pages.length) % pages.length;

	const creaseLeft = 'absolute inset-y-0 right-0 w-12 pointer-events-none mix-blend-multiply z-20';
	const creaseRight = 'absolute inset-y-0 left-0 w-12 pointer-events-none mix-blend-multiply z-20';

	const creaseLeftStyle = $derived(
		`background: linear-gradient(to left, rgba(0,0,0,${settings.creaseOpacity / 100}), rgba(0,0,0,${settings.creaseOpacity / 400}), transparent); box-shadow: inset -4px 0 10px rgba(0,0,0,0.1)`
	);
	const creaseRightStyle = $derived(
		`background: linear-gradient(to right, rgba(0,0,0,${settings.creaseOpacity / 100}), rgba(0,0,0,${settings.creaseOpacity / 400}), transparent); box-shadow: inset 4px 0 10px rgba(0,0,0,0.1)`
	);

	const leftIndex = $derived(
		flipState.active
			? flipState.dir === 1
				? flipState.from - 1
				: flipState.to - 1
			: localIndex - 1
	);
	const rightIndex = $derived(
		flipState.active ? (flipState.dir === 1 ? flipState.to : flipState.from) : localIndex
	);

	const frontIndex = $derived(flipState.dir === 1 ? flipState.from : flipState.to);
	const backIndex = $derived(flipState.dir === 1 ? flipState.to - 1 : flipState.from - 1);
</script>

{#snippet paperTexture()}
	<div
		class="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply"
		style='background-image: url("https://www.transparenttextures.com/patterns/cream-paper.png")'
	></div>
{/snippet}

{#snippet pageContent(index: number)}
	<div class="absolute inset-0" style="background-color: {settings.paperColor}"></div>
	<div
		class="absolute inset-0 flex items-center justify-center pointer-events-none"
		style="padding: {settings.padding}px"
	>
		<div
			class="w-full h-full bg-cover bg-center bg-no-repeat shadow-inner"
			style="background-image: url({pages[getIndex(index)]
				.src}); border-radius: {settings.imageRadius}px; box-shadow: 0 4px {settings.shadowIntensity}px rgba(0,0,0,0.15)"
		></div>
	</div>
	{@render paperTexture()}
{/snippet}

<div class="relative w-full max-w-lg aspect-[16/10] mx-auto perspective-[2400px] select-none">
	<motion.div
		class="w-full h-full relative shadow-xl rounded-md"
		initial={{ rotateX: 12, rotateY: -10, rotateZ: -2, scale: 0.95 }}
		animate={{ rotateX: 6, rotateY: -4, rotateZ: 0, scale: 1 }}
		transition={{ duration: 1.2, ease: 'easeOut' }}
		style={{ transformStyle: 'preserve-3d' }}
	>
		<div
			role="presentation"
			onclick={onPrevPage}
			class="absolute top-0 left-0 w-1/2 h-full overflow-hidden rounded-l-md border-y border-l border-r border-black/10 shadow-[2px_0_15px_rgba(0,0,0,0.2)] cursor-pointer group"
			title="Click to turn page back"
		>
			{@render pageContent(leftIndex)}
			<div class={creaseLeft} style={creaseLeftStyle}></div>
			<div
				class="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-start pl-3"
			>
				<ChevronLeft
					class="w-5 h-5 text-black/50 opacity-0 group-hover:opacity-100 transition-opacity"
				/>
			</div>
		</div>

		<div
			role="presentation"
			onclick={onNextPage}
			class="absolute top-0 right-0 w-1/2 h-full overflow-hidden rounded-r-md border-y border-r border-l border-black/10 shadow-[-2px_0_15px_rgba(0,0,0,0.2)] cursor-pointer group"
			title="Click to turn page forward"
		>
			{@render pageContent(rightIndex)}
			<div class={creaseRight} style={creaseRightStyle}></div>
			<div
				class="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-end pr-3"
			>
				<ChevronRight
					class="w-5 h-5 text-black/50 opacity-0 group-hover:opacity-100 transition-opacity"
				/>
			</div>
		</div>

		{#if flipState.active}
			<motion.div
				class="absolute top-0 w-1/2 h-full origin-left bg-[#fcfbf9] z-30"
				style={{ left: '50%', transformStyle: 'preserve-3d' }}
				initial={{ rotateY: flipState.dir === 1 ? 0 : -180 }}
				animate={{ rotateY: flipState.dir === 1 ? -180 : 0 }}
				transition={{ duration: animDuration, ease: animEase }}
				onAnimationComplete={handleAnimationComplete}
			>
				<div
					class="absolute inset-0 backface-hidden overflow-hidden rounded-r-md border-y border-r border-l border-black/10"
					style="backface-visibility: hidden"
				>
					{@render pageContent(frontIndex)}
					<div class={creaseRight} style={creaseRightStyle}></div>
					<motion.div
						class="absolute inset-0 bg-gradient-to-r from-transparent to-black"
						initial={{ opacity: flipState.dir === 1 ? 0 : 0.4 }}
						animate={{ opacity: flipState.dir === 1 ? 0.4 : 0 }}
						transition={{ duration: animDuration, ease: animEase }}
					/>
				</div>

				<div
					class="absolute inset-0 backface-hidden overflow-hidden rounded-l-md border-y border-l border-r border-black/10"
					style="transform: rotateY(180deg); backface-visibility: hidden"
				>
					{@render pageContent(backIndex)}
					<div class={creaseLeft} style={creaseLeftStyle}></div>
					<motion.div
						class="absolute inset-0 bg-gradient-to-l from-transparent to-black"
						initial={{ opacity: flipState.dir === 1 ? 0.4 : 0 }}
						animate={{ opacity: flipState.dir === 1 ? 0 : 0.4 }}
						transition={{ duration: animDuration, ease: animEase }}
					/>
				</div>
			</motion.div>
		{/if}
	</motion.div>
</div>
