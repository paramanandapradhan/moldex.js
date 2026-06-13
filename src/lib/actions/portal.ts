/**
 * Moves the node to another container (default `document.body`) so it escapes
 * any ancestor `overflow: hidden`, `transform` or stacking-context that would
 * otherwise clip or mis-position a `position: fixed` element (dropdowns, popovers).
 *
 * Usage: `<div use:portal>...</div>` or `<div use:portal={'#some-id'}>...</div>`.
 */
export function portal(node: HTMLElement, target: HTMLElement | string = document.body) {
	let targetEl: HTMLElement | null = null;

	function resolve(t: HTMLElement | string): HTMLElement {
		if (typeof t === 'string') {
			return (document.querySelector(t) as HTMLElement | null) ?? document.body;
		}
		return t ?? document.body;
	}

	function mount(t: HTMLElement | string) {
		targetEl = resolve(t);
		targetEl.appendChild(node);
	}

	mount(target);

	return {
		update(newTarget: HTMLElement | string) {
			mount(newTarget);
		},
		destroy() {
			if (node.parentNode) {
				node.parentNode.removeChild(node);
			}
		}
	};
}
