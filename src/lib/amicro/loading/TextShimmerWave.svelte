<script lang="ts">
	import { motion } from 'motion-sv';

	const Span = motion.span;

	const text = 'Thinking';
	const chars = text.split('');
</script>

<div class="flex font-medium text-lg">
	{#each chars as char, i}
		<Span
			class="text-zinc-900 dark:text-white"
			animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
			transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1, ease: 'easeInOut' }}
		>
			{char}
		</Span>
	{/each}
</div>
