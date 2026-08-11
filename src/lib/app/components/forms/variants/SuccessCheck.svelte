<script lang="ts">
	import { motion, AnimatePresence } from 'motion-sv';
	import { getAppState } from '$lib/app/app-state.svelte.js';

	const app = getAppState();

	let isSuccess = $state(false);
</script>

<button
	type="button"
	onclick={() => {
		app.haptic('success');
		isSuccess = !isSuccess;
	}}
	class="relative px-4 py-2.5 rounded-2xl border flex items-center gap-2 text-sm font-semibold transition-all duration-300 cursor-pointer {isSuccess
		? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
		: 'bg-neutral-100 text-neutral-700 border-neutral-300 dark:bg-neutral-800 dark:text-neutral-300 dark:border-white/10'}"
>
	<span>{isSuccess ? 'Verified' : 'Click to Verify'}</span>
	<AnimatePresence>
		{#if isSuccess}
			<motion.svg
				initial={{ scale: 0 }}
				animate={{ scale: 1 }}
				exit={{ scale: 0 }}
				class="w-4 h-4 text-emerald-400"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="3"
			>
				<motion.path
					d="M20 6L9 17l-5-5"
					initial={{ pathLength: 0 }}
					animate={{ pathLength: 1 }}
					transition={{ duration: 0.3 }}
				/>
			</motion.svg>
		{/if}
	</AnimatePresence>
</button>
