<script lang="ts">
	import { motion } from 'motion-sv';
</script>

<motion.div
	initial={{ filter: 'blur(12px)', opacity: 0, scale: 0.9 }}
	animate={{ filter: 'blur(0px)', opacity: 1, scale: 1 }}
	transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
	class="font-bold text-2xl text-black dark:text-white"
>
	BLUR REVEAL
</motion.div>
