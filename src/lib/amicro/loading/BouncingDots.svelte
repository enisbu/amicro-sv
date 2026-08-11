<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;

	const dots = [0, 1, 2].map((i) => ({
		left: `${i * 14 + 10}px`,
		delay: i * 0.1
	}));
</script>

<div
	class="flex space-x-2 h-12 items-end pb-2 border-b-2 border-zinc-200 dark:border-zinc-800 w-16 justify-center relative"
>
	{#each dots as dot}
		<Div
			class="w-3 h-3 bg-zinc-800 dark:bg-white rounded-full absolute bottom-2"
			style={{ left: dot.left }}
			animate={{ y: [0, -20, 0], scaleY: [0.8, 1.1, 0.8] }}
			transition={{ duration: 0.8, repeat: Infinity, delay: dot.delay, ease: 'easeInOut' }}
		/>
	{/each}
</div>
