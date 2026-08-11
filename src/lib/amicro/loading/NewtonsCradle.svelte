<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;
</script>

<div class="flex items-center justify-center space-x-0.5">
	<Div
		class="w-3 h-3 bg-zinc-800 dark:bg-white rounded-full origin-top"
		animate={{ rotate: [25, 0, 0, 0, 0, 25] }}
		transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
	/>
	<div class="w-3 h-3 bg-zinc-800 dark:bg-white rounded-full"></div>
	<div class="w-3 h-3 bg-zinc-800 dark:bg-white rounded-full"></div>
	<Div
		class="w-3 h-3 bg-zinc-800 dark:bg-white rounded-full origin-top"
		animate={{ rotate: [0, 0, 0, -25, 0, 0] }}
		transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
	/>
</div>
