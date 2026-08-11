export class ScrollProgress {
	#progress = $state(0);

	get current(): number {
		return this.#progress;
	}

	constructor(node: () => HTMLElement | null | undefined = () => null) {
		$effect(() => {

			const element = node() ?? null;

			const measure = () => {
				if (element) {
					const total = element.scrollHeight - element.clientHeight;
					this.#progress = total === 0 ? 0 : element.scrollTop / total;
				} else {
					const total = document.documentElement.scrollHeight - window.innerHeight;
					this.#progress = total === 0 ? 0 : window.scrollY / total;
				}
			};

			const target: HTMLElement | Window = element ?? window;
			target.addEventListener('scroll', measure, { passive: true });
			window.addEventListener('resize', measure, { passive: true });
			measure();

			return () => {
				target.removeEventListener('scroll', measure);
				window.removeEventListener('resize', measure);
			};
		});
	}
}
