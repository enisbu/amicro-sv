<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;
</script>

<div class="relative w-12 h-12 flex items-center justify-center [perspective:800px]">
	<Div
		class="absolute w-10 h-10 border-2 border-t-zinc-800 dark:border-t-white border-r-zinc-800/30 dark:border-r-white/30 border-b-zinc-800/10 dark:border-b-white/10 border-l-transparent rounded-full"
		style={{ transformStyle: 'preserve-3d' }}
		animate={{ rotateX: 360, rotateY: 180 }}
		transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
	/>
	<Div
		class="absolute w-10 h-10 border-2 border-b-zinc-800 dark:border-b-white border-t-zinc-800/30 dark:border-t-white/30 border-l-zinc-800/10 dark:border-l-white/10 border-r-transparent rounded-full"
		style={{ transformStyle: 'preserve-3d' }}
		animate={{ rotateX: 180, rotateY: 360 }}
		transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
	/>
</div>
