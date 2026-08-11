## Previous

A reactive utility that maintains and provides access to the previous value of a getter function.

### Purpose
Useful for comparing state changes or implementing transition effects by tracking the prior value of reactive state.

### Usage

```ts
import { Previous } from "runed";

let count = $state(0);
const previous = new Previous(() => count);

// Access previous value
console.log(previous.current); // undefined initially, then previous count value
```

In a component:
```svelte
<button onclick={() => count++}>Count: {count}</button>
<pre>Previous: {previous.current}</pre>
```

### API

```ts
class Previous<T> {
	constructor(getter: () => T);
	readonly current: T | undefined; // Previous value, undefined until getter is called once
}
```

The `current` property reactively tracks the previous value of the getter function. On first access, it's undefined since there is no prior value yet.