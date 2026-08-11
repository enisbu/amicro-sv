<script lang="ts">
	import { motion } from 'motion-sv';

	const Polygon = motion.polygon;
</script>

<svg class="w-10 h-10" viewBox="0 0 50 50">
	<polygon
		points="25,5 45,15 45,35 25,45 5,35 5,15"
		class="stroke-zinc-200 dark:stroke-zinc-800 fill-none"
		stroke-width="4" />
	<Polygon
		points="25,5 45,15 45,35 25,45 5,35 5,15"
		class="stroke-zinc-800 dark:stroke-white fill-none"
		stroke-width="4"
		stroke-linecap="round"
		stroke-dasharray="120"
		animate={{ strokeDashoffset: [120, -120] }}
		transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
	/>
</svg>
