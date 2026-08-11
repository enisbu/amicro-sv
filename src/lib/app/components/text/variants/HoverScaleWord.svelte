<script lang="ts">
	import { motion } from 'motion-sv';
	import { SAMPLE_WORDS } from '../samples.js';
</script>

<div class="flex gap-2 font-bold text-xl cursor-pointer">
	{#each SAMPLE_WORDS as word, i (i)}
		<motion.span
			whileHover={{ scale: 1.25 }}
			transition={{ type: 'spring', stiffness: 400, damping: 20 }}
			class="text-pink-600 dark:text-pink-400"
		>
			{word}
		</motion.span>
	{/each}
</div>
