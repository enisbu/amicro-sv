import type { ButtonConfig } from './data/buttons.js';
import type { Component } from 'svelte';

export type CardInteractionType =
	| 'card-arc-5'
	| 'card-arc-7'
	| 'card-long-arc-5'
	| 'card-linear-spread'
	| 'card-corner-fan'
	| 'card-stamp-arc'
	| 'card-cascade-stagger'
	| 'card-scatter-spread'
	| 'card-wheel-fan'
	| 'card-carousel'
	| 'card-cover-flow'
	| 'card-time-machine'
	| 'card-carousel-mono'
	| 'card-cover-flow-mono'
	| 'card-time-machine-mono';

export interface CardConfig {
	id: string;
	label: string;
	interactionType: CardInteractionType;
	description: string;
	cliCommand: string;
	category?: 'spreads' | 'carousels';
}

function iconName(icon: Component<Record<string, unknown>> | string | undefined, fallback: string): string {
	if (icon === undefined) return fallback;
	if (typeof icon === 'string') return 'AppleIcon';
	const named = icon as { name?: string; displayName?: string };
	return named.name || named.displayName || fallback;
}

function iconImportList(icon1Name: string, icon2Name: string): string {
	return icon1Name === icon2Name ? icon1Name : `${icon1Name}, ${icon2Name}`;
}

