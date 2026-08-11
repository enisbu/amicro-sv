<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;
</script>

<div class="relative w-8 h-8 flex items-center justify-center">
	<Div
		class="absolute inset-0 border-2 border-t-zinc-800 dark:border-t-white border-b-zinc-800 dark:border-b-white border-l-transparent border-r-transparent rounded-full"
		animate={{ rotate: 360, scale: [1, 0.82, 1] }}
		transition={{
			rotate: { duration: 1.2, repeat: Infinity, ease: 'linear' },
			scale: { duration: 1.2, repeat: Infinity, ease: 'easeInOut' }
		}}
	/>
</div>
