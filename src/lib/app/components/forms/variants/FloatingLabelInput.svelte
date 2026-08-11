<script lang="ts">
	import { motion } from 'motion-sv';
	import { getAppState } from '$lib/app/app-state.svelte.js';

	const app = getAppState();
	const isDark = $derived(app.theme === 'dark');

	const fieldId = $props.id();

	let val = $state('');
	let isFocused = $state(false);
</script>

<div class="relative w-full max-w-[240px]">
	<motion.label
		for={fieldId}
		animate={{
			y: isFocused || val ? -24 : 0,
			scale: isFocused || val ? 0.85 : 1,
			color: isFocused ? (isDark ? '#3b82f6' : '#2563eb') : isDark ? '#9ca3af' : '#6b7280'
		}}
		transition={{ type: 'spring', stiffness: 400, damping: 25 }}
		class="absolute left-3 top-2.5 origin-left pointer-events-none text-sm font-medium"
	>
		Email Address
	</motion.label>
	<input
		id={fieldId}
		type="text"
		bind:value={val}
		onfocus={() => (isFocused = true)}
		onblur={() => (isFocused = false)}
		class="w-full px-3 py-2 pt-3 rounded-xl border text-sm outline-none transition-colors bg-white border-neutral-300 text-black focus:border-blue-600 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:focus:border-blue-500"
	/>
</div>
