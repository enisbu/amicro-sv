<script lang="ts">
	import type { FormElementConfig, FormInteractionType, FormVariant } from './types.js';

	import CheckboxDraw from './variants/CheckboxDraw.svelte';
	import ErrorShake from './variants/ErrorShake.svelte';
	import FileUploadDropzone from './variants/FileUploadDropzone.svelte';
	import FloatingLabelInput from './variants/FloatingLabelInput.svelte';
	import FormSubmitButton from './variants/FormSubmitButton.svelte';
	import InputFocusGlow from './variants/InputFocusGlow.svelte';
	import MultiSelectChips from './variants/MultiSelectChips.svelte';
	import OtpInput from './variants/OtpInput.svelte';
	import PasswordToggle from './variants/PasswordToggle.svelte';
	import RadioScale from './variants/RadioScale.svelte';
	import RangeSlider from './variants/RangeSlider.svelte';
	import SearchExpand from './variants/SearchExpand.svelte';
	import SelectDropdown from './variants/SelectDropdown.svelte';
	import SuccessCheck from './variants/SuccessCheck.svelte';
	import TextareaAutoGrow from './variants/TextareaAutoGrow.svelte';

	export interface Props {
		config: FormElementConfig;
	}

	let { config }: Props = $props();

	const VARIANTS: Record<FormInteractionType, FormVariant> = {
		'floating-label-input': FloatingLabelInput,
		'input-focus-glow': InputFocusGlow,
		'password-toggle': PasswordToggle,
		'search-expand': SearchExpand,
		'checkbox-draw': CheckboxDraw,
		'radio-scale': RadioScale,
		'error-shake': ErrorShake,
		'success-check': SuccessCheck,
		'select-dropdown': SelectDropdown,
		'multi-select-chips': MultiSelectChips,
		'textarea-auto-grow': TextareaAutoGrow,
		'otp-input': OtpInput,
		'file-upload-dropzone': FileUploadDropzone,
		'range-slider': RangeSlider,
		'form-submit-button': FormSubmitButton
	};

	const Variant: FormVariant | undefined = $derived(VARIANTS[config.interactionType]);
</script>

<div class="relative flex items-center justify-center w-full h-full p-4 overflow-hidden select-none">
	{#if Variant}
		<Variant />
	{/if}
</div>