export function getComponentCode(button: ButtonConfig): string {
	const icon1Name = iconName(button.icon1, 'Icon');
	const icon2Name = iconName(button.icon2, 'Icon');
	const bothIcons = iconImportList(icon1Name, icon2Name);

	switch (button.interactionType) {
		case 'slide-arrow':
			return `<script lang="ts">
  import { motion, AnimatePresence } from 'motion-sv';
  import { ${bothIcons} } from '@lucide/svelte';

  let isHovered = $state(false);
</script>

<motion.button
  onmouseenter={() => (isHovered = true)}
  onmouseleave={() => (isHovered = false)}
  whileHover={{ scale: 1.02 }}
  whilePress={{ scale: 0.96 }}
  class="relative flex items-center justify-center text-white h-[36px] px-6 rounded-[40px] bg-white/[0.04] hover:bg-white/[0.06] border border-white/5 cursor-pointer transition-colors duration-150"
>
  <AnimatePresence mode="popLayout">
    {#if !isHovered}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -10 }}
        transition={{ type: 'spring', stiffness: 600, damping: 25 }}
        class="flex items-center shrink-0 mr-2.5"
      >
        <${icon1Name} class="w-4 h-4" />
      </motion.div>
    {/if}
  </AnimatePresence>
  <span class="font-medium tracking-tight text-[13px]">${button.label}</span>
  <AnimatePresence mode="popLayout">
    {#if isHovered}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 10 }}
        transition={{ type: 'spring', stiffness: 600, damping: 25 }}
        class="flex items-center shrink-0 ml-2.5"
      >
        <${icon2Name} class="w-4 h-4" />
      </motion.div>
    {/if}
  </AnimatePresence>
</motion.button>
`;

		case 'sparkle':
			return `<script lang="ts">
  import { motion, AnimatePresence } from 'motion-sv';
  import { ${bothIcons} } from '@lucide/svelte';

  let isHovered = $state(false);
</script>

<motion.button
  onmouseenter={() => (isHovered = true)}
  onmouseleave={() => (isHovered = false)}
  whileHover={{ scale: 1.02 }}
  whilePress={{ scale: 0.96 }}
  class="relative flex items-center justify-center text-white h-[36px] px-6 rounded-[40px] bg-white/[0.04] hover:bg-white/[0.06] border border-white/5 cursor-pointer transition-colors duration-150"
>
  <div class="relative w-[16px] h-[16px] flex items-center justify-center shrink-0">
    <AnimatePresence mode="popLayout" initial={false}>
      {#if !isHovered}
        <motion.div
          initial={{ y: -15, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -15, opacity: 0, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 600, damping: 25 }}
          class="absolute inset-0 flex items-center justify-center"
        >
          <${icon1Name} class="w-4 h-4" />
        </motion.div>
      {:else}
        <motion.div
          initial={{ y: 15, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 15, opacity: 0, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 600, damping: 25 }}
          class="absolute inset-0 flex items-center justify-center"
        >
          <${icon2Name} class="w-4 h-4 text-yellow-400" />
          <motion.div
            initial={{ opacity: 0, scale: 0, rotate: -45, y: 10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0, rotate: 45, y: 10 }}
            transition={{ type: 'spring', stiffness: 600, damping: 25, delay: 0.05 }}
            class="absolute -top-3 -right-2"
          >
            <svg class="w-2.5 h-2.5 text-yellow-200" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l2.4 7.6H22l-6.2 4.5 2.4 7.6-6.2-4.5-6.2 4.5 2.4-7.6L2 9.6h7.6z" />
            </svg>
          </motion.div>
        </motion.div>
      {/if}
    </AnimatePresence>
  </div>
  <span class="font-medium tracking-tight text-[13px] ml-2.5">${button.label}</span>
</motion.button>
`;

		case 'morph':
			return `<script lang="ts">
  import { motion, AnimatePresence } from 'motion-sv';
  import { ${bothIcons} } from '@lucide/svelte';

  let isHovered = $state(false);
</script>

<motion.button
  onmouseenter={() => (isHovered = true)}
  onmouseleave={() => (isHovered = false)}
  whileHover={{ scale: 1.02 }}
  whilePress={{ scale: 0.96 }}
  class="relative flex items-center justify-center text-white h-[36px] px-6 rounded-[40px] bg-white/[0.04] hover:bg-white/[0.06] border border-white/5 cursor-pointer transition-colors duration-150"
>
  <div class="relative w-[16px] h-[16px] flex items-center justify-center shrink-0">
    <AnimatePresence mode="popLayout" initial={false}>
      {#if !isHovered}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 600, damping: 25 }}
          class="absolute inset-0 flex items-center justify-center"
        >
          <${icon1Name} class="w-4 h-4" />
        </motion.div>
      {:else}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 600, damping: 25 }}
          class="absolute inset-0 flex items-center justify-center"
        >
          <${icon2Name} class="w-4 h-4" />
        </motion.div>
      {/if}
    </AnimatePresence>
  </div>
  <span class="font-medium tracking-tight text-[13px] ml-2.5">${button.label}</span>
</motion.button>
`;

		case 'color-morph':
			return `<script lang="ts">
  import { motion } from 'motion-sv';
  import { ${icon1Name} } from '@lucide/svelte';

  let isHovered = $state(false);
</script>

<motion.button
  onmouseenter={() => (isHovered = true)}
  onmouseleave={() => (isHovered = false)}
  whileHover={{ scale: 1.02 }}
  whilePress={{ scale: 0.96 }}
  class="relative flex items-center justify-center text-white h-[36px] px-6 rounded-[40px] bg-white/[0.04] hover:bg-white/[0.06] border border-white/5 cursor-pointer transition-colors duration-150"
>
  <div class="relative w-[16px] h-[16px] flex items-center justify-center shrink-0">
    <${icon1Name}
      class="w-4 h-4 transition-colors duration-300 {isHovered
        ? 'text-blue-400 fill-blue-400'
        : 'text-neutral-300'}"
    />
  </div>
  <span class="font-medium tracking-tight text-[13px] ml-2.5">${button.label}</span>
</motion.button>
`;

		case 'pulse':
			return `<script lang="ts">
  import { motion } from 'motion-sv';
  import { ${icon1Name} } from '@lucide/svelte';

  let isHovered = $state(false);
</script>

<motion.button
  onmouseenter={() => (isHovered = true)}
  onmouseleave={() => (isHovered = false)}
  whileHover={{ scale: 1.02 }}
  whilePress={{ scale: 0.96 }}
  class="relative flex items-center justify-center text-white h-[36px] px-6 rounded-[40px] bg-white/[0.04] hover:bg-white/[0.06] border border-white/5 cursor-pointer transition-colors duration-150"
>
  <div class="relative w-[16px] h-[16px] flex items-center justify-center shrink-0">
    <motion.div
      animate={{ scale: isHovered ? [1, 1.25, 1] : 1 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      <${icon1Name} class="w-4 h-4" />
    </motion.div>
  </div>
  <span class="font-medium tracking-tight text-[13px] ml-2.5">${button.label}</span>
</motion.button>
`;

		case 'rotate':
			return `<script lang="ts">
  import { motion } from 'motion-sv';
  import { ${icon1Name} } from '@lucide/svelte';

  let isHovered = $state(false);
</script>

<motion.button
  onmouseenter={() => (isHovered = true)}
  onmouseleave={() => (isHovered = false)}
  whileHover={{ scale: 1.02 }}
  whilePress={{ scale: 0.96 }}
  class="relative flex items-center justify-center text-white h-[36px] px-6 rounded-[40px] bg-white/[0.04] hover:bg-white/[0.06] border border-white/5 cursor-pointer transition-colors duration-150"
>
  <div class="relative w-[16px] h-[16px] flex items-center justify-center shrink-0">
    <motion.div
      animate={{ rotate: isHovered ? 180 : 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <${icon1Name} class="w-4 h-4" />
    </motion.div>
  </div>
  <span class="font-medium tracking-tight text-[13px] ml-2.5">${button.label}</span>
</motion.button>
`;

		case 'shake':
			return `<script lang="ts">
  import { motion } from 'motion-sv';
  import { ${icon1Name} } from '@lucide/svelte';

  let isHovered = $state(false);
</script>

<motion.button
  onmouseenter={() => (isHovered = true)}
  onmouseleave={() => (isHovered = false)}
  whileHover={{ scale: 1.02 }}
  whilePress={{ scale: 0.96 }}
  class="relative flex items-center justify-center text-white h-[36px] px-6 rounded-[40px] bg-white/[0.04] hover:bg-white/[0.06] border border-white/5 cursor-pointer transition-colors duration-150"
>
  <div class="relative w-[16px] h-[16px] flex items-center justify-center shrink-0">
    <motion.div
      animate={{
        y: isHovered ? [0, -2, 0, -2, 0] : 0,
        rotate: isHovered ? [0, -10, 10, -10, 0] : 0
      }}
      transition={{ duration: 0.4 }}
    >
      <${icon1Name} class="w-4 h-4 text-red-400" />
    </motion.div>
  </div>
  <span class="font-medium tracking-tight text-[13px] ml-2.5 text-red-400">${button.label}</span>
</motion.button>
`;

		case 'ring':
			return `<script lang="ts">
  import { motion, AnimatePresence } from 'motion-sv';
  import { ${bothIcons} } from '@lucide/svelte';

  let isHovered = $state(false);
</script>

<motion.button
  onmouseenter={() => (isHovered = true)}
  onmouseleave={() => (isHovered = false)}
  whileHover={{ scale: 1.02 }}
  whilePress={{ scale: 0.96 }}
  class="relative flex items-center justify-center text-white h-[36px] px-6 rounded-[40px] bg-white/[0.04] hover:bg-white/[0.06] border border-white/5 cursor-pointer transition-colors duration-150"
>
  <div class="relative w-[16px] h-[16px] flex items-center justify-center shrink-0">
    <AnimatePresence mode="popLayout" initial={false}>
      {#if !isHovered}
        <motion.div
          initial={{ rotate: -15, scale: 0.8, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 15, scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 600, damping: 25 }}
          class="absolute inset-0 flex items-center justify-center"
        >
          <${icon1Name} class="w-4 h-4" />
        </motion.div>
      {:else}
        <motion.div
          initial={{ rotate: -15, scale: 0.8, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 15, scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 600, damping: 25 }}
          class="absolute inset-0 flex items-center justify-center"
        >
          <${icon2Name} class="w-4 h-4 text-orange-400" />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 600, damping: 15, delay: 0.1 }}
            class="absolute top-0 right-0 w-1.5 h-1.5 bg-red-500 rounded-full"
          />
        </motion.div>
      {/if}
    </AnimatePresence>
  </div>
  <span class="font-medium tracking-tight text-[13px] ml-2.5">${button.label}</span>
</motion.button>
`;

		case 'glare':
			return `<script lang="ts">
  import { motion } from 'motion-sv';
  import { ${icon1Name} } from '@lucide/svelte';

  let isHovered = $state(false);
</script>

<motion.button
  onmouseenter={() => (isHovered = true)}
  onmouseleave={() => (isHovered = false)}
  whileHover={{ scale: 1.02 }}
  whilePress={{ scale: 0.96 }}
  class="relative flex items-center justify-center text-white h-[36px] px-6 rounded-[40px] bg-white/[0.04] hover:bg-white/[0.06] border border-white/5 cursor-pointer overflow-hidden transition-colors duration-150"
>
  <${icon1Name} class="w-4 h-4 mr-2.5" />
  <span class="font-medium tracking-tight text-[13px]">${button.label}</span>
  <motion.div
    animate={{ x: isHovered ? ['-150%', '150%'] : '-150%' }}
    transition={{
      duration: 0.85,
      ease: 'easeInOut',
      repeat: isHovered ? Infinity : 0,
      repeatDelay: 1
    }}
    class="absolute top-0 bottom-0 w-[50px] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none z-10"
  />
</motion.button>
`;

		case 'text-reveal':
			return `<script lang="ts">
  import { motion } from 'motion-sv';
  import { ${icon1Name} } from '@lucide/svelte';

  let isHovered = $state(false);
</script>

<motion.button
  onmouseenter={() => (isHovered = true)}
  onmouseleave={() => (isHovered = false)}
  whileHover={{ scale: 1.02 }}
  whilePress={{ scale: 0.96 }}
  class="relative flex items-center justify-center text-white h-[36px] px-6 rounded-[40px] bg-white/[0.04] hover:bg-white/[0.06] border border-white/5 cursor-pointer transition-colors duration-150"
>
  <div class="relative w-[16px] h-[16px] flex items-center justify-center shrink-0 mr-2.5">
    <motion.div
      animate={{ rotate: isHovered ? 45 : 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <${icon1Name} class="w-4 h-4" />
    </motion.div>
  </div>
  <div class="relative h-[18px] overflow-hidden">
    <motion.div
      animate={{ y: isHovered ? -18 : 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      class="flex flex-col"
    >
      <span
        class="block h-[18px] leading-[18px] font-medium tracking-tight text-[13px] whitespace-nowrap text-white"
      >
        ${button.label}
      </span>
      <span
        class="block h-[18px] leading-[18px] font-medium tracking-tight text-[13px] whitespace-nowrap text-white"
      >
        ${button.label}
      </span>
    </motion.div>
  </div>
</motion.button>
`;

		case 'magnetic':
			return `<script lang="ts">
  import { motion } from 'motion-sv';
  import { ${icon1Name} } from '@lucide/svelte';

  let isHovered = $state(false);
  let mouseCoords = $state({ x: 0, y: 0 });

  function handleMouseMove(e: MouseEvent) {
    const rect = (e.currentTarget as HTMLButtonElement).getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseCoords = { x: x * 0.35, y: y * 0.35 };
  }

  function handleMouseLeave() {
    isHovered = false;
    mouseCoords = { x: 0, y: 0 };
  }
</script>

<motion.button
  onmouseenter={() => (isHovered = true)}
  onmousemove={handleMouseMove}
  onmouseleave={handleMouseLeave}
  animate={{
    x: isHovered ? mouseCoords.x : 0,
    y: isHovered ? mouseCoords.y : 0
  }}
  whilePress={{ scale: 0.96 }}
  class="relative flex items-center justify-center text-white h-[36px] px-6 rounded-[40px] bg-white/[0.04] hover:bg-white/[0.06] border border-white/5 cursor-pointer transition-colors duration-150"
>
  <${icon1Name} class="w-4 h-4 mr-2.5" />
  <span class="font-medium tracking-tight text-[13px]">${button.label}</span>
</motion.button>
`;

		case 'expand-ring':
			return `<script lang="ts">
  import { motion, AnimatePresence } from 'motion-sv';
  import { ${icon1Name} } from '@lucide/svelte';

  let isHovered = $state(false);
</script>

<motion.button
  onmouseenter={() => (isHovered = true)}
  onmouseleave={() => (isHovered = false)}
  whileHover={{ scale: 1.02 }}
  whilePress={{ scale: 0.96 }}
  class="relative flex items-center justify-center text-white h-[36px] px-6 rounded-[40px] bg-white/[0.04] hover:bg-white/[0.06] border border-white/5 cursor-pointer transition-colors duration-150"
>
  <div class="relative w-[16px] h-[16px] flex items-center justify-center shrink-0">
    <motion.div
      animate={{ scale: isHovered ? 1.1 : 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    >
      <${icon1Name} class="w-4 h-4" />
    </motion.div>
  </div>
  <span class="font-medium tracking-tight text-[13px] ml-2.5">${button.label}</span>
  <AnimatePresence>
    {#if isHovered}
      <motion.div
        initial={{ opacity: 1, scale: 1 }}
        animate={{ opacity: 0, scale: 1.15 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        class="absolute inset-0 rounded-[40px] pointer-events-none border border-white/20"
      />
    {/if}
  </AnimatePresence>
</motion.button>
`;

		case 'focus-blur':
			return `<script lang="ts">
  import { motion, AnimatePresence } from 'motion-sv';

  interface FocusBlurItem {
    label: string;
    href?: string;
  }

  interface Props {
    items?: FocusBlurItem[];
    blurAmount?: number;
    opacityAmount?: number;
    showBrackets?: boolean;
    class?: string;
  }

  let {
    items = [
      { label: '@Twitter', href: '#' },
      { label: '@Threads', href: '#' },
      { label: '@Instagram', href: '#' },
      { label: '@GitHub', href: '#' }
    ],
    blurAmount = 4,
    opacityAmount = 0.4,
    showBrackets = true,
    class: className = ''
  }: Props = $props();

  let hoveredIndex = $state<number | null>(null);
</script>

<div class="flex flex-wrap justify-center items-center gap-6 py-6 px-10 cursor-default {className}">
  {#each items as item, index (index)}
    {@const isHovered = hoveredIndex === index}
    {@const isInactive = hoveredIndex !== null && !isHovered}
    <a
      href={item.href ?? '#'}
      onmouseenter={() => (hoveredIndex = index)}
      onmouseleave={() => (hoveredIndex = null)}
      class="relative font-semibold text-lg sm:text-2xl no-underline transition-all duration-300 select-none outline-none"
      style="filter: {isInactive ? \`blur(\${blurAmount}px)\` : 'none'}; opacity: {isInactive
        ? opacityAmount
        : 1}; color: {isHovered ? '#3b82f6' : 'inherit'}"
    >
      <span class="relative z-10">{item.label}</span>

      {#if showBrackets}
        <AnimatePresence>
          {#if isHovered}
            <motion.div
              initial={{ opacity: 0, scale: 1.3 }}
              animate={{ opacity: 1, scale: 1.1 }}
              exit={{ opacity: 0, scale: 1.3 }}
              transition={{ type: 'spring', stiffness: 350, damping: 20 }}
              class="absolute inset-0 border-2 border-dashed border-neutral-700 rounded-lg pointer-events-none z-0"
              style={{ margin: '-4px -8px' }}
            />
          {/if}
        </AnimatePresence>
      {/if}
    </a>
  {/each}
</div>
`;

		default:
			return `<!-- No interaction component defined for this type. -->`;
	}
}

