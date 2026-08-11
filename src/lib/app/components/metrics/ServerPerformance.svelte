<script lang="ts">
  import { ArrowUpRight } from '@lucide/svelte';

  const heights = [8, 12, 16, 20, 26, 36, 52, 75];
</script>

<div class="bg-[#121212] border border-white/5 rounded-[2rem] p-8 flex flex-col h-full">
  <div class="flex justify-between items-center mb-6">
    <h3 class="text-base font-medium text-neutral-300">Server Performance Metrics</h3>
    <ArrowUpRight class="w-5 h-5 text-neutral-500" />
  </div>

  <div class="text-5xl font-medium text-white mb-10 tracking-tight">+45%</div>

  <div class="flex items-end gap-2 h-[120px] mt-auto">
    {#each heights as h, i (i)}
      <div
        class="flex-1 bg-neutral-800/80 border-t-[3px] border-neutral-300 rounded-b-md"
        style="height: {h}%"
      ></div>
    {/each}
  </div>
</div>
