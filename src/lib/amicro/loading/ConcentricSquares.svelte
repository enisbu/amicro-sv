<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;
</script>

<div class="relative w-12 h-12 flex items-center justify-center">
	<Div
		class="absolute w-12 h-12 border-2 border-zinc-800 dark:border-zinc-700 rounded-sm"
		animate={{ rotate: [0, 90, 90], scale: [1, 1, 0.8, 1] }}
		transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
	/>
	<Div
		class="absolute w-6 h-6 border-2 border-zinc-500 rounded-sm"
		animate={{ rotate: [0, -90, -90], scale: [1, 1, 1.2, 1] }}
		transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
	/>
</div>
