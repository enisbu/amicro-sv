<script lang="ts">
	import { motion } from 'motion-sv';
	import { Search } from '@lucide/svelte';

	let isFocused = $state(false);
</script>

<motion.div
	animate={{ width: isFocused ? 240 : 160 }}
	transition={{ type: 'spring', stiffness: 400, damping: 28 }}
	class="relative flex items-center rounded-full border px-3 py-1.5 transition-colors bg-white border-neutral-300 text-black dark:bg-neutral-900 dark:border-neutral-700 dark:text-white"
>
	<Search class="w-4 h-4 text-neutral-400 shrink-0 mr-2" />
	<input
		type="text"
		placeholder="Search components..."
		onfocus={() => (isFocused = true)}
		onblur={() => (isFocused = false)}
		class="w-full text-xs bg-transparent border-0 outline-none"
	/>
</motion.div>
