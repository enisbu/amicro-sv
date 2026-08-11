<script lang="ts">
	import { motion } from 'motion-sv';

	const Span = motion.span;

	const text = 'Loading...';
	const chars = text.split('');
</script>

<div class="flex font-medium text-sm tracking-widest text-zinc-800 dark:text-white">
	{#each chars as char, i}
		<Span
			class="origin-bottom inline-block"
			animate={{ y: [0, -6, 0] }}
			transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.08 }}
		>
			{char === ' ' ? ' ' : char}
		</Span>
	{/each}
</div>
