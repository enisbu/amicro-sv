<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;
</script>

<div class="relative w-10 h-10 flex items-center justify-center">
	<Div
		class="absolute inset-0 border-[2.5px] border-t-zinc-800 dark:border-t-white border-r-zinc-800/30 dark:border-r-white/30 border-b-zinc-800/10 dark:border-b-white/10 border-l-transparent rounded-full"
		animate={{ rotate: 360 }}
		transition={{ duration: 1.3, repeat: Infinity, ease: 'linear' }}
	/>
	<Div
		class="absolute w-6 h-6 border-[2.5px] border-b-zinc-800 dark:border-b-white border-t-zinc-800/30 dark:border-t-white/30 border-r-zinc-800/10 dark:border-r-white/10 border-l-transparent rounded-full"
		animate={{ rotate: -360 }}
		transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
	/>
</div>
