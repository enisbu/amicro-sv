<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;

	const vals = [0, 1, 2, 3, 4, 3, 2, 1, 0];
</script>

<div class="flex space-x-1.5 h-10 items-center">
	{#each vals as val, i}
		<Div
			class="w-1.5 bg-zinc-800 dark:bg-white rounded-full"
			animate={{ height: [8, 24, 8] }}
			transition={{ duration: 1.2, repeat: Infinity, delay: val * 0.1, ease: 'easeInOut' }}
		/>
	{/each}
</div>
