<script lang="ts">
	import { motion } from 'motion-sv';
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
	class="relative w-14 h-8 rounded-full p-1 transition-colors duration-200 cursor-pointer border-0 {isOn
		? 'bg-black text-white dark:bg-white dark:text-black'
		: 'bg-neutral-200 border border-neutral-300 dark:bg-neutral-800 dark:border-white/10'}"
>
	<motion.div
		animate={{ x: isOn ? 24 : 0 }}
		transition={{ duration: 0.15, ease: 'easeOut' }}
		class="w-6 h-6 rounded-full shadow-sm {isOn
			? 'bg-white dark:bg-black'
			: 'bg-black dark:bg-white'}"
	/>
</button>
