<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;
</script>

<Div
	class="relative w-10 h-10"
	animate={{ rotate: 360 }}
	transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
>
	{#each [0, 1, 2] as i}
		<div
			class="absolute top-0 left-1/2 w-2 h-2 bg-zinc-800 dark:bg-white rounded-full -ml-1 origin-[4px_20px]"
			style="transform: rotate({i * 120}deg)"
		></div>
	{/each}
</Div>
