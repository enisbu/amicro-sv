<script lang="ts">
	import { motion } from 'motion-sv';
	import { ChevronUp, Info } from '@lucide/svelte';
	import { Chart, Svg, Area, Spline, Bars, Highlight, LinearGradient, Tooltip } from 'layerchart';
	import { curveMonotoneX } from 'd3-shape';
	import { scaleBand } from 'd3-scale';

	const workoutData = [
		{ day: 'Mon', value: 20 },
		{ day: 'Tue', value: 40 },
		{ day: 'Wed', value: 30 },
		{ day: 'Thu', value: 60 },
		{ day: 'Fri', value: 45 }
	].map((d, index) => ({ ...d, index }));

	const stepData = [
		{ time: 'AM', value: 1000 },
		{ time: '05 AM', value: 2000 },
		{ time: '06 AM', value: 1500 },
		{ time: '07 AM', value: 4000 },
		{ time: '08 AM', value: 5093 }
	].map((d, index) => ({ ...d, index }));

	function seeded(i: number): number {
		const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
		return x - Math.floor(x);
	}

	const hrData = Array.from({ length: 40 }, (_, i) => ({
		time: i,
		value: 60 + seeded(i) * 40,
		isHigh: i > 25 && i < 35
	}));

	const hrMax = Math.max(...hrData.map((d) => d.value));

	const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
	const days = [1, 2, 3, 4, 5, 6, 7];

	const CARD_TITLE = 'text-[14px] font-semibold text-neutral-900 leading-tight';
	const ICON_BUBBLE = 'w-7 h-7 rounded-full bg-neutral-50 flex items-center justify-center';
	const STAT_ROW = 'flex justify-between text-[13px] font-medium text-neutral-600 mb-2';
</script>

