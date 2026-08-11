## PersistedState

A reactive state manager that persists data to browser storage (localStorage or sessionStorage) and optionally synchronizes changes across browser tabs in real-time.

### Basic Usage

```ts
import { PersistedState } from "runed";

const count = new PersistedState("count", 0);
count.current++; // Persists automatically
```

### Complex Objects

Only plain structures (arrays, plain objects, primitives) are deeply reactive and persist on mutation:

```ts
const arr = new PersistedState("foo", ["a", "b"]);
arr.current.push("c"); // Persists

const obj = new PersistedState("bar", { name: "Bob" });
obj.current.name = "JG"; // Persists

class Person { name: string; }
const complex = new PersistedState("baz", new Person("Bob"));
complex.current.name = "JG"; // Does NOT persist
complex.current = new Person("JG"); // Persists
```

### Configuration Options

```ts
const state = new PersistedState("key", initialValue, {
  storage: "session", // 'local' (default) or 'session'
  syncTabs: false,    // Cross-tab sync (default: true)
  connected: false,   // Start disconnected (default: true)
  serializer: {
    serialize: superjson.stringify,
    deserialize: superjson.parse
  }
});
```

### Connection Control

```ts
const state = new PersistedState("temp", value, { connected: false });
state.current = "new"; // In-memory only
state.connect();       // Persists to storage
state.disconnect();    // Removes from storage, keeps in memory
console.log(state.connected); // Check status
```

When disconnected: state changes stay in memory, storage changes don't affect state, cross-tab sync is disabled. `disconnect()` removes from storage but preserves value in memory. `connect()` immediately persists current in-memory value.

### Custom Serialization

For complex types like Date objects:

```ts
import superjson from "superjson";

const lastAccessed = new PersistedState("last-accessed", new Date(), {
  serializer: {
    serialize: superjson.stringify,
    deserialize: superjson.parse
  }
});
```