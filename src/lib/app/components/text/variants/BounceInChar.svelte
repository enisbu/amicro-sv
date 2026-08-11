<script lang="ts">
	import { motion } from 'motion-sv';
	import { SAMPLE_PHRASE, nbsp } from '../samples.js';
</script>

<div class="flex font-bold text-2xl">
	{#each SAMPLE_PHRASE.split('') as char, i (i)}
		<motion.span
			initial={{ scale: 0, opacity: 0 }}
			animate={{ scale: [0, 1.3, 1], opacity: 1 }}
			transition={{ duration: 0.5, delay: i * 0.05 }}
			class="text-pink-600 dark:text-pink-400"
		>
			{nbsp(char)}
		</motion.span>
	{/each}
</div>
