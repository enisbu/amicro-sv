<script lang="ts">
	import { motion } from 'motion-sv';
	import { getAppState } from '$lib/app/app-state.svelte.js';

	const app = getAppState();

	let radioSelected = $state(false);
</script>

<button
	type="button"
	onclick={() => {
		app.haptic('light');
		radioSelected = !radioSelected;
	}}
	class="flex items-center gap-3 cursor-pointer border-0 bg-transparent"
>
	<div
		class="w-6 h-6 rounded-full border flex items-center justify-center {radioSelected
			? 'border-indigo-500'
			: 'border-neutral-300 bg-white dark:border-neutral-600 dark:bg-neutral-900'}"
	>
		{#if radioSelected}
			<motion.div
				initial={{ scale: 0 }}
				animate={{ scale: 1 }}
				transition={{ type: 'spring', stiffness: 500, damping: 25 }}
				class="w-3.5 h-3.5 rounded-full bg-indigo-500"
			/>
		{/if}
	</div>
	<span class="text-sm font-medium text-black dark:text-white">Option selected</span>
</button>