export const ThemeToggleCode = `<script lang="ts">
  import { motion } from 'motion-sv';
  import { Sun, Moon } from '@lucide/svelte';

  let theme = $state<'dark' | 'light'>('dark');

  function toggleTheme() {
    theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.classList.toggle('light');
  }
</script>

<button
  onclick={toggleTheme}
  class="relative p-2 rounded-full bg-neutral-800 text-neutral-200 hover:bg-neutral-700 transition-colors"
  title="Toggle theme"
>
  <motion.div
    initial={false}
    animate={{ rotate: theme === 'dark' ? 0 : 180 }}
    transition={{ duration: 0.3 }}
  >
    {#if theme === 'dark'}
      <Moon size={18} />
    {:else}
      <Sun size={18} />
    {/if}
  </motion.div>
</button>
`;

const DEFAULT_ASSETS_SNIPPET = `  const DEFAULT_ASSETS = [
    {
      src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
      title: 'Sunset Beach'
    },
    {
      src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80',
      title: 'Misty Mountains'
    },
    {
      src: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=600&q=80',
      title: 'Forest Trail'
    },
    {
      src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=600&q=80',
      title: 'Sunlight Woods'
    },
    {
      src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=600&q=80',
      title: 'Green Hills'
    }
  ];`;

const TIMELINE_DATA_SNIPPET = `  const TIMELINE_DATA = [
    {
      date: 'Today',
      src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
      title: 'Sunset Beach'
    },
    {
      date: '1d ago',
      src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80',
      title: 'Misty Mountains'
    },
    {
      date: '1w ago',
      src: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=600&q=80',
      title: 'Forest Trail'
    },
    {
      date: '1m ago',
      src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=600&q=80',
      title: 'Sunlight Woods'
    },
    {
      date: '1y ago',
      src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=600&q=80',
      title: 'Green Hills'
    }
  ];`;

