# amicro-sv

[![Amicro SV, 157 micro interactions for Svelte 5](static/og.png)](https://amicro.enisdev.com)

![Svelte 5](https://img.shields.io/badge/Svelte-5-FF3E00?style=flat-square&logo=svelte&logoColor=white)
![SvelteKit 2](https://img.shields.io/badge/SvelteKit-2-FF3E00?style=flat-square&logo=svelte&logoColor=white)
![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![MIT](https://img.shields.io/badge/License-MIT-6366F1?style=flat-square)

Port of [Amicro](https://github.com/Subhan-code/Amicro--Micro-transitions-) (React, MIT) to Svelte 5, running on [motion-sv](https://github.com/hanielu/motion-svelte).

motion-sv is the best Motion port for Svelte I know of, and this site is the stress test: 157 components that exist in React, rebuilt to show what carries over and where Svelte and React actually diverge.

157 components in `src/lib/amicro/`, published as 165 shadcn style registry items.

Demo: [amicro.enisdev.com](https://amicro.enisdev.com). Install page: [amicro.enisdev.com/install](https://amicro.enisdev.com/install).

## Install

Requires SvelteKit and Tailwind 4.

```
╭────────────────────────────────────── amicro-sv registry ───────────────────────────────────────╮
│ npx shadcn-svelte@latest init                                            set up components.json │
│ npx shadcn-svelte@latest add https://amicro.enisdev.com/r/fade-in.json   add a component        │
╰─────────────────────────────────────────────────────────────────────────────────────────────────╯
```

The CLI writes the component into your `ui` alias under `amicro/`, installs `motion-sv` and drops
the upstream MIT license next to it. Every name from the [install page](https://amicro.enisdev.com/install) works,
or from [llms.txt](https://amicro.enisdev.com/llms.txt) if a coding agent is doing the picking.

## Development

```bash
pnpm install
pnpm dev
pnpm check
pnpm build
pnpm test:amicro      # Playwright motion check, needs pnpm dev running
pnpm registry:build   # regenerate registry.json, static/r and llms.txt
```

## Conventions

[PORTING.md](PORTING.md) is the contract for every ported file. Where motion-sv and Motion for React differ, and which of those differences fail silently: [docs/motion-sv.md](docs/motion-sv.md), [NOTICE.md](NOTICE.md) and the agent skill in [.claude/skills/motion-sv](.claude/skills/motion-sv/SKILL.md).

## License

MIT, inherited from the original. Provenance: [NOTICE.md](NOTICE.md), [LICENSE.upstream](LICENSE.upstream).
