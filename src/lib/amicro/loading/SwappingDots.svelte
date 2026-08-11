<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;
</script>

<div class="relative w-12 h-4 flex items-center">
	<Div
		class="absolute left-0 w-4 h-4 bg-zinc-800 dark:bg-white rounded-full"
		animate={{ x: [0, 32, 0] }}
		transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
	/>
	<Div
		class="absolute right-0 w-4 h-4 bg-zinc-400 dark:bg-zinc-200 rounded-full"
		animate={{ x: [0, -32, 0] }}
		transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
	/>
</div>