function carouselSnippet(isMonochrome: boolean): string {
	const monoProp = isMonochrome ? `\n    isMonochrome?: boolean;` : '';
	const monoDefault = isMonochrome ? `,\n    isMonochrome = true` : '';
	const titleExpr = isMonochrome ? `{isMonochrome ? \`Card \${i + 1}\` : item.title}` : `{item.title}`;
	const tile = isMonochrome
		? `          {#if isMonochrome}
            <button
              onclick={(e) => toSlide(e, i)}
              class="w-[110px] h-[110px] rounded-xl bg-neutral-400 dark:bg-neutral-800 border border-neutral-200/20 shadow-lg flex items-center justify-center text-neutral-600 dark:text-neutral-400 font-bold text-sm cursor-pointer"
            >
              {i + 1}
            </button>
          {:else}
            <button onclick={(e) => toSlide(e, i)} class="p-0 border-0 bg-transparent cursor-pointer">
              <img
                src={item.src}
                alt={item.title}
                referrerpolicy="no-referrer"
                class="w-[110px] h-[110px] object-cover rounded-xl shadow-lg border border-white/10"
              />
            </button>
          {/if}`
		: `          <button onclick={(e) => toSlide(e, i)} class="p-0 border-0 bg-transparent cursor-pointer">
            <img
              src={item.src}
              alt={item.title}
              referrerpolicy="no-referrer"
              class="w-[110px] h-[110px] object-cover rounded-xl shadow-lg border border-white/10"
            />
          </button>`;

	return `<script lang="ts">
  import { motion } from 'motion-sv';
  import { ChevronLeft, ChevronRight } from '@lucide/svelte';

${DEFAULT_ASSETS_SNIPPET}

  interface Props {
    class?: string;
    images?: { src: string; title: string }[];${monoProp}
  }

  let {
    class: className = '',
    images = DEFAULT_ASSETS${monoDefault}
  }: Props = $props();

  let activeIndex = $state(2);
  let isHovered = $state(false);

  const slideWidth = 160;

  function toPrev(e: MouseEvent) {
    e.stopPropagation();
    activeIndex = Math.max(0, activeIndex - 1);
  }

  function toNext(e: MouseEvent) {
    e.stopPropagation();
    activeIndex = Math.min(images.length - 1, activeIndex + 1);
  }

  function toSlide(e: MouseEvent, index: number) {
    e.stopPropagation();
    activeIndex = index;
  }
</script>

<div
  onmouseenter={() => (isHovered = true)}
  onmouseleave={() => (isHovered = false)}
  class="w-full h-full flex flex-col items-center justify-center relative overflow-hidden select-none {className}"
  role="presentation"
>
  <div
    class="relative h-[180px] flex items-center justify-start overflow-visible"
    style="width: {slideWidth}px"
  >
    <motion.div
      class="flex w-fit items-center"
      animate={{ x: -activeIndex * slideWidth }}
      transition={{ type: 'spring', bounce: 0.1, duration: 0.8 }}
    >
      {#each images as item, i (i)}
        {@const isActive = activeIndex === i}
        {@const diff = i - activeIndex}
        {@const targetRotate = isHovered ? diff * 20 : diff * 5}
        {@const targetScale = isActive ? 1.05 : isHovered ? 0.65 : 0.8}
        {@const targetY = isHovered ? diff * 24 : 0}
        <motion.div
          class="shrink-0 flex flex-col items-center gap-1.5 will-change-[transform,scale]"
          style={{ width: \`\${slideWidth}px\` }}
          animate={{ rotate: targetRotate, scale: targetScale, y: targetY }}
          transition={{ type: 'spring', bounce: 0.2, duration: 0.8 }}
        >
          <div
            class="text-[10px] md:text-xs font-semibold whitespace-nowrap transition-all duration-300 {isActive
              ? 'opacity-100 scale-100 text-white'
              : 'opacity-0 scale-75 text-neutral-400'}"
          >
            ${titleExpr}
          </div>

${tile}
        </motion.div>
      {/each}
    </motion.div>
  </div>

  <div
    class="mt-4 px-1.5 py-0.5 flex items-center gap-2 justify-center text-neutral-400 rounded-full bg-neutral-900/60 backdrop-blur-md border border-white/5 shadow-md z-20"
  >
    <button
      onclick={toPrev}
      aria-label="Previous"
      class="p-1 cursor-pointer hover:bg-white/5 rounded-full transition-colors border-0 bg-transparent text-neutral-400 hover:text-white"
    >
      <ChevronLeft class="w-3.5 h-3.5" />
    </button>
    <div class="flex justify-center items-center gap-1">
      {#each images as _, i (i)}
        <button
          onclick={(e) => toSlide(e, i)}
          aria-label="Slide {i + 1}"
          class="rounded-full cursor-pointer h-1 border-0 p-0 transition-all duration-300 {activeIndex === i
            ? 'w-4 bg-white'
            : 'w-1 bg-white/30 hover:bg-white/50'}"
        ></button>
      {/each}
    </div>
    <button
      onclick={toNext}
      aria-label="Next"
      class="p-1 cursor-pointer hover:bg-white/5 rounded-full transition-colors border-0 bg-transparent text-neutral-400 hover:text-white"
    >
      <ChevronRight class="w-3.5 h-3.5" />
    </button>
  </div>
</div>
`;
}

