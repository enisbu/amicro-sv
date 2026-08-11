<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;
</script>

<div class="relative w-6 h-12 flex flex-col items-center">
	<Div
		class="w-2.5 h-2.5 bg-zinc-800 dark:bg-white rounded-full absolute top-0 z-10"
		animate={{ y: [0, 24, 0], scaleY: [1, 1.2, 1], scaleX: [1, 0.8, 1] }}
		transition={{ duration: 1, repeat: Infinity, ease: 'circIn' }}
	/>
	<div class="w-4 h-1 bg-zinc-300 dark:bg-zinc-700 rounded-full absolute bottom-2 blur-[1px]"></div>
</div>
