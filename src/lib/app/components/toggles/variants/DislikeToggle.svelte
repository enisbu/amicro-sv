<script lang="ts">
	import { motion } from 'motion-sv';
	import { ThumbsDown } from '@lucide/svelte';
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
	class="p-2.5 rounded-2xl flex items-center gap-2 text-xs font-medium transition-all cursor-pointer border {isOn
		? 'bg-amber-100 text-amber-600 border-amber-300 dark:bg-amber-500/20 dark:text-amber-400 dark:border-amber-500/40'
		: 'bg-neutral-100 text-neutral-600 border-neutral-200 hover:text-black dark:bg-white/[0.05] dark:text-neutral-400 dark:border-white/10 dark:hover:text-white'}"
>
	<motion.div animate={{ rotate: isOn ? [0, -15, 0] : 0 }}>
		<ThumbsDown class={cn('w-4 h-4', isOn && 'fill-current')} />
	</motion.div>
	<span>Dislike</span>
</button>
