<script lang="ts" module>

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

	let placement: boolean = $state(false);
	let dropdownState: DropdownStateEnum = $state(DropdownStateEnum.CLOSED);

	export function toggleDropdown(ev: MouseEvent) {
		ev && ev.stopPropagation();
		if (placement) {
			dropdownState = DropdownStateEnum.CLOSED;
			setTimeout(() => {
				placement = false;
			}, 100);
		} else {
			placement = true;
			setTimeout(() => {
				dropdownState = DropdownStateEnum.OPENED;
			}, 1);
		}
	}

	function handleToggleDropdown(ev: MouseEvent){
		toggleDropdown(ev);
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

	{#if placement}
		<button
			aria-label="backdrop"
			type="button"
			id="{id}-dropdown-backdrop"
			class="cursor-auto fixed inset-0 z-10 {backgropClassName}"
			onclick={handleToggleDropdown}
			tabindex="-1"
		></button>
		<div
			class="absolute z-10 min-w-40 max-h-1/2vh overflow-y-auto origin-top right-0 rounded-md bg-white dark:bg-base-800 shadow-lg focus:outline-none transition ease-out duration-100 {dropdownClassName} {dropdownState ==
			DropdownStateEnum.OPENED
				? `transform opacity-100 scale-100  ${dropdownOpenClassName}`
				: `transform opacity-0 scale-60 } ${dropdownCloseClassName}`}"
			tabindex="-1"
		>
			{@render dropdownSnippet?.()}
		</div>
	{/if}
</div>
