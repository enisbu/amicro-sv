<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;

	const dots = Array.from({ length: 8 }, (_, i) => i);
</script>

<div class="w-16 h-3 overflow-hidden relative rounded-full bg-zinc-200 dark:bg-zinc-800">
	<Div
		class="flex h-full space-x-2 absolute top-0 items-center"
		animate={{ x: [0, -32] }}
		transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
	>
		{#each dots as i}
			<div class="w-1.5 h-1.5 bg-zinc-800 dark:bg-white rounded-full shrink-0"></div>
		{/each}
	</Div>
</div>
