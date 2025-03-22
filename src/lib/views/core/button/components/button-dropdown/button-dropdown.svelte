<script lang="ts">
	import Button, {
		type ButtonAppearance,
		type ButtonSize,
		type ButtonType
	} from '../button/button.svelte';
	import { onMount, type Snippet } from 'svelte';

	enum DropdownStateEnum {
		OPEN,
		OPENED,
		CLOSE,
		CLOSED
	}

	type ButtonDropdownProps = {
		appearance?: ButtonAppearance;
		size?: ButtonSize;
		label?: string;
		type?: ButtonType;
		children?: Snippet;
		dropdownSnippet?: Snippet;
		id?: string;
		backgropClassName?: string;
		className?: string;
		containerClassName?: string;
		dropdownClassName?: string;
		dropdownCloseClassName?: string;
		dropdownOpenClassName?: string;
		disabled?: boolean;
		popup?: boolean;
	};

	let {
		id,
		appearance,
		size,
		label,
		type,
		children,
		dropdownSnippet,
		backgropClassName = '',
		className = '',
		containerClassName = '',
		dropdownClassName = '',
		dropdownCloseClassName = '',
		dropdownOpenClassName = '',
		disabled = false,
		popup = false,
		...others
	}: ButtonDropdownProps = $props();

	let placement = $state(false);
	let dropdownState = $state(DropdownStateEnum.CLOSED);
	let openUpward = $state(false);
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
		const rect = buttonElement.getBoundingClientRect();
		const viewportHeight = window.innerHeight;
		const spaceBelow = viewportHeight - rect.bottom;
		const dropdownHeight = 200; // Adjust based on your dropdown content height

		if (popup || spaceBelow < dropdownHeight) {
			openUpward = rect.top > dropdownHeight;
		} else {
			openUpward = false;
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
			class="cursor-auto fixed inset-0 z-10 {backgropClassName}"
			onmousedown={toggleDropdown}
			ontouchstart={toggleDropdown}
			onclick={toggleDropdown}
			tabindex="-1"
			role="presentation"
		></div>

		<div
			role="dialog"
			class="absolute z-10 min-w-40 max-h-[50vh] overflow-y-auto origin-top right-0 rounded-md bg-white dark:bg-base-800 shadow-lg dark:shadow-black transition ease-out duration-100 {dropdownClassName} {dropdownState ===
			DropdownStateEnum.OPENED
				? `transform opacity-100 scale-100 ${dropdownOpenClassName}`
				: `transform opacity-0 scale-60 ${dropdownCloseClassName}`}"
			style={openUpward ? 'bottom: 100%; margin-bottom: 4px;' : 'top: 100%; margin-top: 4px;'}
			tabindex="-1"
		>
			{@render dropdownSnippet?.()}
		</div>
	{/if}
</div>
