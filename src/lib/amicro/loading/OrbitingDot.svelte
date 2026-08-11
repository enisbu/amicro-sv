<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;
</script>

<div class="relative w-10 h-10 flex items-center justify-center">
	<div class="w-2 h-2 bg-zinc-300 dark:bg-zinc-700 rounded-full"></div>
	<Div
		class="absolute w-full h-full border border-zinc-200 dark:border-zinc-800 rounded-full"
		animate={{ rotate: 360 }}
		transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
	>
		<div class="absolute top-0 left-1/2 -ml-1.5 -mt-1.5 w-3 h-3 bg-zinc-800 dark:bg-white rounded-full shadow-sm"></div>
	</Div>
</div>
