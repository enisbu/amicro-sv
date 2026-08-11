<script lang="ts">
  import { ArrowUpRight } from '@lucide/svelte';
</script>

<div class="bg-[#F8F9FA] rounded-[2rem] p-6 w-full max-w-[600px] font-sans mx-auto shadow-inner border border-neutral-100 relative">
  <div class="absolute -top-4 right-8 bg-white px-4 py-2 rounded-full text-[13px] font-semibold text-neutral-800 shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-neutral-100 flex items-center gap-1.5 z-20">
    Full breakdown <ArrowUpRight class="w-4 h-4 text-neutral-400" />
  </div>

  <div class="grid grid-cols-2 gap-4 mb-4 mt-2">
    <div class="bg-white rounded-3xl p-5 shadow-sm border border-neutral-100 relative">
      <div class="absolute top-4 right-4"><ArrowUpRight class="w-5 h-5 text-neutral-300" /></div>
      <div class="text-[13px] font-medium text-neutral-600 mb-4">Avg latency</div>
      <div class="flex items-start gap-4 mb-8">
        <div class="text-[40px] font-semibold text-neutral-900 tracking-tight leading-none">1.8s</div>
        <div class="flex flex-col gap-1 text-[11px] font-medium pt-1">
          <div class="flex gap-2"><span class="text-neutral-400">P99</span> <span class="text-neutral-900">3.6s</span></div>
          <div class="flex gap-2"><span class="text-neutral-400">P95</span> <span class="text-neutral-900">0.4s</span></div>
        </div>
      </div>

      <div class="h-16 relative w-full flex items-end">
        <div class="absolute top-4 left-0 right-0 border-b border-dashed border-neutral-200" ></div>
        <div class="absolute top-1.5 right-0 bg-neutral-400 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full z-10">2S</div>
        <svg class="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 40">
          <path d="M0,20 L10,25 L20,30 L30,35 L40,35 L50,38 L60,28 L70,30 L80,25 L90,15 L100,0" fill="none" stroke="#4ADE80" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
          <circle cx="100" cy="0" r="4" fill="#4ADE80" />
        </svg>
      </div>
    </div>

    <div class="bg-white rounded-3xl p-5 shadow-sm border border-neutral-100 relative">
      <div class="absolute top-4 right-4"><ArrowUpRight class="w-5 h-5 text-neutral-300" /></div>
      <div class="text-[13px] font-medium text-neutral-600 mb-4">Average lag</div>
      <div class="flex items-start gap-4 mb-8">
        <div class="text-[40px] font-semibold text-neutral-900 tracking-tight leading-none">38s</div>
        <div class="flex flex-col gap-1 text-[11px] font-medium pt-1">
          <div class="flex gap-2"><span class="text-neutral-400">P99</span> <span class="text-neutral-900">67s</span></div>
          <div class="flex gap-2"><span class="text-neutral-400">P95</span> <span class="text-neutral-900">48s</span></div>
        </div>
      </div>

      <div class="h-16 relative w-full flex items-end">
        <div class="absolute top-4 left-0 right-0 border-b border-dashed border-neutral-200" ></div>
        <div class="absolute top-1.5 right-0 bg-neutral-400 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full z-10">5M</div>
        <svg class="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 40">
          <path d="M0,20 L15,20 L25,5 L40,5 L50,30 L70,30 L80,25 L95,30 L100,30" fill="none" stroke="#4ADE80" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
          <circle cx="95" cy="30" r="4" fill="#4ADE80" />
        </svg>
      </div>
    </div>
  </div>

  <div class="bg-white rounded-3xl p-5 shadow-sm border border-neutral-100 relative">
    <div class="absolute top-4 right-4"><ArrowUpRight class="w-5 h-5 text-neutral-300" /></div>
    <div class="text-[13px] font-medium text-neutral-500 mb-5">Most errored</div>

    <div class="flex flex-col gap-5">
      <div>
        <div class="flex justify-between items-center mb-1">
          <div class="text-[14px] font-semibold text-neutral-900">Orders import</div>
          <div class="text-[13px] font-semibold text-neutral-900">36 / <span class="text-[#EF4444]">13</span></div>
        </div>
        <div class="flex justify-between items-center text-[12px] font-medium text-neutral-400 mb-2">
          <div class="flex items-center gap-1"><span>└</span> TimeoutError</div>
          <div class="text-neutral-500">11</div>
        </div>
        <div class="w-full h-1 bg-neutral-100 rounded-full flex justify-end">
          <div class="w-[30%] bg-gradient-to-l from-[#EF4444] to-transparent rounded-full opacity-50" ></div>
        </div>
      </div>

      <div>
        <div class="flex justify-between items-center mb-1">
          <div class="text-[14px] font-semibold text-neutral-900">Data enrichment</div>
          <div class="text-[13px] font-semibold text-neutral-900">12 / <span class="text-[#EF4444]">3</span></div>
        </div>
        <div class="flex justify-between items-center text-[12px] font-medium text-neutral-400 mb-2">
          <div class="flex items-center gap-1"><span>└</span> 404: Not Found</div>
          <div class="text-neutral-500">3</div>
        </div>
        <div class="w-full h-1 bg-neutral-100 rounded-full flex justify-end">
          <div class="w-[15%] bg-gradient-to-l from-[#EF4444] to-transparent rounded-full opacity-50" ></div>
        </div>
      </div>

      <div>
        <div class="flex justify-between items-center mb-1">
          <div class="text-[14px] font-semibold text-neutral-900">Deduplication</div>
          <div class="text-[13px] font-semibold text-neutral-900">8 / <span class="text-[#EF4444]">2</span></div>
        </div>
        <div class="flex justify-between items-center text-[12px] font-medium text-neutral-400 mb-2">
          <div class="flex items-center gap-1"><span>└</span> MergeConflict</div>
          <div class="text-neutral-500">2</div>
        </div>
        <div class="w-full h-1 bg-neutral-100 rounded-full flex justify-end">
          <div class="w-[10%] bg-gradient-to-l from-[#EF4444] to-transparent rounded-full opacity-50" ></div>
        </div>
      </div>
    </div>
  </div>
</div>
