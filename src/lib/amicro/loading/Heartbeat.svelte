<script lang="ts">
	import { motion } from 'motion-sv';

	const Polyline = motion.polyline;
</script>

<svg class="w-16 h-8 overflow-visible" viewBox="0 0 64 32">
	<Polyline
		points="0,16 16,16 24,4 32,28 40,16 64,16"
		class="stroke-zinc-800 dark:stroke-white fill-none"
		stroke-width="2"
		stroke-linejoin="round"
		stroke-linecap="round"
		stroke-dasharray="100"
		animate={{ strokeDashoffset: [100, -100] }}
		transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
	/>
</svg>
