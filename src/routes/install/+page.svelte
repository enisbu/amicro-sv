<script lang="ts">
	import { motion } from 'motion-sv';
	import { ArrowLeft, Check, Copy, Search } from '@lucide/svelte';
	import { getAppState } from '$lib/app/app-state.svelte.js';
	import { REGISTRY_ITEMS } from '$lib/app/data/registry-items.js';

	const REGISTRY_BASE = 'https://amicro.enisdev.com/r';

	const TYPE_LABELS: Record<string, string> = {
		'registry:ui': 'Component',
		'registry:hook': 'Hook',
		'registry:lib': 'Helper'
	};

	const app = getAppState();

	let query = $state('');
	let copied = $state<string | null>(null);
	let resetTimer: ReturnType<typeof setTimeout> | undefined;

	$effect(() => () => clearTimeout(resetTimer));

	const commandFor = (name: string) => `npx shadcn-svelte@latest add ${REGISTRY_BASE}/${name}.json`;

	const filtered = $derived.by(() => {
		const needle = query.trim().toLowerCase();
		if (!needle) return REGISTRY_ITEMS;
		return REGISTRY_ITEMS.filter(
			(item) =>
				item.name.includes(needle) ||
				item.title.toLowerCase().includes(needle) ||
				item.description.toLowerCase().includes(needle)
		);
	});

	async function copy(text: string, id: string) {
		app.haptic('light');
		await app.copy(text, 'Copied to clipboard!');
		copied = id;
		clearTimeout(resetTimer);
		resetTimer = setTimeout(() => (copied = null), 1600);
	}
</script>

<svelte:head>
	<title>Install — Amicro SV</title>
	<meta
		name="description"
		content="Pull any of the 164 ported components, hooks and helpers into your own SvelteKit project with the shadcn-svelte CLI."
	/>
</svelte:head>

