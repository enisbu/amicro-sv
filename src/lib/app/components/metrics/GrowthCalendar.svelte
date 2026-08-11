<script lang="ts">
  import { Star } from '@lucide/svelte';
</script>

<div class="flex flex-col md:flex-row gap-6 font-sans w-fit mx-auto items-center md:items-stretch">
  <div class="bg-[#1C1C1C] rounded-[2rem] p-7 w-[300px] shadow-2xl flex flex-col justify-between border border-neutral-800 relative overflow-hidden">
    <div class="absolute bottom-0 right-0 w-48 h-48 bg-purple-500/10 rounded-full blur-[60px] pointer-events-none"></div>

    <div class="relative z-10">
      <div class="flex justify-between items-center mb-8">
        <div class="flex items-center gap-3">
          <Star class="w-5 h-5 fill-white text-white" />
          <span class="text-white text-[15px] font-medium">Users growth</span>
        </div>
        <div class="w-9 h-9 rounded-full bg-neutral-800 overflow-hidden border border-neutral-700">
          <img src="https://i.pravatar.cc/100?img=11" alt="User" class="w-full h-full object-cover" />
        </div>
      </div>

      <div class="flex items-end gap-3 mb-10">
        <div class="text-indigo-300">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
        </div>
        <div class="text-[40px] font-medium text-white tracking-tight leading-none">+88.3%</div>
        <div class="text-[11px] text-neutral-400 font-medium pb-1 flex items-center gap-0.5">
          +1.78% <span class="text-[10px]">↗</span>
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-3 relative z-10">
      <div class="h-11 w-[55%] bg-white rounded-full flex items-center px-4 relative overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]">
        <span class="text-[13px] font-semibold text-neutral-900 relative z-10">12.01</span>
      </div>
      <div class="h-11 w-[75%] bg-white rounded-full flex items-center px-4 relative overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]">
        <span class="text-[13px] font-semibold text-neutral-900 relative z-10">13.01</span>
      </div>
      <div class="h-[52px] w-full bg-gradient-to-r from-[#A5B4FC] via-[#D8B4FE] to-[#A5B4FC] rounded-full flex items-center px-4 shadow-[inset_0_2px_4px_rgba(255,255,255,0.4)] border border-purple-200/20">
        <span class="text-[13px] font-semibold text-neutral-900">14.01</span>
      </div>
    </div>
  </div>

  <div class="bg-[#F8F9FA] rounded-[2rem] p-7 w-[300px] shadow-2xl shadow-neutral-200/40 border border-neutral-100">
    <div class="flex justify-between items-center mb-8">
      <span class="text-[15px] font-medium text-neutral-900">Calendar</span>
      <span class="text-[13px] font-medium text-indigo-500 cursor-pointer flex items-center gap-1.5">September 2024 <span class="text-[8px]">▼</span></span>
    </div>

    <div class="grid grid-cols-7 gap-y-4 gap-x-2 text-center text-[13px]">
      {#each ['S', 'M', 'T', 'W', 'T', 'F', 'S'] as d, i (`day-header-${i}`)}
        <div class="font-medium text-neutral-600 mb-2">{d}</div>
      {/each}

      <div class="text-neutral-300">29</div>
      <div class="text-neutral-300">30</div>
      <div class="text-neutral-300">31</div>
      <div class="text-neutral-300">01</div>
      <div class="bg-indigo-500 text-white w-8 h-8 flex items-center justify-center rounded-full mx-auto font-bold shadow-sm">02</div>
      <div class="text-neutral-300">03</div>
      <div class="text-neutral-300">04</div>

      <div class="text-neutral-300">05</div>
      <div class="text-neutral-300">06</div>
      <div class="text-neutral-900 font-bold">07</div>
      <div class="text-neutral-300">08</div>
      <div class="text-neutral-300">09</div>
      <div class="text-neutral-300">10</div>
      <div class="text-neutral-300">11</div>

      <div class="text-neutral-300">12</div>
      <div class="text-neutral-300">13</div>
      <div class="text-neutral-300">14</div>
      <div class="text-neutral-300">15</div>
      <div class="text-neutral-900 font-bold">16</div>
      <div class="text-neutral-900 font-bold">17</div>
      <div class="text-neutral-300">18</div>

      <div class="text-neutral-300">19</div>
      <div class="bg-emerald-300 text-neutral-900 w-8 h-8 flex items-center justify-center rounded-full mx-auto font-bold shadow-sm">20</div>
      <div class="text-neutral-300">21</div>
      <div class="text-neutral-300">22</div>
      <div class="text-neutral-300">23</div>
      <div class="text-neutral-300">24</div>
      <div class="text-neutral-300">25</div>

      <div class="text-neutral-300">26</div>
      <div class="text-neutral-300">27</div>
      <div class="text-neutral-300">28</div>
      <div class="text-neutral-300">29</div>
      <div class="text-neutral-300">30</div>
      <div class="text-neutral-300">31</div>
      <div class="text-neutral-300">31</div>
    </div>
  </div>
</div>
