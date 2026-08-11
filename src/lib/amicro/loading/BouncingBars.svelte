<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;
</script>

<div class="flex space-x-1.5 h-8 items-center">
	{#each [0, 1, 2] as i}
		<Div
			class="w-1.5 h-8 bg-zinc-800 dark:bg-white rounded-full"
			animate={{ scaleY: [0.3, 1, 0.3] }}
			transition={{ duration: 1, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
		/>
	{/each}
</div>
