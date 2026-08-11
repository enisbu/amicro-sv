<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;

	const dots = [0, 60, 120, 180, 240, 300].map((angle, idx) => ({
		angle,
		bgClass:
			idx % 2 === 0
				? 'bg-teal-400/35 dark:bg-teal-400/40'
				: 'bg-cyan-400/35 dark:bg-cyan-400/40',
		x: Math.cos((angle * Math.PI) / 180) * 11,
		y: Math.sin((angle * Math.PI) / 180) * 11
	}));
</script>

<div class="relative flex items-center justify-center w-12 h-12">
	{#each dots as dot}
		<Div
			class="absolute w-3.5 h-3.5 rounded-full {dot.bgClass}"
			style={{ transformOrigin: 'center' }}
			animate={{
				scale: [1, 1.75, 1],
				x: [0, dot.x, 0],
				y: [0, dot.y, 0]
			}}
			transition={{
				duration: 3.6,
				repeat: Infinity,
				ease: 'easeInOut'
			}}
		/>
	{/each}
</div>
