## useEventListener

Attaches an automatically disposed event listener to DOM elements, useful for listening to events on elements you don't directly control (document, window, or elements from parent components).

**Key Features:**
- Automatic cleanup when component is destroyed or element reference changes
- Lazy initialization via function-based target element definition
- Ideal for global listeners where direct DOM attachment is impractical

**Example:**

```ts
import { useEventListener } from "runed";

export class ClickLogger {
	#clicks = $state(0);

	constructor() {
		useEventListener(
			() => document.body,
			"click",
			() => this.#clicks++
		);
	}

	get clicks() {
		return this.#clicks;
	}
}
```

Usage in Svelte component:
```svelte
<script lang="ts">
	import { ClickLogger } from "./ClickLogger.ts";
	const logger = new ClickLogger();
</script>

<p>You've clicked the document {logger.clicks} {logger.clicks === 1 ? "time" : "times"}</p>
```

The listener is automatically removed when the component is destroyed or the element reference changes.