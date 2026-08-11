## ElementSize

Provides reactive access to an element's width and height, automatically updating when dimensions change. Similar to `ElementRect` but focused only on size measurements.

### Usage

```svelte
<script lang="ts">
	import { ElementSize } from "runed";

	let el = $state() as HTMLElement;
	const size = new ElementSize(() => el);
</script>

<textarea bind:this={el}></textarea>

<p>Width: {size.width} Height: {size.height}</p>
```

### Type Definition

```ts
interface ElementSize {
	readonly width: number;
	readonly height: number;
}
```

The utility accepts a function that returns an HTMLElement and exposes `width` and `height` properties that update reactively.