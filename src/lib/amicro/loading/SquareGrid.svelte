<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;
</script>

<div class="grid grid-cols-2 gap-1.5">
	{#each [0, 1, 2, 3] as i}
		<Div
			class="w-4 h-4 bg-zinc-800 dark:bg-white rounded-sm"
			animate={{ scale: [1, 0.5, 1], opacity: [1, 0.3, 1] }}
			transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
		/>
	{/each}
</div>
