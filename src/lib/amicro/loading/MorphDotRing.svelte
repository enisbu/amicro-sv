<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;
</script>

<Div
	class="grid grid-cols-2 gap-1 w-6 h-6"
	animate={{ rotate: 180, gap: ['4px', '0px', '4px'] }}
	transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
>
	{#each [0, 1, 2, 3] as i}
		<div class="w-full h-full bg-zinc-800 dark:bg-white rounded-full"></div>
	{/each}
</Div>
