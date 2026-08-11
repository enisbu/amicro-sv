export function smoothstep(min: number, max: number, value: number): number {
	const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
	return x * x * (3 - 2 * x);
}

export function hash(x: number, y: number): number {
	const h = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
	return h - Math.floor(h);
}

export function clamp(val: number, min: number, max: number): number {
	return Math.max(min, Math.min(max, val));
}

export function hexToRgba(hex: string, alpha: number): string {
	const r = parseInt(hex.slice(1, 3), 16);
	const g = parseInt(hex.slice(3, 5), 16);
	const b = parseInt(hex.slice(5, 7), 16);
	return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
