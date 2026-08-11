<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;
</script>

<div
	class="relative h-6 w-24 flex items-center justify-center font-medium text-sm text-zinc-900 dark:text-white overflow-hidden"
>
	<Div
		class="absolute"
		animate={{ opacity: [1, 0, 0, 1], y: [0, -16, 16, 0] }}
		transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
	>
		Loading
	</Div>
	<Div
		class="absolute"
		animate={{ opacity: [0, 1, 1, 0], y: [16, 0, 0, -16] }}
		transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
	>
		Wait
	</Div>
</div>
