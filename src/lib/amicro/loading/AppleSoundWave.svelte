<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;

	const bars = [
		{ val: 1, delay: 0 },
		{ val: 2, delay: 0.1 },
		{ val: 3, delay: 0.2 },
		{ val: 2, delay: 0.3 },
		{ val: 1, delay: 0.4 }
	];
</script>

<div class="flex space-x-1 h-8 items-center">
	{#each bars as bar}
		<Div
			class="w-1 bg-zinc-800 dark:bg-white rounded-full"
			animate={{ height: [4, bar.val * 8, 4] }}
			transition={{ duration: 1, repeat: Infinity, delay: bar.delay, ease: 'easeInOut' }}
		/>
	{/each}
</div>
