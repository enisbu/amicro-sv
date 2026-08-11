<script lang="ts">
	import { motion } from 'motion-sv';

	const Div = motion.div;

	interface Props {
		size?: number;
		color?: string;
		class?: string;
	}

	let { size = 40, color = 'bg-blue-500', class: className = '' }: Props = $props();
</script>

<div
	class="relative flex items-center justify-center {className}"
	style="width: {size}px; height: {size}px"
>
	<Div
		animate={{
			borderRadius: ['25%', '50%', '50%', '25%', '25%'],
			rotate: [0, 90, 180, 270, 360],
			scale: [1, 0.8, 1.1, 0.8, 1]
		}}
		transition={{
			duration: 2.2,
			ease: 'easeInOut',
			repeat: Infinity
		}}
		style={{ width: size, height: size }}
		class="rounded-2xl {color} shadow-lg"
	/>
</div>
