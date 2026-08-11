<script lang="ts">
	import { motion } from 'motion-sv';

	const Span = motion.span;
</script>

<div class="font-medium text-lg text-zinc-900 dark:text-white flex w-24">
	<span>Thinking</span>
	<span class="flex w-6 pl-0.5">
		<Span animate={{ opacity: [0, 1, 1, 0] }} transition={{ duration: 2, repeat: Infinity, times: [0, 0.2, 0.8, 1] }}>.</Span>
		<Span animate={{ opacity: [0, 0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, times: [0, 0.4, 0.8, 1] }}>.</Span>
		<Span animate={{ opacity: [0, 0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, times: [0, 0.6, 0.8, 1] }}>.</Span>
	</span>
</div>
