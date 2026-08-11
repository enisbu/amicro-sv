<script lang="ts">
	import { motion } from 'motion-sv';
	import { SAMPLE_WORDS } from '../samples.js';
</script>

<div class="flex gap-2 font-bold text-xl">
	{#each SAMPLE_WORDS as word, i (i)}
		<motion.span
			initial={{ y: 30, opacity: 0, scale: 0.8 }}
			animate={{ y: 0, opacity: 1, scale: 1 }}
			transition={{ type: 'spring', stiffness: 400, damping: 22, delay: i * 0.12 }}
			class="text-emerald-600 dark:text-emerald-400"
		>
			{word}
		</motion.span>
	{/each}
</div>
