<script lang="ts">
	import type { Component } from 'svelte';
	import { motion } from 'motion-sv';
	import { Copy, Check } from '@lucide/svelte';
	import { getAppState } from '$lib/app/app-state.svelte.js';
	import { ditherChartsData, type DitherChartItem } from '$lib/app/data/dither-charts.js';
	import IconSwap from '../IconSwap.svelte';
	import DitherDonutChart from './DitherDonutChart.svelte';
	import DitherGrowthChart from './DitherGrowthChart.svelte';
	import DitherStackedChart from './DitherStackedChart.svelte';
	import DitherFunnelChart from './DitherFunnelChart.svelte';
	import ActivityHeatmap from './ActivityHeatmap.svelte';
	import ServerGauge from './ServerGauge.svelte';
	import TrafficBubble from './TrafficBubble.svelte';
	import DeviceUsageChart from './DeviceUsageChart.svelte';
	import StorageUsageChart from './StorageUsageChart.svelte';
	import RevenueLineChart from './RevenueLineChart.svelte';
	import UptimeChart from './UptimeChart.svelte';

	const app = getAppState();

	const PREVIEWS: Record<
		string,
		Component<{ theme?: 'dark' | 'light'; compact?: boolean }>
	> = {
		'dither-donut': DitherDonutChart,
		'dither-stacked': DitherStackedChart,
		'dither-growth': DitherGrowthChart,
		'dither-heatmap': ActivityHeatmap,
		'dither-gauge': ServerGauge,
		'dither-traffic': TrafficBubble,
		'dither-funnel': DitherFunnelChart,
		'dither-device': DeviceUsageChart,
		'dither-storage': StorageUsageChart,
		'dither-revenue': RevenueLineChart,
		'dither-uptime': UptimeChart
	};

	let copiedId = $state<string | null>(null);
	let copiedTimer: ReturnType<typeof setTimeout> | undefined;

	async function handleCopyCode(item: DitherChartItem) {
		try {
			await navigator.clipboard.writeText(item.codeSnippet);
			app.haptic('success');
			copiedId = item.id;
			clearTimeout(copiedTimer);
			copiedTimer = setTimeout(() => (copiedId = null), 2000);
			app.showToast(`Copied ${item.label} code!`);
		} catch {
			app.haptic('error');
			app.showToast('Failed to copy code.');
		}
	}

</script>

<div class="w-full flex flex-col gap-8 max-w-[1060px] mx-auto text-left font-sans">
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
		{#each ditherChartsData as item (item.id)}
			{@const isCopied = copiedId === item.id}
			{@const Preview = PREVIEWS[item.id]}
			<div
				class="relative group rounded-2xl flex flex-col items-center justify-between p-3.5 transition-all duration-300 border {app.theme ===
				'dark'
					? 'bg-[#181818] border-white/5 hover:bg-[#1f1f1f] shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]'
					: 'bg-white border-neutral-100 hover:shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:border-neutral-200/50'}"
			>
				<div
					class="flex-1 flex items-center justify-center w-full h-[180px] overflow-hidden rounded-xl"
				>
					{#if Preview}
						<Preview theme={app.theme} compact={true} />
					{/if}
				</div>

				<div class="w-full flex items-center justify-between mt-2.5 px-1 gap-1">
					<span
						class="text-[12px] font-medium truncate transition-colors {app.theme === 'dark'
							? 'text-neutral-300'
							: 'text-neutral-700'}"
						title={item.label}
					>
						{item.label}
					</span>

					<motion.button
						whileHover={{ scale: 1.1 }}
						whilePress={{ scale: 0.9 }}
						onclick={() => handleCopyCode(item)}
						class="p-1.5 rounded-lg transition-all cursor-pointer border flex items-center justify-center {isCopied
							? app.theme === 'dark'
								? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
								: 'bg-emerald-100 text-emerald-600 border-emerald-300'
							: app.theme === 'dark'
								? 'bg-white/[0.08] border-transparent text-neutral-300 hover:text-white hover:bg-white/[0.14]'
								: 'bg-neutral-100/90 border-transparent text-neutral-600 hover:text-black hover:bg-neutral-200'}"
						title="Copy component code"
					>
						<IconSwap key={isCopied ? 'check' : 'copy'}>
							{#if isCopied}
								<Check class="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
							{:else}
								<Copy class="w-3.5 h-3.5" />
							{/if}
						</IconSwap>
					</motion.button>
				</div>
			</div>
		{/each}
	</div>
</div>
