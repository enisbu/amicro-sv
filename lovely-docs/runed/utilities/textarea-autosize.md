## TextareaAutosize

Utility that automatically adjusts textarea height based on content without layout shifts.

### How it works
- Creates an invisible off-screen textarea clone
- Copies computed styles from the actual textarea
- Measures scroll height of the clone to determine needed height
- Applies the height (or minHeight) to the real textarea
- Recalculates on content changes, element resizes, and width changes

### Basic usage
```svelte
<script lang="ts">
	import { TextareaAutosize } from "runed";

	let el = $state<HTMLTextAreaElement>(null!);
	let value = $state("");

	new TextareaAutosize({
		element: () => el,
		input: () => value
	});
</script>

<textarea bind:this={el} bind:value></textarea>
```

### Options
- `element` (required): `Getter<HTMLElement | undefined>` - The target textarea
- `input` (required): `Getter<string>` - Reactive input value
- `onResize`: `() => void` - Called whenever height is updated
- `styleProp`: `"height" | "minHeight"` - CSS property to control size. "height" resizes both ways, "minHeight" grows only. Default: "height"
- `maxHeight`: `number` - Maximum height in pixels before scroll appears. Default: unlimited

### Grow-only behavior
```ts
new TextareaAutosize({
	element: () => el,
	input: () => value,
	styleProp: "minHeight"
});
```
Textarea expands as needed but won't shrink smaller than current size.