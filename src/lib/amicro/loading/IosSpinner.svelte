<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;

	const spokes = Array.from({ length: 12 }, (_, i) => i);
</script>

<div class="relative w-8 h-8">
	{#each spokes as i}
		<Div class="absolute w-full h-full" style={{ rotate: i * 30 }}>
			<Div
				class="w-[2px] h-[7px] bg-zinc-800 dark:bg-white rounded-full mx-auto"
				animate={{ opacity: [1, 0.2] }}
				transition={{ duration: 1, repeat: Infinity, delay: i * (1 / 12), ease: 'linear' }}
			/>
		</Div>
	{/each}
</div>
