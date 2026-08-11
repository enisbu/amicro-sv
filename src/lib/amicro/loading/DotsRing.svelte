<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;

	const dots = Array.from({ length: 8 }, (_, i) => i);
</script>

<div class="relative w-12 h-12">
	{#each dots as i}
		<Div
			class="absolute top-0 left-1/2 w-2 h-2 bg-zinc-800 dark:bg-white rounded-full -ml-1 origin-[4px_24px]"
			style={{ rotate: i * 45 }}
			animate={{ scale: [1, 0.5, 1], opacity: [1, 0.3, 1] }}
			transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
		/>
	{/each}
</div>
