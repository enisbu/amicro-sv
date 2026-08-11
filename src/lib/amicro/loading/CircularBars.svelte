<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;

	const bars = Array.from({ length: 8 }, (_, i) => i);
</script>

<div class="relative w-10 h-10">
	{#each bars as i}
		<Div
			class="absolute top-0 left-[18px] w-1 h-3 bg-zinc-800 dark:bg-white rounded-full origin-[2px_20px]"
			style={{ rotate: i * 45 }}
			animate={{ scaleY: [0.5, 1.5, 0.5] }}
			transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
		/>
	{/each}
</div>
