<script lang="ts">
	import { motion } from 'motion-sv';
	import { Copy, Check } from '@lucide/svelte';
	import { getAppState } from '$lib/app/app-state.svelte.js';
	import { loaderGroups, type LoaderConfig } from '$lib/app/data/loaders.js';
	import { loadersCode } from '$lib/app/loaders-code.js';
	import InViewRender from '../InViewRender.svelte';
	import IconSwap from '../IconSwap.svelte';

	const app = getAppState();
	const isDark = $derived(app.theme === 'dark');
	const theme = $derived(app.theme);

	const tile =
		'bg-card border-neutral-100 dark:border-white/5 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] dark:hover:bg-[#1f1f1f]';
	const copiedButton =
		'bg-emerald-100 text-emerald-600 border-emerald-300 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30';

	let copiedText = $state<string | null>(null);
	let resetTimer: ReturnType<typeof setTimeout> | undefined;
	$effect(() => () => clearTimeout(resetTimer));

	async function copyLoaderCode(loader: LoaderConfig) {
		const copyId = loader.kebabName || loader.name;
		const code =
			loadersCode[loader.kebabName] ??
			loadersCode[loader.name] ??
			`// Loader ${loader.name} code not found`;

		app.haptic('light');
		try {
			await navigator.clipboard.writeText(code);
			copiedText = copyId;
			clearTimeout(resetTimer);
			resetTimer = setTimeout(() => (copiedText = null), 2000);
			app.showToast(`Copied ${loader.name} loader code!`);
		} catch {
			app.haptic('error');
			app.showToast('Failed to copy code.');
		}
	}

	function hasCopied(loader: LoaderConfig) {
		return copiedText === loader.kebabName || copiedText === loader.name;
	}
</script>

<div class="w-full flex flex-col gap-16 max-w-[1060px] mx-auto text-left">
	{#each loaderGroups as group (group.title)}
		{@const isPhysicsGroup = group.title === 'Physics & Simulation'}
		<div class="flex flex-col gap-6 w-full">
			<div class="flex items-center gap-3 px-2">
				<h2
					class="text-[17px] font-semibold tracking-tight transition-colors text-foreground"
				>
					{group.title}
				</h2>
				<span
					class="text-[11px] px-2 py-0.5 rounded-full font-medium transition-colors bg-neutral-200/60 text-neutral-600 dark:bg-white/[0.06] dark:text-neutral-400"
				>
					{group.loaders.length} items
				</span>
			</div>

			{#if isPhysicsGroup}
				<div class="w-full">
					{#each group.loaders as loader (loader.kebabName)}
						{@const isCopied = hasCopied(loader)}
						<div
							data-loader-tile
							class="relative group rounded-[24px] flex flex-col items-center justify-center p-6 md:p-8 transition-all duration-300 border h-64 md:h-80 w-full overflow-hidden hover:shadow-[0_4px_20px_rgba(0,0,0,0.03)] {tile}"
						>
							<div class="flex-1 flex items-center justify-center w-full">
								<InViewRender>
									<loader.component {theme} />
								</InViewRender>
							</div>

							<div class="w-full flex items-center justify-between mt-4 px-2">
								<span
									class="text-[13px] font-semibold transition-colors {isDark
										? 'text-neutral-350'
										: 'text-neutral-700'}"
								>
									{loader.name}
								</span>

								<motion.button
									whileHover={{ scale: 1.08 }}
									whilePress={{ scale: 0.92 }}
									onclick={() => copyLoaderCode(loader)}
									class="p-2 rounded-xl transition-all cursor-pointer border flex items-center justify-center {isCopied
										? copiedButton
										: 'bg-neutral-100 border-transparent hover:bg-neutral-200 text-neutral-650 hover:text-black dark:bg-white/[0.08] dark:hover:bg-white/[0.14] dark:text-neutral-300 dark:hover:text-white'}"
									title="Copy loader code"
								>
									<IconSwap key={isCopied ? 'check' : 'copy'}>
										{#if isCopied}
											<Check class="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
										{:else}
											<Copy class="w-4 h-4" />
										{/if}
									</IconSwap>
								</motion.button>
							</div>
						</div>
					{/each}
				</div>
			{:else}
				<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full">
					{#each group.loaders as loader (loader.kebabName)}
						{@const isCopied = hasCopied(loader)}
						<div
							data-loader-tile
							class="relative group aspect-square rounded-2xl flex flex-col items-center justify-center p-4 transition-all duration-300 border hover:shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:border-neutral-200/50 {tile}"
						>
							<div class="flex-1 flex items-center justify-center w-full min-h-[64px]">
								<InViewRender>
									<loader.component {theme} />
								</InViewRender>
							</div>

							<div class="w-full flex items-center justify-between mt-3 px-1 gap-1">
								<span
									class="text-[12px] font-medium truncate transition-colors text-neutral-700 dark:text-neutral-300"
									title={loader.name}
								>
									{loader.name}
								</span>

								<motion.button
									whileHover={{ scale: 1.1 }}
									whilePress={{ scale: 0.9 }}
									onclick={() => copyLoaderCode(loader)}
									class="p-1.5 rounded-lg transition-all cursor-pointer border flex items-center justify-center {isCopied
										? copiedButton
										: 'bg-neutral-100/90 border-transparent text-neutral-600 hover:text-black hover:bg-neutral-200 dark:bg-white/[0.08] dark:text-neutral-300 dark:hover:text-white dark:hover:bg-white/[0.14]'}"
									title="Copy loader code"
								>
									<IconSwap key={isCopied ? 'check' : 'copy'}>
										{#if isCopied}
											<Check class="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
										{:else}
											<Copy class="w-3.5 h-3.5" />
										{/if}
									</IconSwap>
								</motion.button>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	{/each}
</div>
