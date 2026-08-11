<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;
</script>

<Div
	class="w-8 h-8 bg-zinc-800 dark:bg-white"
	animate={{
		borderRadius: ['20%', '50%', '50%', '20%'],
		rotate: [0, 90, 180, 270]
	}}
	transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
/>
