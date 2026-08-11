<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;
</script>

<div class="w-24 h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden relative">
	<Div
		class="absolute top-0 left-0 bottom-0 w-1/3 bg-zinc-800 dark:bg-white rounded-full"
		animate={{ x: ['-100%', '300%'] }}
		transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
	/>
</div>