function coverFlowSnippet(isMonochrome: boolean): string {
	const monoProp = isMonochrome ? `\n    isMonochrome?: boolean;` : '';
	const monoDefault = isMonochrome ? `,\n    isMonochrome = true` : '';
	const titleExpr = isMonochrome ? `{isMonochrome ? \`Card \${i + 1}\` : item.title}` : `{item.title}`;
	const tile = isMonochrome
		? `        {#if isMonochrome}
          <div
            class="w-full h-full rounded-xl bg-neutral-400 dark:bg-neutral-800 border border-neutral-200/20 shadow-2xl flex items-center justify-center text-neutral-600 dark:text-neutral-400 font-bold text-sm"
          >
            {i + 1}
          </div>
        {:else}
          <img
            src={item.src}
            alt={item.title}
            referrerpolicy="no-referrer"
            class="w-full h-full object-cover rounded-xl shadow-2xl border border-white/10"
          />
        {/if}`
		: `        <img
          src={item.src}
          alt={item.title}
          referrerpolicy="no-referrer"
          class="w-full h-full object-cover rounded-xl shadow-2xl border border-white/10"
        />`;

	return `<script lang="ts">
  import { motion } from 'motion-sv';
  import { ChevronLeft, ChevronRight } from '@lucide/svelte';

${DEFAULT_ASSETS_SNIPPET}

  interface Props {
    class?: string;
    images?: { src: string; title: string }[];${monoProp}
  }

  let {
    class: className = '',
    images = DEFAULT_ASSETS${monoDefault}
  }: Props = $props();

  let activeIndex = $state(2);

  function toPrev(e: MouseEvent) {
    e.stopPropagation();
    activeIndex = Math.max(0, activeIndex - 1);
  }

  function toNext(e: MouseEvent) {
    e.stopPropagation();
    activeIndex = Math.min(images.length - 1, activeIndex + 1);
  }

  function toSlide(e: MouseEvent, index: number) {
    e.stopPropagation();
    activeIndex = index;
  }
</script>

<div
  class="w-full h-full flex flex-col items-center justify-center relative overflow-hidden select-none bg-zinc-950/40 rounded-2xl {className}"
  style="perspective: 1000px"
>
  <div class="w-full flex justify-center items-center relative h-[140px] [transform-style:preserve-3d]">
    {#each images as item, i (i)}
      {@const isActive = activeIndex === i}
      {@const offset = i - activeIndex}
      {@const absOffset = Math.abs(offset)}
      {@const isPast = i < activeIndex}
      <motion.div
        class="absolute w-[80px] aspect-[3/4] cursor-pointer"
        initial={false}
        animate={{
          x: offset * 32,
          rotateY: isActive ? 0 : isPast ? 38 : -38,
          z: isActive ? 50 : -absOffset * 50,
          scale: isActive ? 1.1 : 1 - absOffset * 0.08,
          opacity: absOffset > 2 ? 0 : 1 - absOffset * 0.25
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        style={{ zIndex: 100 - absOffset }}
        onclick={(e) => toSlide(e, i)}
      >
${tile}
        <motion.div
          class="absolute -bottom-6 left-[-20px] right-[-20px] text-center text-[10px] font-semibold text-white/80 whitespace-nowrap overflow-hidden text-ellipsis"
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : -5 }}
        >
          ${titleExpr}
        </motion.div>
      </motion.div>
    {/each}
  </div>

  <div
    class="mt-6 w-fit px-1.5 py-0.5 flex items-center gap-2 justify-center text-zinc-300 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-sm z-20"
  >
    <button
      onclick={toPrev}
      aria-label="Previous"
      class="p-1 cursor-pointer hover:bg-white/10 rounded-full transition-colors border-0 bg-transparent text-neutral-300 hover:text-white"
    >
      <ChevronLeft class="w-3.5 h-3.5" />
    </button>
    <div class="flex justify-center items-center gap-1">
      {#each images as _, i (i)}
        <button
          onclick={(e) => toSlide(e, i)}
          aria-label="Slide {i + 1}"
          class="rounded-full cursor-pointer h-1 border-0 p-0 transition-all duration-300 {activeIndex === i
            ? 'w-4 bg-white'
            : 'w-1 bg-white/30 hover:bg-white/50'}"
        ></button>
      {/each}
    </div>
    <button
      onclick={toNext}
      aria-label="Next"
      class="p-1 cursor-pointer hover:bg-white/10 rounded-full transition-colors border-0 bg-transparent text-neutral-300 hover:text-white"
    >
      <ChevronRight class="w-3.5 h-3.5" />
    </button>
  </div>
</div>
`;
}

