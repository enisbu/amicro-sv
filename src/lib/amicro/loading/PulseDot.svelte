<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;
</script>

<div class="relative w-10 h-10 flex items-center justify-center">
	<Div
		class="absolute w-10 h-10 bg-zinc-800 dark:bg-white rounded-full"
		animate={{ scale: [0, 1], opacity: [0.8, 0] }}
		transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
	/>
	<div class="w-3 h-3 bg-zinc-800 dark:bg-white rounded-full relative z-10"></div>
</div>
