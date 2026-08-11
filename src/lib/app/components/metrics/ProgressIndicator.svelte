<script lang="ts">
  import { MoreHorizontal, ArrowUpRight } from '@lucide/svelte';

  const totalBars = 36;
  const filledBars = 24;
</script>

<div class="bg-[#121212] border border-white/5 rounded-[2rem] p-8 flex flex-col h-full">
  <div class="flex justify-between items-center">
    <h3 class="text-sm font-medium text-neutral-200">Progress Indicator</h3>
    <MoreHorizontal class="w-5 h-5 text-neutral-500" />
  </div>

  <p class="text-[13px] text-neutral-400 mt-2">
    You are on track to finish this goal three days early
  </p>

  <div class="h-px w-full bg-white/5 my-6"></div>

  <div class="flex items-center gap-3">
    <span class="text-5xl font-semibold tracking-tight text-white">66%</span>
    <div class="flex items-center gap-1 px-2.5 py-1 rounded-full border border-white/10 bg-white/5">
      <ArrowUpRight class="w-3 h-3 text-neutral-300" />
      <span class="text-[11px] font-medium text-neutral-200">8%</span>
    </div>
    <span class="text-xs text-neutral-500 ml-1">vs. the last period</span>
  </div>

  <div class="flex gap-[3px] h-12 w-full mt-8">
    {#each Array.from({ length: totalBars }) as _, i (i)}
      <div class="flex-1 rounded-sm {i < filledBars ? 'bg-neutral-200' : 'bg-neutral-800'}" ></div>
    {/each}
  </div>
</div>
