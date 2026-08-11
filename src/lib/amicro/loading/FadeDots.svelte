<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;
</script>

<div class="flex space-x-2">
	{#each [0, 1, 2, 3] as i}
		<Div
			class="w-2.5 h-2.5 bg-zinc-800 dark:bg-white rounded-full"
			animate={{ opacity: [0, 1, 0] }}
			transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2, ease: 'linear' }}
		/>
	{/each}
</div>
