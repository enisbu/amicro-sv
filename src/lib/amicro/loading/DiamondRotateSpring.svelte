<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;
</script>

<Div
	class="w-8 h-8 bg-zinc-800 dark:bg-white rounded-sm origin-center"
	style={{ rotate: 45 }}
	animate={{ rotate: [45, 135, 225, 315] }}
	transition={{ duration: 2, repeat: Infinity, type: 'spring', bounce: 0.4 }}
/>
