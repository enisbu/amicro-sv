<script lang="ts">
	import { motion } from 'motion-sv';
	import { SAMPLE_PHRASE, nbsp } from '../samples.js';
</script>

<div class="flex font-bold text-2xl">
	{#each SAMPLE_PHRASE.split('') as char, i (i)}
		<motion.span
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.3, delay: i * 0.05 }}
			class="text-black dark:text-white"
		>
			{nbsp(char)}
		</motion.span>
	{/each}
</div>
