<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;
</script>

<div class="font-medium text-lg text-zinc-900 dark:text-white overflow-hidden h-6 relative">
	<Div
		animate={{ y: ['100%', '0%', '-100%'] }}
		transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
	>
		Loading
	</Div>
</div>
