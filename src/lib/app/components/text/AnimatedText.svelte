<script lang="ts">
	import { RefreshCw } from '@lucide/svelte';
	import { getAppState } from '$lib/app/app-state.svelte.js';
	import type { TextAnimationConfig, TextInteractionType, TextVariant } from './types.js';

	import BlurText from './variants/BlurText.svelte';
	import BlurUpChar from './variants/BlurUpChar.svelte';
	import BlurUpWord from './variants/BlurUpWord.svelte';
	import BounceInChar from './variants/BounceInChar.svelte';
	import DiaTextReveal from './variants/DiaTextReveal.svelte';
	import DropInChar from './variants/DropInChar.svelte';
	import FadeInChar from './variants/FadeInChar.svelte';
	import FadeInText from './variants/FadeInText.svelte';
	import FadeInWord from './variants/FadeInWord.svelte';
	import FlipXChar from './variants/FlipXChar.svelte';
	import FlipYChar from './variants/FlipYChar.svelte';
	import FloatChar from './variants/FloatChar.svelte';
	import FloatWord from './variants/FloatWord.svelte';
	import GlowText from './variants/GlowText.svelte';
	import HoverLiftChar from './variants/HoverLiftChar.svelte';
	import HoverLiftWord from './variants/HoverLiftWord.svelte';
	import HoverScaleChar from './variants/HoverScaleChar.svelte';
	import HoverScaleWord from './variants/HoverScaleWord.svelte';
	import PulseChar from './variants/PulseChar.svelte';
	import PulseWord from './variants/PulseWord.svelte';
	import RevealText from './variants/RevealText.svelte';
	import RiseUpWord from './variants/RiseUpWord.svelte';
	import RotateInChar from './variants/RotateInChar.svelte';
	import ScaleInChar from './variants/ScaleInChar.svelte';
	import ScaleInText from './variants/ScaleInText.svelte';
	import ScaleInWord from './variants/ScaleInWord.svelte';
	import ShimmerText from './variants/ShimmerText.svelte';
	import SkewXChar from './variants/SkewXChar.svelte';
	import SlideDownChar from './variants/SlideDownChar.svelte';
	import SlideDownWord from './variants/SlideDownWord.svelte';
	import SlideLeftChar from './variants/SlideLeftChar.svelte';
	import SlideRightChar from './variants/SlideRightChar.svelte';
	import SlideUpChar from './variants/SlideUpChar.svelte';
	import SlideUpText from './variants/SlideUpText.svelte';
	import SlideUpWord from './variants/SlideUpWord.svelte';
	import StaggerText from './variants/StaggerText.svelte';
	import StretchXChar from './variants/StretchXChar.svelte';
	import StretchYChar from './variants/StretchYChar.svelte';
	import SwingWord from './variants/SwingWord.svelte';
	import TrackingInText from './variants/TrackingInText.svelte';
	import TrackingOutText from './variants/TrackingOutText.svelte';
	import TypewriterText from './variants/TypewriterText.svelte';
	import ZoomInText from './variants/ZoomInText.svelte';
	import ZoomOutText from './variants/ZoomOutText.svelte';

	export interface Props {
		config: TextAnimationConfig;
	}

	let { config }: Props = $props();

	const app = getAppState();

	const VARIANTS: Record<TextInteractionType, TextVariant> = {
		'dia-text-reveal': DiaTextReveal,
		'blur-text': BlurText,
		'shimmer-text': ShimmerText,
		'typewriter-text': TypewriterText,
		'reveal-text': RevealText,
		'fade-in-char': FadeInChar,
		'fade-in-word': FadeInWord,
		'fade-in-text': FadeInText,
		'blur-up-word': BlurUpWord,
		'blur-up-char': BlurUpChar,
		'stagger-text': StaggerText,
		'slide-up-char': SlideUpChar,
		'slide-up-word': SlideUpWord,
		'slide-up-text': SlideUpText,
		'slide-down-char': SlideDownChar,
		'slide-down-word': SlideDownWord,
		'slide-left-char': SlideLeftChar,
		'slide-right-char': SlideRightChar,
		'drop-in-char': DropInChar,
		'rise-up-word': RiseUpWord,
		'bounce-in-char': BounceInChar,
		'scale-in-char': ScaleInChar,
		'scale-in-word': ScaleInWord,
		'scale-in-text': ScaleInText,
		'zoom-in-text': ZoomInText,
		'zoom-out-text': ZoomOutText,
		'flip-y-char': FlipYChar,
		'flip-x-char': FlipXChar,
		'rotate-in-char': RotateInChar,
		'swing-word': SwingWord,
		'stretch-x-char': StretchXChar,
		'stretch-y-char': StretchYChar,
		'skew-x-char': SkewXChar,
		'tracking-in-text': TrackingInText,
		'tracking-out-text': TrackingOutText,
		'spring-text': HoverLiftChar,
		'hover-lift-char': HoverLiftChar,
		'hover-lift-word': HoverLiftWord,
		'hover-scale-char': HoverScaleChar,
		'hover-scale-word': HoverScaleWord,
		'float-char': FloatChar,
		'float-word': FloatWord,
		'pulse-char': PulseChar,
		'pulse-word': PulseWord,
		'glow-text': GlowText
	};

	const NO_REPLAY: ReadonlySet<TextInteractionType> = new Set<TextInteractionType>([
		'shimmer-text',
		'spring-text',
		'hover-lift-char',
		'hover-lift-word',
		'hover-scale-char',
		'hover-scale-word',
		'float-char',
		'float-word',
		'pulse-char',
		'pulse-word',
		'glow-text'
	]);

	let replayCounter = $state(0);

	const Variant: TextVariant | undefined = $derived(VARIANTS[config.interactionType]);
	const replays = $derived(!NO_REPLAY.has(config.interactionType));

	function replay() {
		app.haptic('light');
		replayCounter += 1;
	}

	function onKeydown(event: KeyboardEvent) {
		if (event.key !== 'Enter' && event.key !== ' ') return;
		event.preventDefault();
		replay();
	}
</script>

<div
	role="button"
	tabindex="0"
	onclick={replay}
	onkeydown={onKeydown}
	class="relative flex flex-col items-center justify-center w-full h-full cursor-pointer select-none px-4 group"
	title="Click to replay animation"
>
	<div class="flex items-center justify-center w-full min-h-[60px] text-center">
		{#if !Variant}
			<div class="font-bold text-2xl text-black dark:text-white">{config.label}</div>
		{:else if replays}
			{#key replayCounter}
				<Variant />
			{/key}
		{:else}
			<Variant />
		{/if}
	</div>

	<div
		class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-full bg-black/20 text-white/70"
	>
		<RefreshCw class="w-3.5 h-3.5" />
	</div>
</div>
