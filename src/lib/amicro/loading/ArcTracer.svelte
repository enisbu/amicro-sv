<script lang="ts">
	import { motion } from 'motion-sv';

	const Circle = motion.circle;
</script>

<svg class="w-10 h-10" viewBox="0 0 50 50">
	<circle
		cx="25"
		cy="25"
		r="20"
		class="stroke-zinc-200 dark:stroke-zinc-800 fill-none"
		stroke-width="4" />
	<Circle
		cx="25"
		cy="25"
		r="20"
		class="stroke-zinc-800 dark:stroke-white fill-none"
		stroke-width="4"
		stroke-linecap="round"
		stroke-dasharray="125"
		animate={{ strokeDashoffset: [125, 0, -125] }}
		transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
	/>
</svg>
