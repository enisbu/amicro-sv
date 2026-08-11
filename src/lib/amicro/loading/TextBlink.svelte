<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;
</script>

<Div
	class="text-zinc-900 dark:text-white font-medium text-lg"
	animate={{ opacity: [1, 0.2, 1] }}
	transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
>
	Thinking
</Div>
