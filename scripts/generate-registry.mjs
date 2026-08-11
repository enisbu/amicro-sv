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
	entrance: 'Entrance animation',
	hover: 'Hover and gesture interaction',
	text: 'Text animation',
	scroll: 'Scroll driven effect',
	cursor: 'Cursor effect',
	transitions: 'Page transition',
	cards: 'Card layout',
	loading: 'Loader'
};

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
	[...new Set(importsOf(source).filter((spec) => spec.startsWith('.')).map((spec) => kebab(basename(spec).replace(/\.js$/, ''))))].sort();

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

for (const [group, label] of Object.entries(UI_GROUPS)) {
	for (const file of listFiles(group)) {
		if (!file.endsWith('.svelte')) continue;
		const source = readSource(group, file);
		const name = kebab(file);
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

for (const [group, type, label] of [
	['hooks', 'registry:hook', 'Hook'],
	['lib', 'registry:lib', 'Shared helper']
]) {
	for (const file of listFiles(group)) {
		if (!file.endsWith('.ts')) continue;
		const source = readSource(group, file);
		const name = kebab(file);
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

const registry = {
	$schema: 'https://shadcn-svelte.com/schema/registry.json',
	name: 'amicro-sv',
	homepage: 'https://amicro.enisdev.com',
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

const byType = items.reduce((acc, item) => ({ ...acc, [item.type]: (acc[item.type] ?? 0) + 1 }), {});
console.log(`registry.json: ${items.length} items`);
for (const [type, count] of Object.entries(byType)) console.log(`  ${type}: ${count}`);
