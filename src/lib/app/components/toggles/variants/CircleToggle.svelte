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
	class="relative w-16 h-9 rounded-full p-1 transition-colors duration-300 cursor-pointer border-0 {isOn
		? 'bg-indigo-500'
		: 'bg-neutral-300 dark:bg-neutral-800'}"
>
	<motion.div
		animate={{ x: isOn ? 28 : 0 }}
		transition={{ type: 'spring', stiffness: 450, damping: 25 }}
		class="w-7 h-7 bg-white rounded-full shadow-md"
	/>
</button>
