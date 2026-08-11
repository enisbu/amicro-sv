<script lang="ts">
  import { Wallet, Eye, CircleDollarSign, List } from '@lucide/svelte';

  const CARD = 'bg-white rounded-3xl p-6 shadow-sm border border-neutral-100';
  const CARD_HEADER = 'flex items-center gap-2.5 text-neutral-500 mb-5';
  const ICON_BUBBLE = 'w-7 h-7 rounded-lg bg-neutral-50 flex items-center justify-center border border-neutral-100/80';
  const CARD_VALUE = 'text-[26px] font-semibold text-neutral-900 mb-2.5 tracking-tight';
  const GRID_LINE = 'border-b border-dashed border-neutral-200 w-full relative';
</script>

<div class="bg-[#F8F7F5] p-8 rounded-[2.5rem] w-full font-sans relative overflow-hidden border border-neutral-200/50 shadow-inner">
  <div class="absolute top-0 left-0 w-[600px] h-[600px] bg-orange-100/40 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
  <div class="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange-100/40 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-5 relative z-10">
    <div class={CARD}>
      <div class={CARD_HEADER}>
        <div class={ICON_BUBBLE}>
          <Wallet class="w-4 h-4 text-neutral-600" />
        </div>
        <span class="text-[13px] font-medium text-neutral-600">Total Sales</span>
      </div>
      <div class={CARD_VALUE}>$34,678</div>
      <div class="flex items-center gap-2">
        <span class="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[11px] font-bold rounded-md flex items-center gap-0.5">▲ 8%</span>
        <span class="text-[11px] text-neutral-400 font-medium">VS Last Week</span>
      </div>
    </div>

    <div class={CARD}>
      <div class={CARD_HEADER}>
        <div class={ICON_BUBBLE}>
          <Eye class="w-4 h-4 text-neutral-600" />
        </div>
        <span class="text-[13px] font-medium text-neutral-600">Property views</span>
      </div>
      <div class={CARD_VALUE}>46246</div>
      <div class="flex items-center gap-2">
        <span class="px-2 py-0.5 bg-red-50 text-red-600 text-[11px] font-bold rounded-md flex items-center gap-0.5">▼ 1.8%</span>
        <span class="text-[11px] text-neutral-400 font-medium">VS Last Week</span>
      </div>
    </div>

    <div class={CARD}>
      <div class={CARD_HEADER}>
        <div class={ICON_BUBBLE}>
          <CircleDollarSign class="w-4 h-4 text-neutral-600" />
        </div>
        <span class="text-[13px] font-medium text-neutral-600">Future funds</span>
      </div>
      <div class={CARD_VALUE}>$34,678</div>
      <div class="flex items-center gap-2">
        <span class="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[11px] font-bold rounded-md flex items-center gap-0.5">▲ 18%</span>
        <span class="text-[11px] text-neutral-400 font-medium">VS Last Week</span>
      </div>
    </div>

    <div class={CARD}>
      <div class={CARD_HEADER}>
        <div class={ICON_BUBBLE}>
          <List class="w-4 h-4 text-neutral-600" />
        </div>
        <span class="text-[13px] font-medium text-neutral-600">Total properties</span>
      </div>
      <div class={CARD_VALUE}>435</div>
      <div class="flex items-center gap-2">
        <span class="px-2 py-0.5 bg-red-50 text-red-600 text-[11px] font-bold rounded-md flex items-center gap-0.5">▼ 1.2%</span>
        <span class="text-[11px] text-neutral-400 font-medium">VS Last Week</span>
      </div>
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 relative z-10">
    <div class="bg-white rounded-3xl p-7 shadow-sm border border-neutral-100 flex flex-col min-h-[400px]">
      <div class="flex justify-between items-center mb-8">
        <h3 class="text-[17px] font-semibold text-neutral-900">Sales analytics</h3>
        <div class="flex bg-neutral-100/80 rounded-full p-0.5 text-[11px] font-medium">
          <button class="px-4 py-1.5 rounded-full text-neutral-500">Monthly</button>
          <button class="px-4 py-1.5 rounded-full bg-white shadow-sm text-neutral-900 border border-neutral-200/50">Weekly</button>
        </div>
      </div>

      <div class="mb-8">
        <div class="text-[13px] text-neutral-400 font-medium mb-1.5">Total unites sold</div>
        <div class="text-4xl font-semibold text-neutral-900 tracking-tight flex items-baseline gap-1">
          345 <span class="text-xl text-neutral-400 font-normal">/500</span>
        </div>
      </div>

      <div class="flex items-center gap-5 text-[11px] font-semibold text-neutral-500 mb-6">
        <div class="flex items-center gap-2">
          <div class="w-2.5 h-2.5 bg-[#EA580C] rounded-[3px]" ></div> Total Sales
        </div>
        <div class="flex items-center gap-2">
          <div class="w-2.5 h-2.5 bg-[#FBBF24] rounded-[3px]" ></div> Total Earnings
        </div>
      </div>

      <div class="flex-1 relative flex items-end justify-between px-6 pb-6 mt-4">
        <div class="absolute inset-0 flex flex-col justify-between pb-8 pt-4">
          <div class={GRID_LINE}><span class="absolute -left-6 -top-2 text-[10px] text-neutral-400 font-medium">300</span></div>
          <div class={GRID_LINE}><span class="absolute -left-6 -top-2 text-[10px] text-neutral-400 font-medium">200</span></div>
          <div class={GRID_LINE}><span class="absolute -left-6 -top-2 text-[10px] text-neutral-400 font-medium">100</span></div>
          <div class={GRID_LINE}><span class="absolute -left-4 -top-2 text-[10px] text-neutral-400 font-medium">0</span></div>
        </div>

        <div class="flex gap-2 items-end h-[60%] relative z-10 w-14 justify-center">
          <div class="w-[18px] h-full rounded-md bg-neutral-50 border border-neutral-200/60" style="background-image: repeating-linear-gradient(45deg, #f0f0f0, #f0f0f0 2px, transparent 2px, transparent 4px)"></div>
          <div class="w-[18px] h-[80%] rounded-md bg-neutral-50 border border-neutral-200/60" style="background-image: repeating-linear-gradient(45deg, #f0f0f0, #f0f0f0 2px, transparent 2px, transparent 4px)"></div>
          <span class="absolute -bottom-7 text-[11px] font-medium text-neutral-400">Sep</span>
        </div>
        <div class="flex gap-2 items-end h-[85%] relative z-10 w-14 justify-center">
          <div class="w-[20px] h-[80%] rounded-md bg-[#EA580C] shadow-sm"></div>
          <div class="w-[20px] h-full rounded-md bg-[#FBBF24] shadow-sm"></div>
          <span class="absolute -bottom-7 text-[11px] font-bold text-neutral-800">Oct</span>
        </div>
        <div class="flex gap-2 items-end h-[70%] relative z-10 w-14 justify-center">
          <div class="w-[18px] h-full rounded-md bg-neutral-50 border border-neutral-200/60" style="background-image: repeating-linear-gradient(45deg, #f0f0f0, #f0f0f0 2px, transparent 2px, transparent 4px)"></div>
          <div class="w-[18px] h-[60%] rounded-md bg-neutral-50 border border-neutral-200/60" style="background-image: repeating-linear-gradient(45deg, #f0f0f0, #f0f0f0 2px, transparent 2px, transparent 4px)"></div>
          <span class="absolute -bottom-7 text-[11px] font-medium text-neutral-400">Nov</span>
        </div>
        <div class="flex gap-2 items-end h-[50%] relative z-10 w-14 justify-center">
          <div class="w-[18px] h-full rounded-md bg-neutral-50 border border-neutral-200/60" style="background-image: repeating-linear-gradient(45deg, #f0f0f0, #f0f0f0 2px, transparent 2px, transparent 4px)"></div>
          <div class="w-[18px] h-[40%] rounded-md bg-neutral-50 border border-neutral-200/60" style="background-image: repeating-linear-gradient(45deg, #f0f0f0, #f0f0f0 2px, transparent 2px, transparent 4px)"></div>
          <span class="absolute -bottom-7 text-[11px] font-medium text-neutral-400">Dec</span>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-3xl p-7 shadow-sm border border-neutral-100 flex flex-col min-h-[400px]">
      <div class="flex justify-between items-center mb-8">
        <h3 class="text-[17px] font-semibold text-neutral-900">Sales target</h3>
        <div class="flex bg-neutral-100/80 rounded-full p-0.5 text-[11px] font-medium">
          <button class="px-4 py-1.5 rounded-full text-neutral-500">Monthly</button>
          <button class="px-4 py-1.5 rounded-full bg-white shadow-sm text-neutral-900 border border-neutral-200/50">Yearly</button>
        </div>
      </div>

      <div class="flex items-center gap-6 text-[12px] font-medium text-neutral-600 mb-12 px-2">
        <div class="flex items-center gap-2">
          <div class="w-1.5 h-1.5 bg-orange-200 rounded-full" ></div> Property listed
        </div>
        <div class="flex items-center gap-2">
          <div class="w-1.5 h-1.5 bg-[#EA580C] rounded-full" ></div> Property delivered
        </div>
      </div>

      <div class="flex-1 flex items-center justify-center relative mt-8">
        <div class="relative w-[320px] h-[160px] overflow-hidden">
          <div class="absolute top-0 left-0 w-[320px] h-[320px]">
            {#each Array.from({ length: 16 }) as _, i (i)}
              {@const rotation = (i * (180 / 15)) - 180}
              {@const isFilled = i < 11}
              {@const isOrange = i < 6}
              <div
                class="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-[160px] origin-bottom"
                style="transform: translateX(-50%) rotate({rotation}deg)"
              >
                <div class="w-[36px] h-12 rounded-[8px] mx-auto border-[3px] border-white shadow-sm {isFilled ? (isOrange ? 'bg-[#FDBA74]' : 'bg-[#EA580C]') : 'bg-neutral-100'}" ></div>
              </div>
            {/each}
          </div>
        </div>

        <div class="absolute bottom-2 left-1/2 -translate-x-1/2 text-center">
          <div class="text-[40px] font-bold text-neutral-900 tracking-tight leading-none">70%</div>
          <div class="text-[13px] text-neutral-500 font-medium mt-2">Achieved</div>
        </div>

        <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[240px] h-[120px] bg-orange-500/10 rounded-t-full blur-3xl pointer-events-none"></div>
      </div>
    </div>
  </div>
</div>
