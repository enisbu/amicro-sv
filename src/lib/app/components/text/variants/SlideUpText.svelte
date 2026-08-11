<script lang="ts">
	import { motion } from 'motion-sv';
</script>

<div class="overflow-hidden">
	<motion.div
		initial={{ y: '100%' }}
		animate={{ y: 0 }}
		transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
		class="font-bold text-2xl text-black dark:text-white"
	>
		SLIDE UP TEXT
	</motion.div>
</div>
