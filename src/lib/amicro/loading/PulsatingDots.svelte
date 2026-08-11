<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;
</script>

<div class="flex space-x-2">
	{#each [0, 1, 2] as i}
		<Div
			class="w-3 h-3 bg-zinc-800 dark:bg-white rounded-full"
			animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
			transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
		/>
	{/each}
</div>
