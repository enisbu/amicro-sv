<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;
</script>

<div class="flex space-x-1.5">
	{#each [0, 1, 2] as i}
		<Div
			class="w-2.5 h-2.5 bg-zinc-800 dark:bg-white rounded-full"
			animate={{ opacity: [0.2, 1, 0.2] }}
			transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.2 }}
		/>
	{/each}
</div>
