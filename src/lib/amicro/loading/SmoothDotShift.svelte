<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;
</script>

<div class="relative w-12 h-3 flex items-center">
	<Div
		class="absolute w-3 h-3 bg-zinc-800 dark:bg-white rounded-full z-10"
		animate={{ x: [0, 18, 36, 18, 0] }}
		transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
	/>
	<div class="w-3 h-3 bg-zinc-300 dark:bg-zinc-700 rounded-full absolute left-0"></div>
	<div class="w-3 h-3 bg-zinc-300 dark:bg-zinc-700 rounded-full absolute left-[18px]"></div>
	<div class="w-3 h-3 bg-zinc-300 dark:bg-zinc-700 rounded-full absolute left-[36px]"></div>
</div>
