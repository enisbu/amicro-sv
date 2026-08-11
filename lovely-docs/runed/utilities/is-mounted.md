## IsMounted

A utility class that tracks whether a component has mounted.

### Usage

```svelte
<script lang="ts">
	import { IsMounted } from "runed";
	const isMounted = new IsMounted();
</script>
```

The `isMounted` object has a `current` property that is `false` initially and becomes `true` after the component mounts.

### Equivalent implementations

Using `onMount`:
```svelte
import { onMount } from "svelte";
const isMounted = $state({ current: false });
onMount(() => {
	isMounted.current = true;
});
```

Using `$effect` with `untrack`:
```svelte
import { untrack } from "svelte";
const isMounted = $state({ current: false });
$effect(() => {
	untrack(() => (isMounted.current = true));
});
```