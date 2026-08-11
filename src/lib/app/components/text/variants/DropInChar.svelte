<script lang="ts">
	import { motion } from 'motion-sv';
	import { SAMPLE_PHRASE, nbsp } from '../samples.js';
</script>

<div class="flex font-bold text-2xl">
	{#each SAMPLE_PHRASE.split('') as char, i (i)}
		<motion.span
			initial={{ y: -50, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ type: 'spring', stiffness: 500, damping: 25, delay: i * 0.04 }}
			class="text-cyan-600 dark:text-cyan-400"
		>
			{nbsp(char)}
		</motion.span>
	{/each}
</div>
