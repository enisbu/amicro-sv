## Finite State Machine

A strongly-typed FSM for tracking states and events. Define states and which events transition between them.

### Basic Usage

```ts
import { FiniteStateMachine } from "runed";
type MyStates = "on" | "off";
type MyEvents = "toggle";

const f = new FiniteStateMachine<MyStates, MyEvents>("off", {
	off: { toggle: "on" },
	on: { toggle: "off" }
});

f.send("toggle"); // transition to next state
```

First argument is initial state. Second argument maps each state to its valid events and target states.

### Actions

Instead of string targets, use functions that return a state. Can receive parameters and conditionally transition or prevent transitions by returning nothing:

```ts
const f = new FiniteStateMachine<MyStates, MyEvents>("off", {
	off: {
		toggle: () => isTuesday ? "on" : undefined
	},
	on: {
		toggle: (heldMillis: number) => heldMillis > 3000 ? "off" : undefined
	}
});

f.send("toggle", arg1, arg2); // pass args to action
```

### Lifecycle Methods

`_enter` and `_exit` handlers invoked on state transitions:

```ts
const f = new FiniteStateMachine<MyStates, MyEvents>("off", {
	off: {
		toggle: "on",
		_enter: (meta) => console.log("off"),
		_exit: (meta) => console.log("leaving off")
	},
	on: {
		toggle: "off",
		_enter: (meta) => console.log("on"),
		_exit: (meta) => console.log("leaving on")
	}
});
```

Metadata object contains: `from` (exited state), `to` (entered state), `event` (triggering event), `args` (optional additional params). For initial state, `from` and `event` are `null`.

### Wildcard Handlers

Use `"*"` state as fallback for unhandled events:

```ts
const f = new FiniteStateMachine<MyStates, MyEvents>("off", {
	off: { toggle: "on" },
	on: { toggle: "off" },
	"*": { emergency: "off" }
});

f.send("emergency"); // handled by wildcard, works from any state
```

### Debouncing

Schedule state transitions after a delay. Re-invoking with same event cancels and restarts the timer:

```ts
f.debounce(5000, "toggle"); // transition in 5 seconds
f.debounce(5000, "toggle"); // cancels previous, starts new timer

// Use in actions or lifecycle methods:
const f = new FiniteStateMachine<MyStates, MyEvents>("off", {
	off: {
		toggle: () => {
			f.debounce(5000, "toggle");
			return "on";
		}
	},
	on: { toggle: "off" }
});
```

### Notes

Minimalistic implementation. Based on kenkunz/svelte-fsm. For more features, see statelyai/xstate.