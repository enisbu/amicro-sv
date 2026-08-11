<script lang="ts">
  import { motion } from 'motion-sv';

  export interface Props {
    angle?: number;
    duration?: number;
    hoverIntensity?: number;
    cardClassName?: string;
    class?: string;
    hovered?: boolean;
    images?: string[];
  }

  let {
    angle = 40,
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
    {@const targetRotate = active ? (startAngle + offsetRatio * angle) * hoverIntensity : 0}
    <motion.div
      animate={{
        rotate: targetRotate,
        scale: active && i === 2 ? 1.03 : 1
      }}
      transition={{
        type: 'spring',
        stiffness: 180,
        damping: 20,
        mass: 0.8,
        duration
      }}
      style={{
        zIndex: 5 - i,
        originX: 0,
        originY: 1,
        backgroundImage: images ? `url(${images[i % images.length]})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
      class="absolute inset-0 rounded-2xl shadow-[0_4px_10px_-2px_rgba(0,0,0,0.15),0_2px_6px_-2px_rgba(0,0,0,0.1)] border border-neutral-200/20 {cardClassName}"
    />
  {/each}
</div>
