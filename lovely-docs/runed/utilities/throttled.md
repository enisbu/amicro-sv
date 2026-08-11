## Throttled

A wrapper over `useThrottle` that returns a throttled state. Delays state updates by a specified interval.

### Basic Usage

```ts
import { Throttled } from "runed";

let search = $state("");
const throttled = new Throttled(() => search, 500);
```

The throttled object's `current` property reflects the throttled value. In the example above, `throttled.current` updates at most every 500ms as `search` changes.

### Canceling and Immediate Updates

```ts
let count = $state(0);
const throttled = new Throttled(() => count, 500);

count = 1;
throttled.cancel(); // Cancels pending update
console.log(throttled.current); // Still 0

count = 2;
console.log(throttled.current); // Still 0
throttled.setImmediately(count); // Sets value immediately, cancels pending updates
console.log(throttled.current); // 2
```

Methods:
- `cancel()` - Cancels any pending throttled update
- `setImmediately(value)` - Sets the throttled value immediately and cancels pending updates