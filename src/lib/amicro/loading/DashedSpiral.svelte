<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;
</script>

<Div
	class="w-10 h-10 border-[3px] border-zinc-800 dark:border-zinc-700 rounded-full border-dashed"
	animate={{ rotate: 360, scale: [1, 1.1, 1] }}
	transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
/>
