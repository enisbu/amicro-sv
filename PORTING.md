# Porting conventions

Binding for every file that moves from the React original to Svelte 5. This file
is the contract, not the documentation.

## Target stack

Svelte 5 (runes, enforced through `vite.config.ts`), SvelteKit 2, Tailwind 4,
`motion-sv` for animation, `runed` for reactive utilities, `@lucide/svelte` for
icons. No further dependency without need.

## Placement

| Original | Target |
|---|---|
| `registry/**` | `src/lib/amicro/**` (already ported, do not touch) |
| `src/components/**` | `src/lib/app/components/**` |
| `src/data/**` | `src/lib/app/data/**` |
| `src/utils/**` | `src/lib/app/**` |
| `src/App.tsx` (views) | `src/routes/**` |

Every group gets an `index.ts` with a collected export.

## Comments

No comments in `src/` or `tests/`. Provenance and license live centrally in
`NOTICE.md` and `LICENSE.upstream`, not as a header per file. The only comments
that survive are directives the compiler or tooling reads: `svelte-ignore`,
`eslint-disable`, `ts-expect-error`. Everything a comment used to explain belongs
in this file or in a name.

## Language

English, everywhere: identifiers, strings, log messages, docs, commit messages.
No em or en dashes. No emojis.

## React to Svelte 5

| React | Svelte 5 |
|---|---|
| `useState(x)` | `let x = $state(...)` |
| `useMemo(fn, deps)` | `const x = $derived(...)` or `$derived.by(() => ...)` |
| `useCallback(fn, deps)` | plain function, dropped |
| `useEffect(fn, [])` | `$effect(() => { ...; return () => cleanup(); })` |
| `useRef` on DOM | `let el: HTMLDivElement; bind:this={el}` |
| `useRef` as a holder | plain `let` outside the template |
| `React.memo(C)` | dropped |
| `props.children` | `{@render children?.()}` with `children?: Snippet` |
| `className` | `class` |
| `onClick` | `onclick` |
| Array `.map()` in JSX | `{#each}` with a stable key |

Props always through `let { a, b = 1, children }: Props = $props()` with an
exported `interface Props`. No `export let`.

## motion-sv

- `import { motion, AnimatePresence } from 'motion-sv'`, then `<motion.div>`.
- Styles **always** as an object: `style={{ x, backgroundColor: '#fff' }}`, never a string.
- `whileTap` is called `whilePress`.
- `viewport={{...}}` is called `inViewOptions={{...}}`.
- Layout animations need `createLayoutMotion(motion)` plus `<layout.div>` and
  `layout.update.with(fn)` around the state change. The `layout` prop alone is not enough.
- A `layout` prop in the original is never dropped, it is translated. Drop it and the box
  jumps in a single frame as soon as its content changes width.
- Text is the exception. A layout animation moves a box by scaling it, so a label that
  changes width gets stretched and squeezed while it travels: measured 1.36 on the way in,
  and the original does exactly the same. Animate the width instead. Two hidden spans
  measure both labels, `useSpring` drives the width, `jump()` sets the first value so
  nothing unfolds on load (`Morph.svelte`). No layout scope, so nothing can snapshot twice.
- Reordering a keyed list is the strict case: the snapshot has to happen in the handler
  that changes the state, before Svelte touches the DOM. A `$effect.pre` that calls
  `update()` is not a substitute. It is early enough when a class on the container
  changes, because that re-renders the children, but a reorder only moves existing nodes
  and by then the snapshot is worthless. A changing `layoutDependency` does not save it
  either, and neither does `layout` over `layout="position"`. Both were measured.
- If the state lives above the component that owns the namespace, export a
  `snapshot()` from that component and call it right after the state change
  (`ButtonsSection.svelte`, `CardsSection.svelte`, used by `toggleSort` in
  `src/routes/+page.svelte`). Do not lift the namespace up to share one scope, that
  breaks the rule below.
- One layout namespace per visible area, and never snapshot while that area is hidden.
  `update()` snapshots every registered element, and a `display: none` element reports a
  zero box, so it flies in from (0, 0) once it becomes visible.
