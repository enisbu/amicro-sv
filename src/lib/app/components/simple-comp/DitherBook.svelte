<script lang="ts">
	import { untrack } from 'svelte';
	import { motion, AnimatePresence } from 'motion-sv';
	import { Settings2, X, ChevronLeft, ChevronRight } from '@lucide/svelte';
	import Book from './Book.svelte';
	import { PAGES, type BookSettings } from './book-data.js';

	export interface Props {
		theme?: 'dark' | 'light';
		compact?: boolean;
	}

	let { theme = 'dark', compact = false }: Props = $props();

	let currentIndex = $state(0);
	let direction = $state(1);
	let isFlipping = $state(false);
	let showSettings = $state(false);

	let introFlips = $state(10);
	const isIntro = $derived(introFlips > 0);

	let settings = $state<BookSettings>(
		untrack(() => ({
			padding: compact ? 6 : 10,
			imageRadius: compact ? 8 : 20,
			creaseOpacity: 11,
			paperColor: '#fcfbf9',
			shadowIntensity: compact ? 10 : 24
		}))
	);

	$effect(() => {
		if (introFlips > 0 && !isFlipping) {
			const timer = setTimeout(
				() => {
					direction = 1;
					isFlipping = true;
					currentIndex = (currentIndex + 1) % PAGES.length;
					introFlips = introFlips - 1;
				},
				introFlips === 10 ? 300 : 70
			);
			return () => clearTimeout(timer);
		}
	});

	function next() {
		if (!isFlipping) {
			direction = 1;
			isFlipping = true;
			currentIndex = (currentIndex + 1) % PAGES.length;
		}
	}

	function prev() {
		if (!isFlipping) {
			direction = -1;
			isFlipping = true;
			currentIndex = (currentIndex - 1 + PAGES.length) % PAGES.length;
		}
	}

	function handleFlipComplete() {
		isFlipping = false;
	}
</script>

<div class="w-full flex flex-col items-center justify-center relative p-1 sm:p-2 font-sans">
	<Book
		pages={PAGES}
		{currentIndex}
		{isFlipping}
		{direction}
		onFlipComplete={handleFlipComplete}
		{settings}
		{isIntro}
		onPrevPage={prev}
		onNextPage={next}
	/>

	<div class="flex items-center justify-between w-full max-w-lg mt-3 px-1">
		<button
			onclick={prev}
			disabled={isFlipping}
			class="flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer {theme ===
			'dark'
				? 'bg-white/10 hover:bg-white/20 text-white'
				: 'bg-neutral-200 hover:bg-neutral-300 text-black'}"
		>
			<ChevronLeft class="w-3.5 h-3.5" />
			<span>Prev</span>
		</button>

		<span
			class="text-[11px] font-semibold tracking-widest uppercase {theme === 'dark'
				? 'text-neutral-400'
				: 'text-neutral-600'}"
		>
			{PAGES[currentIndex].title}
		</span>

		<div class="flex items-center gap-1.5">
			<button
				onclick={() => (showSettings = !showSettings)}
				class="p-1.5 rounded-full transition-all cursor-pointer {theme === 'dark'
					? 'bg-white/10 hover:bg-white/20 text-white'
					: 'bg-neutral-200 hover:bg-neutral-300 text-black'}"
				title="Book Settings"
			>
				<Settings2 class="w-3.5 h-3.5" />
			</button>

			<button
				onclick={next}
				disabled={isFlipping}
				class="flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer {theme ===
				'dark'
					? 'bg-white/10 hover:bg-white/20 text-white'
					: 'bg-neutral-200 hover:bg-neutral-300 text-black'}"
			>
				<span>Next</span>
				<ChevronRight class="w-3.5 h-3.5" />
			</button>
		</div>
	</div>

	<AnimatePresence>
		{#if showSettings}
			<motion.div
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.95 }}
				class="mt-3 w-full max-w-sm rounded-xl p-4 shadow-xl border {theme === 'dark'
					? 'bg-[#1e1e1e] border-white/15 text-white'
					: 'bg-white border-neutral-200 text-black'}"
			>
				<div class="flex items-center justify-between mb-3">
					<h4 class="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
						Book Controls
					</h4>
					<button
						onclick={() => (showSettings = false)}
						class="text-neutral-400 hover:text-white"
					>
						<X class="w-3.5 h-3.5" />
					</button>
				</div>

				<div class="space-y-3 text-[11px]">
					<div class="space-y-1">
						<div class="flex justify-between font-medium">
							<span>Image Padding</span>
							<span>{settings.padding}px</span>
						</div>
						<input
							type="range"
							min="0"
							max="30"
							bind:value={settings.padding}
							class="w-full cursor-pointer accent-white"
						/>
					</div>

					<div class="space-y-1">
						<div class="flex justify-between font-medium">
							<span>Image Radius</span>
							<span>{settings.imageRadius}px</span>
						</div>
						<input
							type="range"
							min="0"
							max="40"
							bind:value={settings.imageRadius}
							class="w-full cursor-pointer accent-white"
						/>
					</div>

					<div class="space-y-1">
						<div class="flex justify-between font-medium">
							<span>Crease Opacity</span>
							<span>{settings.creaseOpacity}%</span>
						</div>
						<input
							type="range"
							min="0"
							max="40"
							bind:value={settings.creaseOpacity}
							class="w-full cursor-pointer accent-white"
						/>
					</div>
				</div>
			</motion.div>
		{/if}
	</AnimatePresence>
</div>
