<script lang="ts">
	import { motion } from 'motion-sv';
	import { SAMPLE_WORDS } from '../samples.js';
</script>

<div class="flex gap-2 font-bold text-xl">
	{#each SAMPLE_WORDS as word, i (i)}
		<motion.span
			initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
			animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
			transition={{ duration: 0.5, delay: i * 0.12 }}
			class="text-indigo-600 dark:text-indigo-400"
		>
			{word}
		</motion.span>
	{/each}
</div>
