<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;
</script>

<div class="relative w-10 h-10 flex items-center justify-center">
	<div class="w-10 h-10 border-2 border-zinc-200 dark:border-zinc-800 rounded-full absolute"></div>
	<Div
		class="w-8 h-1 bg-zinc-800 dark:bg-white rounded-full"
		animate={{ rotate: 360 }}
		transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
	/>
</div>
