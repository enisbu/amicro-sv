<script lang="ts">
	import { motion } from 'motion-sv';

	const Circle = motion.circle;
</script>

<div
	class="relative w-12 h-12 bg-zinc-200 dark:bg-zinc-800 rounded-[12px] flex items-center justify-center overflow-hidden"
>
	<svg class="w-8 h-8 absolute" viewBox="0 0 50 50">
		<circle
			cx="25"
			cy="25"
			r="20"
			class="stroke-zinc-300 dark:stroke-zinc-700 fill-none"
			stroke-width="4" />
		<Circle
			cx="25"
			cy="25"
			r="20"
			class="stroke-zinc-800 dark:stroke-white fill-none"
			stroke-width="4"
			stroke-dasharray="125"
			animate={{ strokeDashoffset: [125, 0] }}
			transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
			style={{ rotate: -90, transformOrigin: 'center' }}
		/>
	</svg>
</div>
