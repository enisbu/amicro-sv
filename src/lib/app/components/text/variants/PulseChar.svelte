<script lang="ts">
	import { motion } from 'motion-sv';
	import { SAMPLE_PHRASE, nbsp } from '../samples.js';
</script>

<div class="flex font-bold text-2xl">
	{#each SAMPLE_PHRASE.split('') as char, i (i)}
		<motion.span
			animate={{ opacity: [0.3, 1, 0.3] }}
			transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.08 }}
			class="text-emerald-600 dark:text-emerald-400"
		>
			{nbsp(char)}
		</motion.span>
	{/each}
</div>
