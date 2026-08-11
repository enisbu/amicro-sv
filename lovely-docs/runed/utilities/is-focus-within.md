## IsFocusWithin

A utility class that reactively tracks whether any descendant element has focus within a specified container element. Updates automatically when focus changes.

### Usage

```ts
import { IsFocusWithin } from "runed";

let formElement = $state<HTMLFormElement>();
const focusWithinForm = new IsFocusWithin(() => formElement);

// Access current focus state
console.log(focusWithinForm.current); // boolean
```

Use in template:
```svelte
<p>Focus within form: {focusWithinForm.current}</p>
<form bind:this={formElement}>
	<input type="text" />
	<button type="submit">Submit</button>
</form>
```

### Type Definition

```ts
class IsFocusWithin {
	constructor(node: MaybeGetter<HTMLElement | undefined | null>);
	readonly current: boolean;
}
```

Constructor accepts a getter function that returns the container element to track. The `current` property is a readonly boolean indicating whether focus is currently within the container.