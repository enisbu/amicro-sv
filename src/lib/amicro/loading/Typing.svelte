<script lang="ts">
	import { motion } from 'motion-sv';

	const Span = motion.span;
</script>

<div class="flex items-center text-zinc-900 dark:text-white font-medium text-lg w-20">
	Loading
	<Span
		class="w-1.5 h-4 bg-zinc-900 dark:bg-white ml-1 inline-block"
		animate={{ opacity: [1, 0, 1] }}
		transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
	/>
</div>
