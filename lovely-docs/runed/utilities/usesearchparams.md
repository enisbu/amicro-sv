## useSearchParams

Reactive, type-safe, schema-driven management of URL search parameters in Svelte/SvelteKit. Supports validation, defaults, compression, debouncing, and history control.

### Requirements
- `@sveltejs/kit` installed
- Standard Schema compatible validator (Zod, Valibot, Arktype, or built-in `createSearchParamsSchema`)

### Basic Usage

Define schema with Zod:
```ts
import { z } from "zod";
export const productSearchSchema = z.object({
	page: z.coerce.number().default(1),
	filter: z.string().default(""),
	sort: z.enum(["newest", "oldest", "price"]).default("newest")
});
```

Use in component:
```svelte
<script lang="ts">
import { useSearchParams } from "runed/kit";
import { productSearchSchema } from './schemas';

const params = useSearchParams(productSearchSchema);
const page = $derived(params.page); // number (defaults to 1)
const sort = $derived(params.sort); // 'newest' | 'oldest' | 'price'

// Update parameters
params.page = 2; // Updates URL to ?page=2
params.update({ page: 3, sort: 'oldest' }); // Multiple updates
params.reset(); // Reset to defaults
params.toURLSearchParams(); // Get URLSearchParams object
</script>

<input type="text" bind:value={params.filter} />
```

Use in load function:
```ts
import { validateSearchParams } from "runed/kit";
import { productSearchSchema } from "./schemas";

export const load = ({ url, fetch }) => {
	const { searchParams } = validateSearchParams(url, productSearchSchema);
	const response = await fetch(`/api/products?${searchParams.toString()}`);
	return { products: await response.json() };
};
```

### Options

- `showDefaults` (boolean): Show parameters with default values in URL (default: false)
- `debounce` (number): Delay URL updates in milliseconds (default: 0)
- `pushHistory` (boolean): Create new history entries on update (default: true)
- `compress` (boolean): Compress all params into single `_data` parameter using lz-string (default: false)
- `compressedParamName` (string): Custom name for compressed parameter (default: '_data')
- `updateURL` (boolean): Update URL when parameters change (default: true)
- `noScroll` (boolean): Preserve scroll position on URL update (default: false)
- `dateFormats` (object): Map field names to 'date' (YYYY-MM-DD) or 'datetime' (ISO8601) format

Example with options:
```ts
const params = useSearchParams(schema, {
  showDefaults: true,
  debounce: 300,
  pushHistory: false,
  compress: true,
  compressedParamName: '_compressed'
});
```

### Alternative Schema Validators

Valibot:
```ts
import * as v from "valibot";
const schema = v.object({
	page: v.optional(v.fallback(v.number(), 1), 1),
	filter: v.optional(v.fallback(v.string(), ""), ""),
	sort: v.optional(v.fallback(v.picklist(["newest", "oldest", "price"]), "newest"), "newest")
});
const params = useSearchParams(schema);
```

Arktype:
```ts
import { type } from "arktype";
const schema = type({
	page: "number = 1",
	filter: 'string = ""',
	sort: '"newest" | "oldest" | "price" = "newest"'
});
const params = useSearchParams(schema);
```

### createSearchParamsSchema

Lightweight built-in schema creator without external dependencies:
```ts
const schema = createSearchParamsSchema({
	page: { type: "number", default: 1 },
	filter: { type: "string", default: "" },
	sort: { type: "string", default: "newest" },
	tags: { type: "array", default: ["new"], arrayType: "" },
	config: { type: "object", default: { theme: "light" }, objectType: { theme: "" } }
});
```

URL storage format:
- Arrays: JSON strings `?tags=["sale","featured"]`
- Objects: JSON strings `?config={"theme":"dark"}`
- Dates: ISO8601 `?createdAt=2023-12-01T10:30:00.000Z` or date-only `?birthDate=2023-12-01`
- Primitives: Direct `?page=2&filter=red`

