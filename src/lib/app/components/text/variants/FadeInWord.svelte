<script lang="ts">
	import { motion } from 'motion-sv';
	import { SAMPLE_WORDS } from '../samples.js';
</script>

<div class="flex gap-2 font-bold text-xl">
	{#each SAMPLE_WORDS as word, i (i)}
		<motion.span
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.4, delay: i * 0.15 }}
			class="text-black dark:text-white"
		>
			{word}
		</motion.span>
	{/each}
</div>
