<script lang="ts">
  import { motion, AnimatePresence } from 'motion-sv';

  export interface FocusBlurItem {
    label: string;
    href?: string;
  }

  export interface Props {
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

<div
  class="flex flex-wrap justify-center items-center gap-6 py-6 px-10 cursor-default {className}"
>
  {#each items as item, index (index)}
    {@const isHovered = hoveredIndex === index}
    {@const isAnyHovered = hoveredIndex !== null}
    {@const isInactive = isAnyHovered && !isHovered}
    <a
      href={item.href ?? '#'}
      onmouseenter={() => (hoveredIndex = index)}
      onmouseleave={() => (hoveredIndex = null)}
      class="relative font-semibold text-lg sm:text-2xl no-underline transition-all duration-300 select-none outline-none"
      style="filter: {isInactive
        ? `blur(${blurAmount}px)`
        : 'none'}; opacity: {isInactive
        ? opacityAmount
        : 1}; color: {isHovered ? 'var(--color-blue-500, #3b82f6)' : 'inherit'}"
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
              class="absolute inset-0 border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-lg pointer-events-none z-0"
              style={{ margin: '-4px -8px' }}
            />
          {/if}
        </AnimatePresence>
      {/if}
    </a>
  {/each}
</div>
