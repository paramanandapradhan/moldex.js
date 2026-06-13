export type DropPosition = 'top' | 'bottom' | 'middle';
export type DropAlign = 'left' | 'right' | 'auto';

export interface DropdownPositionOptions {
	/** Bounding rect of the anchor/trigger element (viewport coordinates). */
	anchorRect: DOMRect;
	/** Natural width of the dropdown content. */
	dropdownWidth: number;
	/** Natural height of the dropdown content. */
	dropdownHeight: number;
	/** Preferred vertical placement. Flips automatically when it does not fit. */
	position?: DropPosition;
	/**
	 * Horizontal alignment. `auto` opens away from the nearest edge:
	 * anchor on the right half of the screen opens to the left and vice-versa.
	 */
	align?: DropAlign;
	/** Gap between the anchor and the dropdown. */
	gap?: number;
	/** Minimum distance to keep from every viewport edge. */
	margin?: number;
	/** Force the dropdown width to match the anchor width (used by selects/combobox). */
	matchAnchorWidth?: boolean;
}

export interface DropdownPosition {
	top: number;
	left: number;
	width?: number;
	maxHeight: number;
	maxWidth: number;
	placement: DropPosition;
	transformOrigin: string;
	/** Ready-to-use inline style string for a `position: fixed` element. */
	style: string;
}

/**
 * Computes a viewport-anchored position for a dropdown/popover so it never
 * overflows the screen. Designed to be used with `position: fixed` (ideally on
 * an element portalled to `<body>`) so that no ancestor `overflow: hidden` or
 * `transform` can clip or mis-position it.
 *
 * Vertical: prefers `position`, flips to the opposite side when it does not fit,
 * and falls back to the side with the most room (clamping `maxHeight`).
 * Horizontal: aligns to the anchor's left or right edge (or picks the side with
 * more room when `align === 'auto'`), then clamps inside the viewport.
 */
export function computeDropdownPosition(options: DropdownPositionOptions): DropdownPosition {
	const {
		anchorRect,
		dropdownWidth,
		dropdownHeight,
		position = 'bottom',
		align = 'auto',
		gap = 4,
		margin = 8,
		matchAnchorWidth = false
	} = options;

	const vw = window.innerWidth;
	const vh = window.innerHeight;

	// ----- Horizontal -----
	const width = matchAnchorWidth ? anchorRect.width : dropdownWidth;
	const maxWidth = Math.max(0, vw - 2 * margin);

	let resolvedAlign: 'left' | 'right' = align === 'auto' ? 'left' : align;
	if (align === 'auto') {
		const anchorCenter = anchorRect.left + anchorRect.width / 2;
		// Anchor on the right half → grow leftwards; on the left half → grow rightwards.
		resolvedAlign = anchorCenter > vw / 2 ? 'right' : 'left';
	}

	const clampedWidth = Math.min(width, maxWidth);
	let left = resolvedAlign === 'right' ? anchorRect.right - clampedWidth : anchorRect.left;
	// Keep fully inside the viewport.
	left = Math.min(left, vw - margin - clampedWidth);
	left = Math.max(margin, left);

	// ----- Vertical -----
	const spaceBelow = vh - anchorRect.bottom - gap - margin;
	const spaceAbove = anchorRect.top - gap - margin;

	let top: number;
	let maxHeight: number;
	let placement: DropPosition;
	let originY: string;

	if (position === 'middle') {
		maxHeight = Math.max(0, vh - 2 * margin);
		const height = Math.min(dropdownHeight, maxHeight);
		top = Math.max(margin, (vh - height) / 2);
		placement = 'middle';
		originY = 'center';
	} else {
		const preferBelow = position !== 'top';
		const fitsBelow = dropdownHeight <= spaceBelow;
		const fitsAbove = dropdownHeight <= spaceAbove;

		let openBelow = preferBelow;
		if (preferBelow && !fitsBelow && fitsAbove) openBelow = false;
		if (!preferBelow && !fitsAbove && fitsBelow) openBelow = true;
		// Neither side fits the full height → use whichever side has more room.
		if (!fitsBelow && !fitsAbove) openBelow = spaceBelow >= spaceAbove;

		if (openBelow) {
			top = anchorRect.bottom + gap;
			maxHeight = Math.max(0, spaceBelow);
			placement = 'bottom';
			originY = 'top';
		} else {
			maxHeight = Math.max(0, spaceAbove);
			const height = Math.min(dropdownHeight, maxHeight);
			top = anchorRect.top - gap - height;
			placement = 'top';
			originY = 'bottom';
		}
	}

	const originX = resolvedAlign === 'right' ? 'right' : 'left';
	const transformOrigin = `${originX} ${originY}`;

	let style =
		`position: fixed; top: ${Math.round(top)}px; left: ${Math.round(left)}px;` +
		` max-height: ${Math.round(maxHeight)}px; max-width: ${Math.round(maxWidth)}px;` +
		` transform-origin: ${transformOrigin};`;
	if (matchAnchorWidth) style += ` width: ${Math.round(clampedWidth)}px;`;

	return {
		top,
		left,
		width: matchAnchorWidth ? clampedWidth : undefined,
		maxHeight,
		maxWidth,
		placement,
		transformOrigin,
		style
	};
}