{#snippet goalRing(percent: number, ringColor: string, trackClass: string)}
	<div
		class="w-8 h-8 rounded-full border-[3px] {trackClass} relative flex items-center justify-center"
	>
		{#if percent > 0}
			<svg class="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 32 32">
				<circle
					cx="16"
					cy="16"
					r="14"
					fill="none"
					stroke={ringColor}
					stroke-width="3"
					stroke-dasharray="88"
					stroke-dashoffset={88 * (1 - percent)}
					stroke-linecap="round"
				/>
			</svg>
		{/if}
	</div>
{/snippet}

{#snippet areaChart(series: { value: number }[])}
	<div class="absolute bottom-8 left-0 right-0 h-[80px]">
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.6, ease: 'easeInOut' }}
			style={{ width: '100%', height: '100%' }}
		>
			<Chart
				data={series}
				x="index"
				y="value"
				padding={{ top: 5 }}
				tooltipContext={{ mode: 'bisect-x' }}
			>
				<Svg>
					<LinearGradient stops={[[0, '#A855F7'], [1, 'transparent']]} vertical>
						{#snippet children({ gradient })}
							<Area curve={curveMonotoneX} fill={gradient} fillOpacity={0.4} />
						{/snippet}
					</LinearGradient>
					<Spline curve={curveMonotoneX} stroke="#A855F7" strokeWidth={3} />
					<Highlight
						lines={false}
						points={{ r: 6, fill: '#A855F7', stroke: '#fff', strokeWidth: 2 }}
					/>
				</Svg>

				<Tooltip.Root
					y="data"
					yOffset={-8}
					anchor="bottom"
					variant="none"
					class="rounded-lg bg-[#262626] px-2 py-1 text-[12px] font-medium text-[#A855F7] whitespace-nowrap"
				>
					{#snippet children({ data })}
						{data.value}
					{/snippet}
				</Tooltip.Root>
			</Chart>
		</motion.div>
	</div>
{/snippet}

<div
	class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto font-sans bg-neutral-100 p-8 rounded-[2rem]"
>
	<div class="flex flex-col gap-4">
		<div class="bg-white rounded-3xl p-5 shadow-sm">
			<div class="flex justify-between items-center mb-4">
				<div class="flex items-center gap-2">
					<div
						class="w-6 h-6 flex items-center justify-center bg-red-50 text-red-500 rounded-full text-[12px]"
					>
						🎯
					</div>
					<div>
						<h3 class={CARD_TITLE}>Your daily goals</h3>
						<div class="text-[11px] text-neutral-400 font-medium">Last 7 Day</div>
					</div>
				</div>
				<div class={ICON_BUBBLE}>
					<ChevronUp class="w-4 h-4 text-neutral-600" />
				</div>
			</div>

			<div class={STAT_ROW}>
				<span>Achieved</span>
				<span>4/7</span>
			</div>
			<div class="h-1.5 w-full bg-neutral-100 rounded-full mb-6 overflow-hidden">
				<div class="h-full bg-[#D8B4FE] w-[60%]"></div>
			</div>

			<div class="flex justify-between">
				{#each days as i (i)}
					<div class="flex flex-col items-center gap-2">
						{@render goalRing(i <= 4 ? 1 : 0, '#A855F7', 'border-[#F3E8FF]')}
						<span class="text-[11px] font-semibold text-neutral-500">{weekdays[i - 1]}</span>
					</div>
				{/each}
			</div>
		</div>

		<div class="bg-white rounded-3xl p-5 shadow-sm">
			<div class="flex justify-between items-center mb-4">
				<div class="flex items-center gap-2">
					<div class="w-6 h-6 flex items-center justify-center text-red-500 text-[14px]">🩸</div>
					<div>
						<h3 class={CARD_TITLE}>Period</h3>
						<div class="text-[11px] text-neutral-400 font-medium">Last 7 Day</div>
					</div>
				</div>
				<div class={ICON_BUBBLE}>
					<ChevronUp class="w-4 h-4 text-neutral-600" />
				</div>
			</div>

			<div class={STAT_ROW}>
				<span>Day of Cycle</span>
				<span>7/9hr</span>
			</div>
			<div class="h-1.5 w-full bg-neutral-100 rounded-full mb-6 flex">
				<div class="h-full bg-[#FECDD3] w-[80%] rounded-full"></div>
			</div>

			<div class="flex justify-between">
				{#each days as i (i)}
					<div class="flex flex-col items-center gap-2">
						<div class="w-6 h-6 rounded-full {i <= 6 ? 'bg-[#FECDD3]' : 'bg-neutral-100'}"></div>
						<span class="text-[11px] font-semibold text-neutral-500">{weekdays[i - 1]}</span>
					</div>
				{/each}
			</div>
		</div>

		<div class="bg-white rounded-3xl p-5 shadow-sm">
			<div class="flex justify-between items-center mb-4">
				<div class="flex items-center gap-2">
					<div class="w-6 h-6 flex items-center justify-center text-blue-400 text-[14px]">💧</div>
					<div>
						<h3 class={CARD_TITLE}>Hydration</h3>
						<div class="text-[11px] text-neutral-400 font-medium">Last 7 Day</div>
					</div>
				</div>
				<div class={ICON_BUBBLE}>
					<ChevronUp class="w-4 h-4 text-neutral-600" />
				</div>
			</div>

			<div class={STAT_ROW}>
				<span>Today</span>
				<span>1,203/1,500cal</span>
			</div>
			<div class="h-1.5 w-full bg-neutral-100 rounded-full mb-6 flex overflow-hidden">
				<div class="h-full bg-[#BAE6FD] w-[80%]"></div>
			</div>

			<div class="flex justify-between">
				{#each days as i (i)}
					<div class="flex flex-col items-center gap-2">
						{@render goalRing(i <= 4 ? 1 : i === 5 ? 0.6 : 0, '#38BDF8', 'border-[#E0F2FE]')}
						<span class="text-[11px] font-semibold text-neutral-500">{weekdays[i - 1]}</span>
					</div>
				{/each}
			</div>
		</div>

		<div class="bg-[#0A0A0A] rounded-3xl p-5 text-white shadow-xl relative overflow-hidden h-[180px]">
			<div class="flex justify-between items-center mb-6 relative z-10">
				<h3 class="text-[15px] font-semibold">Workout Stats</h3>
				<Info class="w-4 h-4 text-neutral-400" />
			</div>

			<div class="flex justify-between text-[11px] font-medium text-neutral-400 mb-6 relative z-10 px-1">
				<span class="bg-white text-black px-3 py-1 rounded-full">Day</span>
				<span class="px-2 py-1">Week</span>
				<span class="px-2 py-1">Month</span>
				<span class="px-2 py-1">Year</span>
			</div>

			{@render areaChart(workoutData)}

			<div class="flex justify-between text-[10px] text-neutral-500 absolute bottom-4 left-4 right-4 z-10">
				{#each workoutData as d (d.day)}
					<span>{d.day}</span>
				{/each}
			</div>
		</div>
	</div>

	<div class="flex flex-col gap-4">
		<div class="bg-[#0A0A0A] rounded-3xl p-5 text-white shadow-xl relative overflow-hidden h-[180px]">
			<div class="flex justify-between items-start mb-2 relative z-10">
				<div class="text-[12px] font-medium text-neutral-400">Daily Average</div>
				<Info class="w-4 h-4 text-neutral-400" />
			</div>
			<div class="flex items-center gap-2 mb-6 relative z-10">
				<div class="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center text-[12px]">
					🏃
				</div>
				<div class="text-[28px] font-semibold tracking-tight leading-none">
					5.093 <span class="text-[12px] text-neutral-500 font-medium tracking-normal">STEPS</span>
				</div>
			</div>

			{@render areaChart(stepData)}

			<div
				class="flex justify-between text-[9px] font-medium text-neutral-500 absolute bottom-3 left-4 right-4 z-10"
			>
				{#each stepData as d (d.time)}
					<span>{d.time}</span>
				{/each}
			</div>
		</div>

		<div class="bg-white rounded-3xl p-5 shadow-sm">
			<div class="flex justify-between items-center mb-4">
				<div class="flex items-center gap-2">
					<div class="w-6 h-6 flex items-center justify-center text-[14px]">🛌</div>
					<div>
						<h3 class={CARD_TITLE}>Sleep Quality</h3>
						<div class="text-[11px] text-neutral-400 font-medium">Last 7 Day</div>
					</div>
				</div>
				<div class={ICON_BUBBLE}>
					<ChevronUp class="w-4 h-4 text-neutral-600" />
				</div>
			</div>

			<div class="flex justify-between text-[13px] font-medium text-neutral-600 mb-6">
				<span>Today</span>
				<span>6,5/8hr</span>
			</div>

			<div class="flex items-center h-10 w-full mb-2">
				<div class="h-full w-[15%] bg-[#BAE6FD]"></div>
				<div class="h-full w-0.5 bg-neutral-800"></div>
				<div class="h-[60%] w-[10%] bg-[#E0F2FE]"></div>
				<div class="h-[80%] w-[15%] bg-[#BAE6FD]"></div>
				<div class="h-full w-0.5 bg-neutral-800"></div>
				<div class="h-full w-[25%] bg-[#E9D5FF]"></div>
				<div class="h-[40%] w-[10%] bg-[#F3E8FF]"></div>
				<div class="h-full w-0.5 bg-neutral-800"></div>
				<div class="h-full w-[20%] bg-[#BAE6FD]"></div>
			</div>

			<div class="flex justify-between text-[11px] font-medium text-neutral-500">
				<span>10.00pm</span>
				<span>6.30am</span>
			</div>
		</div>

		<div class="bg-white rounded-3xl p-5 shadow-sm flex flex-col justify-between">
			<div class="flex justify-between items-center mb-4">
				<div class="flex items-center gap-2">
					<div class="w-6 h-6 flex items-center justify-center text-[14px]">🫀</div>
					<div>
						<h3 class={CARD_TITLE}>Heart Rate</h3>
						<div class="text-[11px] text-neutral-400 font-medium">Last 7 Day</div>
					</div>
				</div>
				<div class={ICON_BUBBLE}>
					<ChevronUp class="w-4 h-4 text-neutral-600" />
				</div>
			</div>

			<div class="flex justify-between text-[13px] font-medium text-neutral-600 mb-6">
				<span>Today</span>
				<span>72-90Bpm</span>
			</div>

			<div class="h-20 w-[calc(100%+1rem)] -ml-2 mb-2 relative">
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.3, ease: 'easeOut' }}
					style={{ width: '100%', height: '100%' }}
				>
					<Chart
						data={hrData}
						x="time"
						xScale={scaleBand().padding(0.2)}
						y="value"
						yDomain={[0, hrMax]}
						c={(d: { isHigh: boolean }) => (d.isHigh ? 'high' : 'normal')}
						cDomain={['normal', 'high']}
						cRange={['#BAE6FD', '#FDA4AF']}
						padding={{ top: 0 }}
						tooltipContext={{ mode: 'band' }}
					>
						<Svg>
							<Bars radius={2} strokeWidth={0} />
						</Svg>

						<Tooltip.Root
							y={0}
							anchor="bottom"
							variant="none"
							class="rounded-lg border border-neutral-100 bg-white px-2 py-1 text-[12px] font-medium text-black shadow-sm whitespace-nowrap"
						>
							{#snippet children({ data })}
								{data.value.toFixed(0)}
							{/snippet}
						</Tooltip.Root>
					</Chart>
				</motion.div>
			</div>

			<div class="flex justify-between text-[11px] font-medium text-neutral-500">
				<span>08.00am</span>
				<span>12.00pm</span>
				<span>4.00pm</span>
			</div>
		</div>

		<div class="bg-white rounded-3xl p-5 shadow-sm">
			<div class="flex justify-between items-center mb-4">
				<div class="flex items-center gap-2">
					<div
						class="w-6 h-6 flex items-center justify-center bg-blue-50 text-blue-500 rounded-lg text-[10px] font-bold"
					>
						FEB<br />24
					</div>
					<div>
						<h3 class={CARD_TITLE}>
							Your weekly target
						</h3>
						<div class="text-[11px] text-neutral-400 font-medium">Last 7 Day</div>
					</div>
				</div>
				<div class={ICON_BUBBLE}>
					<ChevronUp class="w-4 h-4 text-neutral-600" />
				</div>
			</div>

			<div class={STAT_ROW}>
				<span>Achieved</span>
				<span>4/7</span>
			</div>
			<div class="h-2 w-full bg-neutral-100 rounded-full mb-6">
				<div class="h-full bg-[#A3E635] w-[55%] rounded-full"></div>
			</div>

			<div class="bg-[#ECFCCB] rounded-2xl p-4 text-[12px] font-medium text-neutral-800 leading-relaxed">
				Scoring at least <span class="font-bold">150 Heart Points</span> each week helps you stay fit and
				healthy.
			</div>
		</div>
	</div>
</div>
