<script lang="ts">
	import { DropdownState } from '$lib/types.js';
	import { tick, onMount, type Snippet } from 'svelte';
	import type { ButtonAppearance, ButtonSize, ButtonType } from '../../types';
	import Button from '../button/button.svelte';

	export type ButtonDropdownProps = {
		appearance?: ButtonAppearance;
		size?: ButtonSize;
		label?: string;
		type?: ButtonType;
		children?: Snippet;
		dropdownSnippet?: Snippet;
		id?: string;
		backdropClassName?: string;
		className?: string;
		containerClassName?: string;
		dropdownClassName?: string;
		dropdownCloseClassName?: string;
		dropdownOpenClassName?: string;
		disabled?: boolean;
		dropPosition?: 'top' | 'bottom' | 'middle';
		dropdownAlign?: 'left' | 'right';
	};

	let {
		id,
		appearance,
		size,
		label,
		type,
		children,
		dropdownSnippet,
		backdropClassName = '',
		className = '',
		containerClassName = '',
		dropdownClassName = '',
		dropdownCloseClassName = '',
		dropdownOpenClassName = '',
		disabled = false,
		dropPosition = 'bottom',
		dropdownAlign = 'left',
		...others
	}: ButtonDropdownProps = $props();

	let placement = $state(false);
	let dropdownState = $state(DropdownState.CLOSED);
	let isMeasured = $state(false);
	let buttonElement: HTMLDivElement;
	let dropdownElement: HTMLDivElement | null = $state(null);
	let dropdownStyle = $state('top: 100%; margin-top: 4px; left: 0;');

	const MARGIN = 8;

	function getVerticalStyle(rect: DOMRect, dropHeight: number): { style: string; maxH: number } {
		const vh = window.innerHeight;
		const spaceBelow = vh - rect.bottom - MARGIN;
		const spaceAbove = rect.top - MARGIN;

		if (dropPosition === 'middle') {
			const maxH = Math.max(0, vh - 2 * MARGIN);
			return { style: 'top: 50%; transform: translateY(-50%);', maxH };
		}

		const preferTop = dropPosition === 'top';
		const fitsPreferred = preferTop ? dropHeight <= spaceAbove : dropHeight <= spaceBelow;
		const fitsOther = preferTop ? dropHeight <= spaceBelow : dropHeight <= spaceAbove;

		if (preferTop && (fitsPreferred || !fitsOther)) {
			return { style: 'bottom: 100%; margin-bottom: 4px;', maxH: spaceAbove };
		}
		if (!preferTop && (fitsPreferred || !fitsOther)) {
			return { style: 'top: 100%; margin-top: 4px;', maxH: spaceBelow };
		}
		// Flip — preferred didn't fit, the other side does
		return preferTop
			? { style: 'top: 100%; margin-top: 4px;', maxH: spaceBelow }
			: { style: 'bottom: 100%; margin-bottom: 4px;', maxH: spaceAbove };
	}

	function getHorizontalStyle(buttonRect: DOMRect, dropWidth: number): string {
		const vw = window.innerWidth;

		if (dropdownAlign === 'right') {
			const dropLeft = buttonRect.right - dropWidth;
			if (dropLeft < MARGIN) {
				return `left: ${MARGIN - buttonRect.left}px;`;
			}
			return 'right: 0; left: auto;';
		}

		const rightOverflow = buttonRect.left + dropWidth - (vw - MARGIN);
		if (rightOverflow > 0) {
			const offsetLeft = Math.max(MARGIN - buttonRect.left, -rightOverflow);
			return `left: ${offsetLeft}px;`;
		}
		return 'left: 0;';
	}

	function computeDropdownStyle() {
		if (!buttonElement || !dropdownElement) return;
		const rect = buttonElement.getBoundingClientRect();
		const dropWidth = dropdownElement.offsetWidth;
		const dropHeight = dropdownElement.scrollHeight;
		const v = getVerticalStyle(rect, dropHeight);
		const h = getHorizontalStyle(rect, dropWidth);
		dropdownStyle = `${v.style} ${h} max-height: ${v.maxH}px;`;
	}

	export async function toggleDropdown(ev: MouseEvent | TouchEvent) {
		ev.stopPropagation();

		if (placement) {
			dropdownState = DropdownState.CLOSED;
			setTimeout(() => {
				placement = false;
				isMeasured = false;
			}, 100);
		} else {
			isMeasured = false;
			placement = true;

			await tick();
			computeDropdownStyle();
			isMeasured = true;

			// next frame so the browser commits initial hidden state, then animates
			requestAnimationFrame(() => {
				dropdownState = DropdownState.OPENED;
			});
		}
	}

	function handleResize() {
		if (placement) computeDropdownStyle();
	}

	onMount(() => {
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	});
</script>

<div class="relative {containerClassName}" bind:this={buttonElement}>
	<Button
		{id}
		{type}
		{appearance}
		{size}
		className="flex items-center justify-center flex-nowrap text-start {className}"
		onClick={toggleDropdown}
		{label}
		{disabled}
		{...others}
	>
		{#if children}
			{@render children()}
		{/if}
	</Button>

	{#if placement}
		<div
			aria-label="backdrop"
			id="{id}-dropdown-backdrop"
			class="fixed inset-0 z-10 cursor-auto {backdropClassName}"
			onmousedown={(e) => { e.stopPropagation(); e.stopImmediatePropagation(); toggleDropdown(e); }}
			ontouchstart={(e) => { e.stopPropagation(); e.stopImmediatePropagation(); toggleDropdown(e); }}
			onclick={(e) => { e.stopPropagation(); e.stopImmediatePropagation(); toggleDropdown(e); }}
			tabindex="-1"
			role="presentation"
		></div>

		<div
			bind:this={dropdownElement}
			role="dialog"
			class="absolute z-10 min-w-40 origin-top overflow-y-auto rounded-md bg-white shadow-lg transition duration-100 ease-out dark:bg-neutral-800 dark:shadow-black {dropdownClassName} {!isMeasured
				? 'pointer-events-none invisible opacity-0'
				: dropdownState === DropdownState.OPENED
					? `scale-100 transform opacity-100 ${dropdownOpenClassName}`
					: `scale-95 transform opacity-0 ${dropdownCloseClassName}`}"
			style={dropdownStyle}
			tabindex="-1"
		>
			{@render dropdownSnippet?.()}
		</div>
	{/if}
</div>
