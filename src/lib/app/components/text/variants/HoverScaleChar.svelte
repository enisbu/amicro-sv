<script lang="ts">
	import { motion } from 'motion-sv';
	import { SAMPLE_PHRASE, nbsp } from '../samples.js';
</script>

<div class="flex font-bold text-2xl cursor-pointer">
	{#each SAMPLE_PHRASE.split('') as char, i (i)}
		<motion.span
			whileHover={{ scale: 1.4 }}
			transition={{ type: 'spring', stiffness: 500, damping: 18 }}
			class="text-pink-600 dark:text-pink-400"
		>
			{nbsp(char)}
		</motion.span>
	{/each}
</div>
