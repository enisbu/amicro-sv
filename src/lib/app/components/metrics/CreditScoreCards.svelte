<script lang="ts">
	import { motion } from 'motion-sv';
	import { ArrowUp } from '@lucide/svelte';
	import { Chart, Svg, Spline, Points, Highlight, Tooltip } from 'layerchart';
	import { curveMonotoneX } from 'd3-shape';

	const scoreHistory = [
		{ month: 'May', score: 700 },
		{ month: 'Jun', score: 717 },
		{ month: 'Jul', score: 730 }
	].map((d, index) => ({ ...d, index }));

	const score = 730;
	const min = 300;
	const max = 850;
	const percent = (score - min) / (max - min);
	const radius = 80;
	const circumference = Math.PI * radius;
	const dashoffset = circumference * (1 - percent);
</script>

<div class="grid grid-cols-2 gap-4 max-w-2xl mx-auto font-sans">
	<div class="bg-[#F5F6FF] rounded-[2rem] p-6 flex flex-col items-center">
		<h3 class="text-[17px] font-semibold text-[#2D334A] w-full text-left mb-6">Check your score</h3>
		<div class="relative w-48 h-24 mb-4">
			<svg viewBox="0 0 200 100" class="w-full h-full overflow-visible" aria-hidden="true">
				<path
					d="M 20 100 A 80 80 0 0 1 180 100"
					fill="none"
					stroke="#E2E8F0"
					stroke-width="16"
					stroke-linecap="round"
				/>
				<path
					d="M 20 100 A 80 80 0 0 1 180 100"
					fill="none"
					stroke="#6384F9"
					stroke-width="16"
					stroke-linecap="round"
					stroke-dasharray={circumference}
					stroke-dashoffset={dashoffset}
				/>
			</svg>
			<div class="absolute inset-x-0 bottom-0 flex flex-col items-center justify-end">
				<span class="text-[15px] font-medium text-[#2D334A] mb-0.5">Good</span>
				<span class="text-[42px] font-bold text-[#111827] leading-none">{score}</span>
			</div>
		</div>
		<div
			class="bg-[#E4E9FF] text-[#5575E7] px-4 py-2 rounded-full text-[14px] font-semibold flex items-center gap-1.5 mt-2"
		>
			<ArrowUp class="w-4 h-4" /> 8 Points
		</div>
	</div>

	<div class="bg-[#F2F1E4] rounded-[2rem] p-6">
		<h3 class="text-[17px] font-semibold text-[#2D334A] mb-5">Credit report card</h3>
		<div class="flex flex-col gap-3">
			<div class="bg-white/60 rounded-[1.25rem] p-3 flex items-center gap-4">
				<div
					class="w-10 h-10 rounded-full bg-[#E3DEC6] text-[#787158] font-bold flex items-center justify-center text-[15px]"
				>
					B
				</div>
				<div class="flex-1">
					<div class="text-[14px] font-semibold text-[#2D334A]">Card Usage</div>
					<div class="text-[12px] text-neutral-500 font-medium">High Impact</div>
				</div>
				<div class="text-[14px] font-bold text-[#2D334A] pr-2">18%</div>
			</div>
			<div class="bg-white/60 rounded-[1.25rem] p-3 flex items-center gap-4">
				<div
					class="w-10 h-10 rounded-full bg-[#7C8563] text-white font-bold flex items-center justify-center text-[15px]"
				>
					A
				</div>
				<div class="flex-1">
					<div class="text-[14px] font-semibold text-[#2D334A] truncate max-w-[100px]">
						Payment Histo...
					</div>
					<div class="text-[12px] text-neutral-500 font-medium">High Impact</div>
				</div>
				<div class="text-[14px] font-bold text-[#2D334A] pr-2">Great</div>
			</div>
			<div class="bg-white/60 rounded-[1.25rem] p-3 flex items-center gap-4">
				<div
					class="w-10 h-10 rounded-full bg-[#F5EED3] text-[#787158] font-bold flex items-center justify-center text-[15px]"
				>
					C
				</div>
				<div class="flex-1">
					<div class="text-[14px] font-semibold text-[#2D334A]">Hard Inquiries</div>
					<div class="text-[12px] text-neutral-500 font-medium">Low Impact</div>
				</div>
				<div class="text-[14px] font-bold text-[#2D334A] pr-2">4</div>
			</div>
		</div>
	</div>

	<div class="bg-[#F4ECE3] rounded-[2rem] p-6 flex flex-col justify-between">
		<div>
			<h3 class="text-[17px] font-semibold text-[#663A2B] mb-6">See your utilization</h3>
			<div class="flex justify-between items-end mb-6">
				<div>
					<div class="text-[13px] font-medium text-[#A47665] mb-1">Balance</div>
					<div class="text-[32px] font-bold text-[#8C3A21] leading-none">$856</div>
				</div>
				<div class="text-right">
					<div class="text-[13px] font-medium text-[#A47665] mb-1">Limit</div>
					<div class="text-[20px] font-bold text-[#663A2B] leading-none">$14.5k</div>
				</div>
			</div>

			<div class="w-full h-4 bg-[#E8DACB] rounded-full overflow-hidden flex relative mb-2">
				<div
					class="bg-[#F98A5B] h-full rounded-full absolute left-0 top-0 z-10 border-2 border-[#F4ECE3] w-[15%]"
				></div>
			</div>
			<div class="flex justify-between text-[11px] font-medium text-[#A47665] px-1">
				<span>Great</span>
				<span>Good</span>
				<span>Fair</span>
				<span>Poor</span>
			</div>
		</div>
		<div class="text-center text-[22px] font-bold text-[#8C3A21] mt-6">6% Utilization</div>
	</div>

	<div class="bg-[#FCF1F6] rounded-[2rem] p-6 relative overflow-hidden flex flex-col justify-between">
		<h3 class="text-[17px] font-semibold text-[#5B2C46] mb-4 relative z-10">See changes over time</h3>
		<div class="bg-white/60 rounded-2xl p-3 flex items-center gap-3 relative z-10 mb-8">
			<div class="w-7 h-7 rounded-full bg-[#EFCADD] text-[#933D6B] flex items-center justify-center">
				<ArrowUp class="w-4 h-4" />
			</div>
			<div class="text-[13px] font-medium text-[#5B2C46] leading-tight">
				Your score increased<br />by 13 points
			</div>
		</div>

		<div class="flex-1 w-[calc(100%+2.5rem)] -ml-5 mt-4 relative z-10 min-h-[70px]">
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.6, ease: 'easeInOut' }}
				style={{ width: '100%', height: '100%' }}
			>
				<Chart
					data={scoreHistory}
					x="index"
					y="score"
					padding={{ top: 10, right: 20, left: 20, bottom: 8 }}
					tooltipContext={{ mode: 'bisect-x' }}
				>
					<Svg>
						<Spline curve={curveMonotoneX} stroke="#9A4572" strokeWidth={4} />
						<Points r={5} fill="#9A4572" stroke="#FCF1F6" strokeWidth={2} />
						<Highlight
							lines={false}
							points={{ r: 7, fill: '#9A4572', stroke: '#FCF1F6', strokeWidth: 3 }}
						/>
					</Svg>

					<Tooltip.Root
						y="data"
						yOffset={-12}
						anchor="bottom"
						variant="none"
						class="rounded-[12px] bg-white px-3 py-2 text-[14px] font-semibold text-[#9A4572] shadow-[0_4px_12px_rgba(0,0,0,0.1)] whitespace-nowrap"
					>
						{#snippet children({ data })}
							{data.score} Points
						{/snippet}
					</Tooltip.Root>
				</Chart>
			</motion.div>
		</div>
		<div class="flex justify-between text-[12px] font-medium text-[#5B2C46] relative z-10 px-4 mt-2">
			{#each scoreHistory as d (d.month)}
				<span>{d.month}</span>
			{/each}
		</div>
	</div>
</div>
