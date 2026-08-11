<script lang="ts">
	import { loadingEntries } from './entries.js';

	import * as entrance from '$lib/amicro/entrance/index.js';
	import * as text from '$lib/amicro/text/index.js';
	import CardArc5 from '$lib/amicro/cards/CardArc5.svelte';
	import CardHover from '$lib/amicro/hover/CardHover.svelte';
	import GlowButton from '$lib/amicro/hover/GlowButton.svelte';
	import MagneticButton from '$lib/amicro/hover/MagneticButton.svelte';
	import TiltCard from '$lib/amicro/hover/TiltCard.svelte';
	import CursorTrail from '$lib/amicro/cursor/CursorTrail.svelte';
	import MouseFollow from '$lib/amicro/cursor/MouseFollow.svelte';
	import Spotlight from '$lib/amicro/cursor/Spotlight.svelte';
	import ProgressIndicator from '$lib/amicro/scroll/ProgressIndicator.svelte';
	import ScrollReveal from '$lib/amicro/scroll/ScrollReveal.svelte';
	import StickyReveal from '$lib/amicro/scroll/StickyReveal.svelte';
	import PageTransition from '$lib/amicro/transitions/PageTransition.svelte';

	let entranceKey = $state(0);
	let textKey = $state(0);
	let scrollKey = $state(0);

	let cursorOn = $state(false);

	let transitionOn = $state(false);
	let transitionTimer: ReturnType<typeof setTimeout> | undefined;

	function playTransition() {
		clearTimeout(transitionTimer);
		transitionOn = false;

		requestAnimationFrame(() => {
			transitionOn = true;
			transitionTimer = setTimeout(() => (transitionOn = false), 1600);
		});
	}

	const entranceEntries = Object.entries(entrance).sort(([a], [b]) => a.localeCompare(b));
	const textEntries = Object.entries(text).sort(([a], [b]) => a.localeCompare(b));

	const cardHoverItems = [
		{ id: 'a', title: 'First card', description: 'Background follows the hover.' },
		{ id: 'b', title: 'Second card', description: 'One shared field for the whole list.' },
		{ id: 'c', title: 'Third card', description: 'Layout animation instead of remount.' }
	];

	const stickyItems = [
		{ title: 'First section', description: 'The text on the left swaps while scrolling.' },
		{ title: 'Second section', description: 'The stage on the right stays pinned.' },
		{ title: 'Third section', description: 'Progress comes from useScroll.' }
	];
</script>

<svelte:head>
	<title>Amicro SV gallery — motion patterns</title>
	<meta
		name="description"
		content="Test bench: every ported Amicro component on one page, grouped by category."
	/>
</svelte:head>

<ProgressIndicator />

