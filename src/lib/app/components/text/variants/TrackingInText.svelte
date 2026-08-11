<script lang="ts">
	import { motion } from 'motion-sv';
</script>

<motion.div
	initial={{ letterSpacing: '0.6em', opacity: 0 }}
	animate={{ letterSpacing: '0.05em', opacity: 1 }}
	transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
	class="font-black text-xl uppercase text-black dark:text-white"
>
	TRACKING IN
</motion.div>
