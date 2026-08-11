<script lang="ts">
	import { motion, createLayoutMotion } from 'motion-sv';
	import { Copy } from '@lucide/svelte';
	import { getAppState } from '$lib/app/app-state.svelte.js';
	import { getComponentCode } from '$lib/app/code-generator.js';
	import type { ButtonConfig } from '$lib/app/data/buttons.js';
	import AnimatedButton from '../AnimatedButton.svelte';

	export interface Props {
		buttons: ButtonConfig[];
		layout: 'list' | 'grid' | 'matrix';
		active: boolean;
	}

	let { buttons, layout, active }: Props = $props();

	const layoutMotion = createLayoutMotion(motion);

	let wasActive = false;

	$effect.pre(() => {
		const order = buttons;
		const mode = layout;
		const visible = active;
		void order;
		void mode;
		if (visible && wasActive) layoutMotion.update();
		wasActive = visible;
	});

	const app = getAppState();
	const isDark = $derived(app.theme === 'dark');
	const isGrid = $derived(layout === 'grid');

	const tileShell = $derived(
		isDark
			? 'shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] hover:bg-[#202020]'
			: 'shadow-[0_4px_20px_rgba(0,0,0,0.04),0_1px_3px_rgba(0,0,0,0.02)] border border-neutral-100/85 hover:shadow-[0_6px_24px_rgba(0,0,0,0.06)] text-black'
	);

	const copyButton =
		'bg-neutral-100 hover:bg-neutral-200 text-black dark:bg-white/[0.08] dark:hover:bg-white/[0.12] dark:text-[#ededed]/60 dark:hover:text-[#ededed]';

	function copyCode(button: ButtonConfig) {
		app.copy(getComponentCode(button), `Copied ${button.label} component code!`);
	}
</script>

<layoutMotion.div class="contents">
	{#each buttons as button, index (button.id)}
	<motion.div
		layout="position"
		layoutDependency={index}
		transition={{ type: 'spring', stiffness: 400, damping: 25 }}
		class="{layout === 'list' ? 'w-full' : ''} {layout === 'grid'
			? 'w-full flex justify-center sm:w-auto sm:block'
			: ''}"
	>
		<div
			class={isGrid
				? `relative w-full max-w-[320px] sm:w-[320px] h-[220px] sm:h-[268px] rounded-[24px] transition-all duration-300 group bg-card ${tileShell}`
				: 'contents'}
		>
			<div
				class={isGrid
					? 'absolute left-[12px] top-[12px] right-[12px] bottom-[68px] rounded-[14px] overflow-hidden flex items-center justify-center transition-colors duration-300 bg-muted'
					: 'contents'}
			>
				{#if isGrid}
					<div
						class="absolute inset-0 rounded-[14px] pointer-events-none z-10 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.03)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]"
					></div>
				{/if}
				<AnimatedButton config={button} layoutMode={layout} />
			</div>
			{#if isGrid}
				<div class="absolute left-[20px] bottom-[14px] w-[calc(100%-80px)] flex flex-col gap-[2px]">
					<div
						class="text-[13px] font-semibold leading-[18px] transition-colors text-foreground"
					>
						{button.label}
					</div>
					<div
						class="text-[11px] font-normal leading-[13px] transition-colors capitalize text-black opacity-70 dark:text-[#767676] dark:opacity-100"
					>
						{button.interactionType.replace('-', ' ')} interaction
					</div>
				</div>
				<button
					onclick={() => copyCode(button)}
					type="button"
					class="absolute right-[20px] bottom-[12px] w-[32px] h-[32px] rounded-full flex items-center justify-center transition-colors cursor-pointer border-0 focus-visible:outline focus-visible:outline-2 {copyButton}"
					aria-label="Copy interaction code"
				>
					<Copy class="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110" />
				</button>
			{/if}
		</div>
	</motion.div>
{/each}
</layoutMotion.div>
