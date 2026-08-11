<script lang="ts">
	import { motion } from 'motion-sv';

	const Circle = motion.circle;
</script>

<svg class="w-12 h-12" viewBox="0 0 50 50">
	<Circle
		cx="25"
		cy="25"
		r="20"
		class="stroke-zinc-800 dark:stroke-white fill-none"
		stroke-width="3"
		stroke-dasharray="8 8"
		animate={{ rotate: 360 }}
		style={{ transformOrigin: 'center' }}
		transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
	/>
</svg>
