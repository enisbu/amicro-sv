import { chromium } from 'playwright';

const BASE = process.env.BASE_URL ?? 'http://localhost:5173';
const OUT = new URL('../static/og.png', import.meta.url).pathname;

const HEADLINE = '168 micro interactions for Svelte 5';
const SUBLINE =
	'Buttons, card spreads, 3D carousels, dither charts and 134 loaders, running on motion-sv. Install one at a time from the registry.';
const DOMAIN = 'amicro-sv.enisdev.com';

const browser = await chromium.launch({
	executablePath: process.env.CHROMIUM_PATH || undefined,
	args: ['--no-sandbox']
});
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 2 });
await page.goto(BASE);
await page.waitForTimeout(2500);
await page.addStyleTag({
	content: 'html { scrollbar-gutter: auto !important; scrollbar-width: none !important; }'
});
await page.evaluate(() => {
	const grid = document.querySelector('#component-grid');
	if (grid) window.scrollTo({ top: window.scrollY + grid.getBoundingClientRect().top + 45, behavior: 'instant' });
});
await page.waitForTimeout(800);

await page.evaluate(
	([headline, subline, domain]) => {
		const overlay = document.createElement('div');
		overlay.style.cssText = 'position:fixed;inset:0;background:rgba(8,8,8,0.9);z-index:9999;';
		overlay.innerHTML = `
			<div style="position:absolute;left:60px;top:220px;font-family:'Outfit',sans-serif;color:#fff;">
				<div style="display:flex;align-items:center;gap:12px;">
					<svg width="34" height="34" viewBox="0 0 24 24" fill="none">
						<path d="M7 6L14 12L7 18" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.4"/>
						<path d="M13 6L20 12L13 18" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
					<span style="font-size:32px;font-weight:700;letter-spacing:-0.019em;">Amicro SV</span>
					<span style="font-size:15px;font-weight:600;background:rgba(255,255,255,0.08);color:rgba(237,237,237,0.75);border-radius:999px;padding:7px 14px;margin-left:8px;">Svelte-Port</span>
				</div>
				<div style="font-size:63px;font-weight:500;letter-spacing:-0.01em;margin-top:34px;">${headline}</div>
				<div style="font-size:27px;line-height:1.42;color:#8f8f8f;max-width:840px;margin-top:26px;">${subline}</div>
				<div style="font-size:22px;color:#8f8f8f;margin-top:44px;">${domain}</div>
			</div>`;
		document.body.appendChild(overlay);
	},
	[HEADLINE, SUBLINE, DOMAIN]
);
await page.waitForTimeout(400);
await page.screenshot({ path: OUT });
await browser.close();
console.log(`og card written to ${OUT}`);
