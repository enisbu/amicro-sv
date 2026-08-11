<script lang="ts">
	import { motion } from 'motion-sv';

	const Polygon = motion.polygon;
</script>

<svg class="w-10 h-10 overflow-visible" viewBox="0 0 50 50">
	<polygon
		points="25,5 45,40 5,40"
		class="stroke-zinc-200 dark:stroke-zinc-800 fill-none"
		stroke-width="3" />
	<Polygon
		points="25,5 45,40 5,40"
		class="stroke-zinc-800 dark:stroke-white fill-none"
		stroke-width="3"
		stroke-dasharray="120"
		animate={{ strokeDashoffset: [120, 0, -120] }}
		transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
	/>
</svg>
