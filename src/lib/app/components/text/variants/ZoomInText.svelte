<script lang="ts">
	import { motion } from 'motion-sv';
</script>

<motion.div
	initial={{ scale: 0.2, opacity: 0 }}
	animate={{ scale: 1, opacity: 1 }}
	transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
	class="font-extrabold text-2xl text-amber-600 dark:text-amber-400"
>
	ZOOM IN
</motion.div>
