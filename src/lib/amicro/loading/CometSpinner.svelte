<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;
</script>

<div
	class="relative w-10 h-10 border border-zinc-200 dark:border-zinc-800 rounded-full flex items-center justify-center"
>
	<Div
		class="absolute w-full h-full rounded-full"
		style={{
			background:
				'conic-gradient(from 0deg, transparent 0%, rgba(39, 39, 42, 0.1) 60%, rgba(39, 39, 42, 1) 100%)'
		}}
		animate={{ rotate: 360 }}
		transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
	/>
	<div class="absolute bg-white w-8 h-8 rounded-full"></div>
</div>
