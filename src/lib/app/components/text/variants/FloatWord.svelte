<script lang="ts">
	import { motion } from 'motion-sv';
	import { SAMPLE_WORDS } from '../samples.js';
</script>

<div class="flex gap-2 font-bold text-xl">
	{#each SAMPLE_WORDS as word, i (i)}
		<motion.span
			animate={{ y: [0, -8, 0] }}
			transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
			class="text-cyan-600 dark:text-cyan-400"
		>
			{word}
		</motion.span>
	{/each}
</div>
