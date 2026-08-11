<script lang="ts">
	import { motion, AnimatePresence } from 'motion-sv';
	import { ChevronDown } from '@lucide/svelte';
	import { getAppState } from '$lib/app/app-state.svelte.js';
	import { cn } from '$lib/app/utils.js';

	const app = getAppState();

	const OPTIONS = ['React', 'Vue', 'Svelte', 'Solid'];

	let selectOpen = $state(false);
	let selectedOption = $state('React');
</script>

<div class="relative w-full max-w-[200px]">
	<button
		type="button"
		onclick={() => {
			app.haptic('light');
			selectOpen = !selectOpen;
		}}
		class="w-full flex items-center justify-between px-3 py-2 rounded-xl border text-xs font-medium cursor-pointer bg-white border-neutral-300 text-black dark:bg-neutral-900 dark:border-neutral-700 dark:text-white"
	>
		<span>{selectedOption}</span>
		<ChevronDown class={cn('w-3.5 h-3.5 transition-transform', selectOpen && 'rotate-180')} />
	</button>
	<AnimatePresence>
		{#if selectOpen}
			<motion.div
				initial={{ opacity: 0, scale: 0.95, y: -6 }}
				animate={{ opacity: 1, scale: 1, y: 4 }}
				exit={{ opacity: 0, scale: 0.95, y: -6 }}
				class="absolute left-0 right-0 z-30 p-1 rounded-xl border shadow-xl flex flex-col gap-0.5 bg-white border-neutral-200 text-black dark:bg-neutral-900 dark:border-neutral-700 dark:text-white"
			>
				{#each OPTIONS as opt (opt)}
					<button
						type="button"
						onclick={() => {
							selectedOption = opt;
							selectOpen = false;
						}}
						class="w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer border-0 {selectedOption ===
						opt
							? 'bg-neutral-100 text-black dark:bg-white/10 dark:text-white'
							: 'hover:bg-neutral-50 text-neutral-600 dark:hover:bg-white/5 dark:text-neutral-400'}"
					>
						{opt}
					</button>
				{/each}
			</motion.div>
		{/if}
	</AnimatePresence>
</div>
