<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;
</script>

<div class="flex space-x-1 items-center h-8">
	{#each [0, 1, 2, 3, 4] as i}
		<Div
			class="w-1.5 bg-zinc-800 dark:bg-white rounded-full"
			animate={{ height: ['8px', '24px', '8px'] }}
			transition={{ duration: 1, repeat: Infinity, delay: i * 0.1, ease: 'easeInOut' }}
		/>
	{/each}
</div>
