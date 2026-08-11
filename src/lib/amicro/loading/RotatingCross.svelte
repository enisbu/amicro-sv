<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;
</script>

<Div
	class="relative w-8 h-8 flex items-center justify-center"
	animate={{ rotate: 180 }}
	transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
>
	<div class="absolute w-full h-1.5 bg-zinc-800 dark:bg-white rounded-sm"></div>
	<div class="absolute h-full w-1.5 bg-zinc-800 dark:bg-white rounded-sm"></div>
</Div>
