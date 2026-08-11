<script lang="ts">
	import { motion } from 'motion-sv';
	import { getAppState } from '$lib/app/app-state.svelte.js';

	const app = getAppState();

	let isChecked = $state(false);
</script>

<button
	type="button"
	onclick={() => {
		app.haptic('light');
		isChecked = !isChecked;
	}}
	class="flex items-center gap-3 cursor-pointer border-0 bg-transparent"
>
	<motion.div
		animate={{ scale: isChecked ? [1, 1.15, 1] : 1 }}
		class="w-6 h-6 rounded-lg border flex items-center justify-center transition-colors {isChecked
			? 'bg-emerald-500 border-emerald-500 text-white'
			: 'border-neutral-300 bg-white dark:border-neutral-600 dark:bg-neutral-900'}"
	>
		{#if isChecked}
			<motion.svg
				class="w-4 h-4 text-white"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="3.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<motion.path
					d="M20 6L9 17l-5-5"
					initial={{ pathLength: 0 }}
					animate={{ pathLength: 1 }}
					transition={{ duration: 0.2 }}
				/>
			</motion.svg>
		{/if}
	</motion.div>
	<span class="text-sm font-medium text-black dark:text-white">Accept terms</span>
</button>
