Reactive boolean that tracks document visibility state using the Page Visibility API.

**Usage:**
```ts
import { IsDocumentVisible } from "runed";

const visible = new IsDocumentVisible();
console.log(visible.current); // true when document is visible, false when hidden
```

**Type Definition:**
```ts
type IsDocumentVisibleOptions = {
	window?: Window;
	document?: Document;
};

class IsDocumentVisible {
	constructor(options?: IsDocumentVisibleOptions);
	readonly current: boolean;
}
```

**Details:**
- Listens to the `visibilitychange` event and updates automatically
- Uses `document.hidden` and `visibilitychange` from the Page Visibility API
- In non-browser contexts, `current` defaults to `false`
- Accepts optional `window` and `document` parameters for custom contexts