function timeMachineSnippet(isMonochrome: boolean): string {
	const monoProp = isMonochrome ? `\n    isMonochrome?: boolean;` : '';
	const monoDefault = isMonochrome ? `,\n    isMonochrome = true` : '';
	const tile = isMonochrome
		? `        {#if isMonochrome}
          <div
            class="w-full h-full rounded-2xl bg-neutral-400 dark:bg-neutral-800 border border-neutral-200/20 shadow-lg flex items-center justify-center text-neutral-600 dark:text-neutral-400 font-bold text-sm"
          >
            {i + 1}
          </div>
        {:else}
          <img
            src={item.src}
            alt={item.title}
            referrerpolicy="no-referrer"
            class="w-full h-full object-cover"
          />
        {/if}`
		: `        <img
          src={item.src}
          alt={item.title}
          referrerpolicy="no-referrer"
          class="w-full h-full object-cover"
        />`;

	return `<script lang="ts">
  import { motion, AnimatePresence } from 'motion-sv';

${TIMELINE_DATA_SNIPPET}

  interface Props {
    class?: string;${monoProp}
  }

  let {
    class: className = ''${monoDefault}
  }: Props = $props();

  const instanceId = $props.id();
  const filterId = \`SkiperSquiCircleFilterLayout-\${instanceId}\`;

  let activeIndex = $state(0);
  let hoveredIndex = $state<number | null>(null);

  function handleTimelineHover(index: number) {
    hoveredIndex = index;
    activeIndex = Math.round(index);
  }

  type TimelineNode =
    | { type: 'main'; index: number; date: string }
    | { type: 'sub'; index: number };

  const timelineNodes = $derived.by((): TimelineNode[] => {
    const nodes: TimelineNode[] = [];
    TIMELINE_DATA.forEach((item, i) => {
      nodes.push({ type: 'main', index: i, date: item.date });
      if (i < TIMELINE_DATA.length - 1) {
        for (let j = 0; j < 2; j++) {
          nodes.push({ type: 'sub', index: i + (j + 1) * 0.33 });
        }
      }
    });
    return nodes;
  });
</script>

<div
  class="w-full h-full bg-[#09090b]/80 flex flex-row items-center justify-center gap-6 relative overflow-hidden rounded-2xl border border-white/5 p-4 {className}"
>
  <svg xmlns="http://www.w3.org/2000/svg" class="absolute w-0 h-0" version="1.1">
    <defs>
      <filter id={filterId}>
        <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
        <feColorMatrix
          in="blur"
          mode="matrix"
          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -6"
          result="goo"
        />
        <feBlend in="SourceGraphic" in2="goo" />
      </filter>
    </defs>
  </svg>

  <div
    class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03),transparent_70%)] pointer-events-none"
  ></div>

  <div
    class="relative flex-1 max-w-[290px] aspect-[4/3] flex items-center justify-center"
    style="perspective: 800px"
  >
    {#each TIMELINE_DATA as item, i (i)}
      {@const offset = i - activeIndex}
      {@const isPast = i < activeIndex}
      <motion.div
        class="absolute rounded-2xl flex h-[135px] w-[220px] origin-center flex-col overflow-hidden pointer-events-none"
        initial={false}
        animate={{
          z: isPast ? 200 : -offset * 60,
          y: isPast ? 300 : -offset * 12,
          rotateX: isPast ? -20 : offset * 2,
          opacity: isPast ? 0 : 1 - Math.abs(offset) * 0.2,
          scale: isPast ? 1.3 : 1
        }}
        transition={{ type: 'spring', stiffness: 250, damping: 25, mass: 0.8 }}
        style={{ zIndex: TIMELINE_DATA.length - i, filter: \`url(#\${filterId})\` }}
      >
${tile}
        <div class="absolute inset-0 bg-black/10 pointer-events-none"></div>
      </motion.div>
    {/each}
  </div>

  <div
    class="relative flex flex-col items-end z-50 py-2 px-1"
    onmouseleave={() => (hoveredIndex = null)}
    role="presentation"
  >
    {#each timelineNodes as node, i (node.type === 'main' ? \`main-\${node.index}\` : \`sub-\${node.index}-\${i}\`)}
      {#if node.type === 'main'}
        {@const index = node.index}
        {@const isSelected = activeIndex === index}
        <button
          class="relative inline-flex items-center justify-end py-[1px] w-20 group cursor-pointer border-0 bg-transparent"
          onmouseenter={() => handleTimelineHover(index)}
          onclick={(e) => {
            e.stopPropagation();
            activeIndex = index;
          }}
        >
          <AnimatePresence>
            {#if hoveredIndex === index}
              <motion.span
                class="absolute top-0 right-10 text-[10px] font-semibold whitespace-nowrap {isSelected
                  ? 'text-blue-500'
                  : 'text-white/90'}"
                initial={{ opacity: 0, filter: 'blur(2px)', scale: 0.8 }}
                animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
                exit={{ opacity: 0, filter: 'blur(2px)', scale: 0.8 }}
                transition={{ duration: 0.15 }}
              >
                {node.date}
              </motion.span>
            {/if}
          </AnimatePresence>
          <motion.div
            class="h-[3px] w-[24px] rounded-full origin-right transition-colors {isSelected
              ? 'bg-blue-500'
              : 'bg-white/50 group-hover:bg-white/80'}"
            animate={{
              scaleX:
                hoveredIndex === null
                  ? 1
                  : isSelected
                    ? 1.4
                    : Math.abs(index - hoveredIndex) < 0.5
                      ? 1.25
                      : 1
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          />
        </button>
      {:else}
        {@const isHoveringNear =
          hoveredIndex !== null && Math.abs(node.index - hoveredIndex) <= 0.5}
        <div
          class="py-[1px] w-20 flex justify-end cursor-pointer"
          onmouseenter={() => handleTimelineHover(node.index)}
          onclick={(e) => {
            e.stopPropagation();
            activeIndex = Math.round(node.index);
          }}
          onkeydown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.stopPropagation();
              activeIndex = Math.round(node.index);
            }
          }}
          role="button"
          tabindex="0"
        >
          <motion.div
            class="h-[3px] w-[24px] rounded-full bg-white/20 origin-right"
            animate={{
              scaleX: hoveredIndex === null ? 1 : isHoveringNear ? 1.15 : 1,
              opacity: hoveredIndex === null ? 0.3 : isHoveringNear ? 0.5 : 0.3
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          />
        </div>
      {/if}
    {/each}
  </div>
</div>
`;
}

