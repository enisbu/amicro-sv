---
name: motion-sv
description: Working with motion-sv, the Svelte 5 port of Motion (formerly Framer Motion). Use for any animation, gesture, scroll trigger, exit animation or layout animation in Svelte. Covers the API, the renames against Motion for React, and the four behaviours that fail silently.
---

# motion-sv

[motion-sv](https://github.com/hanielu/motion-svelte) is Motion for Svelte 5. The API follows
`motion-vue` more closely than the React one, so code copied from a React example compiles and then
behaves differently. Requires Svelte 5 runes. Package name: `motion-sv`.

## API

Render any element through the `motion` factory:

```svelte
<script lang="ts">
  import { motion } from 'motion-sv';
</script>

<motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
  <motion.a href="/about" whileHover={{ scale: 1.05 }} whilePress={{ scale: 0.95 }}>About</motion.a>
</motion.section>
```

Props: `initial`, `animate`, `exit`, `transition`, `variants`, gestures `whileHover`, `whilePress`,
`whileDrag`, `whileFocus`, drag with `drag`, `dragConstraints`, `dragElastic`, `dragMomentum`, and
the events `onAnimationStart`, `onAnimationComplete`, `onUpdate`, `onHoverStart`, `onHoverEnd`,
`onPress`, `onPressStart`, `onPressEnd`.

**Styles are objects, never strings.** A CSS string breaks MotionValue binding and is a type error
on a motion component:

```svelte
<motion.div style={{ x, backgroundColor: '#ff0000', '--custom-var': 100 }} />
```

The Motion keys `originX` and `originY` do not exist. Use CSS `transform-origin`.

## Renames against Motion for React

| React | motion-sv |
|---|---|
| `whileTap` | `whilePress` |
| `viewport={{ ... }}` | `inViewOptions={{ ... }}` |
| `className` | `class` (accepts Svelte's `ClassValue`) |
| `children` | a snippet: `{@render children?.()}` |
| `useRef` plus `forwardRef` | `bind:this` |
| `React.memo` | dropped, Svelte reactivity is fine grained |

`useSpring` as a motion value does not exist, whatever a React example suggests. The package exports
`useMotionValue` (an alias for `motionValue` from `motion-dom`) and nothing that springs a value
toward a target. Hold the target in `$state` and declare the spring in the transition:

```svelte
<script lang="ts">
  let x = $state(0);
</script>

<motion.div animate={{ x }} transition={{ type: 'spring', stiffness: 500, damping: 25 }} />
```

Do not mix in Svelte's own `transition:` directives on motion components.

## Scroll triggers

```svelte
<motion.section
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  inViewOptions={{ once: true, amount: 'some', margin: '0px 0px -200px 0px' }}
/>
```

## AnimatePresence

Modes: `sync` (default), `wait`, `popLayout`.

```svelte
<AnimatePresence mode="wait">
  {#if show}
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
  {/if}
</AnimatePresence>
```

**Exits are global Svelte transitions** (`transition:motionExit|global`). React kills children the
moment a parent unmounts. Svelte does not: the subtree stays in the DOM until every nested exit has
finished, so a parent block that disappears can leave animating children behind for the length of
the longest exit. If something must swap instantly, keep its animated subtree mounted (hide the
panel instead of destroying it) rather than fighting the transition.

## Layout animations

Svelte has no `getSnapshotBeforeUpdate`, so the before box is taken explicitly:

```svelte
<script lang="ts">
  import { motion, createLayoutMotion } from 'motion-sv';

  let isOn = $state(false);
  const layout = createLayoutMotion(motion);
  const toggle = layout.update.with(() => (isOn = !isOn));
</script>

<div onclick={toggle}>
  <layout.div layoutDependency={isOn} transition={{ type: 'spring', stiffness: 700, damping: 30 }} />
</div>
```

Four rules, each of them a bug that compiles cleanly:

1. **The `layout` prop alone does nothing.** Without `update()` before the state change there is no
   before box and no FLIP.
2. **Reordering a keyed list needs a changing `layoutDependency`,** the index works. Without an
   option change motion sees no reason to run, and the list snaps.
3. **One namespace per visible area, and never snapshot while that area is hidden.** `update()`
   snapshots every registered element, and an element behind `display: none` reports a zero box. It
   then flies in from (0, 0) once it becomes visible.
4. **Animate position only where the box changes size a lot.** Scaling a large card into a small
   button distorts its content and pushes it out of its container. The layout proxy forces
   `layout: true`, so `layout="position"` only takes effect on a plain `<motion.div>` placed inside
   a `<layout.div>` scope. It still registers itself, so the snapshot keeps working.

Springs overshoot by design. The bounce reads well on a reorder and badly when it pushes an element
past a container edge, so check the bounds after changing stiffness or damping.

**Residual transforms create containing blocks.** A layout animation leaves a transform behind, and
a transformed ancestor becomes the containing block for absolutely positioned children. An overlay
sized with `absolute inset-0` then shrinks to that wrapper instead of covering the intended element.
Keep layout animations off wrappers that host overlays.

## Reorder and lazy loading

```svelte
<ReorderGroup axis="y" bind:values={items}>
  {#each items as item (item)}
    <ReorderItem value={item}>{item}</ReorderItem>
  {/each}
</ReorderGroup>
```

```svelte
<LazyMotion features={domAnimation}>
  <!-- children using motion components -->
</LazyMotion>
```

## Verifying animation work

A green typecheck proves nothing about motion. Drive the page and measure:

- the transform matrix per frame, to tell translation from scaling from nothing happening,
- bounding boxes against the container, to catch elements leaving their bounds,
- element counts during a swap, to catch subtrees that linger past their exit,
- `requestAnimationFrame` sampling across a window, because a settled spring and a CSS animation
  both look static when you compare two stills.
