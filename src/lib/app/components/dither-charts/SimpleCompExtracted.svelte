<script lang="ts">
	import { motion, AnimatePresence } from 'motion-sv';
	import { ChevronDown, Settings2, X } from '@lucide/svelte';
	import ExtractedBook from './ExtractedBook.svelte';
	import ChartCard from './ChartCard.svelte';
	import PaymentsChart from './PaymentsChart.svelte';
	import MembersGrowthChart from './MembersGrowthChart.svelte';
	import { PAGES } from './book-data.js';
	import type { BookSettings } from './book-data.js';

	let currentIndex = $state(0);
	let direction = $state(1);
	let isFlipping = $state(false);
	let introFlips = $state(10);

	const isIntro = $derived(introFlips > 0);
	const hasStarted = $derived(!isIntro);

	let showSettings = $state(false);
	let settings = $state<BookSettings>({
		padding: 14,
		imageRadius: 32,
		creaseOpacity: 11,
		paperColor: '#fcfbf9',
		shadowIntensity: 34
	});

	$effect(() => {
		if (introFlips > 0 && !isFlipping) {
			const timer = setTimeout(
				() => {
					direction = 1;
					isFlipping = true;
					currentIndex = (currentIndex + 1) % PAGES.length;
				},
				introFlips === 10 ? 800 : 20
			);
			return () => clearTimeout(timer);
		}
	});

	function handleFlipComplete() {
		isFlipping = false;
		if (introFlips > 0) {
			introFlips = introFlips - 1;
		}
	}

	function next() {
		if (!isFlipping && hasStarted) {
			direction = 1;
			isFlipping = true;
			currentIndex = (currentIndex + 1) % PAGES.length;
		}
	}

	function prev() {
		if (!isFlipping && hasStarted) {
			direction = -1;
			isFlipping = true;
			currentIndex = (currentIndex - 1 + PAGES.length) % PAGES.length;
		}
	}

	function handleGlobalClick(e: MouseEvent) {
		if (!hasStarted || isFlipping) return;
		if ((e.target as HTMLElement).closest('button')) return;

		if (e.clientX > window.innerWidth / 2) {
			next();
		} else {
			prev();
		}
	}
</script>

