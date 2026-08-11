<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;

	const cells: [number, number][] = [
		[0, 0], [1, 0], [2, 0],
		[0, 1], [1, 1], [2, 1],
		[0, 2], [1, 2], [2, 2]
	];
</script>

<div class="grid grid-cols-3 gap-1 w-10 h-10">
	{#each cells as [x, y], i}
		<Div
			class="bg-zinc-800 dark:bg-white rounded-sm w-full h-full"
			animate={{ opacity: [0.1, 1, 0.1] }}
			transition={{ duration: 1.5, repeat: Infinity, delay: (x + y) * 0.15, ease: 'easeInOut' }}
		/>
	{/each}
</div>
