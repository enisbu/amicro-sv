<script lang="ts">
	import { motion } from 'motion-sv';
	import { Moon, Sun } from '@lucide/svelte';
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
		? 'bg-indigo-950 border border-indigo-700/50'
		: 'bg-amber-100 border border-amber-300'}"
>
	<motion.div
		animate={{ x: isOn ? 28 : 0, rotate: isOn ? 360 : 0 }}
		transition={{ type: 'spring', stiffness: 350, damping: 22 }}
		class="w-7 h-7 rounded-full shadow-md flex items-center justify-center {isOn
			? 'bg-indigo-900 text-yellow-300'
			: 'bg-amber-400 text-white'}"
	>
		{#if isOn}
			<Moon class="w-4 h-4 fill-yellow-300" />
		{:else}
			<Sun class="w-4 h-4 fill-white" />
		{/if}
	</motion.div>
</button>
