<script lang="ts">
  import { Plane } from '@lucide/svelte';

  const CARD = 'bg-white rounded-[1.5rem] p-4 flex items-center justify-between shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-neutral-100';
</script>

<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div class="flex flex-col gap-4">
    <div class="bg-white rounded-[1.5rem] p-4 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-neutral-100">
      <div class="flex items-start justify-between mb-5">
        <div class="flex items-center gap-3">
          <div class="relative">
            <div class="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-lg">🧔🏽‍♂️</div>
            <div class="absolute -bottom-1 -right-1 w-[18px] h-[18px] bg-emerald-100 rounded-full flex items-center justify-center text-[10px] border-2 border-white">
              <span class="text-emerald-600">🏃</span>
            </div>
          </div>
          <div>
            <div class="font-semibold text-neutral-900 text-[15px]">Cody</div>
            <div class="text-[11px] text-neutral-500 font-medium mt-0.5">Awake · 20m ago</div>
          </div>
        </div>
        <div class="text-xl">😴</div>
      </div>

      <div class="flex justify-between text-[9px] font-bold text-neutral-500 tracking-widest mb-2.5">
        <span class="text-blue-600 text-[11px]">8h 47m</span>
        <span>TIME ASLEEP</span>
      </div>
      <div class="flex gap-1 h-1.5 w-full">
        <div class="bg-blue-600 rounded-full flex-[4]" ></div>
        <div class="bg-blue-600 rounded-full flex-[1]" ></div>
        <div class="bg-blue-600 rounded-full flex-[2]" ></div>
        <div class="bg-blue-600 rounded-full flex-[0.5]" ></div>
        <div class="bg-blue-600 rounded-full flex-[3]" ></div>
      </div>
    </div>

    <div class={CARD}>
      <div class="flex items-center gap-3">
        <div class="relative">
          <div class="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-lg">🤠</div>
          <div class="absolute -bottom-1 -right-1 w-[18px] h-[18px] bg-white rounded-full flex items-center justify-center text-[10px] border border-neutral-100 shadow-sm">
            🏠
          </div>
        </div>
        <div>
          <div class="flex items-center gap-1.5 font-semibold text-neutral-900 text-[15px]">
            Shane <span class="px-1.5 py-0.5 bg-emerald-100 text-emerald-700 text-[9px] rounded font-bold">80</span>
          </div>
          <div class="text-[12px] text-neutral-500 font-medium">is at home</div>
        </div>
      </div>
      <div class="text-neutral-300">😊</div>
    </div>

    <div class={CARD}>
      <div class="flex items-center gap-3">
        <div class="relative">
          <div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-lg">👨🏼‍🦳</div>
          <div class="absolute -bottom-1 -right-1 w-[18px] h-[18px] bg-white rounded-full flex items-center justify-center text-[10px] border border-neutral-100 shadow-sm">
            🚶‍♂️
          </div>
        </div>
        <div>
          <div class="font-semibold text-neutral-900 text-[15px]">Philip</div>
          <div class="text-[12px] text-neutral-500 font-medium">walked <span class="font-bold text-neutral-900">3,457</span> steps today</div>
        </div>
      </div>
      <div class="text-neutral-300">😊</div>
    </div>

    <div class={CARD}>
      <div class="flex items-center gap-3">
        <div class="relative">
          <div class="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-lg">👩🏻‍🦰</div>
          <div class="absolute -bottom-1 -right-1 w-[18px] h-[18px] bg-[#1DB954] rounded-full flex items-center justify-center text-[8px] border-2 border-white text-white">
            🎵
          </div>
        </div>
        <div>
          <div class="font-semibold text-neutral-900 text-[15px]">Courtney</div>
          <div class="text-[12px] text-neutral-500 font-medium">listening <span class="font-bold text-neutral-900">Hold Me Like a Grudge</span></div>
        </div>
      </div>
      <div class="text-neutral-300">😊</div>
    </div>
  </div>

  <div class="flex flex-col gap-4">
    <div class="bg-white rounded-[1.5rem] p-4 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-neutral-100 relative overflow-hidden">
      <div class="absolute top-2 right-4 text-blue-200 text-xl font-sans">✨</div>
      <div class="absolute top-4 right-16 text-blue-100 text-sm font-sans">✦</div>
      <div class="absolute top-7 right-24 text-blue-50 text-xs font-sans">⋆</div>

      <div class="flex items-center gap-3 relative z-10">
        <div class="relative">
          <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-lg">👴🏼</div>
          <div class="absolute -bottom-1 -right-1 text-lg">😴</div>
        </div>
        <div>
          <div class="font-semibold text-neutral-900 text-[15px]">Greg</div>
          <div class="text-[12px] text-neutral-500 font-medium">Sleeping...</div>
        </div>
        <div class="ml-auto text-neutral-300">😊</div>
      </div>
    </div>

    <div class="bg-white rounded-[1.5rem] p-4 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-neutral-100">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-3">
          <div class="relative">
            <div class="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-lg">👩🏾‍🦱</div>
            <div class="absolute -bottom-1 -right-1 w-[18px] h-[18px] bg-white rounded-full flex items-center justify-center text-[10px] border border-neutral-100 shadow-sm text-blue-500">
              ✈️
            </div>
          </div>
          <div>
            <div class="font-semibold text-neutral-900 text-[15px]">Victoria</div>
            <div class="text-[12px] text-neutral-500 font-medium">is flying to Osaka</div>
          </div>
        </div>
        <div class="text-neutral-300">😊</div>
      </div>

      <div class="bg-neutral-50/50 rounded-2xl p-3 border border-neutral-100/80">
        <div class="flex items-center gap-1.5 text-[10px] font-bold text-neutral-900 mb-2">
          <span class="text-[#E00034] text-[8px]">▲</span> DL 655
        </div>

        <div class="flex items-center justify-between mb-2">
          <div class="text-[15px] font-semibold text-neutral-900">LAX</div>
          <div class="flex-1 mx-3 relative flex items-center">
            <div class="h-1 bg-emerald-500 rounded-l-full" style="width: 60%" ></div>
            <Plane class="w-3.5 h-3.5 text-emerald-500 absolute left-[60%] -translate-x-1/2 fill-current" />
            <div class="h-1 bg-neutral-200 rounded-r-full flex-1" ></div>
          </div>
          <div class="text-[15px] font-semibold text-neutral-900">ITM</div>
        </div>

        <div class="flex justify-between text-[11px] font-medium text-neutral-900">
          <div>
            <div>Los Angeles</div>
            <div class="text-neutral-400 font-normal mt-0.5">1:50 PM PST</div>
          </div>
          <div class="text-right">
            <div>Osaka</div>
            <div class="text-neutral-400 font-normal mt-0.5">8:30 AM GMT+9</div>
          </div>
        </div>
      </div>
    </div>

    <div class={CARD}>
      <div class="flex items-center gap-3">
        <div class="relative">
          <div class="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-lg">👩🏻</div>
          <div class="absolute -bottom-1 -right-1 text-lg">🥱</div>
        </div>
        <div>
          <div class="font-semibold text-neutral-900 text-[15px]">Angel</div>
          <div class="text-[12px] text-neutral-500 font-medium">Slept <span class="font-bold text-blue-600">8hr 47min</span> · <span class="text-neutral-400">00:20-08:27</span></div>
        </div>
      </div>
      <div class="text-neutral-300">😊</div>
    </div>
  </div>
</div>
