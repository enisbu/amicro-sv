<script lang="ts">
  import { MoreHorizontal } from '@lucide/svelte';
</script>

{#snippet bar(cols: number, rows: number)}
  <div
    class="grid gap-[2px] w-full"
    style="grid-template-columns: repeat({cols}, 1fr); -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%); mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)"
  >
    {#each Array.from({ length: cols * rows }) as _, i (i)}
      <div class="aspect-square bg-neutral-200 rounded-[1px]" ></div>
    {/each}
  </div>
{/snippet}

<div class="bg-[#121212] border border-white/5 rounded-[2rem] p-8 flex flex-col h-full min-h-[400px]">
  <div class="flex justify-between items-center mb-1">
    <h3 class="text-base font-medium text-neutral-200">Growth</h3>
    <MoreHorizontal class="w-5 h-5 text-neutral-500" />
  </div>
  <p class="text-[13px] text-neutral-400 mb-8">Celebrate your financial success</p>

  <div class="flex items-baseline gap-3 mb-12">
    <span class="text-4xl font-semibold text-white tracking-tight">$7,432.58</span>
    <span class="text-sm font-medium text-emerald-400">↑ 8.3%</span>
  </div>

  <div class="flex items-end gap-2 mt-auto">
    <div class="flex-1">
      {@render bar(14, 16)}
    </div>
    <div class="flex-1">
      {@render bar(14, 28)}
    </div>
    <div class="flex-1">
      {@render bar(14, 46)}
    </div>
  </div>
</div>
