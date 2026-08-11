## StateHistory

Tracks state changes with undo/redo capabilities. Takes a getter and setter, logs each state change with timestamp.

### Basic Usage

```ts
import { StateHistory } from "runed";

let count = $state(0);
const history = new StateHistory(() => count, (c) => (count = c));
history.log[0]; // { snapshot: 0, timestamp: ... }
```

### Methods

**`undo()`** - Reverts state to previous value in history log, moves current state to redo stack.
```ts
let count = $state(0);
const history = new StateHistory(() => count, (c) => (count = c));
count = 1;
count = 2;
history.undo(); // count is now 1
history.undo(); // count is now 0
```

**`redo()`** - Restores previously undone state from redo stack.
```ts
history.undo(); // count is now 1
history.redo();  // count is now 2
```

**`clear()`** - Clears history log and redo stack.
```ts
history.clear();
console.log(history.log); // []
console.log(history.canUndo); // false
console.log(history.canRedo); // false
```

### Properties

- **`log`** - Array of `LogEvent<T>` objects with `snapshot` and `timestamp`
- **`canUndo`** - Derived boolean, true when log has more than one item
- **`canRedo`** - Derived boolean, true when redo stack is not empty

### UI Example

```svelte
<script lang="ts">
	import { StateHistory } from "runed";
	let count = $state(0);
	const history = new StateHistory(() => count, (c) => (count = c));
</script>

<p>{count}</p>
<button onclick={() => count++}>Increment</button>
<button onclick={() => count--}>Decrement</button>
<button disabled={!history.canUndo} onclick={history.undo}>Undo</button>
<button disabled={!history.canRedo} onclick={history.redo}>Redo</button>
<button onclick={history.clear}>Clear History</button>
```