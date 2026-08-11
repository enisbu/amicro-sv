## IsInViewport

Tracks whether an element is visible within the current viewport using the Intersection Observer API.

### Purpose
Provides a class-based utility to monitor if a DOM element is currently in view, useful for lazy loading, analytics, or triggering animations when elements become visible.

### How it works
- Built on top of `useIntersectionObserver` utility
- Accepts an element or a getter function that returns an element
- Supports optional configuration options that align with `useIntersectionObserver` options

### Usage

```ts
import { IsInViewport } from "runed";

let targetNode = $state<HTMLElement>()!;
const inViewport = new IsInViewport(() => targetNode);
```

```svelte
<p bind:this={targetNode}>Target node</p>
<p>Target node in viewport: {inViewport.current}</p>
```

### API

**Constructor:**
- `new IsInViewport(node: MaybeGetter<HTMLElement | null | undefined>, options?: IsInViewportOptions)`

**Properties:**
- `current: boolean` - getter that returns whether the element is currently in the viewport

**Options:**
- Accepts `IsInViewportOptions` which extends `UseIntersectionObserverOptions`