<script lang="ts">
  import { motion } from 'motion-sv';

  export interface Props {
    angle?: number;
    gap?: number;
    yOffset?: number;
    duration?: number;
    hoverIntensity?: number;
    cardClassName?: string;
    class?: string;
    hovered?: boolean;
    images?: string[];
  }

  let {
    angle = 45,
    gap = 110,
    yOffset = 30,
    duration = 0.5,
    hoverIntensity = 1,
    cardClassName = 'bg-neutral-400 dark:bg-neutral-800',
    class: className = '',
    hovered,
    images
  }: Props = $props();

  let isHovered = $state(false);
  const active = $derived(hovered !== undefined ? hovered : isHovered);

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
    {@const targetRotate = active ? dist * (angle / center) * hoverIntensity : 0}
    {@const targetX = active ? dist * (gap / center) * hoverIntensity : 0}
    {@const targetY = (() => {
      if (!active) return 0;
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
        zIndex: 4 - Math.abs(dist),
        originX: 0.5,
        originY: 1,
        backgroundImage: images ? `url(${images[i % images.length]})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
      class="absolute inset-0 rounded-2xl shadow-[0_4px_10px_-2px_rgba(0,0,0,0.15),0_2px_6px_-2px_rgba(0,0,0,0.1)] border border-neutral-200/20 {cardClassName}"
    />
  {/each}
</div>
