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
    {@const targetX = active ? offsets[i].x : 0}
    {@const targetY = active ? offsets[i].y : 0}
    {@const targetRotate = active ? offsets[i].rotate : 0}
    <motion.div
      animate={{
        x: targetX,
        y: targetY,
        rotate: targetRotate,
        scale: active ? (i === 2 ? 1.05 : 0.98) : 1
      }}
      transition={{
        type: 'spring',
        stiffness: 180,
        damping: 20,
        mass: 0.8
      }}
      style={{
        zIndex: 5 - Math.abs(i - 2),
        originX: 0.5,
        originY: 0.5,
        backgroundImage: images ? `url(${images[i % images.length]})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
      class="absolute inset-0 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-neutral-200/20 {cardClassName}"
    />
  {/each}
</div>
