<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;
</script>

<div class="relative w-12 h-12 flex items-center justify-center">
	<Div
		class="absolute w-12 h-12 border-2 border-zinc-800 dark:border-zinc-700 border-t-transparent rounded-full"
		animate={{ rotate: 360 }}
		transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
	/>
	<Div
		class="absolute w-8 h-8 border-2 border-zinc-500 border-b-transparent rounded-full"
		animate={{ rotate: -360 }}
		transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
	/>
	<Div
		class="absolute w-4 h-4 border-2 border-zinc-300 border-l-transparent rounded-full"
		animate={{ rotate: 360 }}
		transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
	/>
</div>
