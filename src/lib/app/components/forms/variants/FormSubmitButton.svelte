<script lang="ts">
	import { Check, Loader2 } from '@lucide/svelte';
	import { getAppState } from '$lib/app/app-state.svelte.js';

	const app = getAppState();

	let submitState = $state<'idle' | 'loading' | 'success'>('idle');
	let successTimer: ReturnType<typeof setTimeout> | undefined;
	let resetTimer: ReturnType<typeof setTimeout> | undefined;

	function handleFormSubmit() {
		app.haptic('medium');
		submitState = 'loading';
		clearTimeout(successTimer);
		successTimer = setTimeout(() => {
			submitState = 'success';
			app.haptic('success');
			clearTimeout(resetTimer);
			resetTimer = setTimeout(() => (submitState = 'idle'), 2000);
		}, 1200);
	}

	$effect(() => () => {
		clearTimeout(successTimer);
		clearTimeout(resetTimer);
	});
</script>

<button
	type="button"
	onclick={handleFormSubmit}
	class="px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer border-0 shadow-lg {submitState ===
	'success'
		? 'bg-emerald-500 text-white'
		: submitState === 'loading'
			? 'bg-neutral-700 text-neutral-300'
			: 'bg-indigo-600 text-white hover:bg-indigo-500'}"
>
	{#if submitState === 'loading'}
		<Loader2 class="w-4 h-4 animate-spin text-white" />
		<span>Submitting...</span>
	{:else if submitState === 'success'}
		<Check class="w-4 h-4 text-white" />
		<span>Submitted!</span>
	{:else}
		<span>Submit Form</span>
	{/if}
</button>
