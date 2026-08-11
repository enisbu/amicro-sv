<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;
</script>

<Div
	class="w-8 h-8 border-2 border-zinc-800 dark:border-zinc-700 flex items-center justify-center"
	animate={{ rotate: 90 }}
	transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
>
	<div class="w-2 h-2 bg-zinc-800 dark:bg-white"></div>
</Div>
