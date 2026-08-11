<script lang="ts">
	import { motion } from 'motion-sv';
	import { SAMPLE_PHRASE, nbsp } from '../samples.js';
</script>

<div class="flex font-bold text-2xl">
	{#each SAMPLE_PHRASE.split('') as char, i (i)}
		<motion.span
			animate={{ y: [0, -6, 0] }}
			transition={{ duration: 2, repeat: Infinity, delay: i * 0.1, ease: 'easeInOut' }}
			class="text-cyan-600 dark:text-cyan-400"
		>
			{nbsp(char)}
		</motion.span>
	{/each}
</div>
