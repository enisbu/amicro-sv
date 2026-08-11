Register a cleanup function that executes when the current effect context is disposed (component destruction or root effect disposal).

Shorthand for returning a cleanup function from `$effect()`:

```ts
$effect(() => {
	return () => {
		// cleanup
	};
});
```

**Usage:**

```svelte
<script lang="ts">
	import { onCleanup } from "runed";

	// Replace onDestroy
	onCleanup(() => {
		console.log("Component is being cleaned up!");
	});

	// Within root effect
	$effect.root(() => {
		onCleanup(() => {
			console.log("Root effect is being cleaned up!");
		});
	});
</script>
```

**Type:**
```ts
function onCleanup(cb: () => void): void;
```