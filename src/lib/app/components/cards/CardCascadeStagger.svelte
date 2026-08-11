<script lang="ts">
  import { motion } from 'motion-sv';

  export interface Props {
    class?: string;
    cardClassName?: string;
    hovered?: boolean;
    images?: string[];
  }

  let {
    class: className = '',
    cardClassName = 'bg-neutral-400 dark:bg-neutral-800',
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
    {@const targetY = active ? dist * -28 - 14 : dist * 2}
    {@const targetX = active ? dist * 14 : 0}
    {@const targetRotate = active ? dist * 6 : 0}
    <motion.div
      animate={{
        y: targetY,
        x: targetX,
        rotate: targetRotate,
        scale: active ? (dist === 0 ? 1.05 : 0.98) : 1
      }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 22,
        mass: 0.9
      }}
      style={{
        zIndex: 5 - Math.abs(dist),
        originX: 0.5,
        originY: 0.5,
        backgroundImage: images ? `url(${images[i % images.length]})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
      class="absolute inset-0 rounded-2xl shadow-[0_4px_12px_-2px_rgba(0,0,0,0.15)] border border-neutral-200/20 {cardClassName}"
    />
  {/each}
</div>
