<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;

	const cells: [number, number][] = [
		[0, 0], [1, 1], [2, 0],
		[0, 2], [1, 1], [2, 2]
	];
</script>

<div class="grid grid-cols-3 gap-2 w-12 h-12">
	{#each cells as [col, row], i}
		<Div
			class="w-2.5 h-2.5 bg-zinc-800 dark:bg-white rounded-full"
			style={{ gridColumn: col + 1, gridRow: row + 1 }}
			animate={{ opacity: [0.2, 1, 0.2] }}
			transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.1, ease: 'easeInOut' }}
		/>
	{/each}
</div>
