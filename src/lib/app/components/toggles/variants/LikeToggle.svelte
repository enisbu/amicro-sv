<script lang="ts">
	import { motion } from 'motion-sv';
	import { Heart } from '@lucide/svelte';
	import { getAppState } from '$lib/app/app-state.svelte.js';
	import { cn } from '$lib/app/utils.js';

	const app = getAppState();

	let isOn = $state(false);
	let likeCount = $state(42);

	function handleLike() {
		app.haptic('success');
		likeCount = isOn ? likeCount - 1 : likeCount + 1;
		isOn = !isOn;
	}
</script>

<button
	type="button"
	onclick={handleLike}
	class="p-2.5 px-3.5 rounded-2xl flex items-center gap-2 text-xs font-semibold transition-all cursor-pointer border {isOn
		? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
		: 'bg-neutral-100 text-neutral-600 border-neutral-200 hover:text-black dark:bg-white/[0.05] dark:text-neutral-400 dark:border-white/10 dark:hover:text-white'}"
>
	<motion.div animate={{ scale: isOn ? [1, 1.4, 1] : 1 }}>
		<Heart class={cn('w-4 h-4', isOn && 'fill-rose-500 text-rose-500')} />
	</motion.div>
	<span>{likeCount}</span>
</button>
