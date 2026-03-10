<script lang="ts">
	import { BROWSER } from 'esm-env';
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
	};

	let {
		backdropClassName = '',
		children,
		className = '',
		containerClassName = '',
		drawerClassName = '',
		floatingSnippet,
		id = '',
		position = 'left'
	}: PropsType = $props();

	let isPlaced: boolean = $state(false);
	let isOpened: boolean = $state(false);

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
		isOpened = false;
		setTimeout(() => {
			isPlaced = false;
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

	let translateClass = $derived.by(() => {
		if (!isOpened) {
			switch (position) {
				case 'left': return '-translate-x-full';
				case 'right': return 'translate-x-full';
				case 'top': return '-translate-y-full';
				case 'bottom': return 'translate-y-full';
			}
		}
		return 'translate-x-0 translate-y-0';
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
		isPlaced = true;
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

	// ── Event handlers ────────────────────────────────────────────────────────

	function handleBackdropClick() {
		closeDrawer();
	}

	function preventScroll(e: Event) {
		e.preventDefault();
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
		<div class="fixed inset-0 flex {flexDirection}">
			<div
				class="relative flex transition ease-in-out duration-300 transform {flexDirection} {translateClass} {drawerClassName}"
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
