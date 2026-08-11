<script lang="ts">
	import '../app.css';
	import type { Snippet } from 'svelte';
	import { motion, AnimatePresence } from 'motion-sv';
	import { Sun, Moon, Menu, X } from '@lucide/svelte';
	import { page } from '$app/state';
	import { onClickOutside } from 'runed';
	import { setAppState } from '$lib/app/app-state.svelte.js';
	import { ThemeToggleCode } from '$lib/app/code-generator.js';
	import AnimatedNumber from '$lib/app/components/sections/AnimatedNumber.svelte';

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();

	const app = setAppState();
	const isDark = $derived(app.theme === 'dark');

	const pillButton =
		'bg-secondary hover:bg-secondary-hover text-black dark:text-[rgba(237,237,237,0.6)] dark:hover:text-[#ededed]';
	const footerText = 'text-black opacity-60 dark:text-[#8f8f8f] dark:opacity-100';
	const footerLink = 'text-black dark:text-[#e9e9e9] dark:hover:text-white';

	let stars = $state<number | null>(null);
	let menuOpen = $state(false);
	let menuRoot = $state<HTMLElement>();

	onClickOutside(
		() => menuRoot,
		() => (menuOpen = false)
	);

	$effect(() => {
		pathname;
		menuOpen = false;
	});

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

	async function handleThemeToggle() {
		app.toggleTheme();
		app.haptic('medium');
		try {
			await navigator.clipboard.writeText(ThemeToggleCode);
			app.showToast('Theme toggled & ThemeToggle code copied!');
		} catch {
			app.haptic('error');
			app.showToast('Failed to copy theme code.');
		}
	}

	const navLinks = [
		{ href: '/', label: 'Components' },
		{ href: '/install', label: 'CLI Install' }
	];

	const pathname = $derived(page.url.pathname);

	const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));
</script>

<svelte:head>
	<title>Amicro SV — 157 micro interactions for Svelte 5</title>
	<meta name="title" content="Amicro SV — 157 micro interactions for Svelte 5" />
	<meta
		name="description"
		content="Buttons, card spreads, 3D carousels and 134 loaders for Svelte 5, running on motion-sv. Port of the React library Amicro, installable one component at a time."
	/>
	<meta
		name="keywords"
		content="svelte, sveltekit, micro-interactions, micro-transitions, motion-sv, tailwindcss, motion, animation, cli, frontend, components, developer-tools"
	/>
	<meta name="author" content="Enis Budancamanak" />

	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://amicro.enisdev.com" />
	<meta property="og:title" content="Amicro SV — 157 micro interactions for Svelte 5" />
	<meta property="og:image" content="https://amicro.enisdev.com/og.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta
		property="og:description"
		content="Buttons, card spreads, 3D carousels and 134 loaders for Svelte 5, running on motion-sv. Port of the React library Amicro, installable one component at a time."
	/>

	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:title" content="Amicro SV — 157 micro interactions for Svelte 5" />
	<meta property="twitter:image" content="https://amicro.enisdev.com/og.png" />
	<meta
		property="twitter:description"
		content="Buttons, card spreads, 3D carousels and 134 loaders for Svelte 5, running on motion-sv. Port of the React library Amicro, installable one component at a time."
	/>

	<link rel="icon" type="image/jpeg" href="/favicon.jpg" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
</svelte:head>

<div
	class="relative w-full min-h-dvh flex flex-col font-sans antialiased transition-colors duration-300 bg-background text-black dark:text-white {isDark
		? 'dark selection:bg-neutral-850'
		: 'selection:bg-neutral-200'}"
