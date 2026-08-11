<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;
</script>

<div class="relative w-12 h-12 flex items-center justify-center">
	<div class="w-3 h-3 bg-zinc-800 dark:bg-white rounded-full"></div>
	{#each [0, 1] as i}
		<Div
			class="absolute w-full h-full"
			animate={{ rotate: i === 0 ? 360 : -360 }}
			transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
		>
			<div class="absolute top-0 left-1/2 -ml-1 w-2 h-2 bg-zinc-500 dark:bg-zinc-350 rounded-full"></div>
		</Div>
	{/each}
</div>
