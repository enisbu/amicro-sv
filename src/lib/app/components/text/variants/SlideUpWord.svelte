<script lang="ts">
	import { motion } from 'motion-sv';
	import { SAMPLE_WORDS } from '../samples.js';
</script>

<div class="flex gap-2 overflow-hidden font-bold text-xl">
	{#each SAMPLE_WORDS as word, i (i)}
		<motion.span
			initial={{ y: '100%' }}
			animate={{ y: 0 }}
			transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
			class="text-black dark:text-white"
		>
			{word}
		</motion.span>
	{/each}
</div>
