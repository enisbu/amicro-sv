<script lang="ts">
  import { Info, ChevronDown } from '@lucide/svelte';
</script>

<div class="flex flex-col gap-6">
  <div class="bg-white rounded-[1.5rem] p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-neutral-100">
    <div class="flex justify-between items-start mb-6">
      <div class="flex items-center gap-1.5 text-neutral-700 font-medium">
        Sales Channels <Info class="w-4 h-4 text-neutral-300" />
      </div>
      <button class="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-neutral-600 bg-white border border-neutral-200 rounded-xl shadow-sm">
        Weekly <ChevronDown class="w-3.5 h-3.5" />
      </button>
    </div>

    <div class="flex items-baseline gap-2 mb-6">
      <span class="text-4xl font-semibold text-neutral-900 tracking-tight">246</span>
      <span class="text-[13px] font-bold text-emerald-500">+2.1%</span>
      <span class="text-[13px] font-medium text-neutral-400">vs last week</span>
    </div>

    <div class="flex justify-between text-[11px] text-neutral-400 font-semibold mb-3">
      <span>Feb 21, 2024</span>
      <span>Feb 28, 2024</span>
    </div>

    <div class="flex gap-1.5 h-10 w-full">
      <div class="bg-[#3B82F6] rounded-[2px] flex-[2.5]" ></div>
      <div class="bg-[#38BDF8] rounded-[2px] flex-[2]" ></div>
      <div class="bg-[#8B5CF6] rounded-[2px] flex-[1.5]" ></div>
      <div class="bg-[#F97316] rounded-[2px] flex-[1.2]" ></div>
      <div class="bg-[#FBBF24] rounded-[2px] flex-[1]" ></div>
      <div class="bg-[#10B981] rounded-[2px] flex-[0.8]" ></div>
      <div class="bg-[#14B8A6] rounded-[2px] flex-[0.5]" ></div>
    </div>
  </div>

  <div class="bg-white rounded-[1.5rem] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-neutral-100 overflow-hidden">
    <div class="p-6 pb-0">
      <div class="flex justify-between items-start mb-4">
        <div class="flex items-center gap-1.5 text-neutral-700 font-medium">
          Campaign Data <Info class="w-4 h-4 text-neutral-300" />
        </div>
        <button class="px-3 py-1.5 text-xs font-semibold text-neutral-600 bg-white border border-neutral-200 rounded-xl shadow-sm">
          Details
        </button>
      </div>

      <div class="flex items-center gap-3 mb-6">
        <span class="text-3xl font-semibold text-neutral-900 tracking-tight">$1,750</span>
        <span class="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-md">Last 15 days</span>
      </div>
    </div>

    <div class="flex h-32 border-t border-neutral-100">
      <div class="flex-[2.5] relative bg-orange-50/30 overflow-hidden">
        <svg class="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 40">
          <path d="M0,35 L5,34 L10,36 L15,30 L20,32 L25,20 L30,22 L35,28 L40,15 L45,25 L50,22 L55,30 L60,26 L65,32 L70,30 L75,34 L80,25 L85,30 L90,20 L95,24 L100,10" fill="none" stroke="#F97316" stroke-width="1.5" />
          <path d="M0,35 L5,34 L10,36 L15,30 L20,32 L25,20 L30,22 L35,28 L40,15 L45,25 L50,22 L55,30 L60,26 L65,32 L70,30 L75,34 L80,25 L85,30 L90,20 L95,24 L100,10 L100,40 L0,40 Z" fill="#F97316" fill-opacity="0.1" stroke="none" />
        </svg>
        <div class="absolute right-0 top-0 bottom-0 w-px bg-[#F97316]" ></div>
      </div>

      <div class="flex-[1] bg-white p-4 flex flex-col justify-end">
        <div class="text-[22px] font-semibold text-neutral-900 leading-none">45%</div>
        <div class="text-[11px] text-neutral-400 font-semibold mt-1">$32.9K used</div>
      </div>
    </div>
  </div>
</div>
