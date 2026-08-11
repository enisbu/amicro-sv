<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;
</script>

<Div
	class="flex space-x-1 h-8 items-center"
	animate={{ gap: ['4px', '0px', '4px'] }}
	transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
>
	{#each [0, 1, 2] as i}
		<Div
			class="w-2 h-8 bg-zinc-800 dark:bg-white rounded-sm"
			animate={{ height: [32, 16, 32] }}
			transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
		/>
	{/each}
</Div>
