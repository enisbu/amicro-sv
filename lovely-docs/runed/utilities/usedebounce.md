## useDebounce

A utility function that creates a debounced version of a callback function. Debouncing delays function execution until after a specified duration of inactivity, preventing excessive calls.

### Usage

```svelte
import { useDebounce } from "runed";

let count = $state(0);
let logged = $state("");
let debounceDuration = $state(1000);

const logCount = useDebounce(
	() => {
		logged = `You pressed the button ${count} times!`;
		count = 0;
	},
	() => debounceDuration
);

function ding() {
	count++;
	logCount();
}
```

The debounced function accepts:
- A callback function to debounce
- A function that returns the debounce duration in milliseconds

The returned debounced function has methods:
- `runScheduledNow()` - Execute the pending debounced call immediately
- `cancel()` - Cancel the pending debounced call
- `pending` - Boolean property indicating if a call is scheduled