<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;
</script>

<div class="relative w-10 h-10 flex items-center justify-center">
	<Div
		class="w-10 h-10 rounded-full"
		style={{
			background: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)',
			maskImage: 'radial-gradient(transparent 55%, black 60%)',
			webkitMaskImage: 'radial-gradient(transparent 55%, black 60%)'
		}}
		animate={{ rotate: 360 }}
		transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
	/>
</div>
