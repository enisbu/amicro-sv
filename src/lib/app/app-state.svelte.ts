import { Context } from 'runed';
import { toast } from 'svelte-sonner';
import { triggerHaptic, type HapticsType } from './haptics.js';

export type Theme = 'dark' | 'light';

export class AppState {
	theme = $state<Theme>('dark');

	showToast(message: string, kind: 'success' | 'error' = 'success') {
		toast[kind](message);
	}

	toggleTheme() {
		this.theme = this.theme === 'dark' ? 'light' : 'dark';
	}

	haptic(type: HapticsType | number = 'light') {
		return triggerHaptic(type);
	}

	async copy(text: string, successMessage: string, failMessage = 'Failed to copy code.') {
		this.haptic('light');
		try {
			await navigator.clipboard.writeText(text);
			this.showToast(successMessage);
		} catch {
			this.showToast(failMessage, 'error');
		}
	}
}

const appStateContext = new Context<AppState>('amicro-app-state');

export function setAppState(): AppState {
	return appStateContext.set(new AppState());
}

export function getAppState(): AppState {
	return appStateContext.get();
}
