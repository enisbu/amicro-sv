import type { Component } from 'svelte';

export type ToggleInteractionType =
	| 'double-bounce-toggle'
	| 'solid-switch'
	| 'rectangle-toggle'
	| 'circle-toggle'
	| 'bookmark-toggle'
	| 'like-toggle'
	| 'dislike-toggle'
	| 'repost-toggle'
	| 'pill-tabs'
	| 'morph-toggle'
	| 'checkmark-draw'
	| 'theme-toggle';

export interface ToggleConfig {
	id: string;
	label: string;
	interactionType: ToggleInteractionType;
	description: string;
	cliCommand: string;
}

export type ToggleVariant = Component<Record<string, never>>;
