import * as loading from '$lib/amicro/loading/index.js';
import type { Component } from 'svelte';

export interface Entry {
	name: string;
	component: Component<Record<string, unknown>>;
	props?: Record<string, unknown>;
}

const propOverrides: Record<string, Record<string, unknown>> = {
	Skeleton: { class: 'w-24 h-8' }
};

export const loadingEntries: Entry[] = Object.entries(loading)
	.map(([name, component]) => ({
		name,
		component: component as unknown as Entry['component'],
		props: propOverrides[name]
	}))
	.sort((a, b) => a.name.localeCompare(b.name));
