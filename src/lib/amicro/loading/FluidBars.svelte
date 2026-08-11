<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;
</script>

<div class="flex space-x-1">
	{#each [0, 1, 2, 3] as i}
		<Div
			class="w-1.5 h-8 bg-zinc-800 dark:bg-white rounded-full origin-bottom"
			animate={{ rotate: [-15, 15, -15], scaleY: [0.8, 1, 0.8] }}
			transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1, ease: 'easeInOut' }}
		/>
	{/each}
</div>
