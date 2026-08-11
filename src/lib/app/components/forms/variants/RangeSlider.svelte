<script lang="ts">
	let sliderVal = $state(65);
</script>

<div class="relative w-full max-w-[220px] flex flex-col items-center">
	<div
		class="absolute -top-7 px-2 py-0.5 rounded-lg bg-indigo-500 text-white text-[11px] font-bold shadow-md"
	>
		{sliderVal}%
	</div>
	<input
		type="range"
		min="0"
		max="100"
		aria-label="Value"
		bind:value={sliderVal}
		class="w-full accent-indigo-500 cursor-pointer"
	/>
</div>
