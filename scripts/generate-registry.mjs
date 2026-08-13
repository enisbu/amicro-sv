import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join, basename } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const SOURCE = 'src/lib/amicro';
const TARGET_DIR = 'amicro';
const NOTICE_ITEM = 'amicro-notice';
const NOTICE_FILE = {
	path: `${SOURCE}/LICENSE`,
	type: 'registry:file',
	target: `${TARGET_DIR}/LICENSE`
};

const UI_GROUPS = {
	entrance: { item: 'Entrance animation', section: 'Entrance animations' },
	hover: { item: 'Hover and gesture interaction', section: 'Hover and gesture' },
	text: { item: 'Text animation', section: 'Text animations' },
	scroll: { item: 'Scroll driven effect', section: 'Scroll driven effects' },
	cursor: { item: 'Cursor effect', section: 'Cursor effects' },
	transitions: { item: 'Page transition', section: 'Page transitions' },
	cards: { item: 'Card layout', section: 'Card layouts' },
	loading: { item: 'Loader', section: 'Loaders' }
};

const SITE = 'https://amicro-sv.enisdev.com';
const sections = new Map();
const section = (title, name) => sections.set(title, [...(sections.get(title) ?? []), name]);

const kebab = (name) =>
	name
		.replace(/\.svelte$/, '')
		.replace(/\.svelte\.ts$/, '')
		.replace(/\.ts$/, '')
		.replace(/([a-z0-9])([A-Z])/g, '$1-$2')
		.replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
		.toLowerCase();

const ACRONYMS = new Set(['3d', 'ui', 'otp', 'svg', 'css']);

const titleize = (slug) =>
	slug
		.split('-')
		.map((part) => (ACRONYMS.has(part) ? part.toUpperCase() : part[0].toUpperCase() + part.slice(1)))
		.join(' ');

const listFiles = (dir) => {
	const full = join(ROOT, SOURCE, dir);
	try {
		return readdirSync(full)
			.filter((f) => f !== 'index.ts' && statSync(join(full, f)).isFile())
			.sort();
	} catch {
		return [];
	}
};

const readSource = (dir, file) => readFileSync(join(ROOT, SOURCE, dir, file), 'utf8');

const importsOf = (source) =>
	[...source.matchAll(/from\s+'([^']+)'/g)].map((m) => m[1]).filter((spec) => !spec.startsWith('svelte'));

const externalDeps = (source) =>
	[...new Set(importsOf(source).filter((spec) => !spec.startsWith('.')))].sort();

const localDeps = (source) =>
	[...new Set(importsOf(source).filter((spec) => spec.startsWith('.')).map((spec) => kebab(basename(spec).replace(/\.js$/, ''))))]
		.sort()
		.map((name) => `${SITE}/r/${name}.json`);

const items = [
	{
		name: NOTICE_ITEM,
		type: 'registry:file',
		title: 'Amicro license',
		description: 'Origin and MIT license, installed alongside every component of this port.',
		dependencies: [],
		registryDependencies: [],
		files: [NOTICE_FILE]
	}
];

for (const [group, { item: label, section: title }] of Object.entries(UI_GROUPS)) {
	for (const file of listFiles(group)) {
		if (!file.endsWith('.svelte')) continue;
		const source = readSource(group, file);
		const name = kebab(file);
		section(title, name);
		items.push({
			name,
			type: 'registry:ui',
			title: titleize(name),
			description: `${label} from Amicro, ported to Svelte 5 and motion-sv.`,
			dependencies: externalDeps(source),
			registryDependencies: localDeps(source),
			files: [
				{
					path: `${SOURCE}/${group}/${file}`,
					type: 'registry:ui',
					target: `${TARGET_DIR}/${file}`
				},
				NOTICE_FILE
			]
		});
	}
}

for (const [group, type, label, title] of [
	['hooks', 'registry:hook', 'Hook', 'Hooks'],
	['lib', 'registry:lib', 'Shared helper', 'Helpers']
]) {
	for (const file of listFiles(group)) {
		if (!file.endsWith('.ts')) continue;
		const source = readSource(group, file);
		const name = kebab(file);
		section(title, name);
		items.push({
			name,
			type,
			title: titleize(name),
			description: `${label} from Amicro, ported to Svelte 5.`,
			dependencies: externalDeps(source),
			registryDependencies: localDeps(source),
			files: [
				{
					path: `${SOURCE}/${group}/${file}`,
					type,
					target: `${TARGET_DIR}/${file}`
				},
				NOTICE_FILE
			]
		});
	}
}

const CHART_SOURCE = 'src/lib/app/components/simple-comp';
const CHART_SECTION = 'Dither charts';

