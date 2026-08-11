<script lang="ts">
	import { motion } from 'motion-sv';
	import { SAMPLE_WORDS } from '../samples.js';
</script>

<div class="flex gap-2 font-bold text-xl">
	{#each SAMPLE_WORDS as word, i (i)}
		<motion.span
			animate={{ opacity: [0.3, 1, 0.3] }}
			transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.25 }}
			class="text-emerald-600 dark:text-emerald-400"
		>
			{word}
		</motion.span>
	{/each}
</div>
