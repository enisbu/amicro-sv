<script lang="ts">
	import { motion } from 'motion-sv';
</script>

<div class="relative overflow-hidden font-black text-2xl tracking-tighter">
	<motion.div
		initial={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)', filter: 'blur(8px)' }}
		animate={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', filter: 'blur(0px)' }}
		transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
		class="text-black dark:text-white"
	>
		DIA REVEAL
	</motion.div>
</div>
