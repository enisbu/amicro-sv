<script lang="ts">
	import { motion } from 'motion-sv';
</script>

<div class="relative overflow-hidden font-bold text-2xl">
	<motion.div
		initial={{ clipPath: 'inset(0 100% 0 0)' }}
		animate={{ clipPath: 'inset(0 0 0 0)' }}
		transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
		class="text-black dark:text-white"
	>
		CINEMATIC
	</motion.div>
</div>
