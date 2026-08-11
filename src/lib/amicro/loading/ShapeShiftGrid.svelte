<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;
</script>

<div class="grid grid-cols-2 gap-1 w-8 h-8">
	{#each [0, 1, 2, 3] as i}
		<Div
			class="w-full h-full bg-zinc-800 dark:bg-white"
			animate={{ borderRadius: ['10%', '50%', '10%'], scale: [1, 0.8, 1] }}
			transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1, ease: 'easeInOut' }}
		/>
	{/each}
</div>