Limitations:
- Basic array/object validation only (no nested validation)
- No custom validation rules
- No granular reactivity for nested properties (must reassign entire value: `params.config = {...params.config, theme: 'dark'}`)

### Date Format Support

Option 1: Using `dateFormat` in schema:
```ts
const schema = createSearchParamsSchema({
	birthDate: { type: "date", default: new Date("1990-01-15"), dateFormat: "date" },
	createdAt: { type: "date", default: new Date(), dateFormat: "datetime" }
});
const params = useSearchParams(schema);
// URL: ?birthDate=1990-01-15&createdAt=2023-01-01T10:30:00.000Z
```

Option 2: Using `dateFormats` option (works with any validator):
```ts
const params = useSearchParams(zodSchema, {
	dateFormats: {
		birthDate: "date",
		createdAt: "datetime"
	}
});
```

Date format details:
- `'date'`: YYYY-MM-DD format (e.g., 2025-10-21), parsed as midnight UTC
- `'datetime'`: Full ISO8601 (e.g., 2025-10-21T18:18:14.196Z), preserves exact time

Practical example:
```svelte
<script lang="ts">
	import { useSearchParams, createSearchParamsSchema } from "runed/kit";

	const schema = createSearchParamsSchema({
		eventDate: { type: "date", default: new Date("2025-01-01"), dateFormat: "date" },
		createdAt: { type: "date", default: new Date(), dateFormat: "datetime" }
	});

	const params = useSearchParams(schema);
</script>

<label>
	Event Date:
	<input
		type="date"
		value={params.eventDate.toISOString().split("T")[0]}
		oninput={(e) => (params.eventDate = new Date(e.target.value))} />
</label>

<label>
	Created At:
	<input
		type="datetime-local"
		value={params.createdAt.toISOString().slice(0, 16)}
		oninput={(e) => (params.createdAt = new Date(e.target.value))} />
</label>
```

### validateSearchParams

Server-side utility to extract, validate, and convert URL search parameters to URLSearchParams. Handles both standard and compressed parameters.

```ts
import { validateSearchParams } from "runed/kit";
import { productSchema } from "./schemas";

export const load = ({ url, fetch }) => {
	const { searchParams, data } = validateSearchParams(url, productSchema, {
		compressedParamName: "_compressed",
		dateFormats: {
			birthDate: "date",
			createdAt: "datetime"
		}
	});

	const response = await fetch(`/api/products?${searchParams.toString()}`);
	return { products: await response.json() };
};
```

### Advanced: Zod Codecs (Zod v4.1.0+)

Custom bidirectional transformations for URL serialization. Use when you need custom date formats, complex type conversions, or compact representations.

Define reusable codecs:
```ts
import { z } from "zod";

// Unix timestamp codec (stores Date as number)
const unixTimestampCodec = z.codec(
	z.coerce.number(),
	z.date(),
	{
		decode: (timestamp) => new Date(timestamp * 1000),
		encode: (date) => Math.floor(date.getTime() / 1000)
	}
);

// Date-only codec (stores Date as YYYY-MM-DD)
const dateOnlyCodec = z.codec(
	z.string(),
	z.date(),
	{
		decode: (str) => new Date(str + "T00:00:00.000Z"),
		encode: (date) => date.toISOString().split("T")[0]
	}
);

// Compact ID codec (stores number as base36 string)
const compactIdCodec = z.codec(
	z.string(),
	z.number(),
	{
		decode: (str) => parseInt(str, 36),
		encode: (num) => num.toString(36)
	}
);
```

Use in schema:
```ts
const searchSchema = z.object({
	query: z.string().default(""),
	page: z.coerce.number().default(1),
	createdAfter: unixTimestampCodec.optional(),
	birthDate: dateOnlyCodec.default(new Date("1990-01-15")),
	productId: compactIdCodec.optional()
});

const params = useSearchParams(searchSchema);
```

