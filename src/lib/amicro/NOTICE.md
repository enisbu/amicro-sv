# NOTICE: provenance of the Amicro port

The components in this folder are Svelte 5 ports of components from
**Amicro** (React), moved to `motion-sv` instead of Motion for React.

## Original

- Project: Amicro (Micro-transitions)
- Repo: https://github.com/Subhan-code/Amicro--Micro-transitions-
- npm: `@subhanhq/amicro`
- Author: SYED SUBHAN UDDIN (https://x.com/SubhanHQ)
- License: MIT

## MIT license text of the original

```
MIT License

Copyright (c) 2026 SYED SUBHAN UDDIN

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

The ports are derivative works. The copyright notice above travels with them and
covers every file in this repository that descends from the original. It is kept
here and in `LICENSE.upstream` rather than repeated per file.

## API differences: motion-sv versus Motion for React

Collected while porting, applies to every further component:

1. **`motion.div` cannot go straight into the markup.** React writes `<motion.div>`.
   Svelte does not resolve dotted component names in markup, and a tag must start
   uppercase to count as a component. Put the namespace entry on a local constant
   instead: `const Div = motion.div`, then `<Div ...>`. There is an internal
   `Motion` component with an `as` prop, but it is **not exported** from the
   package root (`components/index.js` only exposes `motion`, `m`, `LazyMotion`,
   `AnimatePresence`, `Reorder`, `MotionConfig`). Importing `{ Motion }` fails the
   typecheck.
2. **`whileTap` is called `whilePress`.** Same behaviour, newer Motion naming.
3. **`useSpring` as a motion value is missing.** motion-sv exports `useMotionValue`
   (an alias for `motionValue` from `motion-dom`), but nothing that springs a value
   toward a target. Replacement: hold the target in `$state` and configure the
   spring in `transition: { type: 'spring', ... }`.
4. **`style` stays an object (`MotionStyleProps`), not Svelte's CSS string.** On a
   `motion.*` component, `style` still expects an object like in React, so
   `style={{ zIndex: 3 }}`. A CSS string there is a type error. This is the one
   place where the React habit is right and the Svelte habit is wrong. The Motion
   special keys `originX` and `originY` are missing though; use real CSS
   `transform-origin`.
5. **`children` is a snippet, not a `ReactNode`.** So `{@render children?.()}`
   instead of `{children}`.
6. **`className` is called `class`,** and `class` accepts Svelte's `ClassValue`.
7. **No `forwardRef`.** Instead of `ref={ref}` with `useRef`, Svelte binds via
   `bind:this` or the `ref` prop of the `Motion` component.
8. **No `React.memo`.** Svelte's reactivity is fine grained, a memo wrapper has no
   counterpart and is dropped.
9. **Layout animations need `createLayoutMotion(motion)`** plus `<layout.div>` and
   `layout.update.with(fn)` around the state change. Svelte has no
   `getSnapshotBeforeUpdate`, so the snapshot is triggered explicitly. Reordering a
   keyed list additionally needs a changing `layoutDependency` (for example the
   index), otherwise motion sees no option change and skips the FLIP.
10. **Layout animations need a scope and a type decision.** One
    `createLayoutMotion` namespace per visible area, since `update()` snapshots every
    registered element and a `display: none` element reports a zero box. Where the box
    changes size between states, animate position only: the layout proxy forces
    `layout: true`, so a plain `<motion.div layout="position">` inside the scope is the
    way to get it, and it still registers itself.
11. **Exit animations are registered as a global Svelte transition**
    (`transition:motionExit|global` in `motion.svelte`). Unlike React, destroying a
    parent block does not kill them: the subtree stays in the DOM until every
    nested exit has finished. Anything that must swap instantly has to avoid being
    unmounted, or keep the animated subtree mounted.
