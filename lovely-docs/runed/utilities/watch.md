## watch

Manually specify which reactive values should trigger a callback, unlike `$effect` which automatically tracks all dependencies.

**watch(source, callback, options?)**

Runs callback when source changes. Source is a getter function returning the dependency value(s).

```ts
import { watch } from "runed";

let count = $state(0);
watch(() => count, (curr, prev) => {
	console.log(`count is ${curr}, was ${prev}`);
});
```

Watch entire objects with `$state.snapshot()`:
```ts
let user = $state({ name: 'bob', age: 20 });
watch(() => $state.snapshot(user), () => {
	console.log(`${user.name} is ${user.age} years old`);
});
```

Watch specific nested values:
```ts
watch(() => user.age, () => {
	console.log(`User is now ${user.age} years old`);
});
```

Watch multiple sources as array:
```ts
let age = $state(20);
let name = $state("bob");
watch([() => age, () => name], ([age, name], [prevAge, prevName]) => {
	// callback receives current and previous values as arrays
});
```

**Options:**
- `lazy: true` - First run only happens after sources change (default: false)

**watch.pre** - Uses `$effect.pre` instead of `$effect` under the hood.

**watchOnce / watchOnce.pre** - Runs callback only once, then stops. Same behavior as `watch`/`watch.pre` but no options parameter.