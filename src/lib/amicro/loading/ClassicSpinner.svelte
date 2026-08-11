<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;

	const spokes = Array.from({ length: 12 }, (_, i) => i);
</script>

<div class="relative w-8 h-8">
	{#each spokes as i}
		<Div
			class="absolute top-0 left-[14px] w-[4px] h-[8px] bg-zinc-400 dark:bg-zinc-200 rounded-full origin-[2px_16px]"
			style={{ rotate: i * 30 }}
			animate={{ opacity: [1, 0.2] }}
			transition={{
				duration: 1,
				repeat: Infinity,
				ease: 'linear',
				delay: i * (1 / 12)
			}}
		/>
	{/each}
</div>
