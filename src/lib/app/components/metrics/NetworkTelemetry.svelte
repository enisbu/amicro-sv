<script lang="ts">
  import { Share, MoreVertical } from '@lucide/svelte';

  const pattern = [
    0,0,1,1,0,0,0,1,1,0,0,0,1,0,0,1,0,0,1,1,1,0,0,1,0,1,1,0,0,1,1,0,
    0,1,1,0,1,0,0,0,1,1,0,1,0,0,0,1,1,0,0,0,1,1,0,0,1,1,0,1,0,0,1,1,
    1,0,0,0,0,1,1,0,0,1,1,0,0,1,0,0,1,1,0,0,0,1,1,0,0,0,1,0,0,1,1,0,
    0,0,1,1,0,0,0,1,1,0,0,1,0,0,1,1,0,0,1,1,0,0,0,1,1,0,0,1,0,0,0,0
  ];

  const augustData = pattern;
  const septemberData = [...pattern].reverse();

  const META_LABEL = 'font-mono text-[10px] tracking-widest text-neutral-400 uppercase';
</script>

<div class="bg-[#121212] border border-white/5 rounded-[2rem] p-8 flex flex-col h-full">
  <div class="flex justify-between items-center mb-8">
    <h3 class="text-xl font-medium text-neutral-200">Network Telemetry</h3>
    <div class="flex items-center gap-4 text-neutral-500">
      <Share class="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
      <MoreVertical class="w-6 h-6 cursor-pointer hover:text-white transition-colors" />
    </div>
  </div>

  <div class="grid grid-cols-2 gap-8 mb-10">
    <div>
      <div class="font-mono text-[10px] tracking-[0.2em] text-neutral-500 uppercase mb-3">Average Finality</div>
      <div class="flex items-baseline gap-4">
        <span class="text-6xl font-normal tracking-tight text-white">1.8s</span>
        <span class="font-mono text-sm font-medium text-emerald-500">↑ 14.6%</span>
      </div>
    </div>
    <div>
      <div class="font-mono text-[10px] tracking-[0.2em] text-neutral-500 uppercase mb-3">Intents Finalized</div>
      <div class="flex items-baseline gap-4">
        <span class="text-6xl font-normal tracking-tight text-white">312,134</span>
        <span class="font-mono text-sm font-medium text-emerald-500">↑ 11.5%</span>
      </div>
    </div>
  </div>

  <div class="space-y-8 mt-auto">
    <div>
      <div class="flex justify-between items-center mb-3">
        <span class={META_LABEL}>August / Testnet V0</span>
        <span class={META_LABEL}>12,450 Intents</span>
      </div>
      <div class="grid grid-cols-[repeat(32,1fr)] gap-1">
        {#each augustData as isActive, i (i)}
          <div class="aspect-square rounded-[1px] {isActive === 1 ? 'bg-emerald-500' : 'bg-emerald-950/30'}" ></div>
        {/each}
      </div>
    </div>

    <div>
      <div class="flex justify-between items-center mb-3">
        <span class={META_LABEL}>September / V1 Sequencer</span>
        <span class={META_LABEL}>18,916 Intents</span>
      </div>
      <div class="grid grid-cols-[repeat(32,1fr)] gap-1">
        {#each septemberData as isActive, i (i)}
          <div class="aspect-square rounded-[1px] {isActive === 1 ? 'bg-emerald-500' : 'bg-emerald-950/30'}" ></div>
        {/each}
      </div>
    </div>
  </div>
</div>
