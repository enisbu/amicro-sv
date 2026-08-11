import type { Component } from 'svelte';
import type { ButtonConfig } from '$lib/app/data/buttons.js';

export interface VariantProps {
	config: ButtonConfig;
	isHovered: boolean;
	isMatrix: boolean;
	isLightTheme: boolean;
	showIcon2: boolean;
}

export type ButtonVariant = Component<VariantProps>;

export const BASE_COLOR = 'text-black dark:text-[#e3e3e3]';
