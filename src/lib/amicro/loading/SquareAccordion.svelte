<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;
</script>

<div class="flex space-x-1 w-12 h-12 justify-center items-center">
	{#each [0, 1, 2] as i}
		<Div
			class="w-3 bg-zinc-800 dark:bg-white rounded-sm"
			animate={{ height: [12, 32, 12] }}
			transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
		/>
	{/each}
</div>
