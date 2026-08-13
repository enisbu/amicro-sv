<script lang="ts">
	import DitherChartsGrid from '$lib/app/components/dither-charts/DitherChartsGrid.svelte';
</script>

<svelte:head>
	<title>Dither Charts — Amicro SV</title>
	<meta
		name="description"
		content="Canvas dither shaders, real-time data visualizersand dot matrix gauges, ported to Svelte 5 and motion-sv. Copy the usage code or install every chart from the registry."
	/>
</svelte:head>

<div class="relative z-10 flex-1 w-full max-w-[1240px] mx-auto px-6 pb-24 flex flex-col items-center">
	<div class="mt-12 mb-12 text-center w-full flex flex-col items-center">
		<h1
			class="text-[32px] sm:text-[46px] font-medium leading-[38px] sm:leading-[52px] tracking-[-0.01em] mb-3 font-sans text-balance transition-colors duration-300 text-black dark:text-white"
		>
			Dither Charts
		</h1>
		<p
			class="text-[14px] sm:text-[17px] leading-[20px] sm:leading-[25px] max-w-[530px] text-balance transition-colors duration-300 text-black dark:text-[#767676]"
		>
			A curated collection of canvas dither shaders, real-time data visualizers, dot matrix gauges
			and interactive micro-charts.
		</p>
	</div>

	<DitherChartsGrid />
</div>
