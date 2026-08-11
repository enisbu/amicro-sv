<script lang="ts">
	import { motion } from 'motion-sv';
	import { Repeat } from '@lucide/svelte';
	import { getAppState } from '$lib/app/app-state.svelte.js';

	const app = getAppState();

	let isOn = $state(false);
	let repostCount = $state(18);

	function handleRepost() {
		app.haptic('medium');
		repostCount = isOn ? repostCount - 1 : repostCount + 1;
		isOn = !isOn;
	}
</script>

<button
	type="button"
	onclick={handleRepost}
	class="p-2.5 px-3.5 rounded-2xl flex items-center gap-2 text-xs font-semibold transition-all cursor-pointer border {isOn
		? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
		: 'bg-neutral-100 text-neutral-600 border-neutral-200 hover:text-black dark:bg-white/[0.05] dark:text-neutral-400 dark:border-white/10 dark:hover:text-white'}"
>
	<motion.div animate={{ rotate: isOn ? 180 : 0 }} transition={{ duration: 0.3 }}>
		<Repeat class="w-4 h-4" />
	</motion.div>
	<span>{repostCount}</span>
</button>
