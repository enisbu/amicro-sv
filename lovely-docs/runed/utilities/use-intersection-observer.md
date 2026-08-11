## useIntersectionObserver

Watch for intersection changes of a target element using the Intersection Observer API.

### Basic Usage

```svelte
<script lang="ts">
	import { useIntersectionObserver } from "runed";

	let target = $state<HTMLElement | null>(null);
	let root = $state<HTMLElement | null>(null);
	let isIntersecting = $state(false);

	useIntersectionObserver(
		() => target,
		(entries) => {
			const entry = entries[0];
			if (!entry) return;
			isIntersecting = entry.isIntersecting;
		},
		{ root: () => root }
	);
</script>

<div bind:this={root}>
	<div bind:this={target}>
		{#if isIntersecting}
			<div>Target is intersecting</div>
		{:else}
			<div>Target is not intersecting</div>
		{/if}
	</div>
</div>
```

The utility accepts a getter function for the target element, a callback that receives intersection entries, and optional configuration including a root element.

### Control Methods

```ts
const observer = useIntersectionObserver(/* ... */);

observer.pause();    // Pause observation
observer.resume();   // Resume observation
observer.stop();     // Stop observation completely
```

### isActive Property

Check if the observer is currently active. This is a getter and cannot be destructured:

```ts
const observer = useIntersectionObserver(/* ... */);

if (observer.isActive) {
	// do something
}
```