<div class="relative z-10 w-full max-w-[1000px] mx-auto px-6 pb-24 flex flex-col">
	<a
		href="/"
		class="inline-flex items-center gap-1.5 mt-8 mb-10 text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors w-fit"
	>
		<ArrowLeft class="w-4 h-4" />
		Back to the catalog
	</a>

	<h1
		class="text-[32px] sm:text-[42px] font-medium leading-[38px] sm:leading-[48px] tracking-[-0.01em] text-balance"
	>
		Install from the registry
	</h1>
	<p class="mt-3 text-[14px] sm:text-[16px] leading-[22px] max-w-[620px] text-muted-foreground text-balance">
		Every ported component is a registry item. The shadcn-svelte CLI writes the Svelte file into
		your project, installs <code class="font-mono">motion-sv</code> and drops the upstream license
		notice next to it.
	</p>

	<section class="mt-12">
		<h2 class="text-[13px] font-semibold uppercase tracking-widest text-muted-foreground">
			Before you start
		</h2>
		<p class="mt-3 text-[14px] leading-[22px] max-w-[620px]">
			A SvelteKit project with Tailwind 4 and a <code class="font-mono">components.json</code>.
			<code class="font-mono">shadcn-svelte init</code> expects Tailwind to be there already and
			exits with "This CLI version requires Tailwind CSS v4 and Svelte v5" if it is missing, so add
			Tailwind first:
		</p>
		<div class="mt-4 flex items-center gap-2 p-1 pl-4 rounded-full border border-border bg-card">
			<code class="flex-1 font-mono text-[13px] truncate">npx sv add tailwindcss</code>
			<button
				onclick={() => copy('npx sv add tailwindcss', 'tailwind')}
				type="button"
				aria-label="Copy Tailwind command"
				class="shrink-0 w-9 h-9 rounded-full flex items-center justify-center bg-secondary hover:bg-secondary-hover text-secondary-foreground transition-colors cursor-pointer border-0"
			>
				{#if copied === 'tailwind'}
					<Check class="w-4 h-4" />
				{:else}
					<Copy class="w-4 h-4" />
				{/if}
			</button>
		</div>
		<p class="mt-4 text-[14px] leading-[22px] max-w-[620px]">
			Then create the <code class="font-mono">components.json</code>:
		</p>
		<div class="mt-4 flex items-center gap-2 p-1 pl-4 rounded-full border border-border bg-card">
			<code class="flex-1 font-mono text-[13px] truncate">npx shadcn-svelte@latest init</code>
			<button
				onclick={() => copy('npx shadcn-svelte@latest init', 'init')}
				type="button"
				aria-label="Copy init command"
				class="shrink-0 w-9 h-9 rounded-full flex items-center justify-center bg-secondary hover:bg-secondary-hover text-secondary-foreground transition-colors cursor-pointer border-0"
			>
				{#if copied === 'init'}
					<Check class="w-4 h-4" />
				{:else}
					<Copy class="w-4 h-4" />
				{/if}
			</button>
		</div>
	</section>

	<section class="mt-12">
		<h2 class="text-[13px] font-semibold uppercase tracking-widest text-muted-foreground">
			The command
		</h2>
		<p class="mt-3 text-[14px] leading-[22px] max-w-[620px]">
			Swap <code class="font-mono">fade-in</code> for any name from the list below.
		</p>
		<div class="mt-4 flex items-center gap-2 p-1 pl-4 rounded-full border border-border bg-card">
			<code class="flex-1 font-mono text-[13px] truncate">{commandFor('fade-in')}</code>
			<button
				onclick={() => copy(commandFor('fade-in'), 'example')}
				type="button"
				aria-label="Copy example command"
				class="shrink-0 w-9 h-9 rounded-full flex items-center justify-center bg-secondary hover:bg-secondary-hover text-secondary-foreground transition-colors cursor-pointer border-0"
			>
				{#if copied === 'example'}
					<Check class="w-4 h-4" />
				{:else}
					<Copy class="w-4 h-4" />
				{/if}
			</button>
		</div>
	</section>

	<section class="mt-14">
		<div class="flex flex-wrap items-end justify-between gap-4">
			<h2 class="text-[13px] font-semibold uppercase tracking-widest text-muted-foreground">
				{filtered.length} of {REGISTRY_ITEMS.length} items
			</h2>
			<label
				class="flex items-center gap-2 h-10 px-4 rounded-full border border-border bg-card w-full sm:w-[320px]"
			>
				<Search class="w-4 h-4 text-muted-foreground shrink-0" />
				<input
					bind:value={query}
					type="search"
					placeholder="Search components"
					class="flex-1 bg-transparent border-0 outline-none text-[13px] placeholder:text-muted-foreground"
				/>
			</label>
		</div>

		<ul class="mt-6 flex flex-col gap-2">
			{#each filtered as item (item.name)}
				<motion.li
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.15 }}
					class="flex items-center gap-4 p-3 pl-4 rounded-2xl border border-border bg-card"
				>
					<div class="min-w-0 flex-1">
						<div class="flex items-center gap-2">
							<span class="text-[14px] font-semibold truncate">{item.title}</span>
							<span
								class="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-secondary text-secondary-foreground"
							>
								{TYPE_LABELS[item.type] ?? item.type}
							</span>
						</div>
						<code class="block mt-1 font-mono text-[11.5px] text-muted-foreground truncate">
							{item.name}
						</code>
					</div>
					<button
						onclick={() => copy(commandFor(item.name), item.name)}
						type="button"
						aria-label="Copy install command for {item.title}"
						class="shrink-0 inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full text-[12.5px] font-medium bg-secondary hover:bg-secondary-hover text-secondary-foreground transition-colors cursor-pointer border-0"
					>
						{#if copied === item.name}
							<Check class="w-3.5 h-3.5" />
							Copied
						{:else}
							<Copy class="w-3.5 h-3.5" />
							Command
						{/if}
					</button>
				</motion.li>
			{/each}
		</ul>

		{#if filtered.length === 0}
			<p class="mt-8 text-[14px] text-muted-foreground">Nothing matches "{query}".</p>
		{/if}
	</section>
</div>
