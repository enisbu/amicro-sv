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
          rotateY: isActive ? 0 : (isPast ? 38 : -38),
          z: isActive ? 50 : -absOffset * 50,
          scale: isActive ? 1.1 : 1 - absOffset * 0.08,
          opacity: absOffset > 2 ? 0 : 1 - absOffset * 0.25
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        style={{ zIndex: 100 - absOffset }}
        onclick={(e) => toSlide(e, i)}
      >
        {#if isMonochrome}
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
        {/if}
        <motion.div
          class="absolute -bottom-6 left-[-20px] right-[-20px] text-center text-[10px] font-semibold text-white/80 whitespace-nowrap overflow-hidden text-ellipsis"
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : -5 }}
        >
          {isMonochrome ? `Card ${i + 1}` : item.title}
        </motion.div>
      </motion.div>
    {/each}
  </div>

  <div
    class="mt-6 w-fit px-1.5 py-0.5 flex items-center gap-2 justify-center text-zinc-300 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-sm z-20"
  >
    <button
      onclick={toPrev}
      class="p-1 cursor-pointer hover:bg-white/10 rounded-full transition-colors border-0 bg-transparent text-neutral-300 hover:text-white"
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
      class="p-1 cursor-pointer hover:bg-white/10 rounded-full transition-colors border-0 bg-transparent text-neutral-300 hover:text-white"
    >
      <ChevronRight class="w-3.5 h-3.5" />
    </button>
  </div>
</div>
