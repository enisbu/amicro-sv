<script lang="ts">
	import { motion } from 'motion-sv';
	import { SAMPLE_PHRASE, nbsp } from '../samples.js';
</script>

<div class="flex font-bold text-2xl [perspective:1000px]">
	{#each SAMPLE_PHRASE.split('') as char, i (i)}
		<motion.span
			initial={{ rotateY: 90, opacity: 0 }}
			animate={{ rotateY: 0, opacity: 1 }}
			transition={{ duration: 0.5, delay: i * 0.05 }}
			class="text-indigo-600 dark:text-indigo-400"
		>
			{nbsp(char)}
		</motion.span>
	{/each}
</div>
