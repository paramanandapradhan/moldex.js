/**
 * Reference-counted page scroll lock for overlays (dialogs, drawers, etc.).
 *
 * Locking the page scroll naively by toggling `document.body.style.overflow`
 * breaks when overlays stack: closing one overlay re-enables page scrolling even
 * though another overlay is still open. This service keeps a counter so the page
 * is only unlocked once the LAST overlay releases its lock.
 *
 * It also compensates for the disappearing scrollbar to avoid a layout shift,
 * and restores whatever inline styles were present before the first lock.
 */

let lockCount = 0;
let previousOverflow = '';
let previousPaddingRight = '';

/**
 * Disables scrolling of the underlying page. Safe to call multiple times — each
 * call must be paired with a matching {@link unlockScroll}.
 */
export function lockScroll(): void {
	if (typeof document === 'undefined') return;

	lockCount++;
	if (lockCount > 1) return; // already locked by an earlier overlay

	const body = document.body;
	// Width of the scrollbar that is about to disappear, so we can pad the body
	// and prevent the content from shifting when scrolling is removed.
	const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

	previousOverflow = body.style.overflow;
	previousPaddingRight = body.style.paddingRight;

	body.style.overflow = 'hidden';
	if (scrollbarWidth > 0) {
		const currentPadding = parseFloat(getComputedStyle(body).paddingRight) || 0;
		body.style.paddingRight = `${currentPadding + scrollbarWidth}px`;
	}
}

/**
 * Releases one scroll lock. The page is only re-enabled when every lock taken
 * via {@link lockScroll} has been released.
 */
export function unlockScroll(): void {
	if (typeof document === 'undefined') return;
	if (lockCount === 0) return;

	lockCount--;
	if (lockCount > 0) return; // other overlays are still open

	const body = document.body;
	body.style.overflow = previousOverflow;
	body.style.paddingRight = previousPaddingRight;
}

/** Whether the page scroll is currently locked by at least one overlay. */
export function isScrollLocked(): boolean {
	return lockCount > 0;
}

/** Current number of active locks (primarily for testing/diagnostics). */
export function getScrollLockCount(): number {
	return lockCount;
}

/**
 * Force-resets the lock (count → 0) and restores the page. Use sparingly, e.g.
 * after a navigation that tears down every overlay at once.
 */
export function resetScrollLock(): void {
	if (typeof document !== 'undefined' && lockCount > 0) {
		document.body.style.overflow = previousOverflow;
		document.body.style.paddingRight = previousPaddingRight;
	}
	lockCount = 0;
}
