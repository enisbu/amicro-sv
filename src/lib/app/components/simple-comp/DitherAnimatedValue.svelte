<script lang="ts">
	import { motion, useSpring, useTransform, useCurrentMotionValue } from 'motion-sv';
	import type { SpringOptions } from 'motion-sv';
	import { prefersReducedMotion } from 'svelte/motion';
	import { untrack } from 'svelte';

	export interface Props {
		value: number;
		format?: (current: number) => string;
		spring?: SpringOptions;
		class?: string;
	}

	let {
		value,
		format = (current: number) => Math.round(current).toLocaleString('en-US'),
		spring: springConfig = { stiffness: 190, damping: 27, mass: 0.7 },
		class: className = 'tabular-nums'
	}: Props = $props();

	const spring = useSpring(untrack(() => value), untrack(() => springConfig));
	const display = useTransform(spring, (current) => format(current as number));
	const text = useCurrentMotionValue(display);

	$effect(() => {
		if (prefersReducedMotion.current) spring.jump(value);
		else spring.set(value);
	});
</script>

<motion.span class={className}>{text.current}</motion.span>
