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
	class="relative w-14 h-8 rounded-md p-1 transition-colors duration-200 cursor-pointer border {isOn
		? 'bg-blue-600 border-blue-500'
		: 'bg-neutral-100 border-neutral-300 dark:bg-neutral-900 dark:border-neutral-700'}"
>
	<motion.div
		animate={{ x: isOn ? 24 : 0 }}
		transition={{ type: 'spring', stiffness: 500, damping: 30 }}
		class="w-5 h-5 bg-white rounded-sm shadow-md"
	/>
</button>
