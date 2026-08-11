<script lang="ts">
	import { motion } from 'motion-sv';
</script>

<motion.div
	initial={{ scale: 0.5, opacity: 0 }}
	animate={{ scale: 1, opacity: 1 }}
	transition={{ type: 'spring', stiffness: 400, damping: 25 }}
	class="font-bold text-2xl text-black dark:text-white"
>
	SCALE IN TEXT
</motion.div>
