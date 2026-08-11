## Purpose
Reactive async data fetching utility that combines state management with automatic request handling. Built on `watch`, runs after rendering by default with optional pre-render support via `resource.pre()`.

## Basic Usage
```svelte
import { resource } from "runed";

let id = $state(1);

const searchResource = resource(
  () => id,
  async (id, prevId, { data, refetching, onCleanup, signal }) => {
    const response = await fetch(`api/posts?id=${id}`, { signal });
    return response.json();
  },
  { debounce: 300 }
);

// Access: searchResource.current, searchResource.loading, searchResource.error
// Methods: searchResource.mutate(), searchResource.refetch()
```

## Features
- **Automatic Request Cancellation**: In-flight requests canceled when dependencies change
- **Loading & Error States**: Built-in `loading` and `error` properties
- **Debouncing & Throttling**: Optional rate limiting (debounce takes precedence if both specified)
- **Type Safety**: Full TypeScript support with inferred types
- **Multiple Dependencies**: Track multiple reactive dependencies as array
- **Custom Cleanup**: `onCleanup()` callback runs before refetching
- **Pre-render Support**: `resource.pre()` for pre-render execution

## Advanced Examples

**Multiple Dependencies:**
```svelte
const results = resource(
  [() => query, () => page],
  async ([query, page]) => {
    const res = await fetch(`/api/search?q=${query}&page=${page}`);
    return res.json();
  }
);
```

**Custom Cleanup:**
```svelte
const stream = resource(
  () => streamId,
  async (id, _, { signal, onCleanup }) => {
    const eventSource = new EventSource(`/api/stream/${id}`);
    onCleanup(() => eventSource.close());
    const res = await fetch(`/api/stream/${id}/init`, { signal });
    return res.json();
  }
);
```

**Pre-render:**
```svelte
const data = resource.pre(
  () => query,
  async (query) => {
    const res = await fetch(`/api/search?q=${query}`);
    return res.json();
  }
);
```

## Configuration Options
- `lazy`: Skip initial fetch, only fetch on dependency changes or `refetch()`
- `once`: Fetch only once, ignore subsequent dependency changes
- `initialValue`: Provide initial value before first fetch completes
- `debounce`: Milliseconds to debounce rapid changes (cancels pending requests)
- `throttle`: Milliseconds to throttle rapid changes (spaces requests by delay)

## API
- `current`: Current resource value
- `loading`: Boolean loading state
- `error`: Error object if fetch failed
- `mutate(value)`: Update resource value directly (optimistic updates)
- `refetch(info?)`: Re-run fetcher with current watching values

## Fetcher Parameters
- `value`: Current source value(s)
- `previousValue`: Previous source value(s)
- `data`: Previous fetcher return value
- `refetching`: Boolean or value passed to `refetch()`
- `onCleanup`: Register cleanup function
- `signal`: AbortSignal for canceling fetch requests