<script lang="ts">
  import { motion, AnimatePresence } from 'motion-sv';

  const TIMELINE_DATA = [
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
  ];

  export interface Props {
    hovered?: boolean;
    class?: string;
    isMonochrome?: boolean;
  }

  let {
    hovered,
    class: className = '',
    isMonochrome = false
  }: Props = $props();

  const instanceId = $props.id();
  const filterId = `SkiperSquiCircleFilterLayout-${instanceId}`;

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
        style={{ zIndex: TIMELINE_DATA.length - i, filter: `url(#${filterId})` }}
      >
        {#if isMonochrome}
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
        {/if}
        <div class="absolute inset-0 bg-black/10 pointer-events-none"></div>
      </motion.div>
    {/each}
  </div>

  <div
    class="relative flex flex-col items-end z-50 py-2 px-1"
    onmouseleave={() => (hoveredIndex = null)}
    role="presentation"
  >
    {#each timelineNodes as node, i (node.type === 'main' ? `main-${node.index}` : `sub-${node.index}-${i}`)}
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
                    : Math.abs(index - (hoveredIndex ?? 0)) < 0.5
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
          role="button"
          tabindex="0"
          onkeydown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.stopPropagation();
              activeIndex = Math.round(node.index);
            }
          }}
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
