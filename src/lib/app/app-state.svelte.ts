import { Context, useDebounce } from 'runed';
import { triggerHaptic, type HapticsType } from './haptics.js';

export type Theme = 'dark' | 'light';

export class AppState {
	theme = $state<Theme>('dark');
	toastMessage = $state<string | null>(null);

	#clearToast = useDebounce(() => {
		this.toastMessage = null;
	}, 2000);

	showToast(message: string) {
		this.toastMessage = message;
		this.#clearToast();
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
			this.showToast(failMessage);
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
