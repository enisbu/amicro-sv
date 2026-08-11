<script lang="ts">
	import { motion, useScroll, useSpring } from 'motion-sv';

	const Div = motion.div;

	interface Props {
		color?: string;
		height?: number;
		class?: string;
	}

	let { color = 'var(--accent, #3b82f6)', height = 4, class: className = '' }: Props = $props();

	const { scrollYProgress } = useScroll();

	const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
</script>

<Div
	style={{ scaleX, height: `${height}px`, background: color }}
	class={['amicro-progress', className]}
	aria-hidden="true"
></Div>

<style>
	:global(.amicro-progress) {
		position: fixed;
		top: 0;
		right: 0;
		left: 0;
		z-index: 9999;
		pointer-events: none;
		
		transform-origin: 0 50%;
	}
</style>
