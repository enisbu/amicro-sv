<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;
</script>

<div
	class="relative w-10 h-10 border-2 border-zinc-800 dark:border-zinc-700 rounded-full flex items-center justify-center"
>
	<Div
		class="absolute w-0.5 h-3.5 bg-zinc-800 dark:bg-white rounded-full origin-bottom"
		style={{ bottom: '50%' }}
		animate={{ rotate: 360 }}
		transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
	/>
	<Div
		class="absolute w-0.5 h-2.5 bg-zinc-800 dark:bg-white rounded-full origin-bottom"
		style={{ bottom: '50%' }}
		animate={{ rotate: 360 }}
		transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
	/>
</div>
