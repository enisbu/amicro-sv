<script lang="ts">
	import { motion, AnimatePresence } from 'motion-sv';
	import { ArrowDownAZ, ChevronDown, ChevronRight, Github, LayoutGrid, LayoutTemplate, List } from '@lucide/svelte';
	import { SvelteSet } from 'svelte/reactivity';
	import { getAppState } from '$lib/app/app-state.svelte.js';
	import { cn } from '$lib/app/utils.js';
	import { buttonsData } from '$lib/app/data/buttons.js';
	import { cardsData } from '$lib/app/data/cards.js';
	import AnimatedNumber from '$lib/app/components/sections/AnimatedNumber.svelte';
	import ButtonsSection from '$lib/app/components/sections/ButtonsSection.svelte';
	import CardsSection from '$lib/app/components/sections/CardsSection.svelte';
	import LoadersSection from '$lib/app/components/sections/LoadersSection.svelte';

	type LayoutMode = 'list' | 'grid' | 'matrix';
	type SortMode = 'default' | 'alphabetical';
	type CatalogTabType = 'buttons' | 'cards' | 'carousels' | 'loaders';

	const app = getAppState();
	const isDark = $derived(app.theme === 'dark');

	const heroLink =
		'text-black decoration-black/40 hover:decoration-black dark:text-[#e9e9e9] dark:decoration-white/40 dark:hover:decoration-white';
	const mutedNote = 'text-black opacity-70 dark:text-[#767676] dark:opacity-100';
	const dropdownPanel = 'bg-card/95 border-neutral-200 text-foreground dark:border-white/5';
	const segmentShell = 'bg-neutral-200/50 border-neutral-300/30 dark:bg-[#181818] dark:border-white/5';
	const segmentItemActive =
		'bg-white text-black shadow-sm dark:bg-[#2a2a2a] dark:text-white dark:shadow-none';
	const segmentItemIdle =
		'text-black opacity-70 hover:opacity-100 dark:text-[#767676] dark:opacity-100 dark:hover:text-white';
	const segmentItem = 'rounded-full transition-colors cursor-pointer border-0';

	let layout = $state<LayoutMode>('grid');
	let sortBy = $state<SortMode>('default');
	let catalogTab = $state<CatalogTabType>('buttons');
	let dropdownOpen = $state(false);
	let moreDropdownOpen = $state(false);
	let stars = $state<number | null>(null);
	let gridAnchor = $state<HTMLDivElement>();

	const visitedTabs = new SvelteSet<CatalogTabType>(['buttons']);

	$effect(() => {
		visitedTabs.add(catalogTab);
	});

	const setLayout = (mode: LayoutMode) => {
		layout = mode;
	};

	const setCatalogTab = (id: CatalogTabType) => {
		catalogTab = id;
	};

	const toggleSort = () => {
		sortBy = sortBy === 'default' ? 'alphabetical' : 'default';
	};

	const tabs: { id: CatalogTabType; label: string }[] = [
		{ id: 'buttons', label: 'Buttons' },
		{ id: 'cards', label: 'Card Spreads' },
		{ id: 'carousels', label: '3D Carousels' },
		{ id: 'loaders', label: 'Loaders' }
	];

	const tabLabel = $derived(tabs.find((t) => t.id === catalogTab)?.label ?? '');

	$effect(() => {
		let active = true;
		fetch('https://api.github.com/repos/enisbu/amicro-sv')
			.then((res) => res.json())
			.then((data) => {
				if (active && data.stargazers_count !== undefined) stars = data.stargazers_count;
			})
			.catch((err) => console.error('Failed to load star count:', err));
		return () => {
			active = false;
		};
	});

	const displayedButtons = $derived.by(() => {
		const sorted = [...buttonsData];
		if (sortBy === 'alphabetical') sorted.sort((a, b) => a.label.localeCompare(b.label));
		return sorted;
	});

	function cardsOfCategory(category: 'spreads' | 'carousels') {
		const filtered = cardsData.filter((card) => (card.category ?? 'spreads') === category);
		if (sortBy === 'alphabetical') filtered.sort((a, b) => a.label.localeCompare(b.label));
		return filtered;
	}

	const spreadCards = $derived(cardsOfCategory('spreads'));
	const carouselCards = $derived(cardsOfCategory('carousels'));

	const gridClass = $derived.by(() => {
		if (catalogTab === 'loaders') return 'flex flex-col items-center w-full max-w-[1060px]';
		if (layout === 'list') return 'flex flex-col items-center gap-4 max-w-md';
		if (layout === 'grid') {
			return catalogTab === 'buttons'
				? 'flex flex-col items-center gap-6 w-full sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-10 lg:gap-12 max-w-[1060px] sm:justify-items-center'
				: 'flex flex-col items-center gap-6 w-full sm:flex-row sm:flex-wrap sm:justify-center sm:gap-6 sm:max-w-6xl';
		}
		return catalogTab === 'buttons'
			? 'flex flex-wrap justify-center gap-3 w-full max-w-[1400px] sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 sm:gap-2 sm:justify-items-center'
			: 'flex flex-col items-center gap-4 w-full sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4 sm:max-w-6xl';
	});

	function scrollToGrid() {
		gridAnchor?.scrollIntoView({ behavior: 'smooth' });
	}
