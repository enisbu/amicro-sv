<script lang="ts">
	import { motion } from 'motion-sv';
	import { getAppState } from '$lib/app/app-state.svelte.js';

	const app = getAppState();

	let shakeKey = $state(0);
	let hasError = $state(false);
	let resetTimer: ReturnType<typeof setTimeout> | undefined;

	function triggerErrorShake() {
		app.haptic('error');
		hasError = true;
		shakeKey += 1;
		clearTimeout(resetTimer);
		resetTimer = setTimeout(() => (hasError = false), 800);
	}

	$effect(() => () => clearTimeout(resetTimer));
</script>

<div class="flex flex-col items-center gap-2 w-full max-w-[220px]">
	{#key shakeKey}
		<motion.input
			animate={hasError ? { x: [-10, 10, -8, 8, -4, 4, 0] } : { x: 0 }}
			transition={{ duration: 0.5 }}
			type="text"
			placeholder="Click button to test error"
			class="w-full px-3 py-2 rounded-xl border text-xs outline-none {hasError
				? 'border-red-500 text-red-500 bg-red-500/10'
				: 'bg-white border-neutral-300 text-black dark:bg-neutral-900 dark:border-neutral-700 dark:text-white'}"
		/>
	{/key}
	<button
		type="button"
		onclick={triggerErrorShake}
		class="px-3 py-1 text-xs font-semibold rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 cursor-pointer border-0"
	>
		Trigger Error Shake
	</button>
</div>
