<script lang="ts">
	import { BASE_COLOR, type VariantProps } from './types.js';
	import { cn } from '$lib/app/utils.js';

	let { config, isMatrix }: VariantProps = $props();

	const Icon1 = $derived(config.icon1);
</script>

<Icon1 class={cn('w-[16px] h-[16px]', !isMatrix && 'mr-2.5', BASE_COLOR)} />

{#if !isMatrix}
	<span class="font-medium tracking-tight text-[13px] whitespace-nowrap">{config.label}</span>
{/if}
