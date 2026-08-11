<script lang="ts">
	import { motion } from 'motion-sv';

	const Span = motion.span;
</script>

<div class="flex items-center text-zinc-900 dark:text-white font-mono text-sm">
	<span>~ %</span>
	<Span
		class="ml-1.5 w-2 h-4 bg-zinc-900 dark:bg-white inline-block"
		animate={{ opacity: [1, 0, 1] }}
		transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
	/>
</div>
