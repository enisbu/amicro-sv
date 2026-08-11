import type { MotionProps } from 'motion-sv';

type Transition = NonNullable<MotionProps<'div'>['transition']>;

export const presets = {
	snappy: {
		type: 'spring',
		stiffness: 400,
		damping: 28,
		mass: 0.8
	},
	bouncy: {
		type: 'spring',
		stiffness: 300,
		damping: 15,
		mass: 1
	},
	smooth: {
		type: 'spring',
		stiffness: 220,
		damping: 24,
		mass: 1
	},
	gentle: {
		type: 'spring',
		stiffness: 120,
		damping: 14,
		mass: 1
	},
	stiff: {
		type: 'spring',
		stiffness: 500,
		damping: 40,
		mass: 0.5
	}
} as const satisfies Record<string, Transition>;

export type PresetName = keyof typeof presets;
