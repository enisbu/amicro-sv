<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;
</script>

<Div
	class="w-8 h-8 bg-zinc-800 dark:bg-white"
	animate={{
		scale: [1, 1.2, 1],
		borderRadius: ['0%', '50%', '0%'],
		rotate: [0, 90, 180]
	}}
	transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
/>
