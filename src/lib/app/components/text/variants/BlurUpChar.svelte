<script lang="ts">
	import { motion } from 'motion-sv';
	import { SAMPLE_PHRASE, nbsp } from '../samples.js';
</script>

<div class="flex font-bold text-2xl">
	{#each SAMPLE_PHRASE.split('') as char, i (i)}
		<motion.span
			initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
			animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
			transition={{ duration: 0.4, delay: i * 0.04 }}
			class="text-indigo-600 dark:text-indigo-400"
		>
			{nbsp(char)}
		</motion.span>
	{/each}
</div>
