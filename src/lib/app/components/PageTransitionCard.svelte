<script lang="ts">
	import { Copy, Check } from '@lucide/svelte';
	import { getAppState } from '$lib/app/app-state.svelte.js';
	import type { TransitionPreset } from '$lib/app/data/transitions.js';
	import PageTransitionOverlay from './PageTransitionOverlay.svelte';
	import IconSwap from './IconSwap.svelte';

	export interface Props {
		preset: TransitionPreset;
	}

	let { preset }: Props = $props();

	const app = getAppState();
	const isDark = $derived(app.theme === 'dark');

	const tileShell = $derived(
		isDark
			? 'shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] hover:bg-[#202020]'
			: 'shadow-[0_4px_20px_rgba(0,0,0,0.04),0_1px_3px_rgba(0,0,0,0.02)] border border-neutral-100/85 hover:shadow-[0_6px_24px_rgba(0,0,0,0.06)] text-black'
	);

	const bar = 'bg-black/10 dark:bg-white/10';

	let isAnimating = $state(false);
	let activePage = $state<'A' | 'B'>('A');
	let isCopied = $state(false);

	let timers: ReturnType<typeof setTimeout>[] = [];
	$effect(() => () => timers.forEach(clearTimeout));

	function later(fn: () => void, ms: number) {
		timers.push(setTimeout(fn, ms));
	}

	function handleMouseEnter() {
		if (isAnimating) return;
		app.haptic('light');
		isAnimating = true;

		later(() => {
			activePage = activePage === 'A' ? 'B' : 'A';
		}, 380);

		later(() => {
			isAnimating = false;
		}, 850);
	}

	async function handleCopyCode(event: MouseEvent) {
		event.stopPropagation();
		await navigator.clipboard.writeText(preset.code);
		app.haptic('success');
		isCopied = true;
		app.showToast(`Copied ${preset.name} transition code!`);
		later(() => (isCopied = false), 2000);
	}
</script>

<div
	onmouseenter={handleMouseEnter}
	role="presentation"
	class="relative w-full max-w-[320px] sm:w-[320px] h-[220px] sm:h-[268px] rounded-[24px] transition-all duration-300 group cursor-pointer bg-card {tileShell}"
>
	<div
		class="absolute left-[12px] top-[12px] right-[12px] bottom-[68px] rounded-[14px] flex items-center justify-center overflow-hidden transition-colors duration-300 bg-muted"
	>
		<div
			class="absolute inset-0 rounded-[14px] pointer-events-none z-10 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.03)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]"
		></div>

		<div
			class="w-full h-full p-4 flex flex-col justify-between select-none relative transition-colors duration-300 text-black dark:text-white {activePage ===
			'A'
				? 'bg-[#ffffff] dark:bg-[#121212]'
				: 'bg-[#f8f9fa] dark:bg-[#181818]'}"
		>
			<div class="flex items-center justify-between z-0">
				<div class="flex items-center gap-1.5">
					<span
						class="w-2 h-2 rounded-full {activePage === 'A'
							? 'bg-black dark:bg-white'
							: 'bg-neutral-400 dark:bg-neutral-500'}"
					></span>
					<span class="text-[10px] font-medium tracking-tight text-neutral-600 dark:text-neutral-400">
						{activePage === 'A' ? 'Page A' : 'Page B'}
					</span>
				</div>
				<div class="h-1.5 w-10 rounded-full {bar}"></div>
			</div>

			<div class="my-auto z-0 flex flex-col gap-1.5 items-center text-center">
				<div class="text-[12px] font-semibold tracking-tight text-foreground">Amicro Motion</div>
				<div
					class="text-[10px] max-w-[180px] leading-snug line-clamp-1 text-black/60 dark:text-[#767676]"
				>
					{preset.description}
				</div>
			</div>

			<div class="flex items-center justify-between z-0">
				<div class="h-1.5 w-12 rounded-full {bar}"></div>
				<div class="h-1.5 w-6 rounded-full {bar}"></div>
			</div>
		</div>

		<PageTransitionOverlay transitionId={preset.id} {isAnimating} speedMultiplier={1} />
	</div>

	<div class="absolute left-[20px] bottom-[14px] w-[calc(100%-80px)] flex flex-col gap-[2px]">
		<div
			class="text-[13px] font-semibold leading-[18px] transition-colors text-foreground"
		>
			{preset.name}
		</div>
		<div
			class="text-[11px] font-normal leading-[13px] transition-colors capitalize text-black opacity-70 dark:text-[#767676] dark:opacity-100"
		>
			{preset.category} transition
		</div>
	</div>

	<button
		onclick={handleCopyCode}
		type="button"
		class="absolute right-[20px] bottom-[12px] w-[32px] h-[32px] rounded-full flex items-center justify-center transition-colors cursor-pointer border-0 focus-visible:outline focus-visible:outline-2 bg-neutral-100 hover:bg-neutral-200 text-black dark:bg-white/[0.08] dark:hover:bg-white/[0.12] dark:text-[#ededed]/60 dark:hover:text-[#ededed]"
		aria-label="Copy transition code"
	>
		<IconSwap key={isCopied ? 'check' : 'copy'}>
			{#if isCopied}
				<Check class="w-3.5 h-3.5 text-emerald-400" />
			{:else}
				<Copy class="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110" />
			{/if}
		</IconSwap>
	</button>
</div>
