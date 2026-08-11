<script lang="ts">
	import { motion } from 'motion-sv';
	import { SAMPLE_WORDS } from '../samples.js';
</script>

<div class="flex gap-2 font-bold text-xl [perspective:800px]">
	{#each SAMPLE_WORDS as word, i (i)}
		<motion.span
			initial={{ rotateX: -90, opacity: 0 }}
			animate={{ rotateX: 0, opacity: 1 }}
			transition={{ type: 'spring', stiffness: 350, damping: 18, delay: i * 0.12 }}
			class="text-purple-600 dark:text-purple-400"
		>
			{word}
		</motion.span>
	{/each}
</div>
