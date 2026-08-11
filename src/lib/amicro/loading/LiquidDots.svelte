<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;
</script>

<div class="relative w-16 h-8 flex items-center justify-center" style="filter: url(#goo-liquid)">
	<svg class="absolute w-0 h-0">
		<defs>
			<filter id="goo-liquid">
				<feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
				<feColorMatrix
					in="blur"
					mode="matrix"
					values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
					result="goo"
				/>
				<feBlend in="SourceGraphic" in2="goo" />
			</filter>
		</defs>
	</svg>
	<Div
		class="absolute w-6 h-6 bg-zinc-800 dark:bg-white rounded-full"
		animate={{ x: [-16, 16, -16] }}
		transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
	/>
	<Div
		class="absolute w-6 h-6 bg-zinc-800 dark:bg-white rounded-full"
		animate={{ x: [16, -16, 16] }}
		transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
	/>
</div>
