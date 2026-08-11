<script lang="ts">
	import { motion } from 'motion-sv';
</script>

<div class="flex items-center font-mono text-lg font-bold">
	<motion.span
		initial={{ width: 0 }}
		animate={{ width: 'auto' }}
		transition={{ duration: 1.2, ease: 'easeInOut' }}
		class="overflow-hidden whitespace-nowrap border-r-2 text-emerald-600 border-emerald-600 dark:text-emerald-400 dark:border-emerald-400"
	>
		TYPEWRITER
	</motion.span>
</div>