>
	<header class="relative z-50 w-full pt-4 pb-4 px-6 border-b border-transparent">
		<div class="relative z-[3] flex items-center justify-between gap-4 max-w-[1240px] mx-auto">
			<div class="flex items-center gap-[34px] min-w-0">
				<a
					href="/"
					class="inline-flex items-center gap-[4px] h-[35px] py-[5px] no-underline shrink-0 group transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.02] cursor-pointer text-left border-0 bg-transparent text-black dark:text-white"
				>
					<span
						class="inline-flex items-center justify-center w-[24px] h-[24px] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] origin-center group-hover:rotate-[60deg] text-foreground"
					>
						<svg
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							class="w-[20px] h-[20px] block"
						>
							<path
								d="M7 6L14 12L7 18"
								stroke="currentColor"
								stroke-width="2.5"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="opacity-40"
							/>
							<path
								d="M13 6L20 12L13 18"
								stroke="currentColor"
								stroke-width="2.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</span>
					<span class="text-[16px] font-bold leading-none tracking-[-0.019em] ml-1">
						<span>Amicro SV</span>
					</span>
				</a>
				<span
					class="hidden sm:inline-flex items-center h-[22px] px-[9px] rounded-full text-[11px] font-semibold leading-none tracking-[0.01em] shrink-0 bg-secondary text-neutral-700 dark:text-[rgba(237,237,237,0.75)]"
				>
					Svelte-Port
				</span>
				<nav class="hidden sm:flex items-center gap-[8px]">
					{#each navLinks as link (link.href)}
						<a
							href={link.href}
							aria-current={isActive(link.href) ? 'page' : undefined}
							class="inline-flex items-center h-[36px] px-[14px] rounded-full text-[13px] font-medium leading-[16px] no-underline whitespace-nowrap transition-colors {isActive(
								link.href
							)
								? 'text-foreground bg-secondary'
								: 'text-muted-foreground hover:text-foreground hover:bg-secondary'}"
						>
							{link.label}
						</a>
					{/each}
				</nav>
			</div>

			<div class="flex items-center gap-[8px]" bind:this={menuRoot}>
				<a
					href="https://github.com/enisbu/amicro-sv"
					target="_blank"
					rel="noopener noreferrer"
					title="Repo of this Svelte port"
					class="hidden sm:inline-flex items-center justify-center gap-1.5 h-[36px] px-[13px] rounded-full font-sans text-[13px] font-medium leading-[16px] no-underline transition-colors duration-150 group {pillButton}"
				>
					<svg viewBox="0 0 16 16" fill="currentColor" class="w-auto h-[16px] max-w-[16px] block">
						<path
							d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
						></path>
					</svg>
					<span class="inline-block">
						{#if stars !== null}
							<AnimatedNumber value={stars} />
						{:else}
							Star
						{/if}
					</span>
				</a>
				<a
					href="https://x.com/enisdev"
					target="_blank"
					rel="noopener noreferrer"
					title="enisdev on X"
					aria-label="enisdev on X"
					class="hidden sm:inline-flex items-center justify-center w-[36px] h-[36px] rounded-full transition-colors duration-150 {pillButton}"
				>
					<svg viewBox="0 0 16 17" fill="currentColor" class="w-[16px] h-[17px] block">
						<path
							d="M12.4041 1.39726H14.6953L9.69087 7.2591L15.5781 15.2368H10.9696L7.35741 10.3996L3.22921 15.2368H0.934687L6.28641 8.96575L0.642598 1.39726H5.36795L8.62962 5.81859L12.4041 1.39726ZM11.5992 13.8329H12.8682L4.67667 2.72798H3.31359L11.5992 13.8329Z"
						></path>
					</svg>
				</a>

				<button
					onclick={handleThemeToggle}
					class="inline-flex items-center justify-center w-[36px] h-[36px] rounded-full transition-colors duration-150 cursor-pointer {pillButton}"
					title="Toggle Theme (Copies ThemeToggle code)"
					aria-label="Toggle Theme"
				>
					{#if isDark}
						<Sun class="w-[16px] h-[16px]" />
					{:else}
						<Moon class="w-[16px] h-[16px]" />
					{/if}
				</button>

				<button
					onclick={() => (menuOpen = !menuOpen)}
					class="inline-flex sm:hidden items-center justify-center w-[36px] h-[36px] rounded-full transition-colors duration-150 cursor-pointer border-0 {pillButton}"
					aria-label={menuOpen ? 'Close menu' : 'Open menu'}
					aria-expanded={menuOpen}
				>
					{#if menuOpen}
						<X class="w-[18px] h-[18px]" />
					{:else}
						<Menu class="w-[18px] h-[18px]" />
					{/if}
				</button>
			</div>
		</div>

		<AnimatePresence>
			{#if menuOpen}
				<motion.div
					initial={{ opacity: 0, y: -8 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -8 }}
					transition={{ duration: 0.18, ease: 'easeOut' }}
					class="absolute top-[64px] left-6 right-6 z-[60] p-2 rounded-2xl border border-border shadow-2xl flex flex-col gap-1 sm:hidden backdrop-blur-xl bg-popover text-popover-foreground"
				>
					{#each navLinks as link (link.href)}
						<a
							href={link.href}
							aria-current={isActive(link.href) ? 'page' : undefined}
							class="flex items-center h-[42px] px-4 rounded-xl text-[14px] font-semibold no-underline transition-colors {isActive(
								link.href
							)
								? 'bg-secondary text-foreground'
								: 'text-muted-foreground hover:text-foreground hover:bg-secondary'}"
						>
							{link.label}
						</a>
					{/each}
					<a
						href="https://github.com/enisbu/amicro-sv"
						target="_blank"
						rel="noopener noreferrer"
						class="flex items-center h-[42px] px-4 rounded-xl text-[14px] font-semibold no-underline text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
					>
						GitHub
					</a>
				</motion.div>
			{/if}
		</AnimatePresence>
	</header>

	<AnimatePresence mode="wait">
		{#key pathname}
			<motion.div
				initial={{ opacity: 0, y: 15 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -15 }}
				transition={{ duration: 0.25 }}
				class="w-full flex flex-col"
			>
				{@render children?.()}
			</motion.div>
		{/key}
	</AnimatePresence>

	<footer
		class="relative z-10 w-full text-center text-balance px-6 pb-[24px] text-[13px] leading-[22px]"
	>
		<span class="whitespace-nowrap">
			<span class={footerText}>Created by</span>
			<a
				class="no-underline ml-[4px] font-medium transition-colors {footerLink}"
				href="https://x.com/SubhanHQ"
				target="_blank"
				rel="noopener noreferrer">Syed Subhan</a
			>
			<span class="mx-1 {footerText}">·</span>
		</span>
		<span class="whitespace-nowrap">
			<span class={footerText}>Svelte port by</span>
			<a
				class="no-underline ml-[4px] font-medium transition-colors {footerLink}"
				href="https://enisdev.com"
				target="_blank"
				rel="noopener noreferrer">enisdev</a
			>
			<span class="mx-1 {footerText}">·</span>
		</span>
		<span class="whitespace-nowrap">
			<a
				class="no-underline transition-colors {footerLink}"
				href="https://github.com/enisbu/amicro-sv#readme">Terms &amp; License</a
			>
			<span class="mx-1 {footerText}">·</span>
		</span>
		<a class="no-underline whitespace-nowrap transition-colors {footerLink}" href="/llms.txt"
			>llms.txt</a
		>
	</footer>

	<div class="fixed bottom-6 right-6 z-[100] pointer-events-none">
		<AnimatePresence>
			{#if app.toastMessage}
				<motion.div
					initial={{ opacity: 0, y: 50, scale: 0.9 }}
					animate={{ opacity: 1, y: 0, scale: 1 }}
					exit={{ opacity: 0, y: 20, scale: 0.9 }}
					class="px-4 py-3 rounded-xl border flex items-center gap-2.5 text-[13px] font-medium shadow-lg pointer-events-auto bg-card border-neutral-200 text-black shadow-neutral-200/50 dark:border-neutral-800 dark:text-white dark:shadow-black/20"
				>
					<div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
					<span>{app.toastMessage}</span>
				</motion.div>
			{/if}
		</AnimatePresence>
	</div>
</div>
