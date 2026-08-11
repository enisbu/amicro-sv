<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;

	const rings = [0, 1, 2];
</script>

<div class="relative w-12 h-12 flex items-center justify-center">
	{#each rings as i}
		<Div
			class="absolute rounded-full border-[3px] border-transparent border-t-zinc-800 dark:border-t-white"
			style={{ width: `${44 - i * 12}px`, height: `${44 - i * 12}px` }}
			animate={{ rotate: 360 }}
			transition={{ duration: 1 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
		/>
	{/each}
</div>
