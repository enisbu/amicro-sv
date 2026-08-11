<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;
</script>

<div class="relative w-12 h-12 flex items-center justify-center">
	<div class="absolute w-2.5 h-2.5 bg-zinc-800 dark:bg-white rounded-full"></div>
	{#each [0, 1, 2] as i}
		<Div
			class="absolute w-8 h-8 border border-zinc-850 dark:border-white rounded-full"
			initial={{ scale: 0.3, opacity: 0.8 }}
			animate={{ scale: 1.6, opacity: 0 }}
			transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', delay: i * 0.7 }}
		/>
	{/each}
</div>
