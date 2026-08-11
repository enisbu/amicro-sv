<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;
</script>

<div
	class="flex items-center justify-center px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-full space-x-1"
>
	{#each [0, 1, 2] as i}
		<Div
			class="w-1.5 h-1.5 bg-zinc-500 dark:bg-zinc-350 rounded-full"
			animate={{ y: [0, -4, 0] }}
			transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
		/>
	{/each}
</div>
