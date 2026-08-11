<script lang="ts">
	import { motion } from 'motion-sv';
	import { Chart, Svg, Area, Spline, Highlight, LinearGradient, Tooltip } from 'layerchart';
	import { curveMonotoneX } from 'd3-shape';

	interface StockPoint {
		time: string;
		price: number;
		index: number;
	}

	function generateData(points: number, start: number, trend: number, volatility: number): StockPoint[] {
		let p = start;
		const res: StockPoint[] = [];
		for (let i = 0; i < points; i++) {

			const change = (Math.sin(i * 0.4) * 0.5 + trend + Math.sin(i * 2.1) * 0.2) * volatility;
			p += change;

			const date = new Date();
			date.setHours(9, 30 + i * 15, 0, 0);
			const timeString = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

			res.push({ time: timeString, price: Number(p.toFixed(2)), index: i });
		}
		return res;
	}

	const ranges = ['1D', '1W', '1M', '3M', '1Y', 'ALL'] as const;
	type Range = (typeof ranges)[number];

	let range = $state<Range>('1W');

	const chartData: Record<Range, StockPoint[]> = {
		'1D': generateData(40, 172.5, 0.05, 0.6),
		'1W': generateData(40, 168.2, 0.15, 1.2),
		'1M': generateData(40, 185.0, -0.2, 2.0),
		'3M': generateData(40, 155.0, 0.3, 3.5),
		'1Y': generateData(40, 130.0, 0.4, 4.0),
		ALL: generateData(40, 45.0, 1.2, 8.0)
	};

	const data = $derived(chartData[range]);
	const startPrice = $derived(data[0].price);
	const endPrice = $derived(data[data.length - 1].price);
	const diff = $derived(endPrice - startPrice);
	const percent = $derived((diff / startPrice) * 100);
	const isPositive = $derived(diff >= 0);

	const color = $derived(isPositive ? '#34C759' : '#FF3B30');

	const yDomain = $derived.by((): [number, number] => {
		const values = data.map((d) => d.price);
		return [Math.min(...values), Math.max(...values)];
	});
</script>

<div
	class="bg-white rounded-[2rem] p-6 w-full max-w-2xl mx-auto font-sans shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08)] border border-neutral-100 flex flex-col h-[460px]"
>
	<div class="mb-6 flex justify-between items-start">
		<div>
			<h2 class="text-[18px] font-semibold text-neutral-900 tracking-tight leading-none mb-1">AAPL</h2>
			<div class="text-[13px] font-medium text-neutral-500 mb-3">Apple Inc.</div>

			<div class="flex flex-col">
				<span class="text-[44px] font-bold text-neutral-900 tracking-tight leading-none mb-1">
					${endPrice.toFixed(2)}
				</span>
				<div class="text-[15px] font-semibold flex items-center gap-1.5" style:color>
					<span>{isPositive ? '+' : ''}{diff.toFixed(2)}</span>
					<span>({isPositive ? '+' : ''}{percent.toFixed(2)}%)</span>
				</div>
			</div>
		</div>
	</div>

	<div class="flex-1 w-[calc(100%+2rem)] -ml-4 relative z-10 min-h-[200px]">
		{#key range}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.6, ease: 'easeInOut' }}
				style={{ width: '100%', height: '100%' }}
			>
				<Chart
					{data}
					x="index"
					y="price"
					{yDomain}
					padding={{ top: 10 }}
					tooltipContext={{ mode: 'bisect-x' }}
				>
					<Svg>
						<LinearGradient stops={[[0.05, color], [0.95, 'transparent']]} vertical>
							{#snippet children({ gradient })}
								<Area curve={curveMonotoneX} fill={gradient} fillOpacity={0.25} />
							{/snippet}
						</LinearGradient>
						<Spline curve={curveMonotoneX} stroke={color} strokeWidth={2.5} />
						<Highlight
							lines={{ class: 'stroke-[#A1A1AA] [stroke-width:1.5px] [stroke-dasharray:4_4]' }}
							points={{
								r: 6,
								fill: color,
								stroke: '#FFFFFF',
								strokeWidth: 3,
								style: 'filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
							}}
						/>
					</Svg>

					<Tooltip.Root
						y="data"
						yOffset={-16}
						anchor="bottom"
						variant="none"
						class="bg-neutral-800/95 backdrop-blur-sm text-white px-3 py-2 rounded-xl shadow-xl border border-neutral-700/50 flex flex-col items-center min-w-[100px]"
					>
						{#snippet children({ data })}
							<span
								class="text-neutral-400 text-[11px] font-semibold uppercase tracking-wider mb-0.5"
							>
								{data.time}
							</span>
							<span class="text-[15px] font-bold tracking-tight">${data.price}</span>
						{/snippet}
					</Tooltip.Root>
				</Chart>
			</motion.div>
		{/key}
	</div>

	<div class="mt-8 flex justify-between bg-neutral-100/80 p-1.5 rounded-full">
		{#each ranges as r (r)}
			<button
				onclick={() => (range = r)}
				class="flex-1 py-1.5 text-[13px] font-semibold rounded-full transition-all duration-200 {range === r
					? 'bg-white text-neutral-900 shadow-[0_2px_8px_rgba(0,0,0,0.08)]'
					: 'text-neutral-500 hover:text-neutral-800 hover:bg-neutral-200/50'}"
			>
				{r}
			</button>
		{/each}
	</div>
</div>
