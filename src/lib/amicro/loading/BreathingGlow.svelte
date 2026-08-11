<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;
</script>

<div class="relative flex items-center justify-center w-12 h-12">
	<Div
		class="absolute w-8 h-8 bg-blue-500 rounded-full blur-md"
		animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.8, 0.5] }}
		transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
	/>
	<div class="relative w-6 h-6 bg-white rounded-full shadow-sm"></div>
</div>
