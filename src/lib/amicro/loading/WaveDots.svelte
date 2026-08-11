<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;
</script>

<div class="flex space-x-1.5 h-6 items-center">
	{#each [0, 1, 2, 3, 4] as i}
		<Div
			class="w-2 h-2 bg-zinc-800 dark:bg-white rounded-full"
			animate={{ y: [4, -4, 4] }}
			transition={{ duration: 1, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
		/>
	{/each}
</div>
