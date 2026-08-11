## Purpose
Type-safe wrapper around Svelte's Context API for sharing data between components without prop drilling.

## Creating Context
Define a context instance with a type:
```ts
import { Context } from "runed";
export const myTheme = new Context<"light" | "dark">("theme");
```
The constructor parameter is just an identifier for debugging. The context is empty until explicitly set.

## Setting Context
Set the value in a parent component during initialization:
```svelte
<script lang="ts">
	import { myTheme } from "./context";
	let { data, children } = $props();
	myTheme.set(data.theme);
</script>
{@render children?.()}
```
Must be called during component initialization, not in event handlers or callbacks.

## Reading Context
Child components retrieve the value:
```svelte
<script lang="ts">
	import { myTheme } from "./context";
	const theme = myTheme.get();
	const theme = myTheme.getOr("light"); // with fallback
</script>
```

## API
- `constructor(name: string)` - Creates context with identifier
- `key: symbol` - Internal key (avoid direct use)
- `exists(): boolean` - Check if context is set
- `get(): TContext` - Retrieve context, throws if not set
- `getOr<TFallback>(fallback: TFallback): TContext | TFallback` - Retrieve with fallback
- `set(context: TContext): TContext` - Set and return context value

All methods must be called during component initialization.