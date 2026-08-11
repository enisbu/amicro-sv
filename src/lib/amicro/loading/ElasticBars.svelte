<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;
</script>

<div class="flex space-x-2 h-10 items-center justify-center">
	{#each [0, 1, 2] as i}
		<Div
			class="w-2 bg-zinc-800 dark:bg-white rounded-full"
			animate={{ height: [8, 36, 8] }}
			transition={{
				duration: 1.1,
				repeat: Infinity,
				ease: 'easeInOut',
				delay: i * 0.15
			}}
		/>
	{/each}
</div>
