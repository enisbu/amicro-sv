## Purpose
The `extract` utility resolves either a getter function or a static value to a plain value, simplifying code that needs to handle both reactive and static inputs.

## Problem
APIs that accept `MaybeGetter<T>` (either a function returning T or a static value) require verbose conditional logic:
```ts
typeof wait === "function" ? (wait() ?? 250) : (wait ?? 250)
```

## Solution
```ts
import { extract } from "runed";

function throwConfetti(intervalProp?: MaybeGetter<number | undefined>) {
	const interval = $derived(extract(intervalProp, 100));
}

// Also works with Debounced:
const d1 = new Debounced(() => search, () => debounceTime);
const d2 = new Debounced(() => search, 500);
const d3 = new Debounced(() => search);
```

## Behavior
`extract(input, fallback)` resolves:
- Static value → returns the value
- `undefined` → returns fallback
- Function returning value → returns the result
- Function returning `undefined` → returns fallback

Fallback is optional; omitting it returns `T | undefined`.

## Types
```ts
function extract<T>(input: MaybeGetter<T | undefined>, fallback: T): T;
function extract<T>(input: MaybeGetter<T | undefined>): T | undefined;
```