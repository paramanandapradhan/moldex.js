<script lang="ts">
	import { BROWSER } from 'esm-env';
	import { lockScroll, unlockScroll } from '$lib/services/index.js';
	import type { Snippet } from 'svelte';

	type PositionType = 'left' | 'right' | 'top' | 'bottom';

	type PropsType = {
		backdropClassName?: string;
		children?: Snippet;
		className?: string;
		containerClassName?: string;
		drawerClassName?: string;
		floatingSnippet?: Snippet;
		id?: string;
		position?: PositionType;
		/** Enables drag/fling-to-close (and drag-to-adjust) gestures. Default true. */
		draggable?: boolean;
		/** Fraction of the panel size that must be dragged to close on release. */
		dragCloseThreshold?: number;
	};

	let {
		backdropClassName = '',
		children,
		className = '',
		containerClassName = '',
		drawerClassName = '',
		floatingSnippet,
		id = '',
		position = 'left',
		draggable = true,
		dragCloseThreshold = 0.4
	}: PropsType = $props();

	let isPlaced: boolean = $state(false);
	let isOpened: boolean = $state(false);

	// ── Drag state ─────────────────────────────────────────────────────────────
	let panelEl: HTMLElement | null = $state(null);
	let isDragging: boolean = $state(false);
	let dragTranslate: number = $state(0); // px offset from the open position
	let dragStartCoord = 0;
	let lastCoord = 0;
	let lastTime = 0;
	let lastVelocity = 0; // px/ms, signed along the drag axis

	let axis = $derived<'x' | 'y'>(position === 'left' || position === 'right' ? 'x' : 'y');

	// Sign of the translate value that corresponds to *closing* the drawer.
	let closingSign = $derived(position === 'left' || position === 'top' ? -1 : 1);

	// ── History / browser-back handling ──────────────────────────────────────
	// When the drawer opens we push a dummy history entry so that the browser
	// back button (and the Android hardware back key) fires a popstate event.
	// We intercept that event and close the drawer instead of navigating away.

	let _popstateListener: ((e: PopStateEvent) => void) | null = null;

	function _registerBackState() {
		if (!BROWSER) return;
		_popstateListener = (_e: PopStateEvent) => {
			_cleanupBackState();
			_performClose();
		};
		window.history.pushState({ _moldexDrawer: true }, '');
		window.addEventListener('popstate', _popstateListener);
	}

	function _cleanupBackState() {
		if (_popstateListener) {
			window.removeEventListener('popstate', _popstateListener);
			_popstateListener = null;
		}
	}

	function _performClose() {
		if (!isPlaced) return;
		isOpened = false;
		isDragging = false;
		unlockScroll();
		setTimeout(() => {
			isPlaced = false;
			dragTranslate = 0;
		}, 300);
	}

	// ── Layout helpers ────────────────────────────────────────────────────────

	let flexDirection = $derived.by(() => {
		switch (position) {
			case 'right': return 'flex-row-reverse';
			case 'top': return 'flex-col';
			case 'bottom': return 'flex-col-reverse';
			default: return '';
		}
	});

	// Single source of truth for the panel transform: follow the finger while
	// dragging, otherwise sit at the open (0) or fully-closed (±100%) position.
	let panelTransform = $derived.by(() => {
		if (isDragging) {
			return axis === 'x' ? `translateX(${dragTranslate}px)` : `translateY(${dragTranslate}px)`;
		}
		if (isOpened) return 'translateX(0) translateY(0)';
		switch (position) {
			case 'left': return 'translateX(-100%)';
			case 'right': return 'translateX(100%)';
			case 'top': return 'translateY(-100%)';
			case 'bottom': return 'translateY(100%)';
			default: return '';
		}
	});

	// ── Public API ────────────────────────────────────────────────────────────

	export function toggleDrawer() {
		if (!isPlaced) {
			openDrawer();
		} else {
			closeDrawer();
		}
	}

	export function openDrawer() {
		if (isPlaced) return;
		isPlaced = true;
		lockScroll();
		setTimeout(() => {
			isOpened = true;
			_registerBackState();
		}, 0);
	}

	export function closeDrawer() {
		if (BROWSER && _popstateListener) {
			_cleanupBackState();
			// Remove the dummy history entry we pushed on open
			window.history.back();
		}
		_performClose();
	}

	// ── Drag gesture ────────────────────────────────────────────────────────────

	function panelSize(): number {
		if (!panelEl) return 0;
		return axis === 'x' ? panelEl.offsetWidth : panelEl.offsetHeight;
	}

	function clampToCloseAxis(delta: number): number {
		const size = panelSize();
		// The drawer can only move toward its closed side (never further open).
		return closingSign < 0 ? Math.max(-size, Math.min(0, delta)) : Math.min(size, Math.max(0, delta));
	}

	function handlePointerDown(e: PointerEvent) {
		if (!draggable || !isOpened || isDragging) return;
		// Ignore secondary mouse buttons.
		if (e.pointerType === 'mouse' && e.button !== 0) return;
		isDragging = true;
		const coord = axis === 'x' ? e.clientX : e.clientY;
		dragStartCoord = lastCoord = coord;
		lastTime = performance.now();
		lastVelocity = 0;
		dragTranslate = 0;
		(e.currentTarget as HTMLElement)?.setPointerCapture?.(e.pointerId);
	}

	function handlePointerMove(e: PointerEvent) {
		if (!isDragging) return;
		const coord = axis === 'x' ? e.clientX : e.clientY;
		dragTranslate = clampToCloseAxis(coord - dragStartCoord);
		const now = performance.now();
		const dt = now - lastTime;
		if (dt > 0) lastVelocity = (coord - lastCoord) / dt;
		lastCoord = coord;
		lastTime = now;
	}

	function handlePointerUp() {
		if (!isDragging) return;
		isDragging = false;

		const size = panelSize();
		const draggedFarEnough = Math.abs(dragTranslate) > size * dragCloseThreshold;
		// Positive when the last motion was toward the closed side.
		const flung = lastVelocity * closingSign > 0.4; // px/ms

		if (size > 0 && (draggedFarEnough || flung)) {
			// isDragging is now false, so panelTransform animates to the closed state.
			closeDrawer();
		} else {
			// Snap back open — panelTransform returns to 0 with the transition.
			dragTranslate = 0;
		}
	}

	// ── Event handlers ────────────────────────────────────────────────────────

	function handleBackdropClick() {
		closeDrawer();
	}

	function preventScroll(e: Event) {
		e.preventDefault();
		e.stopPropagation();
	}

	function stopPropagationOnly(e: Event) {
		e.stopPropagation();
	}
