<script lang="ts">
	import { motion } from 'motion-sv';
	import { ArrowRight, ArrowUp, ArrowDown, User } from '@lucide/svelte';
	import { Chart, Svg, Area, Spline, Grid, Highlight, LinearGradient, Tooltip } from 'layerchart';
	import { curveMonotoneX } from 'd3-shape';

	const data = [
		{ name: 'AUG 1', value: 300 },
		{ name: 'AUG 2', value: 500 },
		{ name: 'AUG 3', value: 450 },
		{ name: 'AUG 4', value: 700 },
		{ name: 'AUG 5', value: 550 },
		{ name: 'AUG 6', value: 650 },
		{ name: 'AUG 7', value: 400 },
		{ name: 'AUG 8', value: 350 },
		{ name: 'AUG 9', value: 600 },
		{ name: 'AUG 10', value: 500 },
		{ name: 'AUG 11', value: 800 },
		{ name: 'AUG 12', value: 700 },
		{ name: 'AUG 13', value: 1000 }
	].map((d, index) => ({ ...d, index }));

	const tabs = ['7d', '12d', '30d'];
	let activeTab = $state('12d');
</script>

<div
	class="bg-white rounded-[2rem] p-6 max-w-sm w-full mx-auto font-sans shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08)] border border-neutral-100"
>
	<h2 class="text-[12px] font-semibold text-neutral-400 tracking-widest uppercase mb-4">Users</h2>

	<div class="bg-neutral-100/80 rounded-full p-1 flex justify-between mb-6">
		{#each tabs as tab (tab)}
			<button
				onclick={() => (activeTab = tab)}
				class="flex-1 text-[13px] font-medium py-1.5 rounded-full transition-colors {activeTab === tab
					? 'bg-white text-neutral-900 shadow-sm'
					: 'text-neutral-500 hover:text-neutral-700'}"
			>
				{tab}
			</button>
		{/each}
	</div>

	<div class="flex items-center gap-3 mb-6">
		<span class="text-[40px] font-bold text-neutral-900 tracking-tight leading-none">1,240</span>
		<span class="text-[13px] font-semibold text-[#10B981] flex items-center gap-0.5 mt-2">
			<ArrowUp class="w-4 h-4" /> 12.5%
		</span>
	</div>

	<div class="h-[120px] w-[calc(100%+2rem)] -ml-4 relative mb-6">
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.6, ease: 'easeInOut' }}
			style={{ width: '100%', height: '100%' }}
		>
			<Chart
				{data}
				x="index"
				y="value"
				padding={{ top: 10, right: 10, left: 10 }}
				tooltipContext={{ mode: 'bisect-x' }}
			>
				<Svg>
					<Grid
						x={false}
						y={{ stroke: '#E5E7EB', strokeWidth: 1, opacity: 1, dashArray: '3 3' }}
					/>
					<LinearGradient stops={[[0.05, '#10B981'], [0.95, 'transparent']]} vertical>
						{#snippet children({ gradient })}
							<Area curve={curveMonotoneX} fill={gradient} fillOpacity={0.2} />
						{/snippet}
					</LinearGradient>
					<Spline curve={curveMonotoneX} stroke="#10B981" strokeWidth={2} />
					<Highlight
						lines={{ class: 'stroke-[#9CA3AF] [stroke-width:1px] [stroke-dasharray:3_3]' }}
						points={{ r: 4, fill: '#10B981', stroke: 'white', strokeWidth: 2 }}
					/>
				</Svg>

				<Tooltip.Root
					y="data"
					yOffset={-8}
					anchor="bottom"
					variant="none"
					class="bg-white px-3 py-1.5 rounded-lg shadow-lg border border-neutral-100 text-[12px] font-medium text-neutral-600 whitespace-nowrap"
				>
					{#snippet children({ data })}
						{data.name}
					{/snippet}
				</Tooltip.Root>
			</Chart>
		</motion.div>

		<div
			class="flex justify-between text-[11px] font-medium text-neutral-400 mt-2 px-4 uppercase tracking-wider absolute top-full inset-x-0"
		>
			<span>Aug 1</span>
			<span>Aug 6</span>
			<span>Aug 12</span>
		</div>
	</div>

	<div class="flex flex-col gap-4 mb-6 px-1">
		<div class="flex justify-between items-center">
			<div class="flex items-center gap-2 text-[14px] font-medium text-neutral-600">
				<User class="w-4 h-4 text-neutral-400" /> New users
			</div>
			<div class="text-[14px] font-semibold text-neutral-900">980</div>
		</div>
		<div class="flex justify-between items-center">
			<div class="flex items-center gap-2 text-[14px] font-medium text-neutral-600">
				<ArrowDown class="w-4 h-4 text-neutral-400" /> Bounce rate
			</div>
			<div class="text-[14px] font-semibold text-neutral-900">43.5%</div>
		</div>
	</div>

	<button
		class="w-full py-3.5 rounded-2xl border border-neutral-200 text-[14px] font-semibold text-neutral-900 flex items-center justify-center gap-2 hover:bg-neutral-50 transition-colors"
	>
		View details <ArrowRight class="w-4 h-4" />
	</button>
</div>
