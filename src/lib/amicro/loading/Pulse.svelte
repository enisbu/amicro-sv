<script lang="ts">
	import { motion } from 'motion-sv';

	const Span = motion.span;

	interface Props {
		size?: number;
		color?: string;
		class?: string;
	}

	let { size = 12, color = 'bg-blue-500', class: className = '' }: Props = $props();
</script>

<div
	class="relative flex items-center justify-center {className}"
	style="width: {size}px; height: {size}px"
>
	<span class="absolute w-full h-full rounded-full {color}"></span>

	<Span
		initial={{ scale: 1, opacity: 0.5 }}
		animate={{ scale: 2.8, opacity: 0 }}
		transition={{
			repeat: Infinity,
			duration: 1.8,
			ease: 'easeOut'
		}}
		class="absolute w-full h-full rounded-full {color} opacity-40"
	/>

	<Span
		initial={{ scale: 1, opacity: 0.5 }}
		animate={{ scale: 2.8, opacity: 0 }}
		transition={{
			repeat: Infinity,
			duration: 1.8,
			delay: 0.6,
			ease: 'easeOut'
		}}
		class="absolute w-full h-full rounded-full {color} opacity-40"
	/>
</div>
