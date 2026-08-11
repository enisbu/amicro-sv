# CLAUDE.md

Agent contract for this repo. Read `PORTING.md` before touching anything under `src/`.

## What this is

Unofficial Svelte 5 port of Amicro (React), running on [motion-sv](https://github.com/hanielu/motion-svelte).
`src/lib/amicro/` holds the ported components, `src/lib/app/` the catalog app, `static/r/` the
generated registry.

## Hard rules

- No comments in `src/` or `tests/`. Only compiler directives survive: `svelte-ignore`,
  `eslint-disable`, `ts-expect-error`.
- English everywhere: identifiers, strings, docs, commit messages.
- No em or en dashes.
- `src/lib/amicro/**` is the published registry surface. Changing a file there changes what
  other people install, so run `pnpm registry:build` afterwards.
- No new dependency without need. The registry components import `motion-sv` and nothing else.

## Commands

```bash
pnpm dev              # dev server on 5173
pnpm check            # svelte-check, must stay at 0 errors and 0 warnings
pnpm build            # production build, adapter-node
pnpm test:amicro      # Playwright motion regression, needs pnpm dev running
pnpm registry:build   # regenerate registry.json and static/r from the source tree
```

## motion-sv

The Svelte port of Motion behaves differently from Motion for React in ways that break silently.
Load the `motion-sv` skill in `.claude/skills/motion-sv/` before writing animation code, or read
`docs/motion-sv.md` and the API differences in `NOTICE.md`.

## Verifying animation work

A green typecheck proves nothing about motion. Drive the page with Playwright and measure:
transform matrices per frame, bounding boxes against their container, element counts during a
swap. `tests/amicro-gallery.mjs` is the existing example, it samples `requestAnimationFrame` to
prove every component actually moves.
