<div class="bg-white rounded-[1.5rem] p-5 w-full max-w-[240px] font-sans border border-neutral-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] mx-auto">
  <div class="text-[28px] font-semibold text-neutral-900 tracking-tight leading-none mb-3 font-mono">
    12,480
  </div>
  <div class="flex items-center gap-1.5 mb-6 text-[13px]">
    <span class="text-[#10B981] font-bold flex items-center gap-0.5">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
      +8.4%
    </span>
    <span class="text-neutral-500 font-medium">Prompts</span>
  </div>

  <div class="flex gap-[3px] h-6 w-full">
    {#each Array.from({ length: 30 }) as _, i (i)}
      <div class="flex-1 rounded-sm {i < 18 ? 'bg-[#FF6B00]' : 'bg-neutral-100'}" ></div>
    {/each}
  </div>
</div>
