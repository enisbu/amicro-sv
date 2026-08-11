<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;
</script>

<div class="flex items-center space-x-0.5 h-8">
	{#each Array.from({ length: 8 }, (_, i) => i) as i}
		<Div
			class="w-1 bg-zinc-800 dark:bg-white rounded-full"
			animate={{ height: [4, 24, 4] }}
			transition={{ duration: 1, repeat: Infinity, delay: Math.sin(i) * 0.5, ease: 'easeInOut' }}
		/>
	{/each}
</div>