{#snippet sbArrowLeft()}
	<svg viewBox="0 0 14 44" width="14" height="44" fill="none" aria-hidden="true">
		<polyline
			points="11,3 3,22 11,41"
			stroke="currentColor"
			stroke-width="1.1"
			stroke-linecap="round"
			stroke-linejoin="round"
		></polyline>
	</svg>
{/snippet}

{#snippet sbArrowRight()}
	<svg viewBox="0 0 14 44" width="14" height="44" fill="none" aria-hidden="true">
		<polyline
			points="3,3 11,22 3,41"
			stroke="currentColor"
			stroke-width="1.1"
			stroke-linecap="round"
			stroke-linejoin="round"
		></polyline>
	</svg>
{/snippet}

<div
	role="presentation"
	class="relative min-h-[700px] w-full rounded-3xl bg-[#f4f5f7] overflow-hidden text-slate-800 font-sans flex flex-col cursor-pointer my-4 border border-black/10 shadow-xl p-6 sm:p-8"
	onclick={handleGlobalClick}
>
	<div class="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
		<h1
			class="text-[20vw] sm:text-[15vw] font-bold text-blue-600/10 blur-[6px] sm:blur-[10px] whitespace-nowrap select-none tracking-tighter mix-blend-multiply"
		>
			Matthew Yu
		</h1>
	</div>

	<main
		class="relative z-10 w-full flex flex-col items-center justify-center pt-8 pb-10 pointer-events-none"
	>
		<div
			class="relative flex items-center justify-center w-full max-w-[90rem] gap-4 sm:gap-12 pointer-events-auto"
		>
			<button
				onclick={prev}
				disabled={isFlipping || !hasStarted}
				class="p-4 sm:p-6 text-slate-400 hover:text-black disabled:opacity-0 disabled:hover:text-slate-400 transition-opacity duration-300 z-20 focus:outline-none hidden sm:block cursor-pointer"
				aria-label="Previous page"
			>
				{@render sbArrowLeft()}
			</button>

			<div class="flex-1 w-full max-w-2xl relative">
				<ExtractedBook
					pages={PAGES}
					{currentIndex}
					{isFlipping}
					{direction}
					{settings}
					{isIntro}
					onFlipComplete={handleFlipComplete}
				/>
			</div>

			<button
				onclick={next}
				disabled={isFlipping || !hasStarted}
				class="p-4 sm:p-6 text-slate-400 hover:text-black disabled:opacity-0 disabled:hover:text-slate-400 transition-opacity duration-300 z-20 focus:outline-none hidden sm:block cursor-pointer"
				aria-label="Next page"
			>
				{@render sbArrowRight()}
			</button>
		</div>

		<div
			class="flex sm:hidden items-center justify-between w-full max-w-sm mt-8 px-8 z-20 pointer-events-auto"
		>
			<button
				onclick={prev}
				disabled={isFlipping || !hasStarted}
				class="p-4 text-slate-400 hover:text-black disabled:opacity-0 transition-opacity focus:outline-none cursor-pointer"
				aria-label="Previous page"
			>
				{@render sbArrowLeft()}
			</button>

			<div class="flex items-center justify-center min-w-[200px]">
				<AnimatePresence mode="wait">
					{#key currentIndex}
						<motion.div
							initial={{ opacity: 0, y: 5 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -5 }}
							transition={{ duration: 0.3 }}
							class="text-[10px] tracking-[0.2em] text-slate-500 font-medium uppercase text-center"
						>
							{PAGES[currentIndex].title}
						</motion.div>
					{/key}
				</AnimatePresence>
			</div>

			<button
				onclick={next}
				disabled={isFlipping || !hasStarted}
				class="p-4 text-slate-400 hover:text-black disabled:opacity-0 transition-opacity focus:outline-none cursor-pointer"
				aria-label="Next page"
			>
				{@render sbArrowRight()}
			</button>
		</div>

		<div class="hidden sm:flex mt-8 h-6 items-center justify-center z-20">
			<AnimatePresence mode="wait">
				{#key currentIndex}
					<motion.div
						initial={{ opacity: 0, y: 5 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -5 }}
						transition={{ duration: 0.3 }}
						class="text-[11px] tracking-[0.2em] text-slate-500 font-medium uppercase"
					>
						{PAGES[currentIndex].title}
					</motion.div>
				{/key}
			</AnimatePresence>
		</div>
	</main>

	<div class="relative z-20 pointer-events-auto w-full pt-8 border-t border-black/10">
		<div class="text-center mb-6">
			<h3 class="text-sm font-bold uppercase tracking-widest text-slate-600">
				Dither Graph Components
			</h3>
		</div>
		<div
			class="grid grid-cols-1 md:grid-cols-3 gap-6 items-start justify-items-center w-full max-w-7xl mx-auto"
		>
			<div class="w-full flex justify-center">
				<ChartCard />
			</div>
			<div class="w-full flex justify-center">
				<PaymentsChart />
			</div>
			<div class="w-full flex justify-center">
				<MembersGrowthChart />
			</div>
		</div>
	</div>

	<button
		class="absolute top-6 right-6 p-3 bg-white/50 backdrop-blur-md rounded-full shadow-sm hover:bg-white text-slate-500 hover:text-black transition-all z-50 pointer-events-auto"
		aria-label="Open theme settings"
		onclick={(e) => {
			e.stopPropagation();
			showSettings = true;
		}}
	>
		<Settings2 size={20} />
	</button>

	<AnimatePresence>
		{#if showSettings}
			<motion.div
				initial={{ opacity: 0, x: 20 }}
				animate={{ opacity: 1, x: 0 }}
				exit={{ opacity: 0, x: 20 }}
				class="absolute top-6 right-6 w-80 bg-white/90 backdrop-blur-xl shadow-2xl rounded-2xl p-6 z-50 pointer-events-auto border border-white/20"
				onclick={(e: MouseEvent) => e.stopPropagation()}
			>
				<div class="flex items-center justify-between mb-6">
					<h3 class="text-sm font-semibold tracking-wider text-slate-800 uppercase">
						Theme Settings
					</h3>
					<button
						onclick={() => (showSettings = false)}
						class="text-slate-400 hover:text-black"
						aria-label="Close theme settings"
					>
						<X size={18} />
					</button>
				</div>

				<div class="space-y-6">
					<div class="space-y-2">
						<div class="flex justify-between text-xs text-slate-500 uppercase tracking-wider">
							<span>Image Padding</span>
							<span>{settings.padding}px</span>
						</div>
						<input
							type="range"
							min="0"
							max="100"
							bind:value={settings.padding}
							class="w-full accent-slate-800 cursor-pointer"
							aria-label="Image Padding"
						/>
					</div>

					<div class="space-y-2">
						<div class="flex justify-between text-xs text-slate-500 uppercase tracking-wider">
							<span>Image Radius</span>
							<span>{settings.imageRadius}px</span>
						</div>
						<input
							type="range"
							min="0"
							max="32"
							bind:value={settings.imageRadius}
							class="w-full accent-slate-800 cursor-pointer"
							aria-label="Image Radius"
						/>
					</div>

					<div class="space-y-2">
						<div class="flex justify-between text-xs text-slate-500 uppercase tracking-wider">
							<span>Crease Opacity</span>
							<span>{settings.creaseOpacity}%</span>
						</div>
						<input
							type="range"
							min="0"
							max="100"
							bind:value={settings.creaseOpacity}
							class="w-full accent-slate-800 cursor-pointer"
							aria-label="Crease Opacity"
						/>
					</div>

					<div class="space-y-2">
						<div class="flex justify-between text-xs text-slate-500 uppercase tracking-wider">
							<span>Shadow Intensity</span>
							<span>{settings.shadowIntensity}px</span>
						</div>
						<input
							type="range"
							min="0"
							max="50"
							bind:value={settings.shadowIntensity}
							class="w-full accent-slate-800 cursor-pointer"
							aria-label="Shadow Intensity"
						/>
					</div>
				</div>
			</motion.div>
		{/if}
	</AnimatePresence>

	<div class="absolute bottom-6 inset-x-0 flex justify-center z-20 animate-bounce text-slate-400">
		<ChevronDown strokeWidth={1} size={24} />
	</div>
</div>
