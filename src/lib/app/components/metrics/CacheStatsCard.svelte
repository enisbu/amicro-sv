<script lang="ts">
  import { MoreHorizontal, HelpCircle } from '@lucide/svelte';
</script>

<div class="bg-white rounded-3xl p-6 w-full max-w-[360px] mx-auto font-sans shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08)] border border-neutral-100">
  <div class="flex justify-between items-start mb-2">
    <h2 class="text-[17px] font-semibold text-neutral-800 flex items-center gap-1">
      query <span class="font-bold text-neutral-900">getUser</span> <span class="text-neutral-400 font-normal">›</span>
    </h2>
    <MoreHorizontal class="w-5 h-5 text-neutral-400" />
  </div>

  <div class="text-[13px] text-neutral-500 font-medium mb-6">
    7.15M Requests · 9% · 734ms P95
  </div>

  <div class="flex justify-between items-end mb-6">
    <div>
      <div class="text-[12px] text-neutral-500 font-medium mb-1.5">Cache Hit Rate</div>
      <div class="flex items-center gap-2 mb-1.5">
        <div class="w-6 h-6 relative">
          <svg viewBox="0 0 24 24" class="w-full h-full -rotate-90">
            <circle cx="12" cy="12" r="10" fill="none" stroke="#F1F5F9" stroke-width="3" stroke-dasharray="4 4" />
            <circle cx="12" cy="12" r="10" fill="none" stroke="#EF4444" stroke-width="3" stroke-dasharray="4 20" />
          </svg>
        </div>
        <span class="text-[28px] font-bold text-neutral-900 tracking-tight leading-none">12.3%</span>
      </div>
      <div class="text-[12px] font-medium text-[#EF4444] flex items-center gap-1">
        ↘ down from 19.6%
      </div>
    </div>

    <div class="text-right">
      <div class="text-[12px] text-neutral-500 font-medium mb-1.5">Max CHR</div>
      <div class="text-[28px] font-medium text-neutral-600 tracking-tight leading-none mb-1.5">72.6%</div>
      <div class="text-[12px] font-medium text-neutral-500 flex items-center justify-end gap-1">
        CHR Impact +5.4% <HelpCircle class="w-3.5 h-3.5 text-neutral-300" />
      </div>
    </div>
  </div>

  <div class="h-px w-[calc(100%+3rem)] -mx-6 bg-neutral-100 mb-6" ></div>

  <div class="mb-6">
    <div class="flex items-baseline gap-1.5 mb-1">
      <span class="text-[20px] font-semibold text-neutral-900 tracking-tight">90.5 GB</span>
      <span class="text-[15px] font-medium text-neutral-500">(69.8%)</span>
    </div>
    <div class="flex justify-between items-center text-[12px] font-medium text-neutral-500 mb-4">
      <div class="flex items-center gap-1.5">
        <div class="flex gap-[2px] opacity-60">
          <div class="w-0.5 h-2.5 bg-purple-600 rounded-full" ></div>
          <div class="w-0.5 h-3.5 bg-purple-600 rounded-full" ></div>
          <div class="w-0.5 h-2.5 bg-purple-600 rounded-full" ></div>
        </div>
        Cacheable Bandwidth
      </div>
      <div class="flex items-center gap-1">
        <div class="w-4 h-4 rounded-full border border-neutral-200 flex items-center justify-center text-[9px]">$</div>
        $9.50
        <HelpCircle class="w-3.5 h-3.5 text-neutral-300 ml-0.5" />
      </div>
    </div>

    <div class="h-3.5 w-full flex gap-1 rounded-full overflow-hidden mb-6">
      <div class="bg-[#1C1635] w-[20%] rounded-l-full" ></div>
      <div class="bg-[#9F7AEA] w-[15%]" ></div>
      <div
        class="bg-[#E9D5FF] flex-1 rounded-r-full"
        style="background-image: repeating-linear-gradient(90deg, transparent, transparent 2px, white 2px, white 4px)"
      ></div>
    </div>

    <div class="space-y-2 text-[12px] font-medium">
      <div class="flex items-center gap-2">
        <div class="w-1.5 h-1.5 rounded-full bg-[#9F7AEA]" ></div>
        <span class="text-neutral-500">Cached</span>
        <span class="text-neutral-900">12.8 GB</span>
        <span class="text-neutral-400">(9.8%)</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="w-1.5 h-1.5 rounded-full bg-[#1C1635]" ></div>
        <span class="text-neutral-500">Non-Cacheable</span>
        <span class="text-neutral-900">26.3 GB</span>
        <span class="text-neutral-400">(20.3%)</span>
      </div>
      <div class="pt-1 flex items-center gap-2">
        <span class="text-neutral-500">Total</span>
        <span class="text-neutral-900">129.6 GB</span>
      </div>
    </div>
  </div>
</div>
