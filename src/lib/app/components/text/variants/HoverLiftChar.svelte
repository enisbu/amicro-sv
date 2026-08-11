<script lang="ts">
	import { motion } from 'motion-sv';
	import { SAMPLE_PHRASE, nbsp } from '../samples.js';
</script>

<div class="flex font-bold text-2xl cursor-pointer">
	{#each SAMPLE_PHRASE.split('') as char, i (i)}
		<motion.span
			whileHover={{ y: -8, scale: 1.2, color: '#6366f1' }}
			transition={{ type: 'spring', stiffness: 500, damping: 15 }}
			class="text-black dark:text-white"
		>
			{nbsp(char)}
		</motion.span>
	{/each}
</div>
