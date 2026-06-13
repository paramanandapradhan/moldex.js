import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { computeDropdownPosition } from './dropdown-service';

// computeDropdownPosition reads window.innerWidth/innerHeight only.
beforeEach(() => {
	vi.stubGlobal('window', { innerWidth: 1000, innerHeight: 800 });
});
afterEach(() => {
	vi.unstubAllGlobals();
});

const rect = (r: Partial<DOMRect>): DOMRect =>
	({ left: 0, right: 0, top: 0, bottom: 0, width: 0, height: 0, x: 0, y: 0, ...r }) as DOMRect;

describe('computeDropdownPosition — horizontal alignment', () => {
	it('left-aligns to the anchor', () => {
		const pos = computeDropdownPosition({
			anchorRect: rect({ left: 100, right: 200, top: 100, bottom: 130, width: 100 }),
			dropdownWidth: 150,
			dropdownHeight: 200,
			align: 'left'
		});
		expect(pos.left).toBe(100);
		expect(pos.transformOrigin).toBe('left top');
	});

	it('right-aligns to the anchor', () => {
		const pos = computeDropdownPosition({
			anchorRect: rect({ left: 800, right: 900, top: 100, bottom: 130, width: 100 }),
			dropdownWidth: 150,
			dropdownHeight: 200,
			align: 'right'
		});
		expect(pos.left).toBe(750); // 900 - 150
		expect(pos.transformOrigin).toBe('right top');
	});

	it('auto opens leftwards when the anchor is on the right half', () => {
		const pos = computeDropdownPosition({
			anchorRect: rect({ left: 850, right: 950, top: 100, bottom: 130, width: 100 }),
			dropdownWidth: 150,
			dropdownHeight: 200,
			align: 'auto'
		});
		expect(pos.transformOrigin.startsWith('right')).toBe(true);
	});

	it('auto opens rightwards when the anchor is on the left half', () => {
		const pos = computeDropdownPosition({
			anchorRect: rect({ left: 50, right: 150, top: 100, bottom: 130, width: 100 }),
			dropdownWidth: 150,
			dropdownHeight: 200,
			align: 'auto'
		});
		expect(pos.transformOrigin.startsWith('left')).toBe(true);
	});

	it('clamps inside the viewport on both edges', () => {
		const offLeft = computeDropdownPosition({
			anchorRect: rect({ left: -50, right: 50, top: 100, bottom: 130, width: 100 }),
			dropdownWidth: 150,
			dropdownHeight: 200,
			align: 'left'
		});
		expect(offLeft.left).toBe(8); // clamped to margin

		const offRight = computeDropdownPosition({
			anchorRect: rect({ left: 950, right: 1050, top: 100, bottom: 130, width: 100 }),
			dropdownWidth: 300,
			dropdownHeight: 200,
			align: 'left'
		});
		expect(offRight.left).toBe(1000 - 8 - 300); // vw - margin - clampedWidth
	});
});

describe('computeDropdownPosition — vertical placement', () => {
	it('opens below by default when it fits', () => {
		const pos = computeDropdownPosition({
			anchorRect: rect({ left: 100, right: 200, top: 100, bottom: 130, width: 100 }),
			dropdownWidth: 150,
			dropdownHeight: 200
		});
		expect(pos.placement).toBe('bottom');
		expect(pos.top).toBe(134); // bottom + gap
	});

	it('flips above when there is not enough room below', () => {
		const pos = computeDropdownPosition({
			anchorRect: rect({ left: 100, right: 200, top: 700, bottom: 730, width: 100 }),
			dropdownWidth: 150,
			dropdownHeight: 200
		});
		expect(pos.placement).toBe('top');
		expect(pos.transformOrigin.endsWith('bottom')).toBe(true);
	});

	it('honours an explicit top position', () => {
		const pos = computeDropdownPosition({
			anchorRect: rect({ left: 100, right: 200, top: 400, bottom: 430, width: 100 }),
			dropdownWidth: 150,
			dropdownHeight: 100,
			position: 'top'
		});
		expect(pos.placement).toBe('top');
	});

	it('centers vertically for the middle position', () => {
		const pos = computeDropdownPosition({
			anchorRect: rect({ left: 100, right: 200, top: 100, bottom: 130, width: 100 }),
			dropdownWidth: 150,
			dropdownHeight: 200,
			position: 'middle'
		});
		expect(pos.placement).toBe('middle');
		expect(pos.transformOrigin.endsWith('center')).toBe(true);
		expect(pos.top).toBe((800 - 200) / 2);
	});

	it('picks the side with more room when neither fits', () => {
		const pos = computeDropdownPosition({
			anchorRect: rect({ left: 100, right: 200, top: 400, bottom: 430, width: 100 }),
			dropdownWidth: 150,
			dropdownHeight: 2000
		});
		// spaceBelow (358) < spaceAbove (388) → opens above
		expect(pos.placement).toBe('top');
		expect(pos.maxHeight).toBe(388);
	});
});

describe('computeDropdownPosition — sizing', () => {
	it('matches the anchor width when requested and emits a width in the style', () => {
		const pos = computeDropdownPosition({
			anchorRect: rect({ left: 100, right: 320, top: 100, bottom: 130, width: 220 }),
			dropdownWidth: 50,
			dropdownHeight: 200,
			matchAnchorWidth: true
		});
		expect(pos.width).toBe(220);
		expect(pos.style).toContain('width: 220px');
	});

	it('produces a usable position:fixed style string', () => {
		const pos = computeDropdownPosition({
			anchorRect: rect({ left: 100, right: 200, top: 100, bottom: 130, width: 100 }),
			dropdownWidth: 150,
			dropdownHeight: 200
		});
		expect(pos.style).toContain('position: fixed');
		expect(pos.style).toContain('max-height:');
		expect(pos.style).toContain('transform-origin:');
	});
});
