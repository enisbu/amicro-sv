<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;
</script>

<Div
	class="w-10 h-10 border-[3px] border-zinc-800 dark:border-zinc-700 rounded-full border-t-transparent"
	animate={{ rotate: 360, scale: [1, 0.8, 1] }}
	transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
/>
