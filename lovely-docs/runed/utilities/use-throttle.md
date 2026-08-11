## useThrottle

A higher-order function that throttles function execution, limiting how frequently a function can be called.

### Usage

```svelte
import { useThrottle } from "runed";

let search = $state("");
let throttledSearch = $state("");
let durationMs = $state(1000);

const throttledUpdate = useThrottle(
	() => {
		throttledSearch = search;
	},
	() => durationMs
);

// Call throttledUpdate() - it will execute at most once per durationMs
```

The function takes two arguments:
1. A callback function to throttle
2. A function that returns the throttle duration in milliseconds

The returned throttled function can be called repeatedly, but the callback will only execute at most once per specified duration interval.