Real-world event search example:
```svelte
<script lang="ts">
	import { z } from "zod";
	import { useSearchParams } from "runed/kit";

	const unixTimestamp = z.codec(z.coerce.number(), z.date(), {
		decode: (ts) => new Date(ts * 1000),
		encode: (date) => Math.floor(date.getTime() / 1000)
	});

	const dateOnly = z.codec(z.string(), z.date(), {
		decode: (str) => new Date(str + "T00:00:00.000Z"),
		encode: (date) => date.toISOString().split("T")[0]
	});

	const eventSearchSchema = z.object({
		query: z.string().default(""),
		eventDate: dateOnly.default(new Date()),
		createdAfter: unixTimestamp.optional(),
		updatedSince: unixTimestamp.optional()
	});

	const params = useSearchParams(eventSearchSchema);
</script>

<label>
	Event Date:
	<input
		type="date"
		value={params.eventDate.toISOString().split("T")[0]}
		oninput={(e) => (params.eventDate = new Date(e.target.value))} />
</label>

<label>
	Created After:
	<input
		type="date"
		value={params.createdAfter?.toISOString().split("T")[0] ?? ""}
		oninput={(e) =>
			(params.createdAfter = e.target.value ? new Date(e.target.value) : undefined)} />
</label>

<!-- Clean URLs:
     Without codecs: ?eventDate=2025-01-15T00:00:00.000Z&createdAfter=2024-01-01T00:00:00.000Z
     With codecs:    ?eventDate=2025-01-15&createdAfter=1704067200
-->
```

Codec benefits:
- Custom date formats (Unix timestamps, relative dates, custom strings)
- Any type conversions (numbers, objects, arrays)
- Optimized URL size
- Full Zod validation + transformation
- Reusable codec definitions
- Automatic with `validateSearchParams` on server

Codecs work automatically with `validateSearchParams`:
```ts
export const load = ({ url }) => {
	const { searchParams, data } = validateSearchParams(url, eventSearchSchema);
	// data.eventDate is a Date object (decoded from URL string)
	return { events: await fetchEvents(searchParams) };
};
```

### Reactivity Limitations

Top-level reactivity only:

✅ Works (direct property assignment):
```svelte
<script>
	const params = useSearchParams(schema);
	params.page = 2;
	params.filter = "active";
	params.config = { theme: "dark", size: "large" };
	params.items = [...params.items, newItem];
</script>
```

❌ Doesn't work (nested property mutations):
```svelte
<script>
	const params = useSearchParams(schema);
	params.config.theme = "dark"; // Nested object property
	params.items.push(newItem); // Array method
	params.items[0].name = "updated"; // Array item property
	delete params.config.oldProp; // Property deletion
</script>
```

Design rationale: Prioritizes simplicity, type safety, and ease of use. Benefits include simple predictable API, full TypeScript support, clean URLs, performance, and reliability.

### Type Definitions

```ts
interface SearchParamsOptions {
	showDefaults?: boolean; // default: false
	debounce?: number; // default: 0
	pushHistory?: boolean; // default: true
	compress?: boolean; // default: false
	compressedParamName?: string; // default: '_data'
	updateURL?: boolean; // default: true
	noScroll?: boolean; // default: false
	dateFormats?: Record<string, "date" | "datetime">;
}

type ReturnUseSearchParams<Schema extends StandardSchemaV1> = {
	[key: string]: any; // Typed, reactive params
	update(values: Partial<StandardSchemaV1.InferOutput<Schema>>): void;
	reset(showDefaults?: boolean): void;
	toURLSearchParams(): URLSearchParams;
};

type SchemaTypeConfig<ArrayType = unknown, ObjectType = unknown> =
	| { type: "string"; default?: string }
	| { type: "number"; default?: number }
	| { type: "boolean"; default?: boolean }
	| { type: "array"; default?: ArrayType[]; arrayType?: ArrayType }
	| { type: "object"; default?: ObjectType; objectType?: ObjectType }
	| { type: "date"; default?: Date; dateFormat?: "date" | "datetime" };
```