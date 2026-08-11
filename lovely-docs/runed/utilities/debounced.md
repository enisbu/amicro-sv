A wrapper over `useDebounce` that returns a debounced state object.

**Usage:**
```ts
import { Debounced } from "runed";

let search = $state("");
const debounced = new Debounced(() => search, 500);
```

Access the debounced value via `debounced.current`.

**Methods:**
- `cancel()` - Cancel the pending debounced update
- `setImmediately(value)` - Set a new value immediately and cancel pending updates
- `updateImmediately()` - Run the pending update immediately

**Example:**
```ts
let count = $state(0);
const debounced = new Debounced(() => count, 500);

count = 1;
debounced.cancel();
console.log(debounced.current); // 0 (update was cancelled)

count = 2;
debounced.setImmediately(count);
console.log(debounced.current); // 2 (set immediately)

count = 3;
await debounced.updateImmediately();
console.log(debounced.current); // 3 (updated immediately)
```