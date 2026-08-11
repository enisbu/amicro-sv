<script lang="ts">
  import { Send, MoreHorizontal } from '@lucide/svelte';
</script>

<div class="w-full max-w-[320px] mt-8">
  <div class="bg-white rounded-xl shadow-[0_8px_30px_-4px_rgba(0,0,0,0.05)] border border-neutral-100 mb-6 relative">
    <div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-full text-[11px] font-medium text-neutral-600 border border-neutral-100 shadow-sm z-10 whitespace-nowrap">
      Ads Feedback
    </div>

    <div class="p-4 pt-6 border-b border-neutral-50/50">
      <div class="flex gap-1.5 mb-4">
        <div class="w-1.5 h-1.5 rounded-full bg-neutral-200" ></div>
        <div class="w-1.5 h-1.5 rounded-full bg-neutral-200" ></div>
        <div class="w-1.5 h-1.5 rounded-full bg-neutral-200" ></div>
      </div>

      <div class="flex flex-col gap-2.5 mb-6">
        <div class="w-3/4 h-2 bg-neutral-100 rounded-full" ></div>
        <div class="w-full flex gap-2">
          <div class="flex-1 h-3.5 bg-blue-500 rounded-full" ></div>
          <div class="w-12 h-2 bg-neutral-100 rounded-full mt-0.5" ></div>
        </div>
        <div class="w-1/2 h-2 bg-neutral-100 rounded-full" ></div>
      </div>

      <div class="flex gap-2 relative mt-4">
        <div class="w-7 h-7 rounded-full bg-blue-100 border-2 border-white shadow-sm flex-shrink-0 flex items-center justify-center overflow-hidden">
          <div class="text-sm">👨🏻‍💼</div>
        </div>
        <div class="flex-1 bg-white border border-neutral-200 rounded-full pl-3 pr-1 py-1 flex items-center justify-between shadow-sm">
          <span class="text-[11px] text-neutral-800">Make it professional <span class="text-blue-500 font-medium">@Arthur</span></span>
          <button class="w-6 h-6 bg-neutral-900 rounded-full flex items-center justify-center text-white flex-shrink-0">
            <Send class="w-3 h-3 ml-0.5" />
          </button>
        </div>

        <div class="absolute -right-8 top-5 bg-blue-500 text-white text-[10px] font-medium px-2 py-0.5 rounded-full rounded-tl-none shadow-sm shadow-blue-500/20">
          Jack
        </div>
      </div>
    </div>
  </div>

  <div class="bg-white rounded-xl p-3 shadow-[0_8px_30px_-4px_rgba(0,0,0,0.05)] border border-neutral-100 relative ml-8">
    <div class="flex justify-between items-start mb-1.5">
      <div class="flex items-center gap-2">
        <div class="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center overflow-hidden">
          <div class="text-sm">👨🏽‍💼</div>
        </div>
        <div>
          <span class="text-xs font-semibold text-neutral-900">Arthur T.</span>
          <span class="text-[10px] text-neutral-400 font-medium ml-1.5">5 min ago</span>
        </div>
      </div>
      <MoreHorizontal class="w-4 h-4 text-neutral-400" />
    </div>

    <p class="text-[11px] text-neutral-800 mb-2.5 pl-9">
      Okay Jack, I'll need one day to rework it.
    </p>

    <div class="flex gap-1.5 pl-9">
      <div class="h-1.5 w-8 bg-purple-500 rounded-full" ></div>
      <div class="h-1.5 w-24 bg-purple-500 rounded-full" ></div>
    </div>

    <div class="absolute -left-4 -bottom-4 bg-purple-500 text-white text-[10px] font-medium px-2 py-0.5 rounded-full rounded-tr-none shadow-sm shadow-purple-500/20">
      Arthur
    </div>
  </div>
</div>
