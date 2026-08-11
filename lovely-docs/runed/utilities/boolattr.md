## Purpose
Transforms any value into `""` (empty string) or `undefined` for HTML boolean attributes, where presence indicates truth rather than value.

## Problem
Boolean values render as strings in HTML attributes, making both true and false cases present:
```svelte
<div data-active={true}>Content</div>  <!-- renders: data-active="true" -->
<div data-active={false}>Content</div> <!-- renders: data-active="false" -->
```

## Solution
```ts
import { boolAttr } from "runed";

let isActive = $state(true);
let isLoading = $state(false);

<div data-active={boolAttr(isActive)}>Active</div>    <!-- renders: data-active="" -->
<div data-loading={boolAttr(isLoading)}>Loading</div> <!-- renders: (no attribute) -->
```

## API
```ts
function boolAttr(value: unknown): "" | undefined;
```
- Returns `""` when value is truthy
- Returns `undefined` when value is falsy