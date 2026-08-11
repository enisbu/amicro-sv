<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;
</script>

<div class="flex flex-col space-y-1.5 w-10 h-10 justify-center">
	{#each [0, 1, 2, 3] as i}
		<Div
			class="w-full h-1 bg-zinc-800 dark:bg-white rounded-full origin-left"
			animate={{ scaleX: [1, 0.2, 1] }}
			transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }}
		/>
	{/each}
</div>
