<script lang="ts">
	import { motion, useSpring, useTransform, useCurrentMotionValue } from 'motion-sv';
	import { MediaQuery } from 'svelte/reactivity';
	import { untrack } from 'svelte';

	export interface Props {
		value: number;
		prefix?: string;
		class?: string;
	}

	let { value, prefix = '', class: className = '' }: Props = $props();

	const reducedMotion = new MediaQuery('(prefers-reduced-motion: reduce)');

	const initialValue = untrack(() => value);
	const spring = useSpring(initialValue, { stiffness: 190, damping: 27, mass: 0.7 });
	const display = useCurrentMotionValue(
		useTransform(
			spring,
			(current: string | number) => prefix + Math.round(Number(current)).toLocaleString('en-US')
		)
	);

	$effect(() => {
		if (reducedMotion.current) spring.jump(value);
		else spring.set(value);
	});
</script>

<motion.span class="tabular-nums {className}">{display.current}</motion.span>
