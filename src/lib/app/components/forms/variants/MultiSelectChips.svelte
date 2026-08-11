<script lang="ts">
	import { motion, AnimatePresence } from 'motion-sv';
	import { X } from '@lucide/svelte';
	import { getAppState } from '$lib/app/app-state.svelte.js';

	const app = getAppState();

	let chips = $state(['Next.js', 'Tailwind', 'Motion']);
</script>

<div class="flex flex-wrap gap-1.5 max-w-[240px]">
	<AnimatePresence>
		{#each chips as chip (chip)}
			<motion.span
				initial={{ scale: 0, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				exit={{ scale: 0, opacity: 0 }}
				class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-500/20 dark:text-indigo-300 dark:border-indigo-500/30"
			>
				{chip}
				<button
					type="button"
					aria-label="Remove {chip}"
					onclick={() => {
						app.haptic('light');
						chips = chips.filter((c) => c !== chip);
					}}
					class="hover:opacity-75 cursor-pointer border-0 bg-transparent p-0"
				>
					<X class="w-3 h-3" />
				</button>
			</motion.span>
		{/each}
	</AnimatePresence>
</div>
