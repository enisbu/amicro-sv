<script lang="ts">
	import { motion } from 'motion-sv';
	import { SAMPLE_PHRASE, nbsp } from '../samples.js';
</script>

<div class="flex overflow-hidden font-bold text-2xl">
	{#each SAMPLE_PHRASE.split('') as char, i (i)}
		<motion.span
			initial={{ y: '100%' }}
			animate={{ y: 0 }}
			transition={{ duration: 0.4, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
			class="text-black dark:text-white"
		>
			{nbsp(char)}
		</motion.span>
	{/each}
</div>
