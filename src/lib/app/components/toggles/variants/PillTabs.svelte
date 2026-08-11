<script lang="ts">
	import { motion, createLayoutMotion } from 'motion-sv';
	import { getAppState } from '$lib/app/app-state.svelte.js';

	const app = getAppState();

	type PillTab = 'Daily' | 'Weekly' | 'Monthly';
	const TABS: PillTab[] = ['Daily', 'Weekly', 'Monthly'];

	let pillTab = $state<PillTab>('Daily');

	const layout = createLayoutMotion(motion);

	const selectTab = (tab: PillTab) =>
		layout.update.with(() => {
			app.haptic('light');
			pillTab = tab;
		})();
</script>

<div
	class="relative p-1 rounded-full flex items-center border bg-neutral-200/80 border-neutral-300/40 dark:bg-neutral-900 dark:border-white/10"
>
	{#each TABS as tab (tab)}
		<button
			type="button"
			onclick={() => selectTab(tab)}
			class="relative px-3.5 py-1 text-xs font-semibold rounded-full z-10 transition-colors cursor-pointer border-0 bg-transparent {pillTab ===
			tab
				? 'text-black dark:text-white'
				: 'text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white'}"
		>
			{#if pillTab === tab}
				<layout.div
					layoutId="pill-tabs-indicator"
					layoutDependency={pillTab}
					transition={{ type: 'spring', stiffness: 500, damping: 30 }}
					class="absolute inset-0 rounded-full -z-10 shadow-sm bg-white dark:bg-neutral-800 dark:border dark:border-white/10"
				/>
			{/if}
			{tab}
		</button>
	{/each}
</div>
