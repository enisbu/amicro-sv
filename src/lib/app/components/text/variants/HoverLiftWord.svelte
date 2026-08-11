<script lang="ts">
	import { motion } from 'motion-sv';
	import { SAMPLE_WORDS } from '../samples.js';
</script>

<div class="flex gap-2 font-bold text-xl cursor-pointer">
	{#each SAMPLE_WORDS as word, i (i)}
		<motion.span
			whileHover={{ y: -6, color: '#3b82f6' }}
			transition={{ type: 'spring', stiffness: 400, damping: 18 }}
			class="text-black dark:text-white"
		>
			{word}
		</motion.span>
	{/each}
</div>
