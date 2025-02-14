<script lang="ts" module>
	export type Menu = {
		_id?: string;
		title?: string;
		subtitle?: string;
		hasIcon?: boolean;
		iconPath?: string;
		iconClassName?: string;
		hasCheckbox?: boolean;
		checkboxClassName?: string;
		isChecked?: boolean;
	};
</script>

<script lang="ts">
	import {
		mdiDotsHorizontal,
		type ButtonAppearance,
		type ButtonProps,
		type ButtonSize
	} from '$lib';
	import ButtonDropdown from '$lib/views/core/button/components/button-dropdown/button-dropdown.svelte';
	import Icon from '$lib/views/core/icon/components/icon/icon.svelte';
	import type { Snippet } from 'svelte';
	import ButtonListItem from '../button-list-item/button-list-item.svelte';
	type Props = {
		label?: string;
		className?: string;
		appearance?: ButtonAppearance;
		size?: ButtonSize;
		children?: Snippet;
		iconPath?: string;
		iconClassName?: string;
		menus?: string[] | Menu[];
		onMenu?: (ev: MouseEvent, menu: string | Menu) => void;
		dropdownClassName?: string;
		menuIconClassName?: string;
		disabled?: boolean;
	};

	let {
		label,
		className,
		appearance,
		size,
		children,
		iconPath = mdiDotsHorizontal,
		iconClassName,
		menus,
		onMenu,
		dropdownClassName,
		menuIconClassName,
		disabled,
		...others
	}: ButtonProps & Props = $props();

	let buttonDropdownRef: ButtonDropdown;

	let items: Menu[] = $derived.by(() => {
		if (menus && typeof menus[0] == 'string') {
			let array = (menus as string[]).map((name: string) => {
				return {
					_id: name,
					title: name
				} as Menu;
			});
			return array;
		}
		return (menus || []) as Menu[];
	});

	function handleItemClick(ev: MouseEvent, menuItem: Menu, index: number) {
		let menu = (menus || [])[index];
		if (menu) {
			onMenu && onMenu(ev, menu);
			buttonDropdownRef && buttonDropdownRef.toggleDropdown(ev);
		}
	}
</script>

{#snippet dropdownView()}
	<div class="py-2">
		{#each items as item, index}
			{#if item.title == '-'}
				<hr />
			{:else}
				<ButtonListItem
					{...item}
					className=""
					iconClassName={menuIconClassName}
					onClick={(ev) => handleItemClick(ev, item, index)}
				/>
			{/if}
		{/each}
	</div>
{/snippet}

<ButtonDropdown
	bind:this={buttonDropdownRef}
	dropdownSnippet={dropdownView}
	{className}
	{appearance}
	{size}
	{dropdownClassName}
	{disabled}
	{...others}
>
	{#if children}
		{@render children()}
	{:else}
		{#if label}
			<div>
				{label || ''}
			</div>
		{/if}
		<div>
			<Icon path={iconPath} className={iconClassName} />
		</div>
	{/if}
</ButtonDropdown>
