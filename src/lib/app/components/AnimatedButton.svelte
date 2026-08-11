<script lang="ts">
	import { motion } from 'motion-sv';
	import { MediaQuery } from 'svelte/reactivity';
	import { prefersReducedMotion } from 'svelte/motion';
	import { getAppState } from '$lib/app/app-state.svelte.js';
	import type { ButtonConfig, InteractionType } from '$lib/app/data/buttons.js';
	import { FocusBlur } from './cards/index.js';
	import type { ButtonVariant } from './button-variants/types.js';

	import SlideArrow from './button-variants/SlideArrow.svelte';
	import Sparkle from './button-variants/Sparkle.svelte';
	import Morph from './button-variants/Morph.svelte';
	import Pulse from './button-variants/Pulse.svelte';
	import Rotate from './button-variants/Rotate.svelte';
	import Shake from './button-variants/Shake.svelte';
	import Ring from './button-variants/Ring.svelte';
	import Glare from './button-variants/Glare.svelte';
	import TextReveal from './button-variants/TextReveal.svelte';
	import Magnetic from './button-variants/Magnetic.svelte';
	import ExpandRing from './button-variants/ExpandRing.svelte';

	export interface Props {
		config: ButtonConfig;
		layoutMode: 'list' | 'grid' | 'matrix';
	}

	let { config, layoutMode }: Props = $props();

	const VARIANTS: Partial<Record<InteractionType, ButtonVariant>> = {
		'slide-arrow': SlideArrow,
		sparkle: Sparkle,
		morph: Morph,
		'color-morph': Morph,
		pulse: Pulse,
		rotate: Rotate,
		shake: Shake,
		ring: Ring,
		glare: Glare,
		'text-reveal': TextReveal,
		magnetic: Magnetic,
		'expand-ring': ExpandRing
	};

	const canHover = new MediaQuery('(hover: hover)');

	const app = getAppState();

	const isMatrix = $derived(layoutMode === 'matrix');
	const isLightTheme = $derived(app.theme === 'light');

	let isHovered = $state(false);
	let hasInteracted = $state(false);
	let mouseCoords = $state({ x: 0, y: 0 });

	let resetTimer: ReturnType<typeof setTimeout> | undefined;
	$effect(() => () => clearTimeout(resetTimer));

	const STICKY_IDS = new Set(['4', '21', '22', '24', '25']);
	const isSticky = $derived(config.interactionType === 'morph' && STICKY_IDS.has(config.id));

	const Variant = $derived(VARIANTS[config.interactionType]);
	const showIcon2 = $derived(hasInteracted || isHovered);

	function handleMouseEnter() {
		if (canHover.current) isHovered = true;
		if (isSticky) hasInteracted = true;
	}

	function handleMouseMove(event: MouseEvent) {
		if (config.interactionType !== 'magnetic') return;
		const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
		const x = event.clientX - rect.left - rect.width / 2;
		const y = event.clientY - rect.top - rect.height / 2;
		mouseCoords = { x: x * 0.35, y: y * 0.35 };
	}

	function handleMouseLeave() {
		if (canHover.current) isHovered = false;
		if (config.interactionType === 'magnetic') mouseCoords = { x: 0, y: 0 };
		clearTimeout(resetTimer);
		hasInteracted = false;
	}

	function handleTouchStart() {
		isHovered = true;
		if (isSticky) hasInteracted = true;
	}

	function handleTouchEnd() {
		resetTimer = setTimeout(() => {
			isHovered = false;
			if (hasInteracted) {
				resetTimer = setTimeout(() => (hasInteracted = false), 500);
			}
		}, 500);
	}

	const isMagnetic = $derived(config.interactionType === 'magnetic');

	const background = $derived(
		isLightTheme
			? hasInteracted && config.id === '4'
				? 'rgba(0,0,0,0.08)'
				: isHovered
					? 'rgba(0,0,0,0.06)'
					: 'rgba(0,0,0,0.04)'
			: hasInteracted && config.id === '4'
				? 'rgba(255,255,255,0.08)'
				: isHovered
					? 'rgba(255,255,255,0.06)'
					: 'rgba(255,255,255,0.04)'
	);

	const springy = $derived(
		prefersReducedMotion.current
			? { duration: 0 }
			: { type: 'spring' as const, stiffness: 500, damping: 25 }
	);
</script>

{#if config.interactionType === 'focus-blur'}
	<FocusBlur
		items={[
			{ label: '@X', href: '#' },
			{ label: '@Threads', href: '#' },
			{ label: '@GitHub', href: '#' }
		]}
		showBrackets={true}
		class={isMatrix ? 'scale-[0.5] origin-center text-[10px] gap-1 px-1 py-1' : 'text-sm gap-4'}
	/>
{:else}
	<motion.button
		transition={springy}
		onmouseenter={handleMouseEnter}
		onmousemove={handleMouseMove}
		onmouseleave={handleMouseLeave}
		onfocus={handleMouseEnter}
		onblur={handleMouseLeave}
		ontouchstart={handleTouchStart}
		ontouchend={handleTouchEnd}
		animate={{
			paddingLeft: isMatrix ? 0 : isHovered ? 28 : 24,
			paddingRight: isMatrix ? 0 : isHovered ? 28 : 24,
			x: isHovered && isMagnetic ? mouseCoords.x : 0,
			y: isHovered && isMagnetic ? mouseCoords.y : 0,
			backgroundColor: background
		}}
		whileHover={{ scale: 1.02 }}
		whilePress={{ scale: 0.96 }}
		class="relative flex items-center justify-center rounded-[40px] border-0 cursor-pointer shadow-none transition-colors duration-150 text-black dark:text-[#e3e3e3] {isMatrix
			? 'w-[36px] h-[36px] sm:w-[42px] sm:h-[42px] px-0'
			: 'h-[36px] min-w-[75px]'} {config.interactionType === 'glare' ? 'overflow-hidden' : ''}"
	>
		<motion.div
			transition={springy}
			class="flex items-center justify-center w-full {isMatrix
				? 'scale-100 sm:scale-[1.15] origin-center'
				: ''}"
		>
			{#if Variant}
				<Variant {config} {isHovered} {isMatrix} {isLightTheme} {showIcon2} />
			{/if}
		</motion.div>
	</motion.button>
{/if}
