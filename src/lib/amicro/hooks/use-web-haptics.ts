export type HapticsType = 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error';

const patterns: Record<HapticsType, number | number[]> = {
	light: 10,
	medium: 25,
	heavy: 50,
	success: [15, 60, 15],
	warning: [30, 60, 30],
	error: [60, 60, 60, 60, 60]
};

export function haptic(type: HapticsType | number | number[] = 'light'): boolean {
	if (typeof window === 'undefined' || !window.navigator?.vibrate) return false;

	const pattern = typeof type === 'string' ? patterns[type] : type;

	try {
		return window.navigator.vibrate(pattern);
	} catch (error) {
		console.warn('Vibration API error:', error);
		return false;
	}
}
