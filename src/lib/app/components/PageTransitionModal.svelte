<script lang="ts">
	import { motion } from 'motion-sv';
	import { X, RefreshCw, Check, Terminal, Code2 } from '@lucide/svelte';
	import { getAppState } from '$lib/app/app-state.svelte.js';
	import type { TransitionPreset } from '$lib/app/data/transitions.js';
	import PageTransitionOverlay from './PageTransitionOverlay.svelte';

	export interface Props {
		preset: TransitionPreset | null;
		onClose: () => void;
	}

	let { preset, onClose }: Props = $props();

	const app = getAppState();

	let isAnimating = $state(false);
	let activePage = $state<'A' | 'B'>('A');
	let speedMultiplier = $state(1);
	let copiedType = $state<'code' | 'cli' | null>(null);

	let timers: ReturnType<typeof setTimeout>[] = [];
	$effect(() => () => timers.forEach(clearTimeout));

	function later(fn: () => void, ms: number) {
		timers.push(setTimeout(fn, ms));
	}

	const SPEEDS = [
		{ label: '0.6x', val: 0.65 },
		{ label: '1.0x', val: 1 },
		{ label: '1.5x', val: 1.4 }
	];

	function triggerModalTransition() {
		if (isAnimating) return;
		app.haptic('medium');
		isAnimating = true;

		later(() => {
			activePage = activePage === 'A' ? 'B' : 'A';
		}, 380 * speedMultiplier);

		later(() => {
			isAnimating = false;
		}, 850 * speedMultiplier);
	}

	async function handleCopyCode() {
		if (!preset) return;
		await navigator.clipboard.writeText(preset.code);
		app.haptic('success');
		copiedType = 'code';
		app.showToast(`Copied ${preset.name} transition code!`);
		later(() => (copiedType = null), 2000);
	}

	async function handleCopyCli() {
		if (!preset) return;
		await navigator.clipboard.writeText(preset.cliCommand);
		app.haptic('light');
		copiedType = 'cli';
		app.showToast(`Copied CLI command: ${preset.cliCommand}`);
		later(() => (copiedType = null), 2000);
	}
</script>

