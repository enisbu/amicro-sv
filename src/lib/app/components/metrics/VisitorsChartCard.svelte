<script lang="ts">
	import { motion } from 'motion-sv';
	import { Users } from '@lucide/svelte';
	import { Chart, Svg, Spline, Axis, Grid, Highlight, Tooltip } from 'layerchart';
	import { curveMonotoneX } from 'd3-shape';

	const data = [
		{ name: 'Feb 20', m: 120, c: 45 },
		{ name: '', m: 130, c: 65 },
		{ name: '', m: 125, c: 85 },
		{ name: '', m: 135, c: 80 },
		{ name: '', m: 120, c: 60 },
		{ name: '', m: 110, c: 45 },
		{ name: '', m: 115, c: 60 },
		{ name: '', m: 130, c: 55 },
		{ name: '', m: 135, c: 75 },
		{ name: '', m: 120, c: 90 },
		{ name: '', m: 130, c: 85 },
		{ name: '', m: 180, c: 95 },
		{ name: '', m: 170, c: 110 },
		{ name: 'Feb 21', m: 160, c: 100 },
		{ name: '', m: 145, c: 105 },
		{ name: '', m: 175, c: 100 },
		{ name: '', m: 145, c: 110 },
		{ name: '', m: 140, c: 105 },
		{ name: '', m: 140, c: 100 },
		{ name: '', m: 140, c: 80 },
		{ name: '', m: 140, c: 45 },
		{ name: '', m: 140, c: 50 },
		{ name: '', m: 140, c: 70 },
		{ name: 'Feb 24', m: 140, c: 70 },
		{ name: '', m: 140, c: 55 },
		{ name: '', m: 140, c: 65 },
		{ name: '', m: 140, c: 50 },
		{ name: '', m: 140, c: 55 },
		{ name: '', m: 140, c: 60 },
		{ name: '', m: 140, c: 60 },
		{ name: '', m: 140, c: 60 },
		{ name: 'Feb 25', m: 145, c: 62 }
	].map((d, index) => ({ ...d, index }));

	const tabs = ['1D', '5D', '1M', '6M', '1A', 'Personalizado'];
	let activeTab = $state('5D');

	const yTicks = [0, 50, 100, 150, 200];

	const xTicks = data.filter((d) => d.name !== '').map((d) => d.index);
	const labelByIndex = new Map(data.map((d) => [d.index, d.name]));
</script>

<div
	class="bg-white rounded-[1.5rem] p-6 max-w-2xl w-full mx-auto font-sans shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08)] border border-neutral-100"
>
	<div class="flex justify-between items-center mb-6">
		<div class="flex items-center gap-2">
			<div class="w-8 h-8 rounded-lg bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center">
				<Users class="w-4 h-4" />
			</div>
			<h2 class="text-[17px] font-semibold text-neutral-900">Visitantes</h2>
		</div>

		<div class="flex gap-4 text-[13px] font-medium text-neutral-500">
			{#each tabs as tab (tab)}
				<button
					onclick={() => (activeTab = tab)}
					class="transition-colors {activeTab === tab
						? 'text-neutral-900 font-bold bg-neutral-100/80 px-2 py-0.5 rounded'
						: 'hover:text-neutral-700 py-0.5'}"
				>
					{tab}
				</button>
			{/each}
		</div>
	</div>

	<div class="flex justify-between items-end mb-8">
		<div class="flex items-baseline gap-4">
			<span class="text-[48px] font-bold text-neutral-900 tracking-tight leading-none">120</span>
			<div class="flex flex-col gap-1">
				<span class="text-[12px] text-neutral-500 font-medium">Nos últimos 5 dias</span>
				<span
					class="text-[12px] font-semibold text-[#10B981] bg-[#D1FAE5] px-2 py-0.5 rounded inline-flex items-center gap-0.5 w-fit"
				>
					<svg
						width="10"
						height="10"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="3"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"
					>
						<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
						<polyline points="16 7 22 7 22 13"></polyline>
					</svg>
					+48%
				</span>
			</div>
		</div>

		<div class="flex gap-4 text-[13px] font-medium text-neutral-600">
			<div class="flex items-center gap-2">
				<div class="w-2.5 h-1 bg-[#DC2626] rounded-full"></div>
				Militantes
			</div>
			<div class="flex items-center gap-2">
				<div class="w-2.5 h-1 bg-[#0284C7] rounded-full"></div>
				Cidadãos
			</div>
		</div>
	</div>

	<div class="h-[240px] w-full relative">
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.6, ease: 'easeInOut' }}
			style={{ width: '100%', height: '100%' }}
		>
			<Chart
				{data}
				x="index"
				y="m"
				yDomain={[0, 200]}
				padding={{ top: 10, left: 32, bottom: 28 }}
				tooltipContext={{ mode: 'bisect-x' }}
			>
				<Svg>
					<Grid
						x={false}
						y={{ stroke: '#E5E7EB', strokeWidth: 1, opacity: 1, dashArray: '3 3' }}
						yTicks={yTicks}
					/>
					<Axis
						placement="left"
						ticks={yTicks}
						rule={false}
						tickMarks={false}
						tickLabelProps={{ class: 'text-[12px] fill-[#9CA3AF]' }}
					/>
					<Axis
						placement="bottom"
						ticks={xTicks}
						rule={false}
						tickMarks={false}
						format={(t: number) => labelByIndex.get(t) ?? ''}
						tickLabelProps={{ class: 'text-[12px] fill-[#9CA3AF]', dy: 10 }}
					/>
					<Spline curve={curveMonotoneX} y="m" stroke="#DC2626" strokeWidth={2.5} />
					<Spline curve={curveMonotoneX} y="c" stroke="#0284C7" strokeWidth={2.5} />
					<Highlight
						lines={{ class: 'stroke-[#9CA3AF] [stroke-width:1px] [stroke-dasharray:3_3]' }}
						points={{ r: 4, fill: '#DC2626', stroke: 'white', strokeWidth: 2 }}
					/>
					<Highlight y="c" points={{ r: 4, fill: '#0284C7', stroke: 'white', strokeWidth: 2 }} />
				</Svg>

				<Tooltip.Root
					variant="none"
					class="bg-white p-3 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-neutral-100 min-w-[140px]"
				>
					<div class="text-[11px] text-neutral-500 font-medium mb-3">Feb 21 23:45</div>
					<div class="flex flex-col gap-3">
						<div class="flex justify-between items-start gap-4">
							<div class="flex flex-col">
								<div class="flex items-center gap-1.5 text-[12px] font-medium text-neutral-600 mb-0.5">
									<div class="w-0.5 h-3 bg-[#DC2626] rounded-full"></div>
									Militantes
								</div>
								<div class="text-[13px] font-semibold text-neutral-900">+80</div>
							</div>
							<div class="text-[12px] font-semibold text-[#10B981] mt-auto">+13%</div>
						</div>
						<div class="h-px w-full bg-neutral-100"></div>
						<div class="flex justify-between items-start gap-4">
							<div class="flex flex-col">
								<div class="flex items-center gap-1.5 text-[12px] font-medium text-neutral-600 mb-0.5">
									<div class="w-0.5 h-3 bg-[#0284C7] rounded-full"></div>
									Cidadãos
								</div>
								<div class="text-[13px] font-semibold text-neutral-900">-13</div>
							</div>
							<div class="text-[12px] font-semibold text-[#EF4444] mt-auto">-5%</div>
						</div>
					</div>
				</Tooltip.Root>
			</Chart>
		</motion.div>
	</div>
</div>
