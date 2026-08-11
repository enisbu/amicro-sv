<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;
</script>

<div class="flex space-x-1.5" style="filter: url(#goo-magnetic)">
	<svg width="0" height="0" class="absolute hidden">
		<defs>
			<filter id="goo-magnetic">
				<feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
				<feColorMatrix
					in="blur"
					mode="matrix"
					values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 15 -7"
					result="goo"
				/>
				<feComposite in="SourceGraphic" in2="goo" operator="atop" />
			</filter>
		</defs>
	</svg>
	<Div
		class="w-4 h-4 bg-zinc-800 dark:bg-white rounded-full"
		animate={{ x: [0, 8, 0] }}
		transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
	/>
	<Div
		class="w-4 h-4 bg-zinc-800 dark:bg-white rounded-full"
		animate={{ x: [0, -8, 0] }}
		transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
	/>
</div>