export function getCardComponentCode(card: CardConfig): string {
	switch (card.interactionType) {
		case 'card-arc-5':
			return `<script lang="ts">
  import { motion } from 'motion-sv';

  interface Props {
    angle?: number;
    gap?: number;
    yOffset?: number;
    duration?: number;
    hoverIntensity?: number;
    cardClassName?: string;
    class?: string;
  }

  let {
    angle = 30,
    gap = 70,
    yOffset = 10,
    duration = 0.5,
    hoverIntensity = 1,
    cardClassName = 'bg-neutral-800',
    class: className = ''
  }: Props = $props();

  let isHovered = $state(false);
  const cards = [0, 1, 2, 3, 4];
  const center = 2;
</script>

<div
  onmouseenter={() => (isHovered = true)}
  onmouseleave={() => (isHovered = false)}
  class="relative w-[8rem] h-[11rem] cursor-pointer flex items-center justify-center {className}"
  role="presentation"
>
  {#each cards as i (i)}
    {@const dist = i - center}
    {@const targetRotate = isHovered ? dist * (angle / center) * hoverIntensity : 0}
    {@const targetX = isHovered ? dist * (gap / center) * hoverIntensity : 0}
    {@const targetY = (() => {
      if (!isHovered) return 0;
      let y = 0;
      if (Math.abs(dist) === 2) y = yOffset;
      else if (Math.abs(dist) === 1) y = -0.2 * yOffset;
      else y = -yOffset;
      return y * hoverIntensity;
    })()}
    <motion.div
      animate={{
        rotate: targetRotate,
        x: targetX,
        y: targetY,
        scale: isHovered ? (dist === 0 ? 1.05 : 1) : 1
      }}
      transition={{ type: 'spring', stiffness: 180, damping: 20, mass: 0.8, duration }}
      style={{ zIndex: 3 - Math.abs(dist), originX: 0.5, originY: 1 }}
      class="absolute inset-0 rounded-2xl shadow-[0_4px_10px_-2px_rgba(0,0,0,0.15)] border border-white/5 {cardClassName}"
    />
  {/each}
</div>
`;

		case 'card-arc-7':
			return `<script lang="ts">
  import { motion } from 'motion-sv';

  interface Props {
    angle?: number;
    gap?: number;
    yOffset?: number;
    duration?: number;
    hoverIntensity?: number;
    cardClassName?: string;
    class?: string;
  }

  let {
    angle = 45,
    gap = 110,
    yOffset = 30,
    duration = 0.5,
    hoverIntensity = 1,
    cardClassName = 'bg-neutral-800',
    class: className = ''
  }: Props = $props();

  let isHovered = $state(false);
  const cards = [0, 1, 2, 3, 4, 5, 6];
  const center = 3;
</script>

<div
  onmouseenter={() => (isHovered = true)}
  onmouseleave={() => (isHovered = false)}
  class="relative w-[8rem] h-[11rem] cursor-pointer flex items-center justify-center {className}"
  role="presentation"
>
  {#each cards as i (i)}
    {@const dist = i - center}
    {@const targetRotate = isHovered ? dist * (angle / center) * hoverIntensity : 0}
    {@const targetX = isHovered ? dist * (gap / center) * hoverIntensity : 0}
    {@const targetY = (() => {
      if (!isHovered) return 0;
      let y = 0;
      if (Math.abs(dist) === 3) y = yOffset;
      else if (Math.abs(dist) === 2) y = 0.33 * yOffset;
      else if (Math.abs(dist) === 1) y = -0.17 * yOffset;
      else y = -0.5 * yOffset;
      return y * hoverIntensity;
    })()}
    <motion.div
      animate={{
        rotate: targetRotate,
        x: targetX,
        y: targetY,
        scale: isHovered ? (dist === 0 ? 1.05 : 1) : 1
      }}
      transition={{ type: 'spring', stiffness: 180, damping: 20, mass: 0.8, duration }}
      style={{ zIndex: 4 - Math.abs(dist), originX: 0.5, originY: 1 }}
      class="absolute inset-0 rounded-2xl shadow-[0_4px_10px_-2px_rgba(0,0,0,0.15)] border border-white/5 {cardClassName}"
    />
  {/each}
</div>
`;

		case 'card-long-arc-5':
			return `<script lang="ts">
  import { motion } from 'motion-sv';

  interface Props {
    angle?: number;
    gap?: number;
    yOffset?: number;
    duration?: number;
    hoverIntensity?: number;
    cardClassName?: string;
    class?: string;
  }

  let {
    angle = 15,
    gap = 140,
    yOffset = 20,
    duration = 0.5,
    hoverIntensity = 1,
    cardClassName = 'bg-neutral-800',
    class: className = ''
  }: Props = $props();

  let isHovered = $state(false);
  const cards = [0, 1, 2, 3, 4];
  const center = 2;
</script>

<div
  onmouseenter={() => (isHovered = true)}
  onmouseleave={() => (isHovered = false)}
  class="relative w-[8rem] h-[11rem] cursor-pointer flex items-center justify-center {className}"
  role="presentation"
>
  {#each cards as i (i)}
    {@const dist = i - center}
    {@const targetRotate = isHovered ? dist * (angle / center) * hoverIntensity : 0}
    {@const targetX = isHovered ? dist * (gap / center) * hoverIntensity : 0}
    {@const targetY = (() => {
      if (!isHovered) return 0;
      let y = 0;
      if (Math.abs(dist) === 2) y = yOffset;
      else if (Math.abs(dist) === 1) y = 0.25 * yOffset;
      else y = -0.25 * yOffset;
      return y * hoverIntensity;
    })()}
    <motion.div
      animate={{
        rotate: targetRotate,
        x: targetX,
        y: targetY,
        scale: isHovered ? (dist === 0 ? 1.05 : 1) : 1
      }}
      transition={{ type: 'spring', stiffness: 180, damping: 20, mass: 0.8, duration }}
      style={{ zIndex: 3 - Math.abs(dist), originX: 0.5, originY: 1 }}
      class="absolute inset-0 rounded-2xl shadow-[0_4px_10px_-2px_rgba(0,0,0,0.15)] border border-white/5 {cardClassName}"
    />
  {/each}
</div>
`;

		case 'card-linear-spread':
			return `<script lang="ts">
  import { motion } from 'motion-sv';

  interface Props {
    gap?: number;
    duration?: number;
    hoverIntensity?: number;
    cardClassName?: string;
    class?: string;
  }

  let {
    gap = 90,
    duration = 0.5,
    hoverIntensity = 1,
    cardClassName = 'bg-neutral-800',
    class: className = ''
  }: Props = $props();

  let isHovered = $state(false);
  const cards = [0, 1, 2, 3, 4];
  const center = 2;
</script>

<div
  onmouseenter={() => (isHovered = true)}
  onmouseleave={() => (isHovered = false)}
  class="relative w-[8rem] h-[11rem] cursor-pointer flex items-center justify-center {className}"
  role="presentation"
>
  {#each cards as i (i)}
    {@const dist = i - center}
    {@const targetX = isHovered ? dist * (gap / center) * hoverIntensity : 0}
    <motion.div
      animate={{
        x: targetX,
        scale: isHovered ? (dist === 0 ? 1.05 : 1) : 1
      }}
      transition={{ type: 'spring', stiffness: 180, damping: 20, mass: 0.8, duration }}
      style={{ zIndex: 3 - Math.abs(dist) }}
      class="absolute inset-0 rounded-2xl shadow-[0_4px_10px_-2px_rgba(0,0,0,0.15)] border border-white/5 {cardClassName}"
    />
  {/each}
</div>
`;

		case 'card-corner-fan':
			return `<script lang="ts">
  import { motion } from 'motion-sv';

  interface Props {
    angle?: number;
    duration?: number;
    hoverIntensity?: number;
    cardClassName?: string;
    class?: string;
  }

  let {
    angle = 40,
    duration = 0.5,
    hoverIntensity = 1,
    cardClassName = 'bg-neutral-800',
    class: className = ''
  }: Props = $props();

  let isHovered = $state(false);
  const cards = [0, 1, 2, 3, 4];
  const total = cards.length;
</script>

<div
  onmouseenter={() => (isHovered = true)}
  onmouseleave={() => (isHovered = false)}
  class="relative w-[8rem] h-[11rem] cursor-pointer flex items-center justify-center {className}"
  role="presentation"
>
  {#each cards as i (i)}
    {@const offsetRatio = i / (total - 1)}
    {@const startAngle = -10}
    {@const targetRotate = isHovered ? (startAngle + offsetRatio * angle) * hoverIntensity : 0}
    <motion.div
      animate={{
        rotate: targetRotate,
        scale: isHovered && i === 2 ? 1.03 : 1
      }}
      transition={{ type: 'spring', stiffness: 180, damping: 20, mass: 0.8, duration }}
      style={{ zIndex: 5 - i, originX: 0, originY: 1 }}
      class="absolute inset-0 rounded-2xl shadow-[0_4px_10px_-2px_rgba(0,0,0,0.15)] border border-white/5 {cardClassName}"
    />
  {/each}
</div>
`;

		case 'card-stamp-arc':
			return `<script lang="ts">
  import { motion } from 'motion-sv';

  interface Props {
    arc?: number;
    spread?: number;
    yOffset?: number;
    isColorful?: boolean;
    duration?: number;
    hoverIntensity?: number;
    class?: string;
  }

  let {
    arc = 25,
    spread = 180,
    yOffset = 40,
    isColorful = false,
    duration = 0.5,
    hoverIntensity = 1,
    class: className = ''
  }: Props = $props();

  let isHovered = $state(false);

  const stamps = [
    { id: 0, color: 'bg-red-500' },
    { id: 1, color: 'bg-blue-500' },
    { id: 2, color: 'bg-emerald-500' },
    { id: 3, color: 'bg-amber-500' },
    { id: 4, color: 'bg-purple-500' }
  ];

  function stampTransform(i: number) {
    if (!isHovered) return { rotate: 0, x: 0, y: 0 };
    let rotate = 0;
    let x = 0;
    let y = 0;
    if (i === 0) {
      rotate = -1 * arc;
      x = -1 * spread;
      y = yOffset;
    } else if (i === 1) {
      rotate = -0.48 * arc;
      x = -0.5 * spread;
      y = 0.25 * yOffset;
    } else if (i === 2) {
      rotate = 0;
      x = 0;
      y = -0.25 * yOffset;
    } else if (i === 3) {
      rotate = 0.48 * arc;
      x = 0.5 * spread;
      y = 0.25 * yOffset;
    } else {
      rotate = arc;
      x = spread;
      y = yOffset;
    }
    return { rotate: rotate * hoverIntensity, x: x * hoverIntensity, y: y * hoverIntensity };
  }
</script>

<div
  onmouseenter={() => (isHovered = true)}
  onmouseleave={() => (isHovered = false)}
  class="relative w-[8rem] h-[11rem] cursor-pointer flex items-center justify-center {className}"
  role="presentation"
>
  {#each stamps as stamp, i (stamp.id)}
    {@const dist = i - 2}
    {@const t = stampTransform(i)}
    <motion.div
      animate={{
        rotate: t.rotate,
        x: t.x,
        y: t.y,
        scale: isHovered ? (dist === 0 ? 1.05 : 1) : 1
      }}
      transition={{ type: 'spring', stiffness: 180, damping: 20, mass: 0.8, duration }}
      style={{ zIndex: 3 - Math.abs(dist), originX: 0.5, originY: 1 }}
      class="absolute inset-0 rounded-2xl shadow-[0_4px_10px_-2px_rgba(0,0,0,0.15)] border-2 border-dashed border-white/40 {isColorful
        ? stamp.color
        : 'bg-neutral-800'}"
    />
  {/each}
</div>
`;

		case 'card-cascade-stagger':
			return `<script lang="ts">
  import { motion } from 'motion-sv';

  interface Props {
    class?: string;
    cardClassName?: string;
  }

  let { class: className = '', cardClassName = 'bg-neutral-800' }: Props = $props();

  let isHovered = $state(false);
  const cards = [0, 1, 2, 3, 4];
  const center = 2;
</script>

<div
  onmouseenter={() => (isHovered = true)}
  onmouseleave={() => (isHovered = false)}
  class="relative w-[8rem] h-[11rem] cursor-pointer flex items-center justify-center {className}"
  role="presentation"
>
  {#each cards as i (i)}
    {@const dist = i - center}
    {@const targetY = isHovered ? dist * -28 - 14 : dist * 2}
    {@const targetX = isHovered ? dist * 14 : 0}
    {@const targetRotate = isHovered ? dist * 6 : 0}
    <motion.div
      animate={{
        y: targetY,
        x: targetX,
        rotate: targetRotate,
        scale: isHovered ? (dist === 0 ? 1.05 : 0.98) : 1
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 22, mass: 0.9 }}
      style={{ zIndex: 5 - Math.abs(dist) }}
      class="absolute inset-0 rounded-2xl shadow-[0_4px_12px_-2px_rgba(0,0,0,0.15)] border border-white/5 {cardClassName}"
    />
  {/each}
</div>
`;

		case 'card-scatter-spread':
			return `<script lang="ts">
  import { motion } from 'motion-sv';

  interface Props {
    class?: string;
    cardClassName?: string;
  }

  let { class: className = '', cardClassName = 'bg-neutral-850' }: Props = $props();

  let isHovered = $state(false);
  const cards = [0, 1, 2, 3, 4];

  const offsets = [
    { x: -75, y: 15, rotate: -14 },
    { x: -35, y: -15, rotate: -6 },
    { x: 0, y: -30, rotate: 2 },
    { x: 35, y: -10, rotate: 8 },
    { x: 75, y: 20, rotate: 15 }
  ];
</script>

<div
  onmouseenter={() => (isHovered = true)}
  onmouseleave={() => (isHovered = false)}
  class="relative w-[8rem] h-[11rem] cursor-pointer flex items-center justify-center {className}"
  role="presentation"
>
  {#each cards as i (i)}
    {@const targetX = isHovered ? offsets[i].x : 0}
    {@const targetY = isHovered ? offsets[i].y : 0}
    {@const targetRotate = isHovered ? offsets[i].rotate : 0}
    <motion.div
      animate={{
        x: targetX,
        y: targetY,
        rotate: targetRotate,
        scale: isHovered ? (i === 2 ? 1.05 : 0.98) : 1
      }}
      transition={{ type: 'spring', stiffness: 180, damping: 20, mass: 0.8 }}
      style={{ zIndex: 5 - Math.abs(i - 2) }}
      class="absolute inset-0 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-white/5 {cardClassName}"
    />
  {/each}
</div>
`;

		case 'card-wheel-fan':
			return `<script lang="ts">
  import { motion } from 'motion-sv';

  interface Props {
    class?: string;
    cardClassName?: string;
  }

  let { class: className = '', cardClassName = 'bg-neutral-800' }: Props = $props();

  let isHovered = $state(false);
  const cards = [0, 1, 2, 3, 4];
  const center = 2;
</script>

<div
  onmouseenter={() => (isHovered = true)}
  onmouseleave={() => (isHovered = false)}
  class="relative w-[8rem] h-[11rem] cursor-pointer flex items-center justify-center {className}"
  role="presentation"
>
  {#each cards as i (i)}
    {@const dist = i - center}
    {@const targetRotate = isHovered ? dist * 18 : 0}
    {@const targetY = (() => {
      if (!isHovered) return 0;
      if (Math.abs(dist) === 2) return -8;
      if (Math.abs(dist) === 1) return -22;
      return -28;
    })()}
    <motion.div
      animate={{
        rotate: targetRotate,
        y: targetY,
        scale: isHovered ? (dist === 0 ? 1.05 : 0.98) : 1
      }}
      transition={{ type: 'spring', stiffness: 180, damping: 20, mass: 0.8 }}
      style={{ zIndex: 5 - Math.abs(dist), originX: 0.5, originY: 1.1 }}
      class="absolute inset-0 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-white/5 {cardClassName}"
    />
  {/each}
</div>
`;

		case 'card-carousel':
			return carouselSnippet(false);

		case 'card-cover-flow':
			return coverFlowSnippet(false);

		case 'card-time-machine':
			return timeMachineSnippet(false);

		case 'card-carousel-mono':
			return carouselSnippet(true);

		case 'card-cover-flow-mono':
			return coverFlowSnippet(true);

		case 'card-time-machine-mono':
			return timeMachineSnippet(true);

		default:
			return `<!-- No card interaction defined. -->`;
	}
}
