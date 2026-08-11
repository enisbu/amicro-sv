<script lang="ts">
	import { animate } from 'motion';

	export interface Props {
		value: number | null;
	}

	let { value }: Props = $props();

	let displayValue = $state(0);

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

{#if value !== null}{displayValue}{/if}
