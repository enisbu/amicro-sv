<script lang="ts">
  import { MoreHorizontal, ChevronDown } from '@lucide/svelte';

  const AXIS_LABEL = 'absolute -bottom-6 left-1/2 -translate-x-1/2 text-[11px] font-semibold text-neutral-400';
</script>

<div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
  <div class="xl:col-span-2 flex flex-col gap-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="flex flex-col gap-6">
        <div class="bg-white rounded-[1.5rem] p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-neutral-100">
          <div class="flex justify-between items-start mb-6">
            <div>
              <h3 class="text-[17px] font-semibold text-neutral-800">Savings Progress</h3>
              <p class="text-[13px] text-neutral-500 mt-0.5">Your Savings: $16,322.95</p>
            </div>
            <div class="flex bg-neutral-100/50 rounded-xl p-1">
              {#each ['1D', '7D', '1M'] as period, i (period)}
                <button class="px-3 py-1.5 text-xs font-semibold rounded-lg {i === 2 ? 'bg-white shadow-sm text-neutral-800' : 'text-neutral-400'}">
                  {period}
                </button>
              {/each}
            </div>
          </div>

          <div class="h-40 relative flex items-end">
            <div class="absolute inset-0 grid grid-cols-[repeat(24,1fr)] gap-[3px] opacity-[0.15]">
              {#each Array.from({ length: 24 * 8 }) as _, i (i)}
                <div class="w-1.5 h-1.5 bg-neutral-400 rounded-sm" ></div>
              {/each}
            </div>
            <div class="absolute top-2 left-1/2 -translate-x-1/2 bg-white px-3 py-1.5 rounded-full shadow-sm text-[11px] font-bold text-emerald-500 border border-neutral-100 flex items-center gap-1.5 z-10">
              Savings: $223.42
            </div>
            <div class="absolute top-10 bottom-0 left-1/2 w-px border-l-2 border-dashed border-emerald-500" ></div>
            <div class="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[11px] text-neutral-400 font-semibold">
              Jun 20
            </div>
          </div>
        </div>

        <div class="bg-white rounded-[1.5rem] p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-neutral-100">
          <div class="flex justify-between items-start mb-6">
            <div>
              <h3 class="text-[17px] font-semibold text-neutral-800">Credit Score</h3>
              <p class="text-[13px] text-neutral-500 mt-0.5">Your current credit rating.</p>
            </div>
            <button class="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-neutral-600 bg-white border border-neutral-200 rounded-xl shadow-sm">
              Weekly <ChevronDown class="w-3.5 h-3.5" />
            </button>
          </div>

          <div class="flex items-baseline gap-2 mb-4">
            <span class="text-4xl font-semibold text-neutral-900 tracking-tight">88</span>
            <span class="text-xl text-neutral-400 font-medium">/100</span>
            <span class="text-[11px] font-bold text-emerald-500 ml-2">▲ 13.6%</span>
            <span class="text-[11px] font-medium text-neutral-400">vs last month</span>
          </div>

          <div class="flex gap-[3px] h-8">
            {#each Array.from({ length: 42 }) as _, i (i)}
              <div class="flex-1 rounded-sm {i < 35 ? 'bg-emerald-500' : 'bg-neutral-100'}" ></div>
            {/each}
          </div>
        </div>
      </div>

      <div class="bg-white rounded-[1.5rem] p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-neutral-100 h-full flex flex-col">
        <div class="flex justify-between items-start mb-6">
          <div>
            <h3 class="text-[17px] font-semibold text-neutral-800">Major Expenses</h3>
            <p class="text-[13px] text-neutral-500 mt-0.5">Your biggest spending categories.</p>
          </div>
          <MoreHorizontal class="w-5 h-5 text-neutral-400" />
        </div>

        <div class="flex gap-4 mb-8 text-[11px] font-semibold text-neutral-500">
          <div class="flex items-center gap-1.5"><div class="w-2.5 h-2.5 rounded-[2px] bg-[#60A5FA]" ></div> Housing</div>
          <div class="flex items-center gap-1.5"><div class="w-2.5 h-2.5 rounded-[2px] bg-[#FB7185]" ></div> Food</div>
          <div class="flex items-center gap-1.5"><div class="w-2.5 h-2.5 rounded-[2px] bg-[#FBBF24]" ></div> Others</div>
        </div>

        <div class="flex-1 flex items-end justify-between gap-4 pb-6 relative">
          <div class="w-full flex flex-col gap-[3px] relative group">
            <div class="w-full bg-neutral-100 h-16 rounded-t-sm" ></div>
            <div class="w-full bg-[#FBBF24] h-4" ></div>
            <div class="w-full bg-[#FB7185] h-3" ></div>
            <div class="w-full bg-[#60A5FA] h-12 rounded-b-sm" ></div>
            <span class={AXIS_LABEL}>Mon.</span>
          </div>
          <div class="w-full flex flex-col gap-[3px] relative">
            <div class="w-full bg-neutral-100 h-8 rounded-t-sm" ></div>
            <div class="w-full bg-[#FBBF24] h-20" ></div>
            <div class="w-full bg-[#FB7185] h-8" ></div>
            <div class="w-full bg-[#60A5FA] h-14 rounded-b-sm" ></div>
            <span class={AXIS_LABEL}>Tue.</span>
          </div>
          <div class="w-full flex flex-col gap-[3px] relative">
            <div class="w-full bg-neutral-100 h-24 rounded-t-sm" ></div>
            <div class="w-full bg-[#FBBF24] h-6" ></div>
            <div class="w-full bg-[#FB7185] h-6" ></div>
            <div class="w-full bg-[#60A5FA] h-12 rounded-b-sm" ></div>
            <span class={AXIS_LABEL}>Wed.</span>
          </div>
          <div class="w-full flex flex-col gap-[3px] relative">
            <div class="w-full bg-neutral-100 h-4 rounded-t-sm" ></div>
            <div class="w-full bg-[#FBBF24] h-8" ></div>
            <div class="w-full bg-[#60A5FA] h-28 rounded-b-sm" ></div>
            <span class={AXIS_LABEL}>Thu.</span>
          </div>
          <div class="w-full flex flex-col gap-[3px] relative">
            <div class="w-full bg-neutral-100 h-16 rounded-t-sm" ></div>
            <div class="w-full bg-[#FBBF24] h-12" ></div>
            <div class="w-full bg-[#FB7185] h-4" ></div>
            <div class="w-full bg-[#60A5FA] h-16 rounded-b-sm" ></div>
            <span class={AXIS_LABEL}>Fri.</span>
          </div>
          <div class="w-full flex flex-col gap-[3px] relative">
            <div class="w-full bg-neutral-100 h-12 rounded-t-sm" ></div>
            <div class="w-full bg-[#FBBF24] h-16" ></div>
            <div class="w-full bg-[#FB7185] h-20 rounded-b-sm" ></div>
            <span class={AXIS_LABEL}>Sat.</span>
          </div>
          <div class="w-full flex flex-col gap-[3px] relative">
            <div class="w-full bg-neutral-100 h-20 rounded-t-sm" ></div>
            <div class="w-full bg-[#FB7185] h-8" ></div>
            <div class="w-full bg-[#60A5FA] h-20 rounded-b-sm" ></div>
            <span class={AXIS_LABEL}>Sun.</span>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-[1.5rem] p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-neutral-100">
      <div class="flex justify-between items-start mb-6">
        <div>
          <h3 class="text-[17px] font-semibold text-neutral-800">Your Assets</h3>
          <p class="text-[13px] text-neutral-500 mt-0.5">Total value of what you own.</p>
        </div>
        <button class="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-neutral-600 bg-white border border-neutral-200 rounded-xl shadow-sm">
          All Tokens <ChevronDown class="w-3.5 h-3.5" />
        </button>
      </div>

      <div class="flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-100 pb-4 mb-4 gap-4">
        <div>
          <div class="text-3xl font-semibold text-neutral-900 tracking-tight">$16,546.37</div>
          <div class="text-[11px] font-bold text-emerald-500 mt-1">▲ 4.2% <span class="text-neutral-400 font-medium">vs last month</span></div>
        </div>

        <div class="flex items-center gap-6 text-[11px] font-semibold text-neutral-600">
          <div class="flex items-center gap-1.5">
            <div class="w-4 h-4 rounded-full bg-[#6366F1] flex items-center justify-center text-[8px] text-white">$</div>
            $5,482.19 <span class="text-neutral-400 font-medium">(USDC)</span>
          </div>
          <div class="flex items-center gap-1.5">
            <div class="w-4 h-4 rounded-full bg-[#F59E0B] flex items-center justify-center text-[8px] text-white">₿</div>
            $6,731.58 <span class="text-neutral-400 font-medium">(BTC)</span>
          </div>
          <div class="flex items-center gap-1.5">
            <div class="w-4 h-4 rounded-full bg-[#14B8A6] flex items-center justify-center text-[8px] text-white">₮</div>
            $4,332.60 <span class="text-neutral-400 font-medium">(USDT)</span>
          </div>
        </div>
      </div>

      <div class="flex gap-[3px] h-3 w-full rounded-sm overflow-hidden">
        <div class="bg-[#6366F1] rounded-sm" style="width: 35%" ></div>
        <div class="bg-[#F59E0B] rounded-sm" style="width: 40%" ></div>
        <div class="bg-[#14B8A6] rounded-sm" style="width: 25%" ></div>
      </div>
    </div>
  </div>
</div>
