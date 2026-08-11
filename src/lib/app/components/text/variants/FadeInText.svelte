<script lang="ts">
	import { motion } from 'motion-sv';
</script>

<motion.div
	initial={{ opacity: 0 }}
	animate={{ opacity: 1 }}
	transition={{ duration: 0.8 }}
	class="font-bold text-2xl text-black dark:text-white"
>
	FADE IN TEXT
</motion.div>
