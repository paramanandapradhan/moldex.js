<script lang="ts">
	import { DropdownState } from '$lib/types.js';
	import { computeDropdownPosition } from '$lib/services/utils/dropdown-service.js';
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
		dropdownAlign?: 'left' | 'right' | 'auto';
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
		dropdownAlign = 'auto',
		...others
	}: ButtonDropdownProps = $props();

	let placement = $state(false);
	let dropdownState = $state(DropdownState.CLOSED);
	let isMeasured = $state(false);
	let buttonElement: HTMLDivElement;
	let dropdownElement: HTMLDivElement | null = $state(null);
	let dropdownStyle = $state('position: fixed; top: 0; left: 0;');

	function computeDropdownStyle() {
		if (!buttonElement || !dropdownElement) return;
		const rect = buttonElement.getBoundingClientRect();
		const { style } = computeDropdownPosition({
			anchorRect: rect,
			dropdownWidth: dropdownElement.offsetWidth,
			dropdownHeight: dropdownElement.scrollHeight,
			position: dropPosition,
			align: dropdownAlign
		});
		dropdownStyle = style;
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

	function handleReposition() {
		if (placement) computeDropdownStyle();
	}

	onMount(() => {
		window.addEventListener('resize', handleReposition);
		// Capture phase so we also follow scrolling of any nested scroll container.
		window.addEventListener('scroll', handleReposition, true);
		return () => {
			window.removeEventListener('resize', handleReposition);
			window.removeEventListener('scroll', handleReposition, true);
		};
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
			class="fixed z-20 min-w-40 overflow-y-auto rounded-md bg-white shadow-lg transition duration-100 ease-out dark:bg-neutral-800 dark:shadow-black {dropdownClassName} {!isMeasured
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
