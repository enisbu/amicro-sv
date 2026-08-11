<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;
</script>

<div class="flex flex-col space-y-1 w-8 items-center">
	{#each [0, 1, 2] as i}
		<Div
			class="w-full h-1 bg-zinc-800 dark:bg-white rounded-full"
			animate={{ opacity: [0.2, 1, 0.2], width: ['50%', '100%', '50%'] }}
			transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
		/>
	{/each}
</div>