const CHART_ITEMS = {
	'dither-donut': 'DitherDonutChart.svelte',
	'dither-stacked': 'DitherStackedChart.svelte',
	'dither-growth': 'DitherGrowthChart.svelte',
	'dither-heatmap': 'ActivityHeatmap.svelte',
	'dither-gauge': 'ServerGauge.svelte',
	'dither-traffic': 'TrafficBubble.svelte',
	'dither-funnel': 'DitherFunnelChart.svelte',
	'dither-device': 'DeviceUsageChart.svelte',
	'dither-storage': 'StorageUsageChart.svelte',
	'dither-revenue': 'RevenueLineChart.svelte',
	'dither-uptime': 'UptimeChart.svelte'
};

const CHART_SUPPORT = {
	'animated-number': ['AnimatedNumber.svelte', 'registry:ui'],
	'dither-animated-value': ['DitherAnimatedValue.svelte', 'registry:ui'],
	'dither-math': ['dither-math.ts', 'registry:ui']
};

const chartEntries = [
	...Object.entries(CHART_ITEMS).map(([name, file]) => [
		name,
		file,
		'registry:ui',
		'Canvas dither chart from Amicro, ported to Svelte 5 and motion-sv.'
	]),
	...Object.entries(CHART_SUPPORT).map(([name, [file, type]]) => [
		name,
		file,
		type,
		'Building block behind the dither charts, ported to Svelte 5.'
	])
];

for (const [name, file, type, description] of chartEntries) {
	const source = readFileSync(join(ROOT, CHART_SOURCE, file), 'utf8');
	section(CHART_SECTION, name);
	items.push({
		name,
		type,
		title: titleize(name),
		description,
		dependencies: externalDeps(source),
		registryDependencies: localDeps(source),
		files: [{ path: `${CHART_SOURCE}/${file}`, type, target: `${TARGET_DIR}/${file}` }, NOTICE_FILE]
	});
}

const registry = {
	$schema: 'https://shadcn-svelte.com/schema/registry.json',
	name: 'amicro-sv',
	homepage: SITE,
	items
};

writeFileSync(join(ROOT, 'registry.json'), JSON.stringify(registry, null, 2) + '\n');

const catalog = items
	.filter((item) => item.name !== NOTICE_ITEM)
	.map(({ name, title, type, description }) => ({ name, title, type, description }));

writeFileSync(
	join(ROOT, 'src/lib/app/data/registry-items.ts'),
	`export interface RegistryItem {\n\tname: string;\n\ttitle: string;\n\ttype: string;\n\tdescription: string;\n}\n\nexport const REGISTRY_ITEMS: RegistryItem[] = ${JSON.stringify(catalog, null, 1)};\n`
);

const titleOf = new Map(items.map((item) => [item.name, item.title]));

const llms = [
	'# Amicro SV',
	'',
	`> ${items.filter((item) => item.type === 'registry:ui').length} micro interaction components for Svelte 5 plus the hooks and helpers behind them, pulled into your project one file at a time from a shadcn style registry. Entrance and hover animations, text and scroll effects, cursor effects, page transitions, card layouts, canvas dither charts and ${sections.get('Loaders')?.length ?? 0} loaders, all running on motion-sv.`,
	'',
	'Amicro SV is a Svelte 5 port of Amicro (React, MIT) by Syed Subhan and is not affiliated with the original. There is no npm package: each item is a plain Svelte file with motion-sv as its only runtime dependency, copied into your repo, yours to edit afterwards.',
	'',
	'Requirements: a SvelteKit 2 project on Svelte 5 with Tailwind 4 and a components.json.',
	'',
	'Set up the shadcn-svelte CLI once:',
	'',
	'    npx shadcn-svelte@latest init',
	'',
	'Add a component, swapping fade-in for any name below:',
	'',
	`    npx shadcn-svelte@latest add ${SITE}/r/fade-in.json`,
	'',
	`The CLI writes the file into your ui alias under amicro/, installs motion-sv and drops the upstream MIT license next to it. Every item resolves at ${SITE}/r/<name>.json, so the command can be built from a name alone.`,
	'',
	'## Docs',
	'',
	`- [Catalog](${SITE}): live demos of every component`,
	`- [Install page](${SITE}/install): searchable list with a copyable command per item`,
	'- [Repo](https://github.com/enisbu/amicro-sv): source, porting contract and the motion-sv API differences against Motion for React',
	'- [Original](https://github.com/Subhan-code/Amicro--Micro-transitions-): the React library this port descends from'
];

for (const [title, names] of sections) {
	llms.push('', `## ${title} (${names.length})`, '');
	for (const name of names) llms.push(`- [${name}](${SITE}/r/${name}.json): ${titleOf.get(name)}`);
}

llms.push(
	'',
	'## License',
	'',
	`- [MIT notice](${SITE}/r/${NOTICE_ITEM}.json): copyright of the original, installed alongside every component`,
	''
);

writeFileSync(join(ROOT, 'static/llms.txt'), llms.join('\n'));

const byType = items.reduce((acc, item) => ({ ...acc, [item.type]: (acc[item.type] ?? 0) + 1 }), {});
console.log(`registry.json: ${items.length} items`);
for (const [type, count] of Object.entries(byType)) console.log(`  ${type}: ${count}`);
