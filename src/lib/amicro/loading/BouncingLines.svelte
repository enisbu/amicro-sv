<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;
</script>

<div class="flex flex-col space-y-1.5 w-8">
	{#each [0, 1, 2] as i}
		<Div
			class="w-full h-1.5 bg-zinc-800 dark:bg-white rounded-full origin-left"
			animate={{ scaleX: [0.3, 1, 0.3] }}
			transition={{ duration: 1, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
		/>
	{/each}
</div>
