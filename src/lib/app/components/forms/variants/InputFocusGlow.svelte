<script lang="ts">
	let isFocused = $state(false);
</script>

<div class="relative w-full max-w-[240px]">
	<input
		type="text"
		placeholder="Focus for glow..."
		onfocus={() => (isFocused = true)}
		onblur={() => (isFocused = false)}
		class="w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all duration-300 bg-white border-neutral-300 text-black focus:border-indigo-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white {isFocused
			? 'ring-4 ring-indigo-500/30 shadow-lg shadow-indigo-500/20'
			: ''}"
	/>
</div>
