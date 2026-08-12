<script lang="ts">
	import { animate } from 'motion';

	export interface Props {
		value: number | null;
	}

	let { value }: Props = $props();

	let displayValue = $state<number | null>(null);

	$effect(() => {
		if (value === null) return;
		const controls = animate(0, value, {
			duration: 1.2,
			ease: [0.16, 1, 0.3, 1],
			onUpdate: (latest: number) => (displayValue = Math.round(latest))
		});
		return () => controls.stop();
	});
</script>

{#if value !== null}{displayValue ?? value}{/if}
