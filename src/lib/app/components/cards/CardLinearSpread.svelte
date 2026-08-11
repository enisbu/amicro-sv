<script lang="ts">
  import { motion } from 'motion-sv';

  export interface Props {
    gap?: number;
    duration?: number;
    hoverIntensity?: number;
    cardClassName?: string;
    class?: string;
    hovered?: boolean;
    images?: string[];
  }

  let {
    gap = 90,
    duration = 0.5,
    hoverIntensity = 1,
    cardClassName = 'bg-neutral-400 dark:bg-neutral-800',
    class: className = '',
    hovered,
    images
  }: Props = $props();

  let isHovered = $state(false);
  const active = $derived(hovered !== undefined ? hovered : isHovered);

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
    {@const targetX = active ? dist * (gap / center) * hoverIntensity : 0}
    <motion.div
      animate={{
        x: targetX,
        scale: active ? (dist === 0 ? 1.05 : 1) : 1
      }}
      transition={{
        type: 'spring',
        stiffness: 180,
        damping: 20,
        mass: 0.8,
        duration
      }}
      style={{
        zIndex: 3 - Math.abs(dist),
        backgroundImage: images ? `url(${images[i % images.length]})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
      class="absolute inset-0 rounded-2xl shadow-[0_4px_10px_-2px_rgba(0,0,0,0.15),0_2px_6px_-2px_rgba(0,0,0,0.1)] border border-neutral-200/20 {cardClassName}"
    />
  {/each}
</div>
