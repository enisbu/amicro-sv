<script lang="ts">
  import { ChevronDown } from '@lucide/svelte';

  interface DataPoint {
    month: string;
    value: number;
    active?: boolean;
  }

  const data: DataPoint[] = [
    { month: 'Apr', value: 30 },
    { month: 'May', value: 15 },
    { month: 'Jun', value: 45 },
    { month: 'Jul', value: 40 },
    { month: 'Aug', value: 75, active: true },
    { month: 'Sep', value: 35 },
    { month: 'Oct', value: 40 },
    { month: 'Nov', value: 45 },
  ];
</script>

<div class="bg-white rounded-[2rem] p-7 shadow-2xl shadow-neutral-200/50 max-w-[500px] w-full mx-auto font-sans border border-neutral-100">
  <div class="flex justify-between items-start mb-8">
    <div>
      <h2 class="text-[19px] font-semibold text-neutral-900 mb-5">Overview</h2>
      <div class="text-[13px] text-neutral-500 font-medium mb-1">Avg Per month</div>
      <div class="flex items-center gap-3">
        <span class="text-[28px] font-bold text-neutral-900 tracking-tight">1,860<span class="text-[20px] font-semibold text-neutral-400">/3K</span></span>
        <span class="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[11px] font-bold rounded-md shadow-sm flex items-center gap-0.5">
          50.2% ▲
        </span>
      </div>
    </div>
    <button class="flex items-center gap-2 px-3 py-1.5 text-[13px] font-medium text-neutral-700 bg-white border border-neutral-200/80 rounded-xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:bg-neutral-50">
      Last Month <ChevronDown class="w-3.5 h-3.5" />
    </button>
  </div>

  <div class="h-[180px] relative mt-16 px-1 flex items-end justify-between">
    <div class="absolute inset-0 flex flex-col justify-between pointer-events-none pb-7 pt-2">
      <div class="w-full border-b border-dashed border-neutral-200/80"></div>
      <div class="w-full border-b border-dashed border-neutral-200/80"></div>
      <div class="w-full border-b border-dashed border-neutral-200/80"></div>
    </div>

    {#each data as item, i (i)}
      <div class="flex flex-col items-center gap-3 relative z-10 w-11">
        {#if item.active}
          <div class="absolute -top-[64px] flex flex-col items-center w-[90px]">
            <div class="bg-[#2C2C2C] text-white rounded-xl p-2.5 text-center shadow-xl w-full relative z-20 border border-neutral-800">
              <div class="text-[10px] text-neutral-400 font-medium mb-1">August 2025</div>
              <div class="text-[13px] font-semibold">120 pcs</div>
              <div class="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-[#2C2C2C] border-b border-r border-neutral-800 rotate-45"></div>
            </div>
          </div>
          <div class="absolute -top-3.5 w-4 h-4 bg-white border-[3px] border-[#2C2C2C] rounded-full z-20 shadow-sm"></div>
        {/if}

        <div
          class="w-full rounded-lg border-2 transition-all {item.active ? 'bg-[#999999] border-[#2C2C2C]' : 'border-neutral-200/60 bg-neutral-50'}"
          style="height: {item.value}%; {item.active ? 'background-image: repeating-linear-gradient(-45deg, rgba(0,0,0,0.2), rgba(0,0,0,0.2) 2px, transparent 2px, transparent 6px)' : 'background-image: repeating-linear-gradient(-45deg, rgba(0,0,0,0.04), rgba(0,0,0,0.04) 2px, transparent 2px, transparent 6px)'}"
        ></div>
        <span class="text-[13px] font-medium text-neutral-500">{item.month}</span>
      </div>
    {/each}
  </div>
</div>
