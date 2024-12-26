<script lang="ts" module>
	export type Menu = {
		_id?: string;
		label?: string;
		hasIcon?: boolean;
		iconPath?: string;
		iconClassName?: string;
		hasCheckbox?: boolean;
		checkboxClassName?: string;
		isChecked?: boolean;
	};

	export type ButtonDropdownProps = {
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
	};
</script>

<script lang="ts">
	import { ripple } from '$lib/actions/ripple.js';
	import '../../../../../tailwind.css';

	import type { Snippet } from 'svelte';
	import Button, {
		type ButtonAppearance,
		type ButtonSize,
		type ButtonType
	} from '../button/button.svelte';

	enum DropdownStateEnum {
		OPEN,
		OPENED,
		CLOSE,
		CLOSED
	}

	let {
		id,
		appearance,
		size,
		label = 'MY btn',
		type,
		children,
		dropdownSnippet,
		backgropClassName = '',
		className = '',
		containerClassName = '',
		dropdownClassName = '',
		dropdownCloseClassName = '',
		dropdownOpenClassName = ''
	}: ButtonDropdownProps = $props();

	let dropdownState: DropdownStateEnum = $state(DropdownStateEnum.CLOSED);

	function handleToggleDropdown(ev: MouseEvent) {
		ev && ev.stopPropagation();
		if (dropdownState == DropdownStateEnum.CLOSED) {
			dropdownState = DropdownStateEnum.OPENED;
		} else {
			dropdownState = DropdownStateEnum.CLOSED;
		}
	}
</script>

<div class="relative max-w-min {containerClassName}">
	<Button
		{id}
		{type}
		{appearance}
		{size}
		className="flex items-center justify-center flex-nowrap text-start {className}"
		onClick={handleToggleDropdown}
		{label}
		{children}
	/>

	{#if dropdownState == DropdownStateEnum.OPENED}
		<button
			aria-label="backdrop"
			type="button"
			id="{id}-dropdown-backdrop"
			class="cursor-auto fixed inset-0 z-10 {backgropClassName}"
			use:ripple
			onclick={handleToggleDropdown}
			tabindex="-1"
		></button>
	{/if}

	<div
		class="absolute mt-1 z-10 min-w-40 max-h-1/2vh overflow-y-auto origin-top right-0 rounded-md bg-base-50 dark:bg-base-800 py-2 shadow-lg focus:outline-none transition ease-out duration-100 {dropdownClassName} {dropdownState ==
		DropdownStateEnum.CLOSED
			? `invisible transform opacity-0 scale-95 ${dropdownOpenClassName}`
			: `transform opacity-100 scale-100 ${dropdownCloseClassName}`}"
		tabindex="-1"
	>
		{@render dropdownSnippet?.()}
	</div>
</div>
