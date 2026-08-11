<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;
</script>

<div class="flex flex-col space-y-2 w-10 justify-center">
	{#each [0, 1, 2] as i}
		<Div
			class="h-1.5 bg-zinc-800 dark:bg-white rounded-full origin-left"
			animate={{ scaleX: [0.2, 1, 0.2] }}
			transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }}
		/>
	{/each}
</div>
