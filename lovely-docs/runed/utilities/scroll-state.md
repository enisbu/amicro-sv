## ScrollState

Reactive utility for tracking scroll position, direction, and edge states with programmatic scrolling support.

### Core Features

- Track scroll positions (`x`, `y`) — reactive, get/set
- Detect scroll direction (`left`, `right`, `top`, `bottom`)
- Determine edge arrival state (`arrived`) — whether scrolled to each edge
- Programmatic scrolling: `scrollTo(x, y)`, `scrollToTop()`, `scrollToBottom()`
- Listen to scroll and scroll-end events
- Respects flex, RTL, and reverse layout modes

### Usage

```svelte
<script lang="ts">
	import { ScrollState } from "runed";

	let el = $state<HTMLElement>();

	const scroll = new ScrollState({
		element: () => el
	});
</script>

<div bind:this={el} style="overflow: auto; height: 200px;">
	<!-- scrollable content here -->
</div>
```

Access properties:
- `scroll.x`, `scroll.y` — current scroll positions
- `scroll.directions` — active scroll directions
- `scroll.arrived` — edge arrival state
- `scroll.progress` — scroll percentage on x/y axis

### Options

| Option | Type | Description |
|--------|------|-------------|
| `element` | `MaybeGetter<HTMLElement \| Window \| Document \| null>` | Scroll container (required) |
| `idle` | `MaybeGetter<number \| undefined>` | Debounce time after scroll ends (default: 200ms) |
| `offset` | `{ top?, bottom?, left?, right? }` | Pixel thresholds for "arrived" detection (default: 0) |
| `onScroll` | `(e: Event) => void` | Scroll event callback |
| `onStop` | `(e: Event) => void` | Callback after scrolling stops |
| `eventListenerOptions` | `AddEventListenerOptions` | Listener options (default: `{ passive: true, capture: false }`) |
| `behavior` | `ScrollBehavior` | Scroll behavior: "auto", "smooth", etc. (default: "auto") |
| `onError` | `(error: unknown) => void` | Error handler (default: console.error) |

### Notes

- Both position and edge arrival state are reactive
- Programmatically setting `scroll.x` and `scroll.y` triggers element scroll
- Layout direction and reverse flex settings are respected
- `onStop` is debounced and invoked after idle period