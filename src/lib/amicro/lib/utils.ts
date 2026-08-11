import type { ClassValue } from 'svelte/elements';

export function cn(...inputs: ClassValue[]): string {
	const out: string[] = [];

	const walk = (value: ClassValue) => {
		if (!value) return;
		if (typeof value === 'string' || typeof value === 'number') {
			out.push(String(value));
			return;
		}
		if (Array.isArray(value)) {
			for (const item of value) walk(item);
			return;
		}
		if (typeof value === 'object') {
			for (const [key, active] of Object.entries(value)) {
				if (active) out.push(key);
			}
		}
	};

	for (const input of inputs) walk(input);
	return out.join(' ');
}

export function mapRange(
	value: number,
	inMin: number,
	inMax: number,
	outMin: number,
	outMax: number
): number {
	return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}