</script>

{#if isPlaced}
	<div {id} class="relative z-30 {containerClassName}" role="dialog" aria-modal="true">
		<!-- Backdrop -->
		<div
			class="fixed inset-0 bg-neutral-900/20 dark:bg-neutral-950/40 transition-opacity ease-linear duration-300 {isOpened
				? 'opacity-100'
				: 'opacity-0'} {backdropClassName}"
			aria-hidden="true"
		></div>

		<!-- Drawer panel + backdrop-click area -->
		<div
			class="fixed inset-0 flex {flexDirection}"
			onwheel={preventScroll}
			ontouchmove={preventScroll}
		>
			<div
				bind:this={panelEl}
				class="relative flex transform {flexDirection} {isDragging
					? ''
					: 'transition ease-in-out duration-300'} {drawerClassName}"
				style="transform: {panelTransform};{isDragging ? ' transition: none;' : ''}{draggable
					? axis === 'x'
						? ' touch-action: pan-y;'
						: ' touch-action: pan-x;'
					: ''}"
				onwheel={stopPropagationOnly}
				ontouchmove={stopPropagationOnly}
				onpointerdown={handlePointerDown}
				onpointermove={handlePointerMove}
				onpointerup={handlePointerUp}
				onpointercancel={handlePointerUp}
			>
				<div
					class="grow w-72 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border-r border-neutral-100 dark:border-neutral-700 {className}"
				>
					{#if children}
						{@render children()}
					{/if}
				</div>
				<div>
					{#if floatingSnippet}
						{@render floatingSnippet()}
					{/if}
				</div>
			</div>

			<!-- Transparent full-height button to capture backdrop clicks -->
			<button
				class="flex-grow cursor-auto"
				type="button"
				onclick={handleBackdropClick}
				onwheel={preventScroll}
				ontouchmove={preventScroll}
				aria-label="Close drawer"
				title="Close drawer"
			></button>
		</div>
	</div>
{/if}
