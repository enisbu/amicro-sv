export interface StaggerOptions {
	baseDelay?: number;
	staggerDelay?: number;
	from?: 'first' | 'last' | 'center' | number;
}

export function staggerDelays(count: number, options: StaggerOptions = {}): number[] {
	const { baseDelay = 0, staggerDelay = 0.05, from = 'first' } = options;

	let centerIndex = 0;
	if (from === 'center') centerIndex = (count - 1) / 2;
	else if (from === 'last') centerIndex = count - 1;
	else if (typeof from === 'number') centerIndex = from;

	return Array.from({ length: count }, (_, index) => {
		let distance: number;
		if (from === 'first') distance = index;
		else if (from === 'last') distance = count - 1 - index;
		else distance = Math.abs(index - centerIndex);
		return baseDelay + distance * staggerDelay;
	});
}
