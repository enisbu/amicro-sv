<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;

	const dots = Array.from({ length: 8 }, (_, i) => i);
</script>

<div class="relative w-10 h-10">
	{#each dots as i}
		<Div
			class="absolute top-0 left-1/2 w-2 h-2 bg-zinc-800 dark:bg-white rounded-full -ml-1 origin-[4px_20px]"
			style={{ rotate: i * 45 }}
			animate={{ opacity: [1, 0.2] }}
			transition={{ duration: 1, repeat: Infinity, delay: i * 0.125, ease: 'linear' }}
		/>
	{/each}
</div>
