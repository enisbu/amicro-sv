## useMutationObserver

Hook to observe changes in a DOM element using the MutationObserver API.

### Basic Usage

Pass an element reference, a callback function to handle mutations, and options object:

```ts
import { useMutationObserver } from "runed";

let el = $state<HTMLElement | null>(null);
const messages = $state<string[]>([]);
let className = $state("");

useMutationObserver(
	() => el,
	(mutations) => {
		const mutation = mutations[0];
		if (!mutation) return;
		messages.push(mutation.attributeName!);
	},
	{ attributes: true }
);

setTimeout(() => {
	className = "text-brand";
}, 1000);
```

The callback receives an array of mutations. In this example, attribute changes are tracked by pushing the `attributeName` to a messages array.

### Stopping the Observer

Call the `stop` method to halt observation:

```ts
const { stop } = useMutationObserver(/* ... */);
stop();
```