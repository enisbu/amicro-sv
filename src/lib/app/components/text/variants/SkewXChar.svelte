<script lang="ts">
	import { motion } from 'motion-sv';
	import { SAMPLE_PHRASE, nbsp } from '../samples.js';
</script>

<div class="flex font-bold text-2xl">
	{#each SAMPLE_PHRASE.split('') as char, i (i)}
		<motion.span
			initial={{ skewX: -30, opacity: 0 }}
			animate={{ skewX: 0, opacity: 1 }}
			transition={{ duration: 0.4, delay: i * 0.04 }}
			class="text-black dark:text-white"
		>
			{nbsp(char)}
		</motion.span>
	{/each}
</div>
