<script lang="ts">
	import { motion } from 'motion-sv';

	const Polygon = motion.polygon;
</script>

<svg class="w-10 h-10 overflow-visible" viewBox="0 0 50 50">
	<Polygon
		points="25,5 45,40 5,40"
		class="stroke-zinc-800 dark:stroke-white fill-none origin-center"
		stroke-width="4"
		stroke-linejoin="round"
		animate={{ rotate: 360 }}
		transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
	/>
</svg>
