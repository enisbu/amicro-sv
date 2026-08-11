<script lang="ts">
  import { Check } from '@lucide/svelte';
</script>

<div class="bg-[#1E1E1E] rounded-[2rem] p-6 w-full shadow-2xl border border-white/5 relative mx-auto lg:mx-0">
  <div class="flex items-start justify-between mb-8">
    <div>
      <div class="text-[32px] font-bold text-white tracking-tight leading-none mb-1">25:04</div>
      <div class="text-[13px] text-neutral-400 font-medium">Left for preparation</div>
    </div>
    <div class="w-8 h-8 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center">
      <Check class="w-5 h-5 stroke-[3]" />
    </div>
  </div>

  <div class="relative mt-8">
    <div class="absolute right-4 bottom-14 z-10 flex flex-col items-center">
      <div class="bg-blue-500 text-white text-[11px] font-bold px-2.5 py-1.5 rounded-[10px] shadow-lg flex items-center gap-1.5 whitespace-nowrap">
        <div class="w-3.5 h-3.5 rounded-full bg-white text-blue-500 flex items-center justify-center text-[8px]">1</div>
        Preparation
      </div>
      <div class="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-blue-500"></div>
      <div class="w-px h-8 bg-white/80 absolute top-full mt-1" ></div>
    </div>

    <div class="flex gap-[3px] h-10 w-full bg-[#182845] p-1 rounded-xl relative z-0">
      <div class="flex-[0.8] rounded-lg bg-[#243A5F]" ></div>
      <div class="flex-[1.2] rounded-lg bg-[#243A5F]" ></div>
      <div class="flex-1 rounded-lg bg-[#243A5F]" ></div>
      <div class="flex-[1] rounded-lg bg-blue-500 relative overflow-hidden">
        <div class="absolute inset-0 opacity-20" style="background-image: repeating-linear-gradient(45deg, transparent, transparent 2px, white 2px, white 4px)"></div>
      </div>
    </div>
  </div>
</div>
