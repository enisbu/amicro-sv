<script lang="ts">
	import { getAppState } from '$lib/app/app-state.svelte.js';

	const app = getAppState();

	let isOn = $state(false);
	let isInit = $state(false);

	function handleToggle() {
		if (!isInit) isInit = true;
		app.haptic('medium');
		isOn = !isOn;
	}
</script>

<button
	type="button"
	onclick={handleToggle}
	aria-label="Toggle"
	data-on={isOn ? 'true' : 'false'}
	class="t-toggle {isInit
		? 'is-init'
		: ''} relative w-14 h-8 rounded-full p-1 cursor-pointer border-0 transition-colors {isOn
		? 'bg-emerald-500'
		: 'bg-neutral-300 dark:bg-neutral-800'}"
>
	<span class="t-toggle-thumb block w-6 h-6 bg-white rounded-full shadow-md pointer-events-none"></span>
</button>
