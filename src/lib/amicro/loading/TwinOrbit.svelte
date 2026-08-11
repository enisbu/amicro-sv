<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;
</script>

<div class="relative w-12 h-12">
	<Div
		class="absolute inset-0 border-2 border-zinc-800 dark:border-zinc-700 rounded-full border-b-transparent border-r-transparent"
		animate={{ rotate: 360 }}
		transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
	/>
	<Div
		class="absolute inset-2 border-2 border-zinc-400 rounded-full border-t-transparent border-l-transparent"
		animate={{ rotate: -360 }}
		transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
	/>
</div>
