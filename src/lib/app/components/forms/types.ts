import type { Component } from 'svelte';

export type FormInteractionType =
	| 'floating-label-input'
	| 'input-focus-glow'
	| 'password-toggle'
	| 'search-expand'
	| 'checkbox-draw'
	| 'radio-scale'
	| 'error-shake'
	| 'success-check'
	| 'select-dropdown'
	| 'multi-select-chips'
	| 'textarea-auto-grow'
	| 'otp-input'
	| 'file-upload-dropzone'
	| 'range-slider'
	| 'form-submit-button';

export interface FormElementConfig {
	id: string;
	label: string;
	interactionType: FormInteractionType;
	description: string;
	cliCommand: string;
}

export type FormVariant = Component<Record<string, never>>;
