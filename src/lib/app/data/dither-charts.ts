export interface DitherChartItem {
	id: string;
	label: string;
	kebabName: string;
	category: string;
	description: string;
	codeSnippet: string;
}

const usage = (componentName: string, fileName: string) =>
	`<script lang="ts">
  import ${componentName} from '$lib/components/ui/amicro/${fileName}.svelte';
</script>

<${componentName} theme="dark" />`;

export const ditherChartsData: DitherChartItem[] = [
	{
		id: 'dither-donut',
		label: 'Dither Donut Chart',
		kebabName: 'dither-donut',
		category: 'donut',
		description: 'Canvas dithered donut graph with white particle highlights & period selectors.',
		codeSnippet: usage('DitherDonutChart', 'DitherDonutChart')
	},
	{
		id: 'dither-stacked',
		label: 'Dither Stacked Chart',
		kebabName: 'dither-stacked',
		category: 'stacked',
		description: 'Stacked canvas bar graph with regional branch hovers & white dither bands.',
		codeSnippet: usage('DitherStackedChart', 'DitherStackedChart')
	},
	{
		id: 'dither-growth',
		label: 'Dither Growth Chart',
		kebabName: 'dither-growth',
		category: 'growth',
		description: 'Canvas area growth line graph with white dither tiles & date scrubber cursor.',
		codeSnippet: usage('DitherGrowthChart', 'DitherGrowthChart')
	},
	{
		id: 'dither-heatmap',
		label: 'Dither Activity Heatmap',
		kebabName: 'dither-heatmap',
		category: 'heatmap',
		description: 'Activity heatmap grid with white dither intensity tiles.',
		codeSnippet: usage('ActivityHeatmap', 'ActivityHeatmap')
	},
	{
		id: 'dither-gauge',
		label: 'Dither Server Gauge',
		kebabName: 'dither-gauge',
		category: 'gauge',
		description: 'Server CPU & memory radial gauge dial with white dither dot matrix.',
		codeSnippet: usage('ServerGauge', 'ServerGauge')
	},
	{
		id: 'dither-traffic',
		label: 'Dither Traffic Bubbles',
		kebabName: 'dither-traffic',
		category: 'traffic',
		description: 'Traffic source scatter bubble plot with floating white dither nodes.',
		codeSnippet: usage('TrafficBubble', 'TrafficBubble')
	},
	{
		id: 'dither-funnel',
		label: 'Dither Conversion Funnel',
		kebabName: 'dither-funnel',
		category: 'funnel',
		description: 'Conversion funnel with white dither progress stage bars.',
		codeSnippet: usage('DitherFunnelChart', 'DitherFunnelChart')
	},
	{
		id: 'dither-device',
		label: 'Dither Device Breakdown',
		kebabName: 'dither-device',
		category: 'device',
		description: 'Device usage donut chart with white dither particle segments.',
		codeSnippet: usage('DeviceUsageChart', 'DeviceUsageChart')
	},
	{
		id: 'dither-storage',
		label: 'Dither Storage Bar',
		kebabName: 'dither-storage',
		category: 'storage',
		description: 'Storage capacity bar with animated white dither progress shaders.',
		codeSnippet: usage('StorageUsageChart', 'StorageUsageChart')
	},
	{
		id: 'dither-revenue',
		label: 'Dither Revenue Line',
		kebabName: 'dither-revenue',
		category: 'revenue',
		description: 'Revenue line graph with white dither gradient fill.',
		codeSnippet: usage('RevenueLineChart', 'RevenueLineChart')
	},
	{
		id: 'dither-uptime',
		label: 'Dither System Uptime',
		kebabName: 'dither-uptime',
		category: 'uptime',
		description: '90-day system uptime matrix with white dither status tiles.',
		codeSnippet: usage('UptimeChart', 'UptimeChart')
	}
];
