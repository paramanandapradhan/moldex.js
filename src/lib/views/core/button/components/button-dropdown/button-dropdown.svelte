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
	let buttonElement: HTMLDivElement;
	let dropdownElement: HTMLDivElement | null = $state(null);
	const initialHorizontal = $derived(dropdownAlign === 'right' ? 'right: 0; left: auto;' : 'left: 0;');
	let dropdownStyle = $state('top: 100%; margin-top: 4px; left: 0;');

	function getVerticalStyle(rect: DOMRect): string {
		const viewportHeight = window.innerHeight;
		const spaceBelow = viewportHeight - rect.bottom;
		const spaceAbove = rect.top;

		switch (dropPosition) {
			case 'top':
				return 'bottom: 100%; margin-bottom: 4px;';
			case 'middle':
				return 'top: 50%; transform: translateY(-50%);';
			default:
				return spaceBelow < 200 && spaceAbove > 200
					? 'bottom: 100%; margin-bottom: 4px;'
					: 'top: 100%; margin-top: 4px;';
		}
	}

	function getHorizontalStyle(buttonRect: DOMRect, dropWidth: number): string {
		const vw = window.innerWidth;
		const MARGIN = 8;

		if (dropdownAlign === 'right') {
			// Right-align: dropdown right edge = button right edge (right: 0; left: auto)
			// Shift right if the left edge would overflow the viewport left side.
			const dropLeft = buttonRect.right - dropWidth;
			if (dropLeft < MARGIN) {
				return `left: ${MARGIN - buttonRect.left}px;`;
			}
			return 'right: 0; left: auto;';
		}

		// Left-align: dropdown left edge = button left edge (left: 0)
		// Shift left if the right edge would overflow the viewport right side.
		const rightOverflow = buttonRect.left + dropWidth - (vw - MARGIN);
		if (rightOverflow > 0) {
			const offsetLeft = Math.max(MARGIN - buttonRect.left, -rightOverflow);
			return `left: ${offsetLeft}px;`;
		}
		return 'left: 0;';
	}

	export async function toggleDropdown(ev: MouseEvent | TouchEvent) {
		ev.stopPropagation();

		if (placement) {
			dropdownState = DropdownState.CLOSED;
			setTimeout(() => (placement = false), 100);
		} else {
			placement = true;

			// Set initial vertical position immediately (no DOM measurement needed)
			const rect = buttonElement?.getBoundingClientRect();
			if (rect) {
				dropdownStyle = `${getVerticalStyle(rect)} ${initialHorizontal}`;
			}

			// Wait for the dropdown to be in the DOM, then measure and correct
			await tick();
			if (rect && dropdownElement) {
				const dropWidth = dropdownElement.offsetWidth;
				dropdownStyle = `${getVerticalStyle(rect)} ${getHorizontalStyle(rect, dropWidth)}`;
			}

			setTimeout(() => (dropdownState = DropdownState.OPENED), 1);
		}
	}

	function handleResize() {
		if (placement && buttonElement && dropdownElement) {
			const rect = buttonElement.getBoundingClientRect();
			const dropWidth = dropdownElement.offsetWidth;
			dropdownStyle = `${getVerticalStyle(rect)} ${getHorizontalStyle(rect, dropWidth)}`;
		}
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
			class="absolute z-10 max-h-[50vh] min-w-40 origin-top overflow-y-auto rounded-md bg-white shadow-lg transition duration-100 ease-out dark:bg-neutral-800 dark:shadow-black {dropdownClassName} {dropdownState === DropdownState.OPENED
				? `scale-100 transform opacity-100 ${dropdownOpenClassName}`
				: `scale-60 transform opacity-0 ${dropdownCloseClassName}`}"
			style={dropdownStyle}
			tabindex="-1"
		>
			{@render dropdownSnippet?.()}
		</div>
	{/if}
</div>
