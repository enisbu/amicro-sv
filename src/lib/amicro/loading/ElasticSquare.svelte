<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;
</script>

<div
	class="h-12 flex items-end border-b-2 border-zinc-200 dark:border-zinc-800 w-12 justify-center"
>
	<Div
		class="w-6 h-6 bg-zinc-800 dark:bg-white rounded-sm origin-bottom"
		animate={{ y: [0, -20, 0], scaleY: [0.7, 1.2, 0.7], scaleX: [1.3, 0.8, 1.3] }}
		transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
	/>
</div>
