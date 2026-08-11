import type { Component } from 'svelte';

export type TextInteractionType =

	| 'dia-text-reveal'

	| 'blur-text'
	| 'shimmer-text'
	| 'typewriter-text'
	| 'reveal-text'
	| 'fade-in-char'
	| 'fade-in-word'
	| 'fade-in-text'
	| 'blur-up-word'
	| 'blur-up-char'

	| 'stagger-text'
	| 'slide-up-char'
	| 'slide-up-word'
	| 'slide-up-text'
	| 'slide-down-char'
	| 'slide-down-word'
	| 'slide-left-char'
	| 'slide-right-char'
	| 'drop-in-char'
	| 'rise-up-word'
	| 'bounce-in-char'

	| 'scale-in-char'
	| 'scale-in-word'
	| 'scale-in-text'
	| 'zoom-in-text'
	| 'zoom-out-text'

	| 'flip-y-char'
	| 'flip-x-char'
	| 'rotate-in-char'
	| 'swing-word'

	| 'stretch-x-char'
	| 'stretch-y-char'
	| 'skew-x-char'
	| 'tracking-in-text'
	| 'tracking-out-text'

	| 'spring-text'
	| 'hover-lift-char'
	| 'hover-lift-word'
	| 'hover-scale-char'
	| 'hover-scale-word'

	| 'float-char'
	| 'float-word'
	| 'pulse-char'
	| 'pulse-word'
	| 'glow-text';

export interface TextAnimationConfig {
	id: string;
	label: string;
	interactionType: TextInteractionType;
	description: string;
	cliCommand: string;
	category?: string;
}

export type TextVariant = Component<Record<string, never>>;
