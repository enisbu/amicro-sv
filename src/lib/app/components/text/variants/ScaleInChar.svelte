<script lang="ts">
	import { motion } from 'motion-sv';
	import { SAMPLE_PHRASE, nbsp } from '../samples.js';
</script>

<div class="flex font-bold text-2xl">
	{#each SAMPLE_PHRASE.split('') as char, i (i)}
		<motion.span
			initial={{ scale: 0 }}
			animate={{ scale: 1 }}
			transition={{ type: 'spring', stiffness: 450, damping: 22, delay: i * 0.04 }}
			class="text-black dark:text-white"
		>
			{nbsp(char)}
		</motion.span>
	{/each}
</div>
