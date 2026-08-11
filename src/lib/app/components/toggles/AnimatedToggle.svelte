<script lang="ts">
	import type { ToggleConfig, ToggleInteractionType, ToggleVariant } from './types.js';

	import BookmarkToggle from './variants/BookmarkToggle.svelte';
	import CheckmarkDraw from './variants/CheckmarkDraw.svelte';
	import CircleToggle from './variants/CircleToggle.svelte';
	import DislikeToggle from './variants/DislikeToggle.svelte';
	import DoubleBounceToggle from './variants/DoubleBounceToggle.svelte';
	import LikeToggle from './variants/LikeToggle.svelte';
	import MorphToggle from './variants/MorphToggle.svelte';
	import PillTabs from './variants/PillTabs.svelte';
	import RectangleToggle from './variants/RectangleToggle.svelte';
	import RepostToggle from './variants/RepostToggle.svelte';
	import SolidSwitch from './variants/SolidSwitch.svelte';
	import ThemeToggle from './variants/ThemeToggle.svelte';

	export interface Props {
		config: ToggleConfig;
	}

	let { config }: Props = $props();

	const VARIANTS: Record<ToggleInteractionType, ToggleVariant> = {
		'double-bounce-toggle': DoubleBounceToggle,
		'solid-switch': SolidSwitch,
		'rectangle-toggle': RectangleToggle,
		'circle-toggle': CircleToggle,
		'bookmark-toggle': BookmarkToggle,
		'like-toggle': LikeToggle,
		'dislike-toggle': DislikeToggle,
		'repost-toggle': RepostToggle,
		'pill-tabs': PillTabs,
		'morph-toggle': MorphToggle,
		'checkmark-draw': CheckmarkDraw,
		'theme-toggle': ThemeToggle
	};

	const Variant: ToggleVariant | undefined = $derived(VARIANTS[config.interactionType]);
</script>

{#if Variant}
	<Variant />
{/if}
