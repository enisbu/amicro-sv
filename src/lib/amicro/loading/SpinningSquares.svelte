<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;
</script>

<div class="relative w-10 h-10">
	<Div
		class="absolute top-0 left-0 w-4 h-4 bg-zinc-800 dark:bg-white rounded-sm"
		animate={{ x: [0, 24, 24, 0, 0], y: [0, 0, 24, 24, 0] }}
		transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
	/>
	<Div
		class="absolute bottom-0 right-0 w-4 h-4 bg-zinc-300 dark:bg-zinc-700 rounded-sm"
		animate={{ x: [0, -24, -24, 0, 0], y: [0, 0, -24, -24, 0] }}
		transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
	/>
</div>
