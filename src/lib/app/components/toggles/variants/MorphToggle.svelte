<script lang="ts">
	import { motion } from 'motion-sv';
	import { Lock, Unlock } from '@lucide/svelte';
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
		? 'bg-indigo-600'
		: 'bg-neutral-300 dark:bg-neutral-800'}"
>
	<motion.div
		animate={{ x: isOn ? 28 : 0, rotate: isOn ? 180 : 0 }}
		transition={{ type: 'spring', stiffness: 400, damping: 25 }}
		class="w-7 h-7 bg-white rounded-full shadow-md flex items-center justify-center text-neutral-800"
	>
		{#if isOn}
			<Unlock class="w-4 h-4 text-indigo-600" />
		{:else}
			<Lock class="w-4 h-4 text-neutral-600" />
		{/if}
	</motion.div>
</button>