- If the box changes size a lot between states, animate position only. The layout proxy
  forces `layout: true`, so use a plain `<motion.div layout="position">` inside a
  `<layout.div>` scope: it still registers itself and the content stops being distorted.
- Springs overshoot. The upstream 400/25 pushes tiles past the container edge; 400/38 at
  mass 0.9 keeps the same character without leaving the bounds.
- Exit animations are registered as a **global** Svelte transition
  (`transition:motionExit|global`). Destroying a parent block does not kill them, the
  subtree stays until every nested exit has finished. Anything that has to swap
  instantly must keep its animated subtree mounted instead of unmounting it.
- Tab panels that unmount on switch (`{#if}`) keep that `{#if}` inside a wrapper whose
  class flips to `hidden` for every inactive tab. The wrapper looks redundant next to
  the `{#if}` but is not: the destroyed subtree lingers in the DOM until its exits
  finish, and the wrapper is what keeps that corpse from pushing the next panel down.
  Measured on the loaders to dither-charts switch, 330 ms of double layout without it.
- A tile that swaps its content between layout modes keeps both variant shells mounted
  and flips classes instead of branching the whole tile with `{#if}/{:else}`. Swapping
  the shell eats the FLIP snapshot of the tile and paints one uncompensated frame, a
  visible teleport before the spring starts (`CardsSection.svelte`, measured 1484 to
  3248 px single-frame jumps before the change). Expensive content inside a mounted
  shell may still unmount per mode, that leaves the snapshot intact (measured).
- No Svelte `transition:` directives in ported components.
- Full reference: `docs/motion-sv.md`.

## runed

Docs live under `lovely-docs/runed/`. Read up before first use of a utility.
Mandatory instead of hand rolling:

- `useInView` (framer-motion) becomes `IsInViewport` or `ElementRect` from runed.
- `localStorage` persistence becomes `PersistedState`.
- Resize and element size becomes `ElementSize`.

`useReducedMotion` does **not** come from runed. runed 0.34 exports no
`MediaQuery`, it points at Svelte itself. Canonical for this project is
`prefersReducedMotion` from `svelte/motion`, the way
`src/lib/amicro/hooks/use-reduced-motion.svelte.ts` already uses it. No
`window.matchMedia` per frame.

## Shared state

`theme`, `toastMessage`, `showToast`, `triggerHaptic` are **not** passed down as
props. Instead:

```svelte
<script lang="ts">
  import { getAppState } from '$lib/app/app-state.svelte.js';
  const app = getAppState();
</script>
<button onclick={() => app.showToast('Copied!')}>…</button>
```

`app.theme`, `app.showToast(msg)`, `app.haptic('light')`, `app.copy(text, msg)`.
The context is set once in `src/routes/+layout.svelte`.

## SSR

No `window`, `document`, `navigator` or `localStorage` at module level or in a
component body. Only inside `$effect`, `onMount` or behind `if (browser)`. Canvas
work belongs entirely in `$effect`.

## Replaced libraries

| Original | Replacement |
|---|---|
| `motion/react`, `framer-motion` | `motion-sv` |
| `lucide-react` | `@lucide/svelte`, same icon names |
| `recharts` | `layerchart`, see below |
| `@vercel/analytics/react` | dropped |

`recharts` is React only. The replacement is LayerChart 2.x, the same substrate
shadcn-svelte runs on, fully on Svelte 5 runes. The six affected metric cards
compose `Chart` plus `Svg` with `Area`, `Spline`, `Bars`, `Axis`, `Grid`,
`Highlight` and `Tooltip`. Curves run through `curveMonotoneX` from `d3-shape`,
exactly the curve behind recharts' `type="monotone"`. `d3-shape` and `d3-scale`
are dependencies of LayerChart anyway and only declared explicitly so they are
importable under pnpm. Looks and data stay, the implementation is new.

## Done means

`pnpm check` runs with no errors and no warnings, `pnpm build` passes, and
`pnpm test:amicro` reports PASSED. No `any` as a shortcut, no `@ts-ignore`, no
commented-out leftovers.
