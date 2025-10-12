<script lang="ts">
	import { DropdownStateEnum } from '$lib/types.js';
	import Button, {
		type ButtonAppearance,
		type ButtonSize,
		type ButtonType
	} from '../button/button.svelte';
	import { onMount, type Snippet } from 'svelte';

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
		...others
	}: ButtonDropdownProps = $props();

	let placement = $state(false);
	let dropdownState = $state(DropdownStateEnum.CLOSED);
	let openUpward = $state(false);
	let openMiddle = $state(false);
	let buttonElement: HTMLDivElement;

	export function toggleDropdown(ev: MouseEvent | TouchEvent) {
		ev.stopPropagation();

		if (placement) {
			dropdownState = DropdownStateEnum.CLOSED;
			setTimeout(() => (placement = false), 100);
		} else {
			placement = true;
			setTimeout(() => (dropdownState = DropdownStateEnum.OPENED), 1);
			adjustDropdownPosition();
		}
	}

	function adjustDropdownPosition() {
		if (buttonElement) {
			const rect = buttonElement?.getBoundingClientRect();
			const viewportHeight = window.innerHeight;
			const spaceBelow = viewportHeight - rect.bottom;
			const spaceAbove = rect.top;
			const dropdownHeight = 200;

			openUpward = false;
			openMiddle = false;

			switch (dropPosition) {
				case 'top':
					openUpward = true;
					break;
				case 'middle':
					openMiddle = true;
					break;
				default:
					openUpward = spaceBelow < dropdownHeight && spaceAbove > dropdownHeight;
			}
		}
	}

	onMount(() => {
		window.addEventListener('resize', adjustDropdownPosition);
	});
</script>

<div class="relative max-w-min {containerClassName}" bind:this={buttonElement}>
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
			onmousedown={(e) => {
				e.stopPropagation();
				e.stopImmediatePropagation();
				toggleDropdown(e);
			}}
			ontouchstart={(e) => {
				e.stopPropagation();
				e.stopImmediatePropagation();
				toggleDropdown(e);
			}}
			onclick={(e) => {
				e.stopPropagation();
				e.stopImmediatePropagation();
				toggleDropdown(e);
			}}
			tabindex="-1"
			role="presentation"
		></div>

		<div
			role="dialog"
			class="absolute right-0 z-10 max-h-[50vh] min-w-40 origin-top overflow-y-auto rounded-md bg-white shadow-lg transition duration-100 ease-out dark:bg-base-800 dark:shadow-black {dropdownClassName} {dropdownState ===
			DropdownStateEnum.OPENED
				? `scale-100 transform opacity-100 ${dropdownOpenClassName}`
				: `scale-60 transform opacity-0 ${dropdownCloseClassName}`}"
			style={openMiddle
				? 'top: 50%; transform: translateY(-50%);'
				: openUpward
					? 'bottom: 100%; margin-bottom: 4px;'
					: 'top: 100%; margin-top: 4px;'}
			tabindex="-1"
		>
			{@render dropdownSnippet?.()}
		</div>
	{/if}
</div>
