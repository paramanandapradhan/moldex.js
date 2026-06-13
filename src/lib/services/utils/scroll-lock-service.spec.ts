import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
	lockScroll,
	unlockScroll,
	isScrollLocked,
	getScrollLockCount,
	resetScrollLock
} from './scroll-lock-service';

// The service only touches document.body.style + window/getComputedStyle, so we
// stub a minimal DOM to exercise the ref-counting and style restoration logic.
let bodyStyle: Record<string, string>;

beforeEach(() => {
	bodyStyle = { overflow: '', paddingRight: '' };
	vi.stubGlobal('document', {
		body: { style: bodyStyle },
		documentElement: { clientWidth: 985 }
	});
	vi.stubGlobal('window', { innerWidth: 1000 }); // 15px scrollbar
	vi.stubGlobal('getComputedStyle', () => ({ paddingRight: '0px' }));
	resetScrollLock();
});

afterEach(() => {
	resetScrollLock();
	vi.unstubAllGlobals();
});

describe('scroll-lock-service', () => {
	it('locks the body on first lock and compensates for the scrollbar', () => {
		expect(isScrollLocked()).toBe(false);
		lockScroll();
		expect(isScrollLocked()).toBe(true);
		expect(bodyStyle.overflow).toBe('hidden');
		expect(bodyStyle.paddingRight).toBe('15px'); // 1000 - 985
	});

	it('only unlocks when the LAST overlay releases (ref counting)', () => {
		lockScroll(); // overlay A
		lockScroll(); // overlay B
		expect(getScrollLockCount()).toBe(2);

		unlockScroll(); // close A — still locked because B is open
		expect(isScrollLocked()).toBe(true);
		expect(bodyStyle.overflow).toBe('hidden');

		unlockScroll(); // close B — now fully unlocked
		expect(isScrollLocked()).toBe(false);
		expect(bodyStyle.overflow).toBe('');
		expect(bodyStyle.paddingRight).toBe('');
	});

	it('restores the pre-existing inline styles, not just empty strings', () => {
		bodyStyle.overflow = 'scroll';
		bodyStyle.paddingRight = '4px';
		lockScroll();
		expect(bodyStyle.overflow).toBe('hidden');
		unlockScroll();
		expect(bodyStyle.overflow).toBe('scroll');
		expect(bodyStyle.paddingRight).toBe('4px');
	});

	it('ignores unbalanced unlock calls', () => {
		unlockScroll();
		unlockScroll();
		expect(getScrollLockCount()).toBe(0);
		expect(isScrollLocked()).toBe(false);
	});

	it('resetScrollLock force-clears all locks', () => {
		lockScroll();
		lockScroll();
		resetScrollLock();
		expect(getScrollLockCount()).toBe(0);
		expect(bodyStyle.overflow).toBe('');
	});
});
