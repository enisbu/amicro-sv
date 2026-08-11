<script lang="ts">
	import { motion, AnimatePresence } from 'motion-sv';
	import { getAppState } from '$lib/app/app-state.svelte.js';

	const app = getAppState();

	let isOn = $state(false);

	function handleToggle() {
		app.haptic('medium');
		isOn = !isOn;
	}
</script>

<button
	type="button"
	onclick={handleToggle}
	class="relative w-16 h-9 rounded-full p-1 transition-colors duration-300 cursor-pointer border-0 {isOn
		? 'bg-emerald-500'
		: 'bg-neutral-300 dark:bg-neutral-800'}"
>
	<motion.div
		animate={{ x: isOn ? 28 : 0 }}
		transition={{ type: 'spring', stiffness: 500, damping: 28 }}
		class="w-7 h-7 bg-white rounded-full shadow-md flex items-center justify-center"
	>
		<AnimatePresence mode="wait">
			{#if isOn}
				<motion.svg
					initial={{ scale: 0, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					exit={{ scale: 0, opacity: 0 }}
					class="w-4 h-4 text-emerald-600"
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
						transition={{ duration: 0.25 }}
					/>
				</motion.svg>
			{/if}
		</AnimatePresence>
	</motion.div>
</button>
