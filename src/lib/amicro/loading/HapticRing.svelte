<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;
</script>

<Div
	class="w-10 h-10 border-[3px] border-zinc-200 dark:border-zinc-800 rounded-full border-t-zinc-800 dark:border-t-white"
	animate={{ rotate: [0, 90, 180, 270, 360] }}
	transition={{ duration: 2, repeat: Infinity, type: 'spring', bounce: 0.4 }}
/>
