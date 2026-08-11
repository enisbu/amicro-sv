<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;
</script>

<div class="relative w-8 h-8">
	<Div
		class="absolute top-1/2 left-0 w-full h-1 bg-zinc-800 dark:bg-white -mt-0.5 rounded-full"
		animate={{ scaleX: [0.2, 1, 0.2] }}
		transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
	/>
	<Div
		class="absolute left-1/2 top-0 h-full w-1 bg-zinc-800 dark:bg-white -ml-0.5 rounded-full"
		animate={{ scaleY: [0.2, 1, 0.2] }}
		transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.75 }}
	/>
</div>
