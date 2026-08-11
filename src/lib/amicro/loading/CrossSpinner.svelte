<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;
</script>

<Div
	class="relative w-8 h-8 flex items-center justify-center"
	animate={{ rotate: [0, 90, 180, 270, 360] }}
	transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
>
	<div class="absolute w-full h-1.5 bg-zinc-800 dark:bg-white rounded-full"></div>
	<div class="absolute h-full w-1.5 bg-zinc-800 dark:bg-white rounded-full"></div>
</Div>
