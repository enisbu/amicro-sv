<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;
</script>

<div class="flex space-x-2">
	{#each [0, 1, 2] as i}
		<Div
			class="w-2.5 h-2.5 bg-zinc-800 dark:bg-white rounded-full"
			animate={{ scale: [0.5, 1, 0.5], opacity: [0.3, 1, 0.3] }}
			transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
		/>
	{/each}
</div>
