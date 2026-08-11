## useResizeObserver

Detects changes in the size of an element using the Resize Observer API.

### Usage

Pass a function that returns an element reference and a callback that receives resize entries:

```ts
import { useResizeObserver } from "runed";

let el = $state<HTMLElement | null>(null);
let text = $state("");

useResizeObserver(
	() => el,
	(entries) => {
		const entry = entries[0];
		if (!entry) return;
		const { width, height } = entry.contentRect;
		text = `width: ${width};\nheight: ${height};`;
	}
);
```

The callback receives an array of `ResizeObserverEntry` objects. Access the new dimensions via `entry.contentRect.width` and `entry.contentRect.height`.

### Stopping the Observer

Call the `stop()` method returned from `useResizeObserver()` to stop observing:

```ts
const { stop } = useResizeObserver(/* ... */);
stop();
```