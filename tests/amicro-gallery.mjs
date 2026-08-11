import { chromium } from 'playwright';
import { existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const BASE_URL = process.env.BASE_URL ?? 'http://localhost:5173';
const WINDOW_MS = 600;
const RETRY_WINDOW_MS = 3400;

function resolveChromium() {
	if (process.env.CHROMIUM_PATH) return process.env.CHROMIUM_PATH;
	const cache = join(homedir(), '.cache/ms-playwright');
	const candidates = [
		join(cache, 'chromium-1228/chrome-linux64/chrome'),
		join(cache, 'chromium-1228/chrome-linux/chrome')
	];
	return candidates.find((p) => existsSync(p));
}

const INSTALL_WATCHER = () => {
	function fingerprint(root) {
		const parts = [];
		for (const node of [root, ...root.querySelectorAll('*')]) {
			const cs = getComputedStyle(node);
			const box = node.getBoundingClientRect();
			parts.push(
				[
					cs.transform,
					cs.opacity,
					cs.filter,
					cs.borderRadius,
					cs.backgroundPosition,
					cs.backgroundImage,
					cs.backgroundSize,
					cs.maskPosition,
					cs.webkitMaskPosition,
					cs.width,
					cs.height,
					cs.gap,
					cs.strokeDashoffset,
					cs.strokeDasharray,
					cs.offsetDistance,
					cs.clipPath,
					node.getAttribute?.('r') ?? '',
					node.getAttribute?.('cx') ?? '',
					node.getAttribute?.('cy') ?? '',
					node.getAttribute?.('points') ?? '',
					node.getAttribute?.('d') ?? '',
					box.x.toFixed(2),
					box.y.toFixed(2),
					box.width.toFixed(2),
					box.height.toFixed(2)
				].join('|')
			);
		}
		return parts.join('\n');
	}

	window.__amicroWatch = (selector, ms) =>
		new Promise((resolve) => {
			const seen = new Set();
			let frames = 0;
			const started = performance.now();

			const tick = () => {
				const root = document.querySelector(selector);
				if (root) {
					seen.add(fingerprint(root));
					frames++;
				}
				if (performance.now() - started < ms) {
					requestAnimationFrame(tick);
				} else {
					resolve({ states: seen.size, frames });
				}
			};
			requestAnimationFrame(tick);
		});
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
	const executablePath = resolveChromium();
	if (!executablePath) {
		console.error('No Chromium found. Set CHROMIUM_PATH or install a browser.');
		process.exit(2);
	}

	const browser = await chromium.launch({ executablePath, args: ['--no-sandbox'] });
	const page = await browser.newPage({ viewport: { width: 1400, height: 1000 } });

	const consoleErrors = [];
	page.on('console', (msg) => {
		if (msg.type() !== 'error') return;
		const source = msg.location()?.url ?? '';
		consoleErrors.push(source ? `${msg.text()} [${source}]` : msg.text());
	});
	page.on('pageerror', (err) => consoleErrors.push(`pageerror: ${err.message}`));

	await page.addInitScript(INSTALL_WATCHER);
	await page.goto(`${BASE_URL}/loader-check`, { waitUntil: 'networkidle' });

	await page.click('[data-toggle="cursor"]');
	await page.mouse.move(700, 500);
	await page.mouse.move(720, 520);
	await sleep(200);

	const tiles = await page.$$eval('[data-amicro]', (els) =>
		els.map((el) => ({
			name: el.getAttribute('data-amicro'),
			group: el.getAttribute('data-group'),
			probe: el.getAttribute('data-probe')
		}))
	);

	console.log(`Components found on /loader-check: ${tiles.length}`);

	const selectorOf = (tile) => tile.probe ?? `[data-amicro="${tile.name}"]`;

	async function centerTile(name) {
		await page
			.locator(`[data-amicro="${name}"]`)
			.evaluate((el) => el.scrollIntoView({ block: 'center', behavior: 'instant' }))
			.catch(() => {});
		await sleep(60);
	}

	async function pressReplay(group) {
		await page.evaluate((g) => {
			document.querySelector(`[data-replay="${g}"]`)?.click();
		}, group);
	}

	async function watch(tile, ms, during) {
		const watcher = page.evaluate(
			([sel, dur]) => window.__amicroWatch(sel, dur),
			[selectorOf(tile), ms]
		);
		if (during) await during();
		return watcher;
	}

	const moved = [];
	const still = [];

	function record(tile, result, note) {
		if (result.frames === 0) {
			still.push({ ...tile, reason: 'Element not in DOM' });
		} else if (result.states > 1) {
			moved.push({ ...tile, states: result.states });
		} else {
			still.push({
				...tile,
				reason: `unchanged fingerprint across ${result.frames} frames${note ? `, ${note}` : ''}`
			});
		}
	}

	for (const tile of tiles.filter((t) => t.group === 'loading')) {
		await centerTile(tile.name);
		let res = await watch(tile, WINDOW_MS);
		if (res.states <= 1) res = await watch(tile, RETRY_WINDOW_MS);
		record(tile, res);
	}

	for (const tile of tiles.filter((t) => ['hover', 'cards', 'cursor'].includes(t.group))) {
		await centerTile(tile.name);
		const inner = page.locator(`[data-amicro="${tile.name}"] .stage > *`).first();
		const box = (await inner.boundingBox().catch(() => null)) ??
			(await page.locator(`[data-amicro="${tile.name}"]`).boundingBox());
		if (!box) {
			still.push({ ...tile, reason: 'no bounding box' });
			continue;
		}
		const cx = box.x + box.width / 2;
		const cy = box.y + Math.min(box.height, 600) / 2;

		await page.mouse.move(cx - box.width, cy);
		const res = await watch(tile, WINDOW_MS, async () => {
			await page.mouse.move(cx, cy, { steps: 10 });
			await page.mouse.move(cx + box.width / 4, cy + box.height / 4, { steps: 10 });
			await page.mouse.move(cx - box.width / 4, cy - box.height / 4, { steps: 10 });
		});
		record(tile, res, 'despite pointer movement over the element');
		await page.mouse.move(5, 5);
	}

	for (const tile of tiles.filter((t) => t.group === 'scroll')) {
		await centerTile(tile.name);

		const res = await watch(tile, WINDOW_MS + 400, async () => {
			if (tile.name === 'ScrollReveal') {
				await pressReplay('scroll');
			} else {

				await page.mouse.wheel(0, 300);
				await sleep(120);
				await page.mouse.wheel(0, 300);
			}
		});
		record(tile, res, 'despite scrolling or a button press');
	}

	for (const group of ['entrance', 'text', 'transitions']) {
		const groupTiles = tiles.filter((t) => t.group === group);
		if (!groupTiles.length) continue;

		for (const tile of groupTiles) {
			await centerTile(tile.name);

			const res = await watch(tile, WINDOW_MS + 600, async () => {
				await pressReplay(group);
			});
			record(tile, res, 'despite pressing the replay button');
		}
	}

	moved.sort((a, b) => a.name.localeCompare(b.name));
	still.sort((a, b) => a.name.localeCompare(b.name));

	console.log(`\nMoving: ${moved.length} of ${tiles.length}`);
	if (still.length) {
		console.log(`\nStatic (${still.length}):`);
		for (const s of still) console.log(`  ${s.group}/${s.name}: ${s.reason}`);
	}

	const IGNORED = ['favicon', 'api.github.com', 'fonts.googleapis.com', 'fonts.gstatic.com'];
	const realErrors = consoleErrors.filter((e) => !IGNORED.some((needle) => e.includes(needle)));
	console.log(`\nConsole errors: ${realErrors.length}`);
	for (const e of realErrors.slice(0, 20)) console.log(`  ${e}`);

	await browser.close();

	const ok = still.length === 0 && realErrors.length === 0;
	console.log(`\n${ok ? 'PASSED' : 'FAILED'}`);
	process.exit(ok ? 0 : 1);
}

main().catch((err) => {
	console.error(err);
	process.exit(2);
});
