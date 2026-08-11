<script lang="ts">
	import { motion } from 'motion-sv';
	import { ArrowUpRight, Plus } from '@lucide/svelte';
	import { Chart, Svg, Bars, Tooltip } from 'layerchart';
	import { scaleBand } from 'd3-scale';

	const transactionData = [
		{ day: 'Mon', value: 40 },
		{ day: 'Tue', value: 70 },
		{ day: 'Wed', value: 45 },
		{ day: 'Thu', value: 80 },
		{ day: 'Fri', value: 50 },
		{ day: 'Sat', value: 40 },
		{ day: 'Sun', value: 30 }
	];

	const maxValue = Math.max(...transactionData.map((d) => d.value));

	const trackData = transactionData.map((d) => ({ day: d.day, value: maxValue }));
</script>

{#snippet barChart(trackFill: string, barFill: string, tooltipClass: string, labelClass: string)}
	<div class="h-[110px] w-[calc(100%+1rem)] -ml-2 mb-4">
		<div class="relative h-[calc(100%-1.25rem)]">
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.4, ease: 'easeOut' }}
				style={{ width: '100%', height: '100%' }}
			>
				<Chart
					data={transactionData}
					x="day"
					xScale={scaleBand().padding(0.4)}
					y="value"
					yDomain={[0, maxValue]}
					padding={{ top: 0 }}
					tooltipContext={{ mode: 'band' }}
				>
					<Svg>
						<Bars data={trackData} radius={2} fill={trackFill} strokeWidth={0} />
						<Bars radius={2} fill={barFill} strokeWidth={0} />
					</Svg>

					<Tooltip.Root
						y={0}
						anchor="bottom"
						variant="none"
						class="rounded-lg px-2 py-1 text-[12px] font-medium whitespace-nowrap {tooltipClass}"
					>
						{#snippet children({ data })}
							{data.value}
						{/snippet}
					</Tooltip.Root>
				</Chart>
			</motion.div>
		</div>
		<div class="flex justify-between text-[9px] {labelClass} font-medium mt-2 px-3">
			{#each transactionData as d (d.day)}
				<span>{d.day}</span>
			{/each}
		</div>
	</div>
{/snippet}

<div class="flex flex-col md:flex-row gap-6 max-w-4xl mx-auto font-sans justify-center">
	<div class="flex flex-col gap-3 w-[280px]">
		<div class="bg-[#1C1C1E] rounded-[1.5rem] p-5 text-white shadow-xl">
			<div class="flex justify-between items-start mb-2">
				<h3 class="text-[18px] font-medium tracking-tight">Savings</h3>
				<span class="text-[#60A5FA] text-[13px] font-medium">05.24</span>
			</div>
			<p class="text-[11px] text-neutral-400 leading-[1.4] mb-6 max-w-[90%]">
				Save more every month with new features in
				<span class="text-[#60A5FA]">Premium version</span>
			</p>

			<div class="flex justify-between items-center mb-2">
				<span class="text-[13px] font-medium text-neutral-300">Progress</span>
				<Plus class="w-4 h-4 text-neutral-400" />
			</div>
			<div class="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden mb-1.5 flex">
				<div class="h-full bg-[#3B82F6] w-[74%]"></div>
				<div class="h-full bg-neutral-600 w-1 ml-0.5 rounded-full"></div>
			</div>
			<div class="text-right text-[11px] text-neutral-400 font-medium mb-6">74/100</div>

			<div
				class="flex justify-between items-center bg-neutral-800/50 rounded-2xl p-3 mb-4 border border-neutral-700/50"
			>
				<div class="text-[16px] font-semibold tracking-tight">
					$890.00<span class="text-neutral-400 font-medium">/$1,200</span>
				</div>
				<div class="w-8 h-8 rounded-full bg-neutral-700 flex items-center justify-center">
					<ArrowUpRight class="w-4 h-4 text-neutral-300" />
				</div>
			</div>

			<div
				class="flex justify-between items-center text-[10px] text-neutral-400 font-medium uppercase tracking-wider"
			>
				<span>Last month</span>
				<span>01 January 2024 - 2025</span>
			</div>
		</div>

		<div class="bg-[#1C1C1E] rounded-[1.5rem] p-5 text-white shadow-xl flex flex-col justify-between">
			{@render barChart('#262626', '#60A5FA', 'bg-[#262626] text-[#60A5FA]', 'text-neutral-500')}
			<div>
				<h4 class="text-[14px] text-neutral-300 font-medium mb-1">Transactions</h4>
				<div class="flex items-center gap-2">
					<span class="text-[28px] font-semibold tracking-tight">54%</span>
					<span
						class="text-[11px] text-[#60A5FA] bg-blue-500/10 px-2 py-0.5 rounded-full font-medium"
					>
						vs last month
					</span>
				</div>
			</div>
		</div>
	</div>

	<div class="flex flex-col gap-3 w-[280px]">
		<div
			class="bg-white rounded-[1.5rem] p-5 shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08)] border border-neutral-100"
		>
			<div class="flex justify-between items-start mb-2">
				<h3 class="text-[18px] font-medium text-neutral-900 tracking-tight">Savings</h3>
				<span class="text-[#3B82F6] text-[13px] font-medium">05.24</span>
			</div>
			<p class="text-[11px] text-neutral-500 leading-[1.4] mb-6 max-w-[90%]">
				Save more every month with new features in
				<span class="text-[#3B82F6]">Premium version</span>
			</p>

			<div class="flex justify-between items-center mb-2">
				<span class="text-[13px] font-medium text-neutral-600">Progress</span>
				<Plus class="w-4 h-4 text-neutral-400" />
			</div>
			<div class="h-1.5 w-full bg-blue-100 rounded-full overflow-hidden mb-1.5 flex">
				<div class="h-full bg-[#3B82F6] w-[74%]"></div>
				<div class="h-full bg-blue-300 w-1 ml-0.5 rounded-full"></div>
			</div>
			<div class="text-right text-[11px] text-neutral-500 font-medium mb-6">74/100</div>

			<div
				class="flex justify-between items-center bg-white rounded-2xl p-3 mb-4 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.05)] border border-neutral-100"
			>
				<div class="text-[16px] font-semibold tracking-tight text-neutral-900">
					$890.00<span class="text-neutral-400 font-medium">/$1,200</span>
				</div>
				<div
					class="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center border border-neutral-200"
				>
					<ArrowUpRight class="w-4 h-4 text-neutral-600" />
				</div>
			</div>

			<div
				class="flex justify-between items-center text-[10px] text-neutral-400 font-medium uppercase tracking-wider"
			>
				<span>Last month</span>
				<span>01 January 2024 - 2025</span>
			</div>
		</div>

		<div
			class="bg-white rounded-[1.5rem] p-5 shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08)] border border-neutral-100 flex flex-col justify-between"
		>
			{@render barChart(
				'#EFF6FF',
				'#0EA5E9',
				'bg-white border border-neutral-100 text-[#0EA5E9] shadow-sm',
				'text-neutral-500'
			)}
			<div>
				<h4 class="text-[14px] text-neutral-600 font-medium mb-1">Transactions</h4>
				<div class="flex items-center gap-2">
					<span class="text-[28px] font-semibold tracking-tight text-neutral-900">54%</span>
					<span class="text-[11px] text-[#3B82F6] bg-blue-50 px-2 py-0.5 rounded-full font-medium">
						vs last month
					</span>
				</div>
			</div>
		</div>
	</div>
</div>
