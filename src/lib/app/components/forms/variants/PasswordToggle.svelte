<script lang="ts">
	import { motion } from 'motion-sv';
	import { Eye, EyeOff } from '@lucide/svelte';
	import { getAppState } from '$lib/app/app-state.svelte.js';

	const app = getAppState();

	let showPassword = $state(false);
</script>

<div class="relative w-full max-w-[240px]">
	<input
		type={showPassword ? 'text' : 'password'}
		value="secretpass123"
		class="w-full pl-3 pr-10 py-2.5 rounded-xl border text-sm outline-none bg-white border-neutral-300 text-black dark:bg-neutral-900 dark:border-neutral-700 dark:text-white"
	/>
	<button
		type="button"
		aria-label={showPassword ? 'Hide password' : 'Show password'}
		onclick={() => {
			app.haptic('light');
			showPassword = !showPassword;
		}}
		class="absolute right-2.5 top-2.5 text-neutral-400 hover:text-neutral-200 cursor-pointer border-0 bg-transparent"
	>
		<motion.div animate={{ scale: showPassword ? 1.1 : 1, rotate: showPassword ? 0 : -10 }}>
			{#if showPassword}
				<Eye class="w-4 h-4 text-indigo-400" />
			{:else}
				<EyeOff class="w-4 h-4" />
			{/if}
		</motion.div>
	</button>
</div>
