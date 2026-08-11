<script lang="ts">
  import { motion } from 'motion-sv';
  import { ChevronLeft, ChevronRight } from '@lucide/svelte';

  const DEFAULT_ASSETS = [
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
      title: 'Sunlight in Woods'
    },
    {
      src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=600&q=80',
      title: 'Green Hills'
    }
  ];

  export interface Props {
    hovered?: boolean;
    class?: string;
    images?: { src: string; title: string }[];
    isMonochrome?: boolean;
  }

  let {
    hovered,
    class: className = '',
    images = DEFAULT_ASSETS,
    isMonochrome = false
  }: Props = $props();

  let activeIndex = $state(2);
  let isHovered = $state(false);
  const active = $derived(hovered !== undefined ? hovered : isHovered);

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
        {@const targetRotate = active ? diff * 20 : diff * 5}
        {@const targetScale = isActive ? 1.05 : (active ? 0.65 : 0.8)}
        {@const targetY = active ? diff * 24 : 0}
        <motion.div
          class="shrink-0 flex flex-col items-center gap-1.5 will-change-[transform,scale]"
          style={{ width: `${slideWidth}px` }}
          animate={{ rotate: targetRotate, scale: targetScale, y: targetY }}
          transition={{ type: 'spring', bounce: 0.2, duration: 0.8 }}
        >
          <div
            class="text-[10px] md:text-xs font-semibold whitespace-nowrap transition-all duration-300 {isActive
              ? 'opacity-100 scale-100 text-white'
              : 'opacity-0 scale-75 text-neutral-400'}"
          >
            {isMonochrome ? `Card ${i + 1}` : item.title}
          </div>

          {#if isMonochrome}
            <button
              onclick={(e) => toSlide(e, i)}
              class="w-[110px] h-[110px] rounded-xl bg-neutral-400 dark:bg-neutral-800 border border-neutral-200/20 shadow-lg flex items-center justify-center text-neutral-600 dark:text-neutral-400 font-bold text-sm cursor-pointer border-0"
            >
              {i + 1}
            </button>
          {:else}
            <button
              onclick={(e) => toSlide(e, i)}
              class="p-0 border-0 bg-transparent cursor-pointer"
            >
              <img
                src={item.src}
                alt={item.title}
                referrerpolicy="no-referrer"
                class="w-[110px] h-[110px] object-cover rounded-xl shadow-lg border border-white/10"
              />
            </button>
          {/if}
        </motion.div>
      {/each}
    </motion.div>
  </div>

  <div
    class="mt-4 px-1.5 py-0.5 flex items-center gap-2 justify-center text-neutral-400 rounded-full bg-neutral-900/60 backdrop-blur-md border border-white/5 shadow-md z-20"
  >
    <button
      onclick={toPrev}
      class="p-1 cursor-pointer hover:bg-white/5 rounded-full transition-colors border-0 bg-transparent text-neutral-400 hover:text-white"
    >
      <ChevronLeft class="w-3.5 h-3.5" />
    </button>
    <div class="flex justify-center items-center gap-1">
      {#each images as _, i (i)}
        <button
          onclick={(e) => toSlide(e, i)}
          aria-label="Folie {i + 1}"
          class="rounded-full cursor-pointer h-1 border-0 p-0 transition-all duration-300 {activeIndex === i
            ? 'w-4 bg-white'
            : 'w-1 bg-white/30 hover:bg-white/50'}"
        ></button>
      {/each}
    </div>
    <button
      onclick={toNext}
      class="p-1 cursor-pointer hover:bg-white/5 rounded-full transition-colors border-0 bg-transparent text-neutral-400 hover:text-white"
    >
      <ChevronRight class="w-3.5 h-3.5" />
    </button>
  </div>
</div>
