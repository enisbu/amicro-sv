<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;
</script>

<Div
	class="w-10 h-10 bg-zinc-800 dark:bg-white shadow-sm"
	animate={{
		borderRadius: ['10%', '50%', '10%'],
		rotate: [0, 90, 180],
		scale: [1, 0.8, 1]
	}}
	transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
/>
