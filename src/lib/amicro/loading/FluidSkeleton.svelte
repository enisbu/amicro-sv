<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;
</script>

<div class="w-24 h-10 bg-zinc-200 dark:bg-zinc-800 rounded-xl overflow-hidden relative">
	<Div
		class="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
		animate={{ x: ['-100%', '200%'] }}
		transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
	/>
</div>
