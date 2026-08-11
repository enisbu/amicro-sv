<script lang="ts">
	import { motion } from 'motion-sv';
	import { SAMPLE_WORDS } from '../samples.js';
</script>

<div class="flex gap-2 font-bold text-xl">
	{#each SAMPLE_WORDS as word, i (i)}
		<motion.span
			initial={{ y: 20, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
			class="text-black dark:text-white"
		>
			{word}
		</motion.span>
	{/each}
</div>
