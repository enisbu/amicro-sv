<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;
</script>

<div class="relative w-12 h-12 flex items-center justify-center">
	<Div
		class="absolute w-full h-full bg-zinc-200 dark:bg-zinc-800 rounded-full"
		animate={{ scale: [0, 1], opacity: [1, 0] }}
		transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
	/>
	<Div
		class="absolute w-full h-full bg-zinc-200 dark:bg-zinc-800 rounded-full"
		animate={{ scale: [0, 1], opacity: [1, 0] }}
		transition={{ duration: 1.5, repeat: Infinity, delay: 0.5, ease: 'easeOut' }}
	/>
	<div class="w-3 h-3 bg-zinc-800 dark:bg-white rounded-full z-10"></div>
</div>
