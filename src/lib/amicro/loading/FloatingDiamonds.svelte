<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;
</script>

<div class="flex space-x-2">
	{#each [0, 1, 2] as i}
		<Div
			class="w-3 h-3 bg-zinc-800 dark:bg-white rounded-sm rotate-45"
			animate={{ y: [0, -10, 0] }}
			transition={{ duration: 1, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
		/>
	{/each}
</div>
