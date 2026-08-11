<script lang="ts">
	import type { Snippet } from 'svelte';
	import { IsInViewport } from 'runed';

	export interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();

	let container = $state<HTMLDivElement>();
	const inViewport = new IsInViewport(() => container, { rootMargin: '400px' });

	let wasVisible = $state(false);
	$effect(() => {
		if (inViewport.current) wasVisible = true;
	});
</script>

<div bind:this={container} class="w-full h-full flex items-center justify-center">
	{#if wasVisible}
		{@render children?.()}
	{/if}
</div>
