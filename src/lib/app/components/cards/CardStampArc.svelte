<script lang="ts">
  import { motion } from 'motion-sv';

  export interface Props {
    arc?: number;
    spread?: number;
    yOffset?: number;
    isColorful?: boolean;
    duration?: number;
    hoverIntensity?: number;
    class?: string;
    hovered?: boolean;
    images?: string[];
  }

  let {
    arc = 25,
    spread = 180,
    yOffset = 40,
    isColorful = false,
    duration = 0.5,
    hoverIntensity = 1,
    class: className = '',
    hovered,
    images
  }: Props = $props();

  let isHovered = $state(false);
  const active = $derived(hovered !== undefined ? hovered : isHovered);

  const stamps = [
    { id: 0, color: 'bg-red-400 dark:bg-red-500' },
    { id: 1, color: 'bg-blue-400 dark:bg-blue-500' },
    { id: 2, color: 'bg-emerald-400 dark:bg-emerald-500' },
    { id: 3, color: 'bg-amber-400 dark:bg-amber-500' },
    { id: 4, color: 'bg-purple-400 dark:bg-purple-500' }
  ];

  function stampTransform(i: number) {
    if (!active) return { rotate: 0, x: 0, y: 0 };
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
        originX: 0.5,
        originY: 1,
        backgroundImage: images ? `url(${images[i % images.length]})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
      class="absolute inset-0 rounded-2xl shadow-[0_4px_10px_-2px_rgba(0,0,0,0.15),0_2px_6px_-2px_rgba(0,0,0,0.1)] border-2 border-dashed border-white/60 dark:border-black/35 {images
        ? ''
        : isColorful
          ? stamp.color
          : 'bg-neutral-400 dark:bg-neutral-800'}"
    />
  {/each}
</div>
