<script lang="ts">
  import { motion } from 'motion-sv';
  import type { MetricConfig } from '$lib/app/data/metrics.js';
  import {
    TrendingUp, Zap, Activity, Heart, ShieldCheck, Wifi, Cpu, Layers,
    Check, ArrowUpRight, Share2, MoreHorizontal, ChevronDown, Star,
    Crown, ArrowUp, ArrowDown, HelpCircle, DollarSign
  } from '@lucide/svelte';
  import { getAppState } from '$lib/app/app-state.svelte.js';

  interface Props {
    config: MetricConfig;
  }

  let { config }: Props = $props();

  const app = getAppState();

  let stockRange = $state<'1D' | '1W' | '1M' | '1Y'>('1W');
  let viewsRange = $state<'Day' | 'Week' | 'Month'>('Day');
  let salesAnalyticsRange = $state<'Monthly' | 'Weekly'>('Weekly');
  let salesTargetRange = $state<'Monthly' | 'Yearly'>('Yearly');
  let timerActive = $state(false);
  let decibelLevel = $state<40 | 60>(40);

  const isDark = $derived(app.theme === 'dark');

  const CONTAINER =
    'w-full h-full p-4 flex flex-col justify-between select-none font-sans transition-colors duration-300 text-black dark:text-white';
  const RING_SVG = 'absolute inset-0 w-full h-full transform -rotate-90';
  const CARD_SHELL = 'w-full h-full p-4 flex flex-col justify-between select-none font-sans rounded-[24px] border transition-colors duration-300 bg-[#FAFAFA] text-neutral-900 border-neutral-200 shadow-sm dark:bg-[#18181A] dark:text-white dark:border-white/10 dark:shadow-none';
  const META_ROW = 'flex items-center gap-1.5 text-neutral-600 dark:text-neutral-300';
</script>

