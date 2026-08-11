## useInterval

A reactive wrapper around `setInterval` with pause/resume controls and automatic tick counting.

### Basic Usage

```svelte
import { useInterval } from "runed";

let delay = $state(1000);
const interval = useInterval(() => delay, {
  callback: (count) => console.log(`Tick ${count}`)
});

<p>Counter: {interval.counter}</p>
<p>Status: {interval.isActive ? "Running" : "Paused"}</p>
<input type="number" bind:value={delay} />
<button onclick={interval.pause} disabled={!interval.isActive}>Pause</button>
<button onclick={interval.resume} disabled={interval.isActive}>Resume</button>
<button onclick={interval.reset}>Reset Counter</button>
```

### Counter

Built-in `counter` property tracks ticks. Call `interval.reset()` to reset it.

### Callback

Optional callback receives current counter value on each tick:
```svelte
const interval = useInterval(1000, {
  callback: (count) => console.log(`Tick number ${count}`)
});
```

### Options

- `immediate` (default: `true`) - Start interval immediately
- `immediateCallback` (default: `false`) - Execute callback immediately when resuming
- `callback` - Optional callback function receiving counter value

```svelte
const interval = useInterval(1000, {
  immediate: false,
  immediateCallback: true,
  callback: (count) => console.log(count)
});
```

### Reactive Interval

Pass a function returning the delay to make it reactive. Timer automatically restarts when delay changes:
```svelte
let delay = $state(1000);
const interval = useInterval(() => delay);
<input type="range" bind:value={delay} min="100" max="2000" />
```

### API

- `counter` - Current tick count
- `isActive` - Whether interval is running
- `pause()` - Pause the interval
- `resume()` - Resume the interval
- `reset()` - Reset counter to 0