## activeElement

Provides reactive access to the currently focused DOM element, similar to `document.activeElement` but with reactive updates.

**Features:**
- Updates synchronously with DOM focus changes
- Returns `null` when no element is focused
- Safe to use with SSR
- Lightweight alternative to manual focus tracking
- Searches through Shadow DOM boundaries for the true active element

**Basic usage:**
```svelte
<script lang="ts">
	import { activeElement } from "runed";
</script>

<p>
	Currently active element:
	{activeElement.current?.localName ?? "No active element found"}
</p>
```

**Custom document/shadow root:**
```svelte
<script lang="ts">
	import { ActiveElement } from "runed";

	const activeElement = new ActiveElement({
		document: shadowRoot
	});
</script>
```

**Type:**
```ts
interface ActiveElement {
	readonly current: Element | null;
}
```