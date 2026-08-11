## onClickOutside

Detects clicks outside a specified element and executes a callback. Useful for dismissible dropdowns, modals, and interactive components.

### Basic Usage
```svelte
import { onClickOutside } from "runed";

let container = $state<HTMLElement>()!;

onClickOutside(
	() => container,
	() => console.log("clicked outside")
);
```

### Controlled Listener
Returns control methods `start()` and `stop()` plus a reactive `enabled` property to manage the listener programmatically.

```svelte
const clickOutside = onClickOutside(
	() => dialog,
	() => {
		dialog.close();
		clickOutside.stop();
	},
	{ immediate: false }
);

function openDialog() {
	dialog.showModal();
	clickOutside.start();
}

function closeDialog() {
	dialog.close();
	clickOutside.stop();
}
```

### Options
- `immediate` (boolean, default: true) - Whether handler is enabled by default
- `detectIframe` (boolean, default: false) - Detect focus events from iframes
- `document` (Document, default: global document) - Document object to use
- `window` (Window, default: global window) - Window object to use

### Type Definition
```ts
export declare function onClickOutside<T extends Element = HTMLElement>(
	container: MaybeElementGetter<T>,
	callback: (event: PointerEvent | FocusEvent) => void,
	opts?: OnClickOutsideOptions
): {
	stop: () => boolean;
	start: () => boolean;
	readonly enabled: boolean;
};
```