{#if config.interactionType === 'cacheable-bandwidth-cost'}
  <div class={CARD_SHELL}>
    <div>
      <div class="flex items-baseline gap-1.5">
        <span class="text-3xl font-black tracking-tight">90.5 GB</span>
        <span class="text-base font-bold text-neutral-400 font-normal">(69.8%)</span>
      </div>
      <div class="flex items-center justify-between text-xs font-semibold mt-1">
        <div class="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400">
          <span class="w-2 h-2 rounded-full bg-[#A855F7]" ></span>
          <span>Cacheable Bandwidth</span>
        </div>
        <div class="flex items-center gap-1 text-neutral-600 dark:text-neutral-300 font-bold">
          <span class="w-3.5 h-3.5 rounded-full bg-neutral-200 dark:bg-white/15 text-[10px] flex items-center justify-center font-black">$</span>
          <span>$9.50</span>
          <HelpCircle class="w-3.5 h-3.5 text-neutral-400 cursor-pointer" />
        </div>
      </div>
    </div>

    <div class="my-2">
      <div class="w-full h-4 bg-neutral-200 dark:bg-neutral-800 rounded-full flex items-center p-0.5 overflow-hidden gap-0.5">
        <div class="h-full w-[25%] bg-[#1E1B4B] dark:bg-[#312E81] rounded-l-full" ></div>
        <div class="h-full w-[20%] bg-[#A855F7]" ></div>
        <div class="h-full flex-1 rounded-r-full bg-[#F3E8FF] dark:bg-[#2E1065] relative overflow-hidden">
          <svg class="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="bandwidth-stripes" width="8" height="8" patternTransform="rotate(90 0 0)" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="0" y2="8" stroke="#A855F7" stroke-width="4" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#bandwidth-stripes)" />
          </svg>
        </div>
      </div>
    </div>

    <div class="space-y-1.5 text-xs font-semibold">
      <div class="flex items-center justify-between text-neutral-600 dark:text-neutral-300">
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-[#A855F7]" ></span>
          <span>Cached <strong class="text-black dark:text-white font-bold">12.8 GB</strong> <span class="text-neutral-400 font-normal">(9.8%)</span></span>
        </div>
      </div>
      <div class="flex items-center justify-between text-neutral-600 dark:text-neutral-300">
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-[#1E1B4B] dark:bg-white" ></span>
          <span>Non-Cacheable <strong class="text-black dark:text-white font-bold">26.3 GB</strong> <span class="text-neutral-400 font-normal">(20.3%)</span></span>
        </div>
      </div>
      <div class="pt-1 border-t border-neutral-100 dark:border-white/10 text-neutral-500 font-medium">
        Total <strong class="text-black dark:text-white font-bold">129.6 GB</strong>
      </div>
    </div>
  </div>

{:else if config.interactionType === 'sales-analytics-dual-bars'}
  <div class="w-full h-full p-4 flex flex-col justify-between select-none font-sans rounded-[24px] border transition-colors duration-300 bg-[#F9FAFB] text-neutral-900 border-neutral-200 shadow-sm dark:bg-[#18181A] dark:text-white dark:border-white/10 dark:shadow-none">
    <div class="flex items-start justify-between">
      <div>
        <div class="text-base font-bold tracking-tight">Sales analytics</div>
        <div class="text-[11px] text-neutral-400 font-medium mt-1">Total units sold</div>
        <div class="flex items-baseline gap-1 mt-0.5">
          <span class="text-2xl font-black tracking-tight">345</span>
          <span class="text-sm font-bold text-neutral-400">/500</span>
        </div>
      </div>
      <div class="flex items-center p-0.5 rounded-full border bg-neutral-100 border-neutral-200 dark:bg-white/5 dark:border-white/10">
        {#each (['Monthly', 'Weekly'] as const) as r (r)}
          <button
            onclick={(e) => { e.stopPropagation(); app.haptic('light'); salesAnalyticsRange = r; }}
            class="px-3 py-1 text-[10px] font-bold rounded-full transition-colors cursor-pointer border-0 {salesAnalyticsRange === r ? 'bg-white text-black shadow-xs dark:shadow-none' : 'text-neutral-400 hover:text-white'}"
          >
            {r}
          </button>
        {/each}
      </div>
    </div>
    <div class="p-3 rounded-2xl border flex flex-col justify-between h-36 mt-1 bg-white border-neutral-100 shadow-xs dark:bg-[#121214] dark:border-white/5 dark:shadow-none">
      <div class="flex items-center gap-3 text-[10px] font-bold">
        <span class={META_ROW}>
          <span class="w-2 h-2 rounded-xs bg-[#EA580C]" ></span>
          <span>Total Sales</span>
        </span>
        <span class={META_ROW}>
          <span class="w-2 h-2 rounded-xs bg-[#FDBA74]" ></span>
          <span>Total Earnings</span>
        </span>
      </div>
      <div class="flex items-end justify-between px-2 h-20">
        <div class="w-6 bg-neutral-200/50 dark:bg-neutral-800/40 rounded-lg h-[40%]" ></div>
        <div class="flex items-end gap-1 h-full">
          <motion.div initial={{ height: 0 }} animate={{ height: '75%' }} transition={{ duration: 0.6 }} class="w-6 bg-[#EA580C] rounded-lg shadow-sm" />
          <motion.div initial={{ height: 0 }} animate={{ height: '90%' }} transition={{ duration: 0.6, delay: 0.1 }} class="w-6 bg-[#FDBA74] rounded-lg shadow-sm" />
        </div>
        <div class="w-6 bg-neutral-200/50 dark:bg-neutral-800/40 rounded-lg h-[55%]" ></div>
        <div class="w-6 bg-neutral-200/50 dark:bg-neutral-800/40 rounded-lg h-[45%]" ></div>
      </div>
      <div class="flex justify-between px-2 text-[9px] font-bold text-neutral-400 uppercase">
        <span>Sep</span>
        <span class="text-black dark:text-white font-black">Oct</span>
        <span>Nov</span>
        <span>Dec</span>
      </div>
    </div>
  </div>

{:else if config.interactionType === 'sales-target-segmented-arc'}
  <div class="w-full h-full p-4 flex flex-col justify-between select-none font-sans rounded-[24px] border transition-colors duration-300 bg-[#F9FAFB] text-neutral-900 border-neutral-200 shadow-sm dark:bg-[#18181A] dark:text-white dark:border-white/10 dark:shadow-none">
    <div class="flex items-center justify-between">
      <span class="text-base font-bold tracking-tight">Sales target</span>
      <div class="flex items-center p-0.5 rounded-full border bg-neutral-100 border-neutral-200 dark:bg-white/5 dark:border-white/10">
        {#each (['Monthly', 'Yearly'] as const) as r (r)}
          <button
            onclick={(e) => { e.stopPropagation(); app.haptic('light'); salesTargetRange = r; }}
            class="px-3 py-1 text-[10px] font-bold rounded-full transition-colors cursor-pointer border-0 {salesTargetRange === r ? 'bg-white text-black shadow-xs dark:shadow-none' : 'text-neutral-400 hover:text-white'}"
          >
            {r}
          </button>
        {/each}
      </div>
    </div>
    <div class="p-3 rounded-2xl border flex flex-col items-center justify-between h-44 mt-1 relative overflow-hidden bg-white border-neutral-100 shadow-xs dark:bg-[#121214] dark:border-white/5 dark:shadow-none">
      <div class="flex items-center gap-3 text-[10px] font-bold w-full justify-start">
        <span class={META_ROW}>
          <span class="w-2 h-2 rounded-full bg-[#FDBA74]" ></span>
          <span>Property listed</span>
        </span>
        <span class={META_ROW}>
          <span class="w-2 h-2 rounded-full bg-[#EA580C]" ></span>
          <span>Property delivered</span>
        </span>
      </div>
      <div class="relative w-52 h-28 flex items-center justify-center mt-2">
        <svg viewBox="0 0 200 110" class="w-full h-full overflow-visible">
          {#each Array.from({ length: 16 }) as _, i (i)}
            {@const angle = -180 + i * (180 / 15)}
            {@const isListed = i < 5}
            {@const isDelivered = i >= 5 && i < 12}
            <g transform="rotate({angle} 100 100)">
              <rect
                x="93" y="10" width="14" height="28" rx="4"
                fill={isListed ? '#FDBA74' : isDelivered ? '#EA580C' : isDark ? '#26262B' : '#E5E7EB'}
              />
            </g>
          {/each}
        </svg>
        <div class="absolute bottom-1 flex flex-col items-center">
          <span class="text-3xl font-black tracking-tight">70%</span>
          <span class="text-[10px] font-semibold text-neutral-400">Achieved</span>
        </div>
      </div>
    </div>
  </div>

{:else if config.interactionType === 'sales-overview-radial-dashboard'}
  <div class={CARD_SHELL}>
    <div class="flex items-center justify-between">
      <span class="text-base font-bold tracking-tight">Sales Overview</span>
      <div class="w-7 h-7 rounded-full bg-neutral-100 dark:bg-white/10 flex items-center justify-center cursor-pointer">
        <MoreHorizontal class="w-4 h-4 text-neutral-500 dark:text-neutral-300" />
      </div>
    </div>
    <div class="bg-[#F3F0FF] dark:bg-[#2E1A47] text-[#6D28D9] dark:text-[#DDD6FE] px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 my-1">
      <Crown class="w-4 h-4 fill-[#6D28D9] dark:fill-[#DDD6FE]" />
      <span>You're the top <strong class="text-[#4C1D95] dark:text-white">17%</strong> of performers</span>
    </div>
    <div class="relative w-48 h-24 flex items-center justify-center mx-auto my-1">
      <svg viewBox="0 0 200 110" class="w-full h-full overflow-visible">
        {#each Array.from({ length: 14 }) as _, i (i)}
          {@const angle = -180 + i * (180 / 13)}
          {@const isActive = i < 9}
          <g transform="rotate({angle} 100 100)">
            <rect
              x="93" y="10" width="14" height="28" rx="4"
              fill={isActive ? '#6366F1' : isDark ? '#26262B' : '#E5E7EB'}
            />
          </g>
        {/each}
      </svg>
      <div class="absolute bottom-0 flex flex-col items-center">
        <span class="text-2xl font-black tracking-tight">67.2%</span>
        <span class="text-[9px] font-semibold text-neutral-400">sales goals</span>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-2 mt-1">
      <div class="p-2.5 rounded-xl border flex flex-col justify-between bg-white border-neutral-200/80 shadow-xs dark:bg-white/5 dark:border-white/5 dark:shadow-none">
        <div class="flex items-center justify-between">
          <span class="text-[10px] font-semibold text-neutral-500">Number of Sales</span>
          <span class="px-1.5 py-0.5 rounded-md bg-[#6366F1]/15 text-[#6366F1] text-[9px] font-bold">3.5% ↗</span>
        </div>
        <div class="text-xl font-black tracking-tight mt-1">1,304</div>
      </div>
      <div class="p-2.5 rounded-xl border flex flex-col justify-between bg-white border-neutral-200/80 shadow-xs dark:bg-white/5 dark:border-white/5 dark:shadow-none">
        <div class="flex items-center justify-between">
          <span class="text-[10px] font-semibold text-neutral-500">Total Revenue</span>
          <span class="px-1.5 py-0.5 rounded-md bg-neutral-900 text-white text-[9px] font-bold">4.5% ↘</span>
        </div>
        <div class="text-xl font-black tracking-tight mt-1">$21.1K</div>
      </div>
    </div>
  </div>

{:else if config.interactionType === 'users-growth-pill-progress'}
  <div class="w-full h-full p-4 flex flex-col justify-between select-none font-sans bg-[#0E0E10] text-white rounded-[24px] border border-white/10">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <Star class="w-5 h-5 fill-white text-white" />
        <span class="text-sm font-bold tracking-tight">Users growth</span>
      </div>
      <div class="w-7 h-7 rounded-full bg-neutral-700 overflow-hidden border border-white/20">
        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Avatar" class="w-full h-full object-cover" />
      </div>
    </div>
    <div class="flex items-baseline gap-2 my-1">
      <span class="text-3xl font-bold text-[#818CF8]">↗</span>
      <span class="text-4xl font-black tracking-tight">+88.3%</span>
      <span class="text-[10px] font-bold text-neutral-400 flex items-center gap-0.5">
        +1.78% <TrendingUp class="w-3 h-3" />
      </span>
    </div>
    <div class="space-y-2 my-1">
      <div class="w-full h-9 bg-[#1A1A1E] rounded-full flex items-center p-1">
        <div class="w-[45%] h-full bg-white text-black rounded-full flex items-center px-3 text-xs font-bold">12.01</div>
      </div>
      <div class="w-full h-9 bg-[#1A1A1E] rounded-full flex items-center p-1">
        <div class="w-[78%] h-full bg-white text-black rounded-full flex items-center px-3 text-xs font-bold">13.01</div>
      </div>
      <div class="w-full h-9 bg-gradient-to-r from-[#2E284A] to-[#A5B4FC] rounded-full flex items-center px-3 text-xs font-bold text-white shadow-md">14.01</div>
    </div>
  </div>

{:else if config.interactionType === 'overview-bar-scrubber-card'}
  <div class={CARD_SHELL}>
    <div class="flex items-center justify-between">
      <span class="text-base font-bold tracking-tight">Overview</span>
      <div class="px-3 py-1 rounded-xl text-xs font-semibold flex items-center gap-1 border cursor-pointer bg-white border-neutral-200 text-neutral-700 shadow-xs dark:bg-white/10 dark:border-white/15 dark:text-white dark:shadow-none">
        <span>Last Month</span>
        <ChevronDown class="w-3 h-3 text-neutral-400" />
      </div>
    </div>
    <div class="flex items-baseline gap-2 my-0.5">
      <div>
        <div class="text-[10px] text-neutral-400 font-semibold uppercase">Avg Per month</div>
        <div class="text-2xl font-black tracking-tight">1,860<span class="text-neutral-400 font-normal text-base">/3K</span></div>
      </div>
      <span class="px-2 py-0.5 rounded-md bg-[#22C55E]/15 text-[#22C55E] text-[10px] font-bold flex items-center gap-0.5">50,2% ▲</span>
    </div>
    <div class="relative w-full h-28 my-1 flex items-end justify-between px-1">
      {#each [
        { month: 'Apr', h: '45%' },
        { month: 'May', h: '30%' },
        { month: 'Jun', h: '75%' },
        { month: 'Jul', h: '50%' },
        { month: 'Aug', h: '85%', active: true },
        { month: 'Sep', h: '40%' },
        { month: 'Oct', h: '60%' },
        { month: 'Nov', h: '70%' },
      ] as item, i (i)}
        <div class="flex flex-col items-center gap-1 flex-1 relative">
          {#if item.active}
            <div class="absolute -top-11 z-20 flex flex-col items-center">
              <div class="bg-[#1E1E22] text-white text-[10px] font-bold px-2.5 py-1 rounded-xl shadow-xl border border-white/10 text-center">
                <div>August 2025</div>
                <div class="text-neutral-300">120 pcs</div>
              </div>
              <div class="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-[#1E1E22]" ></div>
            </div>
          {/if}
          <div
            class="w-7 rounded-2xl relative overflow-hidden flex items-start justify-center {item.active ? 'bg-[#27272A] border-2 border-white/20 shadow-md' : 'bg-neutral-200/60 dark:bg-neutral-800/40'}"
            style="height: {item.h}"
          >
            <svg class="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="stripe-{i}" width="16" height="16" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="0" x2="0" y2="16" stroke="#FFFFFF" stroke-width="8" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#stripe-{i})" />
            </svg>
            {#if item.active}
              <div class="w-2.5 h-2.5 rounded-full bg-white border-2 border-[#27272A] mt-1 z-10" ></div>
            {/if}
          </div>
          <span class="text-[9px] font-bold {item.active ? 'text-black dark:text-white font-black' : 'text-neutral-400'}">{item.month}</span>
        </div>
      {/each}
    </div>
  </div>

{:else if config.interactionType === 'network-telemetry-matrix'}
  <div class="w-full h-full p-4 flex flex-col justify-between select-none font-mono bg-[#0B0D0E] text-white rounded-[24px] border border-white/10">
    <div class="flex items-center justify-between">
      <span class="text-sm font-sans font-bold tracking-tight">Network Telemetry</span>
      <div class="flex items-center gap-2 text-neutral-500">
        <Share2 class="w-3.5 h-3.5 hover:text-white transition-colors cursor-pointer" />
        <MoreHorizontal class="w-3.5 h-3.5 hover:text-white transition-colors cursor-pointer" />
      </div>
    </div>
    <div class="grid grid-cols-2 gap-3 my-1">
      <div>
        <div class="text-[8px] font-bold text-neutral-500 uppercase tracking-widest">Average Finality</div>
        <div class="flex items-baseline gap-1 mt-0.5">
          <span class="text-2xl font-black font-sans">1.8s</span>
          <span class="text-[9px] font-bold text-[#22C55E] flex items-center gap-0.5">↑ 14.6%</span>
        </div>
      </div>
      <div>
        <div class="text-[8px] font-bold text-neutral-500 uppercase tracking-widest">Intents Finalized</div>
        <div class="flex items-baseline gap-1 mt-0.5">
          <span class="text-2xl font-black font-sans">312,134</span>
          <span class="text-[9px] font-bold text-[#22C55E] flex items-center gap-0.5">↑ 11.5%</span>
        </div>
      </div>
    </div>
    <div class="space-y-1">
      <div class="flex justify-between text-[8px] font-bold text-neutral-500 tracking-wider">
        <span>AUGUST / TESTNET V0</span>
        <span>12,430 INTENTS</span>
      </div>
      <div class="grid grid-cols-16 gap-0.5 h-6">
        {#each Array.from({ length: 48 }) as _, i (i)}
          <div class="w-full h-full rounded-[1px] {[3, 7, 12, 18, 22, 29, 34, 41, 45].includes(i) ? 'bg-[#22C55E]' : 'bg-[#142319]'}" ></div>
        {/each}
      </div>
    </div>
    <div class="space-y-1">
      <div class="flex justify-between text-[8px] font-bold text-neutral-500 tracking-wider">
        <span>SEPTEMBER / V1 SEQUENCER</span>
        <span>18,916 INTENTS</span>
      </div>
      <div class="grid grid-cols-16 gap-0.5 h-6">
        {#each Array.from({ length: 48 }) as _, i (i)}
          <div class="w-full h-full rounded-[1px] {[2, 6, 11, 15, 24, 31, 38, 43, 47].includes(i) ? 'bg-[#22C55E]' : 'bg-[#142319]'}" ></div>
        {/each}
      </div>
    </div>
  </div>

{:else if config.interactionType === 'progress-indicator-piano'}
  <div class="w-full h-full p-4 flex flex-col justify-between select-none font-sans bg-[#0E0E10] text-white rounded-[24px] border border-white/10">
    <div class="flex items-center justify-between">
      <span class="text-xs font-semibold text-neutral-300">Progress Indicator</span>
      <MoreHorizontal class="w-4 h-4 text-neutral-500 cursor-pointer" />
    </div>
    <div class="text-[11px] text-neutral-400 font-medium my-0.5">
      You are on track to finish the goal three days early
    </div>
    <div class="w-full h-px bg-white/10 my-1" ></div>
    <div class="flex items-baseline gap-2 my-1">
      <span class="text-3xl font-black tracking-tight">66%</span>
      <span class="px-2 py-0.5 rounded-full bg-white/10 text-white text-[10px] font-bold border border-white/15 flex items-center gap-1">
        <span>↗ 71 avg</span>
      </span>
      <span class="text-[10px] text-neutral-500 font-medium">vs. the last period</span>
    </div>
    <div class="flex items-center gap-1 h-12 w-full mt-2">
      {#each Array.from({ length: 28 }) as _, i (i)}
        <div class="flex-1 h-full rounded-xs transition-colors {i < 18 ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.4)]' : 'bg-[#26262B]'}" ></div>
      {/each}
    </div>
  </div>

{:else if config.interactionType === 'server-performance-step-bars'}
  <div class="w-full h-full p-4 flex flex-col justify-between select-none font-sans bg-[#0E0E10] text-white rounded-[24px] border border-white/10">
    <div class="flex items-center justify-between">
      <span class="text-xs font-semibold text-neutral-400">Server Performance Metrics</span>
      <ArrowUpRight class="w-4 h-4 text-neutral-400" />
    </div>
    <div class="text-4xl font-black tracking-tight my-1">+45%</div>
    <div class="flex items-end justify-between gap-1.5 h-20 mt-2 px-1">
      {#each [15, 22, 30, 45, 58, 72, 90] as h, i (i)}
        <div class="flex-1 bg-[#222226] rounded-t-sm relative overflow-hidden flex flex-col justify-end" style="height: {h}%">
          <div class="w-full h-1 bg-white" ></div>
        </div>
      {/each}
    </div>
  </div>

{:else if config.interactionType === 'credit-score-barcode-meter'}
  <div class={CARD_SHELL}>
    <div class="flex items-start justify-between">
      <div>
        <div class="text-base font-bold tracking-tight">Credit Score</div>
        <div class="text-[11px] text-neutral-400 font-medium">Your current credit rating.</div>
      </div>
      <div class="px-3 py-1 rounded-xl text-xs font-semibold flex items-center gap-1 border cursor-pointer bg-white border-neutral-200 text-neutral-700 shadow-xs dark:bg-white/10 dark:border-white/15 dark:text-white dark:shadow-none">
        <span>Weekly</span>
        <ChevronDown class="w-3 h-3 text-neutral-400" />
      </div>
    </div>
    <div class="flex items-baseline gap-2 my-1">
      <span class="text-4xl font-black tracking-tight">88<span class="text-neutral-400 font-normal text-2xl">/100</span></span>
      <span class="text-[11px] font-bold text-[#22C55E]">▲ 13.6%</span>
      <span class="text-[11px] text-neutral-400 font-medium">vs last month</span>
    </div>
    <div class="flex items-center justify-between gap-1 h-9 w-full mt-2">
      {#each Array.from({ length: 42 }) as _, i (i)}
        <div class="w-1 h-full rounded-full {i < 36 ? 'bg-[#22C55E]' : 'bg-neutral-200 dark:bg-white/10'}" ></div>
      {/each}
    </div>
  </div>

{:else if config.interactionType === 'views-hourly-wave-chart'}
  <div class="w-full h-full p-4 flex flex-col justify-between select-none font-sans rounded-[24px] border transition-colors duration-300 bg-white text-neutral-900 border-neutral-200 shadow-sm dark:bg-[#18181A] dark:text-white dark:border-white/10 dark:shadow-none">
    <div class="flex items-start justify-between">
      <div>
        <div class="text-base font-bold tracking-tight">Views</div>
        <div class="flex items-baseline gap-1.5 mt-0.5">
          <span class="text-3xl font-black tracking-tight">12.7K</span>
          <span class="text-[10px] font-bold text-[#22C55E]">↗ 2.6%</span>
          <span class="text-[9px] text-neutral-400 font-bold uppercase">VS PREV. DAY</span>
        </div>
      </div>
      <div class="flex items-center p-0.5 rounded-xl border bg-neutral-100 border-neutral-200 dark:bg-white/5 dark:border-white/10">
        {#each (['Day', 'Week', 'Month'] as const) as p (p)}
          <button
            onclick={(e) => { e.stopPropagation(); app.haptic('light'); viewsRange = p; }}
            class="px-2.5 py-1 text-[10px] font-bold rounded-lg transition-colors cursor-pointer border-0 {viewsRange === p ? 'bg-white text-black shadow-xs dark:shadow-none' : 'text-neutral-400 hover:text-white'}"
          >
            {p}
          </button>
        {/each}
      </div>
    </div>
    <div class="relative w-full h-20 my-1">
      <svg class="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 40">
        <line x1="0" y1="20" x2="100" y2="20" stroke="#F59E0B" stroke-width="1" stroke-dasharray="3 3" />
        <text x="92" y="18" fill="#F59E0B" font-size="4" font-weight="bold">AVG</text>
        <path d="M0,25 Q15,30 25,12 T50,15 T75,18 T100,28 L100,40 L0,40 Z" fill="url(#blue-wave-grad)" opacity="0.25" />
        <motion.path
          d="M0,25 Q15,30 25,12 T50,15 T75,18 T100,28"
          fill="none" stroke="#3B82F6" stroke-width="2.5" stroke-linecap="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8 }}
        />
        <defs>
          <linearGradient id="blue-wave-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.6" />
            <stop offset="100%" stop-color="#3B82F6" stop-opacity="0.0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
    <div class="flex justify-between text-[9px] font-bold text-neutral-400 uppercase px-1">
      <span>12 AM</span>
      <span>4 AM</span>
      <span>8 AM</span>
      <span>12 PM</span>
      <span>4 PM</span>
      <span>8 PM</span>
    </div>
  </div>

{:else if config.interactionType === 'timer-preparation-segmented'}
  <div class="w-full h-full p-4 flex flex-col justify-between select-none font-sans bg-[#12141A] text-white rounded-[24px]">
    <div class="flex items-start justify-between">
      <div>
        <div class="text-4xl font-black tracking-tight leading-none font-sans">25:04</div>
        <div class="text-xs font-semibold text-neutral-400 mt-1">Left for preparation</div>
      </div>
      <div class="w-8 h-8 rounded-full bg-[#1A3660] text-[#3B82F6] flex items-center justify-center border border-[#2563EB]/30">
        <Check class="w-4 h-4 stroke-[3]" />
      </div>
    </div>
    <div class="relative pt-6">
      <div class="absolute top-0 right-3 transform -translate-y-full flex flex-col items-center">
        <div class="bg-[#2563EB] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
          <span class="w-3.5 h-3.5 rounded-full bg-white text-[#2563EB] text-[9px] font-black flex items-center justify-center">1</span>
          <span>Preparation</span>
        </div>
        <div class="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-[#2563EB]" ></div>
      </div>
      <div class="relative w-full h-11 bg-[#1A2333] rounded-xl p-1 flex items-center justify-between gap-1 overflow-hidden">
        {#each [1, 2, 3] as seg (seg)}
          <div class="flex-1 h-full bg-[#121B2B] rounded-lg" ></div>
        {/each}
        <div class="relative flex-1 h-full bg-[#2563EB] rounded-lg overflow-hidden flex items-center justify-center">
          <svg class="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="stripes" width="20" height="20" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="0" y2="20" stroke="#FFFFFF" stroke-width="10" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#stripes)" />
          </svg>
        </div>
        <div class="absolute top-0 bottom-0 right-10 w-0.5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] z-10" ></div>
      </div>
    </div>
  </div>

{:else if config.interactionType === 'noise-decibel-level'}
  <div
    onclick={(e) => { e.stopPropagation(); app.haptic('light'); decibelLevel = decibelLevel === 40 ? 60 : 40; }}
    onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); app.haptic('light'); decibelLevel = decibelLevel === 40 ? 60 : 40; } }}
    role="button"
    tabindex="0"
    class="w-full h-full p-4 flex flex-col justify-between select-none font-sans rounded-[24px] cursor-pointer transition-colors duration-300 bg-[#EAEBED] text-neutral-900 dark:bg-[#18181A] dark:text-white dark:border dark:border-white/10"
  >
    <div class="flex items-start justify-between">
      <span class="text-xs font-semibold text-neutral-400">Current noise level</span>
      <div class="flex items-end gap-1 h-4">
        <div class="w-1 rounded-full {decibelLevel === 40 ? 'h-2 bg-[#22C55E]' : 'h-2 bg-[#EAB308]'}" ></div>
        <div class="w-1 rounded-full {decibelLevel === 40 ? 'h-3 bg-[#22C55E]' : 'h-3 bg-[#EAB308]'}" ></div>
        <div class="w-1 rounded-full {decibelLevel === 40 ? 'h-4 bg-[#22C55E]' : 'h-4 bg-[#EAB308]'}" ></div>
      </div>
    </div>
    <div class="flex items-baseline gap-1 my-1">
      <span class="text-5xl font-black tracking-tight leading-none font-sans">{decibelLevel}</span>
      <span class="text-base font-bold text-neutral-400">dB</span>
    </div>
    <div class="flex justify-between text-[11px] font-semibold text-neutral-400 px-0.5 mb-1">
      <span>Low</span>
      <span>High</span>
    </div>
    <div class="flex items-center gap-2">
      <div class="relative flex-1 h-12 rounded-2xl flex items-center justify-start px-4 overflow-hidden {decibelLevel === 40 ? 'bg-[#22C55E] text-white shadow-md' : 'bg-[#EAB308] text-white shadow-md'}">
        <svg class="absolute inset-0 w-full h-full opacity-25" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="db-stripes" width="16" height="16" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="16" stroke="#FFFFFF" stroke-width="8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#db-stripes)" />
        </svg>
        <span class="relative z-10 text-base font-black font-sans">{decibelLevel}</span>
      </div>
      <div class="w-1 h-8 bg-neutral-400/40 rounded-full" ></div>
      <div class="flex-1 h-12 rounded-2xl flex items-center justify-end px-4 font-black text-base font-sans bg-neutral-300/80 text-neutral-500 dark:bg-white/10 dark:text-neutral-400">
        120
      </div>
    </div>
  </div>

{:else if config.interactionType === 'mono-stock'}
  <div class={CONTAINER}>
    <div class="flex items-start justify-between">
      <div>
        <div class="flex items-center gap-1.5 font-bold text-[10px] tracking-wider uppercase opacity-60">
          <span>AAPL</span>
          <span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse" ></span>
        </div>
        <div class="text-2xl font-black tracking-tight mt-0.5">$182.40</div>
        <div class="flex items-center gap-1 text-[10px] font-bold opacity-80 mt-0.5">
          <TrendingUp class="w-3 h-3" />
          <span>+$4.15 (+2.33%)</span>
        </div>
      </div>
      <div class="flex items-center p-0.5 rounded-full border bg-neutral-100 border-black/10 dark:bg-neutral-900 dark:border-white/10">
        {#each (['1D', '1W', '1M', '1Y'] as const) as r (r)}
          <button
            onclick={(e) => { e.stopPropagation(); app.haptic('light'); stockRange = r; }}
            class="px-2 py-0.5 text-[9px] font-bold rounded-full transition-colors cursor-pointer border-0 {stockRange === r ? 'bg-black text-white dark:bg-white dark:text-black' : 'text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white'}"
          >
            {r}
          </button>
        {/each}
      </div>
    </div>
    <div class="relative w-full h-16 mt-2">
      <svg class="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 40">
        <path d="M0,30 Q15,10 30,25 T60,15 T90,5 L100,2 L100,40 L0,40 Z" fill={isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'} />
        <motion.path
          d="M0,30 Q15,10 30,25 T60,15 T90,5 L100,2"
          fill="none" stroke={isDark ? '#FFFFFF' : '#000000'} stroke-width="2.5" stroke-linecap="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8 }}
        />
        <circle cx="100" cy="2" r="3" fill={isDark ? '#FFFFFF' : '#000000'} />
      </svg>
    </div>
  </div>

{:else if config.interactionType === 'mono-revenue'}
  <div class={CONTAINER}>
    <div class="flex items-center justify-between">
      <div>
        <div class="text-[10px] font-bold opacity-50 uppercase tracking-wider">Revenue Stream</div>
        <div class="text-2xl font-black mt-0.5">$94,820.00</div>
      </div>
      <div class="p-2 rounded-xl border bg-black/5 border-black/10 text-black dark:bg-white/5 dark:border-white/10 dark:text-white">
        <Zap class="w-4 h-4" />
      </div>
    </div>
    <div class="relative w-full h-16 mt-2">
      <svg class="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 40">
        <path d="M0,35 Q20,10 40,20 T80,5 L100,12 L100,40 L0,40 Z" fill={isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'} />
        <motion.path
          d="M0,35 Q20,10 40,20 T80,5 L100,12"
          fill="none" stroke={isDark ? '#FFFFFF' : '#000000'} stroke-width="2.5" stroke-linecap="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8 }}
        />
      </svg>
    </div>
  </div>

{:else if config.interactionType === 'mono-credit'}
  <div class="w-full h-full p-4 flex flex-col items-center justify-center text-center select-none font-sans">
    <div class="relative w-24 h-24 flex items-center justify-center mb-1">
      <svg class="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
        <path class="text-neutral-200 dark:text-neutral-800" stroke-width="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
        <motion.path
          class="text-black dark:text-white" stroke-width="3.5" stroke-dasharray="78, 100" stroke-linecap="round" stroke="currentColor" fill="none"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          initial={{ strokeDasharray: '0, 100' }} animate={{ strokeDasharray: '78, 100' }} transition={{ duration: 0.8 }}
        />
      </svg>
      <div class="absolute flex flex-col items-center">
        <span class="text-xl font-black text-black dark:text-white">785</span>
        <span class="text-[8px] font-bold opacity-60 uppercase">Score</span>
      </div>
    </div>
    <span class="text-[9px] font-bold px-2 py-0.5 rounded-full border bg-black/10 text-black border-black/20 dark:bg-white/10 dark:text-white dark:border-white/20">
      Excellent Tier
    </span>
  </div>

{:else if config.interactionType === 'mono-wallet'}
  <div class={CONTAINER}>
    <div class="flex items-center justify-between">
      <span class="text-xs font-bold opacity-60">Wallet Balance</span>
      <span class="text-xs font-bold">$24,500.00</span>
    </div>
    <div class="grid grid-cols-2 gap-2 my-1">
      <div class="p-2 rounded-xl border bg-black/[0.03] border-black/10 dark:bg-white/[0.03] dark:border-white/10">
        <div class="text-[9px] font-medium opacity-50">Inflow</div>
        <div class="text-base font-black">+$8,240</div>
      </div>
      <div class="p-2 rounded-xl border bg-black/[0.03] border-black/10 dark:bg-white/[0.03] dark:border-white/10">
        <div class="text-[9px] font-medium opacity-50">Outflow</div>
        <div class="text-base font-black">-$2,150</div>
      </div>
    </div>
    <div class="text-[10px] opacity-60">Auto-save enabled · 4 cards linked</div>
  </div>

{:else if config.interactionType === 'mono-savings'}
  <div class={CONTAINER}>
    <div class="flex items-center justify-between">
      <span class="text-xs font-bold opacity-60">Savings Goal</span>
      <span class="text-xs font-bold">$12,400</span>
    </div>
    <div class="my-2">
      <div class="text-[10px] opacity-60">Target: New House ($15,000)</div>
      <div class="w-full h-2 rounded-full mt-1.5 overflow-hidden bg-neutral-200 dark:bg-neutral-800">
        <motion.div initial={{ width: 0 }} animate={{ width: '82%' }} transition={{ duration: 0.7 }} class="h-full rounded-full bg-black dark:bg-white" />
      </div>
    </div>
    <div class="text-[10px] font-medium opacity-60">+ $800 auto-deposit / mo</div>
  </div>

{:else if config.interactionType === 'mono-heatmap'}
  <div class={CONTAINER}>
    <div class="flex items-center justify-between">
      <span class="text-xs font-bold opacity-60">Activity Heatmap</span>
      <span class="text-[10px] font-mono font-bold">342 Commits</span>
    </div>
    <div class="grid grid-cols-7 gap-1 my-1">
      {#each Array.from({ length: 28 }) as _, i (i)}
        <div class="w-full aspect-square rounded-xs {i % 5 === 0 ? 'bg-black dark:bg-white' : i % 3 === 0 ? 'bg-neutral-400 dark:bg-neutral-500' : 'bg-neutral-200 dark:bg-neutral-800'}" ></div>
      {/each}
    </div>
    <div class="text-[10px] opacity-50">High Activity Matrix</div>
  </div>

{:else if config.interactionType === 'mono-activity-ring'}
  <div class={CONTAINER}>
    <div class="flex items-center justify-between">
      <span class="text-xs font-bold opacity-60">Activity Rings</span>
      <span class="text-xs font-bold">3 Goals Hit</span>
    </div>
    <div class="relative w-24 h-24 flex items-center justify-center mx-auto my-1">
      <svg viewBox="0 0 100 100" class={RING_SVG}>
        <circle cx="50" cy="50" r="42" class="text-neutral-200 dark:text-neutral-800" stroke-width="4" stroke="currentColor" fill="none" />
        <motion.circle cx="50" cy="50" r="42" class="text-black dark:text-white" stroke-width="4" stroke-linecap="round" stroke="currentColor" fill="none" stroke-dasharray="263.8" stroke-dashoffset="52.7" />
      </svg>
      <svg viewBox="0 0 100 100" class={RING_SVG}>
        <circle cx="50" cy="50" r="32" class="text-neutral-200 dark:text-neutral-800" stroke-width="4" stroke="currentColor" fill="none" />
        <motion.circle cx="50" cy="50" r="32" class="text-neutral-600 dark:text-neutral-400" stroke-width="4" stroke-linecap="round" stroke="currentColor" fill="none" stroke-dasharray="201" stroke-dashoffset="40.2" />
      </svg>
      <svg viewBox="0 0 100 100" class={RING_SVG}>
        <circle cx="50" cy="50" r="22" class="text-neutral-200 dark:text-neutral-800" stroke-width="4" stroke="currentColor" fill="none" />
        <motion.circle cx="50" cy="50" r="22" class="text-neutral-400 dark:text-neutral-600" stroke-width="4" stroke-linecap="round" stroke="currentColor" fill="none" stroke-dasharray="138.2" stroke-dashoffset="27.6" />
      </svg>
      <span class="text-xs font-black">88%</span>
    </div>
    <div class="flex justify-around text-[10px] font-semibold opacity-70">
      <span>Move</span> · <span>Exercise</span> · <span>Stand</span>
    </div>
  </div>

{:else if config.interactionType === 'mono-users'}
  <div class={CONTAINER}>
    <div class="flex items-center justify-between">
      <span class="text-xs font-bold opacity-60">Active Users (MAU)</span>
      <span class="text-xs font-bold">+12.4%</span>
    </div>
    <div class="text-3xl font-black">48.2k</div>
    <div class="flex items-center gap-1 text-[10px] opacity-70">
      <span class="px-1.5 py-0.5 rounded font-semibold bg-black/10 text-black dark:bg-white/10 dark:text-white">US 54%</span>
      <span class="px-1.5 py-0.5 rounded font-semibold bg-black/10 text-black dark:bg-white/10 dark:text-white">EU 32%</span>
    </div>
  </div>

{:else if config.interactionType === 'mono-kfactor'}
  <div class={CONTAINER}>
    <div class="flex items-center justify-between">
      <span class="text-xs font-bold opacity-60">Viral K-Factor Arc</span>
      <span class="text-xs font-bold">K = 1.42</span>
    </div>
    <div class="relative w-24 h-24 flex items-center justify-center mx-auto my-1">
      <svg viewBox="0 0 36 36" class="w-full h-full transform -rotate-90">
        <circle cx="18" cy="18" r="14" class="text-neutral-200 dark:text-neutral-800" stroke-width="3.5" stroke="currentColor" fill="none" />
        <motion.circle
          cx="18" cy="18" r="14" class="text-black dark:text-white" stroke-width="3.5" stroke-linecap="round" stroke="currentColor" fill="none"
          stroke-dasharray="88" stroke-dashoffset="26"
          initial={{ strokeDashoffset: 88 }} animate={{ strokeDashoffset: 26 }} transition={{ duration: 1 }}
        />
      </svg>
      <div class="absolute flex flex-col items-center">
        <span class="text-lg font-black">1.42x</span>
        <span class="text-[8px] font-bold opacity-60 uppercase">Growth</span>
      </div>
    </div>
    <div class="text-[10px] text-center opacity-60">Exponential referral multiplier</div>
  </div>

{:else if config.interactionType === 'mono-latency'}
  <div class={CONTAINER}>
    <div class="flex items-center justify-between">
      <span class="text-xs font-bold opacity-60">Latency P99</span>
      <span class="text-xs font-mono font-bold">1.8ms</span>
    </div>
    <div class="my-1">
      <div class="text-2xl font-black">1.8s Avg</div>
      <div class="text-[10px] opacity-50">P99: 3.6s · P95: 0.4s</div>
    </div>
    <div class="h-10 w-full mt-1">
      <svg class="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 30">
        <path d="M0,20 L20,25 L40,15 L60,25 L80,10 L100,5" fill="none" stroke={isDark ? '#FFFFFF' : '#000000'} stroke-width="2.5" stroke-linecap="round" />
      </svg>
    </div>
  </div>

{:else if config.interactionType === 'mono-bandwidth'}
  <div class={CONTAINER}>
    <div class="flex items-center justify-between">
      <span class="text-xs font-bold opacity-60">Bandwidth Speed Dial</span>
      <span class="text-xs font-mono font-bold">1.2 Gbps</span>
    </div>
    <div class="relative w-full h-16 flex items-center justify-center my-1">
      <svg viewBox="0 0 100 50" class="w-full h-full overflow-visible">
        <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke={isDark ? '#262626' : '#E5E5E5'} stroke-width="8" stroke-linecap="round" />
        <motion.path
          d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke={isDark ? '#FFFFFF' : '#000000'} stroke-width="8" stroke-linecap="round"
          stroke-dasharray="125.6" stroke-dashoffset="25"
          initial={{ strokeDashoffset: 125.6 }} animate={{ strokeDashoffset: 25 }} transition={{ duration: 1 }}
        />
      </svg>
      <div class="absolute bottom-1 flex flex-col items-center">
        <span class="text-lg font-black">840 Mbps</span>
      </div>
    </div>
    <div class="flex justify-between text-[10px] font-mono opacity-60">
      <span>Latency: 1.2ms</span>
      <span>Packet Loss: 0%</span>
    </div>
  </div>

{:else if config.interactionType === 'mono-server'}
  <div class={CONTAINER}>
    <div class="flex items-center justify-between">
      <span class="text-xs font-bold opacity-60">Dual Arc Server Gauge</span>
      <span class="text-xs font-bold">Normal</span>
    </div>
    <div class="flex items-center justify-around my-1">
      <div class="relative w-20 h-20 flex items-center justify-center">
        <svg viewBox="0 0 36 36" class="w-full h-full transform -rotate-90">
          <path class="text-neutral-200 dark:text-neutral-800" stroke-width="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
          <motion.path
            class="text-black dark:text-white" stroke-width="4" stroke-dasharray="32, 100" stroke-linecap="round" stroke="currentColor" fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            initial={{ strokeDasharray: '0, 100' }} animate={{ strokeDasharray: '32, 100' }} transition={{ duration: 0.8 }}
          />
        </svg>
        <div class="absolute flex flex-col items-center">
          <span class="text-sm font-black">32%</span>
          <span class="text-[8px] font-bold opacity-60 uppercase">CPU</span>
        </div>
      </div>
      <div class="relative w-20 h-20 flex items-center justify-center">
        <svg viewBox="0 0 36 36" class="w-full h-full transform -rotate-90">
          <path class="text-neutral-200 dark:text-neutral-800" stroke-width="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
          <motion.path
            class="text-neutral-600 dark:text-neutral-400" stroke-width="4" stroke-dasharray="64, 100" stroke-linecap="round" stroke="currentColor" fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            initial={{ strokeDasharray: '0, 100' }} animate={{ strokeDasharray: '64, 100' }} transition={{ duration: 0.8, delay: 0.1 }}
          />
        </svg>
        <div class="absolute flex flex-col items-center">
          <span class="text-sm font-black">64%</span>
          <span class="text-[8px] font-bold opacity-60 uppercase">RAM</span>
        </div>
      </div>
    </div>
    <div class="flex justify-around text-[10px] font-mono opacity-60">
      <span>Nodes: 8 Active</span>
      <span>Heap: 4.2 GB</span>
    </div>
  </div>

{:else if config.interactionType === 'mono-progress'}
  <div class={CONTAINER}>
    <div class="flex items-center justify-between">
      <span class="text-xs font-bold opacity-60">Circular Build Ring</span>
      <span class="text-xs font-bold">Building...</span>
    </div>
    <div class="relative w-24 h-24 flex items-center justify-center mx-auto my-1">
      <svg viewBox="0 0 36 36" class="w-full h-full transform -rotate-90">
        <circle cx="18" cy="18" r="14" class="text-neutral-200 dark:text-neutral-800" stroke-width="3" stroke="currentColor" fill="none" />
        <motion.circle
          cx="18" cy="18" r="14" class="text-black dark:text-white" stroke-width="3" stroke-linecap="round" stroke="currentColor" fill="none"
          stroke-dasharray="88" stroke-dashoffset="22"
          initial={{ strokeDashoffset: 88 }} animate={{ strokeDashoffset: 22 }} transition={{ duration: 1 }}
        />
      </svg>
      <div class="absolute flex flex-col items-center">
        <span class="text-xl font-black">75%</span>
        <span class="text-[8px] font-semibold opacity-60">Stage 3/4</span>
      </div>
    </div>
    <div class="text-[10px] text-center opacity-60">Compiling bundle chunks...</div>
  </div>

{:else if config.interactionType === 'mono-radar'}
  <div class={CONTAINER}>
    <div class="flex items-center justify-between">
      <span class="text-xs font-bold opacity-60">Incident Radar Arc</span>
      <span class="text-xs font-bold flex items-center gap-1">
        <span class="w-2 h-2 rounded-full animate-ping bg-black dark:bg-white" ></span>
        <span>Scanning</span>
      </span>
    </div>
    <div class="relative w-full h-16 flex items-center justify-center my-1">
      <svg viewBox="0 0 100 50" class="w-full h-full overflow-visible">
        <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke={isDark ? '#262626' : '#E5E5E5'} stroke-width="6" stroke-linecap="round" />
        <motion.path
          d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke={isDark ? '#FFFFFF' : '#000000'} stroke-width="6" stroke-linecap="round"
          stroke-dasharray="125.6" stroke-dashoffset="0"
          initial={{ strokeDashoffset: 125.6 }} animate={{ strokeDashoffset: 0 }} transition={{ duration: 1 }}
        />
      </svg>
      <div class="absolute bottom-1 flex flex-col items-center">
        <span class="text-xs font-black">Zero Criticals</span>
      </div>
    </div>
    <div class="text-[10px] opacity-60 text-center">Monitored 24/7 · 0 Open Alerts</div>
  </div>

{:else if config.interactionType === 'mono-timer-arc'}
  <div class="w-full h-full p-4 flex flex-col items-center justify-between select-none font-sans">
    <div class="flex items-center justify-between w-full">
      <span class="text-xs font-bold opacity-60">Focus Arc Gauge</span>
      <span class="text-xs font-mono font-bold">25:00</span>
    </div>
    <div class="relative w-28 h-28 flex items-center justify-center my-1">
      <svg viewBox="0 0 100 100" class="w-full h-full transform -rotate-90">
        <circle cx="50" cy="50" r="40" class="text-neutral-200 dark:text-neutral-800" stroke-width="8" stroke="currentColor" fill="none" />
        <motion.circle
          cx="50" cy="50" r="40" class="text-black dark:text-white" stroke-width="8" stroke-linecap="round" stroke="currentColor" fill="none"
          stroke-dasharray="251.2" stroke-dashoffset="62.8"
          initial={{ strokeDashoffset: 62.8 }} animate={{ strokeDashoffset: 62.8 }} transition={{ duration: 1.2 }}
        />
      </svg>
      <div class="absolute flex flex-col items-center">
        <span class="text-xl font-black text-black dark:text-white">18:42</span>
        <span class="text-[9px] font-semibold opacity-60 uppercase tracking-widest">Remaining</span>
      </div>
    </div>
    <button
      onclick={(e) => { e.stopPropagation(); app.haptic('medium'); timerActive = !timerActive; }}
      class="px-4 py-1 text-xs font-bold rounded-full border-0 cursor-pointer bg-black text-white dark:bg-white dark:text-black"
    >
      {timerActive ? 'Pause' : 'Start Focus'}
    </button>
  </div>

{:else}
  <div class="w-full h-full p-4 flex flex-col items-center justify-between select-none font-sans">
    <div class="flex items-center justify-between w-full">
      <span class="text-xs font-bold opacity-60">Concentric Ring Timer</span>
      <span class="text-xs font-bold">Deep Work</span>
    </div>
    <div class="relative w-28 h-28 flex items-center justify-center">
      <svg viewBox="0 0 100 100" class={RING_SVG}>
        <circle cx="50" cy="50" r="42" class="text-neutral-200 dark:text-neutral-800" stroke-width="5" stroke="currentColor" fill="none" />
        <motion.circle
          cx="50" cy="50" r="42" class="text-black dark:text-white" stroke-width="5" stroke-linecap="round" stroke="currentColor" fill="none"
          stroke-dasharray="263.8" stroke-dashoffset="65.9"
          initial={{ strokeDashoffset: 263.8 }} animate={{ strokeDashoffset: 65.9 }} transition={{ duration: 1 }}
        />
      </svg>
      <svg viewBox="0 0 100 100" class={RING_SVG}>
        <circle cx="50" cy="50" r="32" class="text-neutral-200 dark:text-neutral-800" stroke-width="5" stroke="currentColor" fill="none" />
        <motion.circle
          cx="50" cy="50" r="32" class="text-neutral-600 dark:text-neutral-400" stroke-width="5" stroke-linecap="round" stroke="currentColor" fill="none"
          stroke-dasharray="201" stroke-dashoffset="40.2"
          initial={{ strokeDashoffset: 201 }} animate={{ strokeDashoffset: 40.2 }} transition={{ duration: 1, delay: 0.2 }}
        />
      </svg>
      <div class="flex flex-col items-center">
        <span class="text-lg font-black text-black dark:text-white">75%</span>
        <span class="text-[9px] font-bold opacity-60">Goal</span>
      </div>
    </div>
    <div class="flex items-center gap-3 text-[10px] font-semibold opacity-70">
      <span>Focus 45m</span> · <span>Break 15m</span>
    </div>
  </div>
{/if}
