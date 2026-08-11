import type { Attachment } from 'svelte/attachments';

export interface MousePosition {
	x: number;
	y: number;
	elementX: number;
	elementY: number;
}

export class MousePositionTracker implements MousePosition {
	x = $state(0);
	y = $state(0);
	elementX = $state(0);
	elementY = $state(0);

	constructor(node: () => HTMLElement | null | undefined = () => null) {
		$effect(() => {
			const handle = (event: MouseEvent) => {
				this.x = event.clientX;
				this.y = event.clientY;

				const element = node();
				if (element) {
					const rect = element.getBoundingClientRect();
					this.elementX = event.clientX - rect.left;
					this.elementY = event.clientY - rect.top;
				} else {
					this.elementX = 0;
					this.elementY = 0;
				}
			};

			window.addEventListener('mousemove', handle, { passive: true });
			return () => window.removeEventListener('mousemove', handle);
		});
	}
}

export function mousePositionOn(
	onMove: (position: MousePosition) => void
): Attachment<HTMLElement> {
	return (node) => {
		const handle = (event: MouseEvent) => {
			const rect = node.getBoundingClientRect();
			onMove({
				x: event.clientX,
				y: event.clientY,
				elementX: event.clientX - rect.left,
				elementY: event.clientY - rect.top
			});
		};

		window.addEventListener('mousemove', handle, { passive: true });
		return () => window.removeEventListener('mousemove', handle);
	};
}