{#if preset}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
	>
		<motion.div
			initial={{ opacity: 0, scale: 0.95, y: 10 }}
			animate={{ opacity: 1, scale: 1, y: 0 }}
			exit={{ opacity: 0, scale: 0.95, y: 10 }}
			class="relative w-full max-w-4xl max-h-[90vh] rounded-3xl border overflow-hidden flex flex-col shadow-2xl bg-white border-neutral-200 text-black dark:bg-[#121216] dark:border-white/10 dark:text-white"
		>
			<div class="flex items-center justify-between p-5 border-b border-white/10">
				<div class="flex items-center gap-3">
					<span
						class="text-xs font-mono font-bold px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30"
					>
						{preset.category}
					</span>
					<h3 class="text-lg font-bold tracking-tight">{preset.name}</h3>
				</div>
				<button
					onclick={onClose}
					aria-label="Close"
					class="p-2 rounded-full cursor-pointer transition-colors hover:bg-neutral-100 text-neutral-600 dark:text-neutral-400 dark:hover:bg-white/10 dark:hover:text-white"
				>
					<X class="w-5 h-5" />
				</button>
			</div>

			<div class="p-6 overflow-y-auto flex flex-col gap-6">
				<div
					class="relative w-full aspect-[16/9] min-h-[300px] rounded-2xl border overflow-hidden shadow-xl bg-neutral-900 border-neutral-800 dark:bg-[#0a0a0c] dark:border-white/10"
				>
					{#if activePage === 'A'}
						<div
							class="w-full h-full p-6 flex flex-col justify-between bg-gradient-to-br from-[#0d0e14] via-[#090a0e] to-[#121019] text-white"
						>
							<div class="flex items-center justify-between">
								<span class="text-xs font-mono text-indigo-400">AMICRO STUDIO CANVAS (PAGE A)</span>
								<span
									class="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400"
									>60 FPS</span
								>
							</div>
							<div class="my-auto">
								<h4 class="text-2xl font-bold">{preset.name}</h4>
								<p class="text-xs text-neutral-400 mt-1 max-w-md">{preset.description}</p>
							</div>
							<div class="text-[11px] font-mono text-neutral-500">
								CLICK TRIGGER BELOW TO TEST MOTION
							</div>
						</div>
					{:else}
						<div
							class="w-full h-full p-6 flex flex-col justify-between bg-gradient-to-br from-[#0a120e] via-[#090d0b] to-[#0f1712] text-white"
						>
							<div class="flex items-center justify-between">
								<span class="text-xs font-mono text-emerald-400">APEX AI TERMINAL (PAGE B)</span>
								<span
									class="text-[10px] font-mono px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-400"
									>LATENCY &lt; 1ms</span
								>
							</div>
							<div class="my-auto">
								<h4 class="text-2xl font-bold">{preset.name}</h4>
								<p class="text-xs text-neutral-400 mt-1 max-w-md">
									Seamless component trees swap on route transition.
								</p>
							</div>
							<div class="text-[11px] font-mono text-neutral-500">
								CLICK TRIGGER BELOW TO TEST MOTION
							</div>
						</div>
					{/if}

					<PageTransitionOverlay transitionId={preset.id} {isAnimating} {speedMultiplier} />
				</div>

				<div class="flex flex-wrap items-center justify-between gap-4">
					<div class="flex items-center gap-3">
						<button
							onclick={triggerModalTransition}
							disabled={isAnimating}
							class="h-10 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-2 cursor-pointer transition-all active:scale-95 shadow-lg shadow-indigo-600/25 border-0"
						>
							<RefreshCw class="w-4 h-4 {isAnimating ? 'animate-spin' : ''}" />
							<span>Trigger Transition</span>
						</button>

						<div class="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
							<span class="text-[10px] font-mono px-2 text-neutral-400">Speed:</span>
							{#each SPEEDS as sp (sp.label)}
								<button
									onclick={() => (speedMultiplier = sp.val)}
									class="h-7 px-2.5 rounded-lg text-[11px] font-mono font-semibold cursor-pointer border-0 {speedMultiplier ===
									sp.val
										? 'bg-indigo-600 text-white'
										: 'text-neutral-400 hover:text-white'}"
								>
									{sp.label}
								</button>
							{/each}
						</div>
					</div>

					<div class="flex items-center gap-2">
						<button
							onclick={handleCopyCode}
							class="h-10 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer border-0"
						>
							{#if copiedType === 'code'}
								<Check class="w-4 h-4 text-emerald-400" />
							{:else}
								<Code2 class="w-4 h-4" />
							{/if}
							<span>{copiedType === 'code' ? 'Code Copied' : 'Copy TSX Code'}</span>
						</button>

						<button
							onclick={handleCopyCli}
							class="h-10 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer border-0"
						>
							{#if copiedType === 'cli'}
								<Check class="w-4 h-4 text-emerald-400" />
							{:else}
								<Terminal class="w-4 h-4" />
							{/if}
							<span>{copiedType === 'cli' ? 'CLI Copied' : 'Copy CLI'}</span>
						</button>
					</div>
				</div>

				<div
					class="mt-2 rounded-2xl bg-[#09090c] border border-white/10 p-4 font-mono text-xs overflow-x-auto text-neutral-300"
				>
					<div class="flex items-center justify-between mb-2 pb-2 border-b border-white/10">
						<span class="text-indigo-400 font-bold">{preset.name} Source Code</span>
						<span class="text-[10px] text-neutral-500">{preset.cliCommand}</span>
					</div>
					<pre><code>{preset.code}</code></pre>
				</div>
			</div>
		</motion.div>
	</div>
{/if}