{#if cursorOn}
	<CursorTrail />
	<MouseFollow>
		<div class="follow-dot"></div>
	</MouseFollow>
{/if}

<PageTransition isVisible={transitionOn} type="double-stairs" />

<div class="column">
	<header class="head">
		<h1>Amicro SV gallery</h1>
		<p>
			Test bench for the Svelte port of <a
				href="https://github.com/Subhan-code/Amicro--Micro-transitions-">Amicro</a
			>
			(React, MIT). Every component appears once, labelled with its export name. License in
			<code>src/lib/amicro/NOTICE.md</code>, porting notes in <code>PORTING.md</code>.
		</p>
	</header>

	<section data-group="entrance">
		<div class="section-head">
			<h2>entrance <span class="count">{entranceEntries.length}</span></h2>
			<button class="trigger" onclick={() => entranceKey++} data-replay="entrance">
				Replay
			</button>
		</div>
		<p class="note">Run once on mount. The button remounts every tile in this group at once.</p>
		<div class="grid grid-wide">
			{#each entranceEntries as [name, Component] (name)}
				<figure class="cell" data-amicro={name} data-group="entrance">
					<div class="stage">
						{#key entranceKey}
							<Component>
								<div class="tile">{name}</div>
							</Component>
						{/key}
					</div>
					<figcaption>{name}</figcaption>
				</figure>
			{/each}
		</div>
	</section>

	<section data-group="text">
		<div class="section-head">
			<h2>text <span class="count">{textEntries.length}</span></h2>
			<button class="trigger" onclick={() => textKey++} data-replay="text">Replay</button>
		</div>
		<p class="note">Staggered text entrances, per character or per word. Same trigger as above.</p>
		<div class="grid grid-wide">
			{#each textEntries as [name, Component] (name)}
				<figure class="cell" data-amicro={name} data-group="text">
					<div class="stage">
						{#key textKey}
							<Component text={'Motion\nPatterns'} class="text-demo" />
						{/key}
					</div>
					<figcaption>{name}</figcaption>
				</figure>
			{/each}
		</div>
	</section>

	<section data-group="hover">
		<div class="section-head">
			<h2>hover <span class="count">4</span></h2>
		</div>
		<p class="note">Pointer driven. Move the mouse across the area, no button needed.</p>
		<div class="grid grid-roomy">
			<figure class="cell" data-amicro="CardHover" data-group="hover">
				<div class="stage stage-tall">
					<CardHover items={cardHoverItems} />
				</div>
				<figcaption>CardHover</figcaption>
			</figure>

			<figure class="cell" data-amicro="GlowButton" data-group="hover">
				<div class="stage stage-tall">
					<GlowButton>Glows on hover</GlowButton>
				</div>
				<figcaption>GlowButton</figcaption>
			</figure>

			<figure class="cell" data-amicro="MagneticButton" data-group="hover">
				<div class="stage stage-tall">
					<MagneticButton range={90}>Pull me in</MagneticButton>
				</div>
				<figcaption>MagneticButton</figcaption>
			</figure>

			<figure class="cell" data-amicro="TiltCard" data-group="hover">
				<div class="stage stage-tall">
					<TiltCard>
						<strong>Tilts toward the pointer</strong>
					</TiltCard>
				</div>
				<figcaption>TiltCard</figcaption>
			</figure>
		</div>
	</section>

	<section data-group="cursor">
		<div class="section-head">
			<h2>cursor <span class="count">3</span></h2>
			<button class="trigger" onclick={() => (cursorOn = !cursorOn)} data-toggle="cursor">
				{cursorOn ? 'Cursor effects off' : 'Cursor effects on'}
			</button>
		</div>
		<p class="note">
			<code>CursorTrail</code> and <code>MouseFollow</code> attach to the whole window, so they sit
			behind a switch. <code>Spotlight</code> only affects its own area and always runs.
		</p>
		<div class="grid grid-roomy">
			<figure
				class="cell"
				data-amicro="CursorTrail"
				data-group="cursor"
				data-probe="[data-testid='cursor-trail-dot']"
			>
				<div class="stage stage-tall">
					<p class="hint">
						{cursorOn ? 'Active, move the mouse.' : 'Off. Switch above.'}
					</p>
				</div>
				<figcaption>CursorTrail</figcaption>
			</figure>

			<figure
				class="cell"
				data-amicro="MouseFollow"
				data-group="cursor"
				data-probe="[data-testid='mouse-follow']"
			>
				<div class="stage stage-tall">
					<p class="hint">
						{cursorOn ? 'Active, the dot trails the pointer.' : 'Off. Switch above.'}
					</p>
				</div>
				<figcaption>MouseFollow</figcaption>
			</figure>

			<figure class="cell" data-amicro="Spotlight" data-group="cursor">
				<div class="stage stage-tall">
					<Spotlight>
						<strong>Light follows the pointer</strong>
					</Spotlight>
				</div>
				<figcaption>Spotlight</figcaption>
			</figure>
		</div>
	</section>

	<section data-group="scroll">
		<div class="section-head">
			<h2>scroll <span class="count">3</span></h2>
			<button class="trigger" onclick={() => scrollKey++} data-replay="scroll">Replay</button>
		</div>
		<p class="note">
			<code>ProgressIndicator</code> renders as a bar at the top of the window, not inside the tile.
			<code>ScrollReveal</code> fires when it enters the viewport, the button resets it.
		</p>
		<div class="grid grid-roomy">
			<figure
				class="cell"
				data-amicro="ProgressIndicator"
				data-group="scroll"
				data-probe=".amicro-progress"
			>
				<div class="stage stage-tall">
					<p class="hint">Bar at the top edge, scroll to see it.</p>
				</div>
				<figcaption>ProgressIndicator</figcaption>
			</figure>

			<figure class="cell" data-amicro="ScrollReveal" data-group="scroll">
				<div class="stage stage-tall">
					{#key scrollKey}
						<ScrollReveal margin="0px">
							<div class="tile">ScrollReveal</div>
						</ScrollReveal>
					{/key}
				</div>
				<figcaption>ScrollReveal</figcaption>
			</figure>
		</div>

		<figure class="cell cell-full" data-amicro="StickyReveal" data-group="scroll">
			<div class="stage stage-sticky">
				<StickyReveal content={stickyItems} />
			</div>
			<figcaption>StickyReveal</figcaption>
		</figure>
	</section>

	<section data-group="cards">
		<div class="section-head">
			<h2>cards <span class="count">1</span></h2>
		</div>
		<p class="note">Fans out along a parabola on hover.</p>
		<figure class="cell cell-full" data-amicro="CardArc5" data-group="cards">
			<div class="stage stage-arc">
				<CardArc5 />
			</div>
			<figcaption>CardArc5</figcaption>
		</figure>
	</section>

	<section data-group="transitions">
		<div class="section-head">
			<h2>transitions <span class="count">1</span></h2>
			<button class="trigger" onclick={playTransition} data-replay="transitions">Replay</button>
		</div>
		<p class="note">
			Covers the whole viewport as an overlay, so it only runs on demand. Clears itself after 1.6
			seconds.
		</p>
		<figure
			class="cell cell-full"
			data-amicro="PageTransition"
			data-group="transitions"
			data-probe=".page-transition-column"
		>
			<div class="stage">
				<p class="hint">
					{transitionOn ? 'Running across the page.' : 'Press the button above.'}
				</p>
			</div>
			<figcaption>PageTransition</figcaption>
		</figure>
	</section>

	<section data-group="loading">
		<div class="section-head">
			<h2>loading <span class="count">{loadingEntries.length}</span></h2>
		</div>
		<p class="note">All loop on their own. Dense grid, no trigger.</p>
		<div class="grid grid-dense">
			{#each loadingEntries as entry (entry.name)}
				<figure class="cell" data-amicro={entry.name} data-group="loading">
					<div class="stage stage-dense">
						<entry.component {...entry.props ?? {}} />
					</div>
					<figcaption>{entry.name}</figcaption>
				</figure>
			{/each}
		</div>
	</section>
</div>

<style>
	.column {
		max-width: 68rem;
		margin-inline: auto;
		padding: 5rem 1.5rem 8rem;
	}

	.head h1 {
		margin: 0 0 0.75rem;
		font-size: 1.5rem;
		font-weight: 600;
		letter-spacing: -0.02em;
	}

	.head p {
		max-width: 42rem;
		margin: 0;
		color: var(--gray-9, #6b6b6b);
		font-size: 0.9375rem;
		line-height: 1.65;
	}

	section {
		margin-top: 3.5rem;
		padding-top: 1.75rem;
		border-top: 1px solid var(--gray-4, #e5e5e5);
	}

	.section-head {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem 1rem;
	}

	h2 {
		margin: 0;
		font-family: 'Geist Mono', ui-monospace, monospace;
		font-size: 1rem;
		font-weight: 500;
	}

	.count {
		margin-left: 0.5rem;
		padding: 0.1rem 0.4rem;
		border-radius: 0.25rem;
		background: var(--gray-3, #eee);
		color: var(--gray-9, #6b6b6b);
		font-size: 0.6875rem;
	}

	.note {
		max-width: 42rem;
		margin: 0.6rem 0 0;
		color: var(--gray-9, #6b6b6b);
		font-size: 0.875rem;
		line-height: 1.6;
	}

	code {
		font-family: 'Geist Mono', ui-monospace, monospace;
		font-size: 0.8125em;
	}

	.trigger {
		padding: 0.4rem 0.8rem;
		border: 1px solid var(--gray-5, #ddd);
		border-radius: 0.375rem;
		background: transparent;
		color: inherit;
		font-family: inherit;
		font-size: 0.8125rem;
		cursor: pointer;
	}

	.trigger:hover {
		background: var(--gray-3, #eee);
	}

	.grid {
		display: grid;
		gap: 0.75rem;
		margin-top: 1.5rem;
	}

	
	.grid-dense {
		grid-template-columns: repeat(auto-fill, minmax(9rem, 1fr));
	}

	.grid-wide {
		grid-template-columns: repeat(auto-fill, minmax(13rem, 1fr));
	}

	
	.grid-roomy {
		grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
	}

	.cell {
		margin: 0;
		border: 1px solid var(--gray-4, #e5e5e5);
		border-radius: 0.5rem;
		overflow: hidden;
	}

	.cell-full {
		margin-top: 1.5rem;
	}

	.stage {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 7rem;
		padding: 1rem;
	}

	.stage-dense {
		min-height: 6rem;
		overflow: hidden;
	}

	.stage-tall {
		min-height: 13rem;
		padding: 1.5rem;
	}

	.stage-arc {
		min-height: 18rem;
	}

	.stage-sticky {
		display: block;
		min-height: 0;
		padding: 0;
	}

	figcaption {
		padding: 0.4rem 0.6rem;
		border-top: 1px solid var(--gray-4, #e5e5e5);
		background: var(--gray-2, #f7f7f7);
		color: var(--gray-9, #6b6b6b);
		font-family: 'Geist Mono', ui-monospace, monospace;
		font-size: 0.6875rem;
		text-align: center;
		overflow-wrap: anywhere;
	}

	.tile {
		padding: 0.75rem 1rem;
		border-radius: 0.375rem;
		background: var(--gray-3, #eee);
		font-size: 0.8125rem;
		text-align: center;
	}

	.hint {
		margin: 0;
		color: var(--gray-9, #6b6b6b);
		font-size: 0.8125rem;
		text-align: center;
	}

	.follow-dot {
		width: 1.25rem;
		height: 1.25rem;
		border-radius: 9999px;
		background: var(--signal, #3b82f6);
	}

	:global(.text-demo) {
		font-size: 1.125rem;
		font-weight: 500;
	}
</style>
