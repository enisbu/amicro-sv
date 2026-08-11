<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;

	const delays = [0, 0.1, 0.25, 0.4];
</script>

<div class="flex space-x-1 h-8 items-end">
	{#each delays as delay}
		<Div
			class="w-1.5 bg-zinc-800 dark:bg-white rounded-t-sm"
			animate={{ height: ['20%', '100%', '20%'] }}
			transition={{ duration: 0.8, repeat: Infinity, delay, ease: 'circInOut' }}
		/>
	{/each}
</div>