</script>

<div class="relative z-10 flex-1 w-full max-w-[1240px] mx-auto px-6 flex flex-col items-center">
	<div class="mt-12 mb-16 text-center w-full flex flex-col items-center">
		<h1
			class="text-[32px] sm:text-[46px] font-medium leading-[38px] sm:leading-[52px] tracking-[-0.01em] mb-3 font-sans text-balance transition-colors duration-300 text-black dark:text-white"
		>
			Amicro SV — Micro-transitions
		</h1>
		<p
			class="text-[14px] sm:text-[17px] leading-[20px] sm:leading-[25px] max-w-[530px] text-balance transition-colors duration-300 text-black dark:text-[#767676]"
		>
			A curated library of premium micro-interactions and transition components. Built with Svelte 5
			and Motion.
		</p>
		<p
			class="mt-4 text-[14px] sm:text-[17px] leading-[20px] sm:leading-[25px] max-w-[530px] text-balance transition-colors duration-300 text-black opacity-70 dark:text-[#8f8f8f] dark:opacity-100"
		>
			SvelteKit port of
			<a
				href="https://github.com/Subhan-code/Amicro--Micro-transitions-"
				target="_blank"
				rel="noopener noreferrer"
				class="underline underline-offset-2 transition-colors {heroLink}">Amicro</a
			>, built with Svelte 5 and
			<a
				href="https://github.com/hanielu/motion-svelte"
				target="_blank"
				rel="noopener noreferrer"
				class="underline underline-offset-2 transition-colors {heroLink}">motion-sv</a
			>
			by
			<a
				href="https://enisdev.com"
				target="_blank"
				rel="noopener noreferrer"
				class="underline underline-offset-2 transition-colors {heroLink}">enisdev</a
			>.
		</p>

		<div class="flex flex-wrap items-center justify-center gap-3 mt-8">
			<motion.a
				href="https://github.com/enisbu/amicro-sv"
				target="_blank"
				rel="noopener noreferrer"
				whileHover="hover"
				initial="initial"
				whilePress={{ scale: 0.98 }}
				variants={{
					hover: {
						scale: 1.04,
						boxShadow: isDark
							? '0 10px 25px -5px rgba(255,255,255,0.1)'
							: '0 10px 25px -5px rgba(0,0,0,0.15)'
					}
				}}
				class="inline-flex items-center justify-center gap-1.5 h-[36px] px-[16px] rounded-full text-[13px] font-medium no-underline transition-colors cursor-pointer border-0 bg-neutral-950 text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
			>
				<motion.div
					variants={{ hover: { rotate: [0, -15, 15, -15, 0], scale: 1.15 } }}
					transition={{ duration: 0.4 }}
					class="flex items-center shrink-0"
				>
					<Github class="w-4 h-4" />
				</motion.div>
				<span>GitHub Repo</span>
				{#if stars !== null}
					<span
						class="text-[10.5px] px-1.5 py-0.5 rounded-full font-semibold ml-1 bg-white/20 text-white/90 dark:bg-black/10 dark:text-black/70"
					>
						<AnimatedNumber value={stars} />
					</span>
				{/if}
			</motion.a>
			<motion.button
				onclick={scrollToGrid}
				whileHover="hover"
				initial="initial"
				whilePress={{ scale: 0.98 }}
				variants={{
					hover: {
						scale: 1.04,
						boxShadow: isDark
							? '0 10px 25px -5px rgba(0,0,0,0.3)'
							: '0 10px 25px -5px rgba(0,0,0,0.05)'
					}
				}}
				class="inline-flex items-center justify-center h-[36px] px-[16px] rounded-full text-[13px] font-medium border cursor-pointer transition-colors bg-card border-neutral-200 text-black hover:bg-neutral-50 shadow-sm dark:border-neutral-800 dark:text-white dark:hover:bg-neutral-800 dark:shadow-none"
			>
				<motion.div
					variants={{ hover: { y: [0, -4, 4, -2, 2, 0] } }}
					transition={{ duration: 0.6 }}
					class="flex items-center shrink-0 mr-1"
				>
					<ArrowDownAZ class="w-3 h-3" />
				</motion.div>
				<span>Browse Components</span>
			</motion.button>
		</div>

		<div
			class="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 w-full max-w-xl mx-auto px-4 sm:px-0"
		>
			<div class="relative block sm:hidden w-full max-w-[260px] mx-auto z-40">
				<button
					onclick={() => (dropdownOpen = !dropdownOpen)}
					class="w-full flex items-center justify-between px-5 py-2.5 rounded-full text-[13px] font-semibold cursor-pointer transition-all duration-300 shadow-sm border-0 focus-visible:outline-none bg-card text-black hover:bg-neutral-50 dark:text-white dark:hover:bg-[#222]"
				>
					<span>{tabLabel}</span>
					<ChevronRight
						class="w-4 h-4 transition-transform duration-300 {dropdownOpen
							? 'rotate-90 text-white'
							: 'text-neutral-400'}"
					/>
				</button>

				<AnimatePresence>
					{#if dropdownOpen}
						<!-- svelte-ignore a11y_no_static_element_interactions -->
						<!-- svelte-ignore a11y_click_events_have_key_events -->
						<div class="fixed inset-0 z-40 bg-transparent" onclick={() => (dropdownOpen = false)}></div>
						<motion.div
							initial={{ opacity: 0, y: -8, scale: 0.96 }}
							animate={{ opacity: 1, y: 6, scale: 1 }}
							exit={{ opacity: 0, y: -8, scale: 0.96 }}
							transition={{ duration: 0.15, ease: 'easeOut' }}
							class="absolute top-full left-0 right-0 z-50 rounded-[20px] border p-1.5 shadow-xl flex flex-col gap-0.5 max-h-[300px] overflow-y-auto backdrop-blur-xl {dropdownPanel} shadow-neutral-200/50 dark:shadow-black/50"
						>
							{#each tabs as tab (tab.id)}
								<button
									onclick={() => {
										setCatalogTab(tab.id);
										dropdownOpen = false;
									}}
									class={cn(
										'w-full text-left px-4 py-2 rounded-xl text-[13px] font-medium cursor-pointer border-0 transition-colors',
										catalogTab === tab.id
											? 'bg-neutral-100 text-black font-semibold dark:bg-white/10 dark:text-white'
											: 'text-neutral-600 hover:text-black hover:bg-neutral-50 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-white/[0.04]'
									)}
								>
									{tab.label}
								</button>
							{/each}
							<div
								class="mt-2 pt-3 border-t px-4 py-2 flex flex-col gap-1 text-center select-none border-neutral-100 dark:border-white/5"
							>
								<span class="text-[10px] font-bold uppercase tracking-widest text-foreground">
									More Coming Soon
								</span>
								<span class="text-[10.5px] leading-normal italic {mutedNote}">
									"Motion is the brush stroke of digital art. More premium transitions are crafting
									behind the scenes."
								</span>
							</div>
						</motion.div>
					{/if}
				</AnimatePresence>
			</div>

			<div
				class="hidden sm:flex items-center p-1 rounded-full border shadow-inner transition-colors duration-300 max-w-full overflow-x-visible {segmentShell}"
			>
				<div class="flex items-center gap-1.5 pr-1">
					{#each tabs as tab (tab.id)}
						<button
							onclick={() => setCatalogTab(tab.id)}
							class={cn(
								'flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-1.5 text-[13px] font-medium whitespace-nowrap',
								segmentItem,
								catalogTab === tab.id ? segmentItemActive : segmentItemIdle
							)}
						>
							{tab.label}
						</button>
					{/each}

					<div class="relative animate-none">
						<button
							onclick={() => (moreDropdownOpen = !moreDropdownOpen)}
							class={cn(
								'flex-none flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 text-[13px] font-medium whitespace-nowrap',
								segmentItem,
								segmentItemIdle
							)}
						>
							<span>More</span>
							<ChevronDown class="w-3.5 h-3.5" />
						</button>

						<AnimatePresence>
							{#if moreDropdownOpen}
								<!-- svelte-ignore a11y_no_static_element_interactions -->
								<!-- svelte-ignore a11y_click_events_have_key_events -->
								<div
									class="fixed inset-0 z-40 bg-transparent"
									onclick={() => (moreDropdownOpen = false)}
								></div>
								<motion.div
									initial={{ opacity: 0, y: -8, scale: 0.96 }}
									animate={{ opacity: 1, y: 6, scale: 1 }}
									exit={{ opacity: 0, y: -8, scale: 0.96 }}
									transition={{ duration: 0.15, ease: 'easeOut' }}
									class="absolute top-full right-0 z-50 rounded-[20px] border p-4 shadow-xl flex flex-col gap-2 min-w-[260px] text-center select-none backdrop-blur-xl {dropdownPanel} shadow-neutral-200/30 dark:shadow-black/40"
								>
									<div class="font-bold text-[11px] uppercase tracking-widest mb-0.5 text-foreground">
										More Coming Soon
									</div>
									<p class="text-[11px] leading-[15px] italic m-0 transition-colors {mutedNote}">
										"Motion is the brush stroke of digital art. More premium transitions are crafting
										behind the scenes."
									</p>
								</motion.div>
							{/if}
						</AnimatePresence>
					</div>
				</div>
			</div>

			{#if catalogTab !== 'loaders'}
				<div class="flex items-center justify-center gap-3 shrink-0">
					<div
						class="flex items-center p-1 rounded-full border shadow-inner transition-colors duration-300 {segmentShell}"
					>
						<button
							onclick={toggleSort}
							class={cn(
								'flex items-center gap-2 px-4 py-1.5 text-[13px] font-medium',
								segmentItem,
								sortBy === 'alphabetical' ? segmentItemActive : segmentItemIdle
							)}
						>
							<ArrowDownAZ class="w-3.5 h-3.5" />
							<span>A-Z</span>
						</button>
					</div>

					<div
						class="hidden sm:flex items-center p-1 rounded-full border shadow-inner transition-colors duration-300 {segmentShell}"
					>
						<button
							onclick={() => setLayout('list')}
							class={cn('p-1.5', segmentItem, layout === 'list' ? segmentItemActive : segmentItemIdle)}
							aria-label="List layout"
						>
							<List class="w-4 h-4" />
						</button>
						<button
							onclick={() => setLayout('grid')}
							class={cn('p-1.5', segmentItem, layout === 'grid' ? segmentItemActive : segmentItemIdle)}
							aria-label="Grid layout"
						>
							<LayoutGrid class="w-4 h-4" />
						</button>
						<button
							onclick={() => setLayout('matrix')}
							class={cn(
								'p-1.5',
								segmentItem,
								layout === 'matrix' ? segmentItemActive : segmentItemIdle
							)}
							aria-label="Matrix layout"
						>
							<LayoutTemplate class="w-4 h-4" />
						</button>
					</div>
				</div>
			{/if}
		</div>
	</div>

	<div
		bind:this={gridAnchor}
		id="component-grid"
		data-section={catalogTab}
		class="w-full mb-16 mx-auto scroll-mt-24 px-4 sm:px-0 {gridClass}"
	>
		{#if visitedTabs.has('buttons')}
			<div class={catalogTab === 'buttons' ? 'contents' : 'hidden'}>
				<ButtonsSection buttons={displayedButtons} {layout} active={catalogTab === 'buttons'} />
			</div>
		{/if}
		{#if visitedTabs.has('cards')}
			<div class={catalogTab === 'cards' ? 'contents' : 'hidden'}>
				<CardsSection cards={spreadCards} {layout} active={catalogTab === 'cards'} />
			</div>
		{/if}
		{#if visitedTabs.has('carousels')}
			<div class={catalogTab === 'carousels' ? 'contents' : 'hidden'}>
				<CardsSection cards={carouselCards} {layout} active={catalogTab === 'carousels'} />
			</div>
		{/if}
		{#if catalogTab === 'loaders'}
			<LoadersSection />
		{/if}
	</div>
</div>
