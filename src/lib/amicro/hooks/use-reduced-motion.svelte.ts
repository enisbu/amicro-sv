import { prefersReducedMotion } from 'svelte/motion';

export function reducedMotion(): { readonly current: boolean } {
	return prefersReducedMotion;
}

export { prefersReducedMotion };
