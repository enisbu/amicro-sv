<script lang="ts">
	import { motion } from 'motion-sv';
	import { Bookmark } from '@lucide/svelte';
	import { getAppState } from '$lib/app/app-state.svelte.js';
	import { cn } from '$lib/app/utils.js';

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
	class="p-3 rounded-2xl flex items-center gap-2 font-medium text-xs transition-all cursor-pointer border {isOn
		? 'bg-blue-100 text-blue-600 border-blue-300 dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-500/40'
		: 'bg-neutral-100 text-neutral-600 border-neutral-200 hover:text-black dark:bg-white/[0.05] dark:text-neutral-400 dark:border-white/10 dark:hover:text-white'}"
>
	<motion.div animate={{ scale: isOn ? [1, 1.3, 1] : 1 }}>
		<Bookmark class={cn('w-4 h-4', isOn && 'fill-current')} />
	</motion.div>
	<span>{isOn ? 'Saved' : 'Bookmark'}</span>
</button>
