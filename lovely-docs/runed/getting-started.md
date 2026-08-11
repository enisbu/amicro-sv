## Installation

Install via npm:
```bash
npm install runed
```

## Usage

Import utilities into `.svelte` or `.svelte.js|ts` files.

**Example in Svelte component:**
```svelte
<script lang="ts">
	import { activeElement } from "runed";
	let inputElement = $state<HTMLInputElement | undefined>();
</script>

<input bind:this={inputElement} />
{#if activeElement.current === inputElement}
	The input element is active!
{/if}
```

**Example in module:**
```ts
import { activeElement } from "runed";

$effect(() => {
	console.log("Active element is ", activeElement.current);
});
```

Utilities can be used reactively with `$effect` to track state changes.