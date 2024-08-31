<script lang="ts">
	import type { ListItemType } from '$lib/views/core/button/components/button-list-item/button-list-item.svelte';
	import ButtonListItem from '$lib/views/core/button/components/button-list-item/button-list-item.svelte';
	import Button from '$lib/views/core/button/components/button/button.svelte';
	import { mdiUnfoldMoreHorizontal } from '$lib/views/core/icon';
	import Icon from '$lib/views/core/icon/components/icon/icon.svelte';
	import NoData from '$lib/views/core/no-data/components/no-data/no-data.svelte';
	import type { Snippet } from 'svelte';
	import InputField, { type InputFieldPropsType } from '../input-field/input-field.svelte';
	import SearchField from '../search-field/search-field.svelte';

	type PropsType = {
		comboboxIconClassName?: string;
		comboboxIconPath?: string;
		createButtonClassName?: string;
		createButtonLabel?: string;
		dropdownBodyClassName?: string;
		dropdownBodySnippet?: Snippet;
		dropdownClassName?: string;
		dropdownFooterClassName?: string;
		dropdownFooterSnippet?: Snippet;
		dropdownHeaderClassName?: string;
		dropdownHeaderSnippet?: Snippet;
		emptyMessage?: string;
		emptyMessageSnippet?: Snippet;
		hasCheckbox?: boolean;
		hasComboboxIcon?: boolean;
		hasDropdownFooter?: boolean;
		hasDropdownFooterCreateButton?: boolean;
		hasDropdownHeader?: boolean;
		hasDropdownHeaderSearch?: boolean;
		hasPrimitiveData?: boolean;
		iconPathClassName?: string;
		iconPathFieldName?: string;
		identityFieldName?: string;
		itemClassName?: string;
		items?: any[];
		multiple?: boolean;
		onCreateButtonClick?: (ev: MouseEvent) => void;
		onSearch?: (value: string) => void;
		searchClassName?: string;
		searchFieldName?: string;
		searchPlaceholder?: string;
		subtitleClassName?: string;
		subtitleFieldName?: string;
		titleClassName?: string;
		titleFieldName?: string;
	};
	let {
		appearance,
		className,
		comboboxIconClassName,
		comboboxIconPath = mdiUnfoldMoreHorizontal,
		createButtonClassName,
		createButtonLabel,
		dropdownBodyClassName,
		dropdownBodySnippet,
		dropdownClassName,
		dropdownFooterClassName,
		dropdownFooterSnippet,
		dropdownHeaderClassName,
		dropdownHeaderSnippet,
		emptyMessage = 'No items exists!',
		emptyMessageSnippet,
		hasCheckbox,
		hasComboboxIcon,
		hasDropdownFooter,
		hasDropdownFooterCreateButton,
		hasDropdownHeader,
		hasDropdownHeaderSearch,
		hasPrimitiveData,
		iconPathClassName,
		iconPathFieldName,
		id,
		identityFieldName,
		itemClassName,
		items,
		multiple,
		name,
		onCreateButtonClick,
		onSearch,
		searchClassName,
		searchFieldName,
		searchPlaceholder = 'Search...',
		size,
		subtitleClassName,
		subtitleFieldName,
		titleClassName,
		titleFieldName,
		value = $bindable(),
		...props
	}: InputFieldPropsType & PropsType = $props();
	type CustomListItemType = ListItemType & {
		[key: symbol]: string | number;
	};
	let idFieldSymbol = Symbol('_id');
	let searchFieldSymbol = Symbol('_search');

	let searchFieldRef: SearchField | null = $state(null);

	let comboboxIconSizeClassName = $state('');
	let _value = $state('');
	let isPlaced = $state(false);
	let searchText: string = $state('');

	let selectedItemsSet: Set<any> = $derived.by(() => {
		let set = new Set<any>();
		if (value != null) {
			if (Array.isArray(value)) {
				value.forEach((v) => set.add(v));
			} else {
				set.add(value);
			}
		}
		return set;
	});

	let preparedItems: CustomListItemType[] = $derived.by(() => {
		return (items || []).map((item, index) => {
			let res: CustomListItemType = {};

			if (hasPrimitiveData) {
				res.title = item;
				res[idFieldSymbol] = item;
				res[searchFieldSymbol] = ('' + item).toLowerCase().trim();
			} else {
				if (titleFieldName && item.hasOwnProperty(titleFieldName)) {
					res.title = item[titleFieldName];
				}

				if (subtitleFieldName && item.hasOwnProperty(subtitleFieldName)) {
					res.subtitle = item[subtitleFieldName];
				}

				if (identityFieldName && item.hasOwnProperty(identityFieldName)) {
					res[idFieldSymbol] = item[identityFieldName];
				}

				if (searchFieldName) {
					if (item.hasOwnProperty(searchFieldName)) {
						res[searchFieldSymbol] = (item[searchFieldName] || '').toLowerCase().trim();
					}
				} else {
					res[searchFieldSymbol] = `${item.title || ''} ${item.subtitle || ''}`;
				}
			}
			if (selectedItemsSet.has(res[idFieldSymbol])) {
				res.isChecked = true;
			} else {
				res.isChecked = false;
			}
			return res;
		});
	});

	let filteredItems: CustomListItemType[] = $derived.by(() => {
		if (searchText) {
			return preparedItems.filter((item: any) => {
				return item[searchFieldSymbol].indexOf(searchText) >= 0;
			});
		} else {
			return [...preparedItems];
		}
	});

	$effect(() => {
		if (size) {
			switch (size) {
				case 'lg':
					comboboxIconSizeClassName = '!h-7 !w-7';
					break;
				case 'md':
					comboboxIconSizeClassName = '!h-6 !w-6';
					break;
				case 'sm':
					comboboxIconSizeClassName = '!h-5 !w-5';
					break;
				case 'xs':
					comboboxIconSizeClassName = '!h-4 !w-4';
					break;
			}
		}
	});

	let inputFieldRef: InputField | null = $state(null);

	export function focus() {
		inputFieldRef?.focus();
	}

	function toggleDropdown() {
		isPlaced = !isPlaced;
	}

	function handleInputClick() {
		toggleDropdown();
	}

	function handleBackdropClick() {
		toggleDropdown();
	}

	function handleKeypress(event: KeyboardEvent) {
		console.log('handleKeypress');
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault(); // Prevent default action for spacebar to avoid scrolling
			toggleDropdown();
		} else if (/^[a-zA-Z0-9]$/.test(event.key)) {
			searchText += event.key;
			searchFieldRef && searchFieldRef.focus();
		}
	}

	function handleSearch(value: string) {
		searchText = value;
	}

	function handleItemSelected(ev: MouseEvent, item: CustomListItemType, index: number) {
		let id = item[idFieldSymbol];
		if (multiple) {
			if (selectedItemsSet.has(id)) {
				selectedItemsSet.delete(id);
			} else {
				selectedItemsSet.add(id);
			}
		} else {
			selectedItemsSet.clear();
			selectedItemsSet.add(id);
		}

		items = [...(items || [])];

		let array = Array.from(selectedItemsSet);
		if (array.length) {
			value = multiple ? array : array[0];
		} else {
			value = null;
		}

		if (!multiple) {
			isPlaced = false;
		}

		// console.log('handleItemSelected', selectedItemsSet, value);
	}

	function handleBackdropKeypress() {
		console.log('handleBackdropKeypress');
	}
</script>

{#snippet rightIcon()}
	<div class="px-1">
		{#if hasComboboxIcon}
			<Icon
				path={comboboxIconPath}
				className=" text-gray-500 {comboboxIconSizeClassName} {comboboxIconClassName}"
			/>
		{/if}
	</div>
{/snippet}

<div class="relative">
	<InputField
		{...props}
		bind:value={_value}
		type="text"
		role="combobox"
		onclick={handleInputClick}
		className="pr-8 text-transparent {className}"
		rightSnippet={rightIcon}
		rightSnippetContainerClassName="pointer-events-none"
		readonly
		{size}
		{appearance}
		ariaControls="options"
		ariaExpanded={isPlaced}
		onkeypress={handleKeypress}
	/>
	{#if isPlaced}
		<button
			id="backdrop"
			class="fixed inset-0"
			onclick={handleBackdropClick}
			tabindex="-1"
			onkeypress={handleBackdropKeypress}
		></button>
		<div
			class="absolute mt-1 py-1 max-h-96 w-full flex flex-col rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm {dropdownClassName}"
			id="options"
			role="listbox"
		>
			{#if hasDropdownHeader}
				<div
					id="dropdown-header"
					class=" flex items-center p-2 px-3 my-1 w-full {dropdownHeaderClassName}"
				>
					{#if dropdownHeaderSnippet}
						{@render dropdownHeaderSnippet()}
					{:else if hasDropdownHeaderSearch}
						<SearchField
							bind:this={searchFieldRef}
							name="search"
							placeholder={searchPlaceholder}
							className="w-full {searchClassName}"
							onSearch={handleSearch}
						/>
					{/if}
				</div>
			{/if}
			<div id="dropdown-body" class="flex-grow overflow-y-auto max-h-full {dropdownBodyClassName}">
				{#if dropdownBodySnippet}
					{@render dropdownBodySnippet()}
				{:else if filteredItems?.length}
					<ul>
						{#each filteredItems as item, index}
							<li
								class="select-none"
								id="item-{index}"
								role="option"
								tabindex="-1"
								aria-selected={item.isChecked}
							>
								<ButtonListItem
									{item}
									{index}
									{hasCheckbox}
									className=" {itemClassName}"
									titleClassName=" {titleClassName}"
									subtitleClassName=" {subtitleClassName}"
									onClick={(ev) => handleItemSelected(ev, item, index)}
								/>
							</li>
						{/each}
					</ul>
				{:else if emptyMessageSnippet}
					{@render emptyMessageSnippet()}
				{:else}
					<NoData message={emptyMessage} />
				{/if}
			</div>

			{#if hasDropdownFooter}
				<div id="dropdown-footer" class="flex justify-end gap-3 p-2 px-3 {dropdownFooterClassName}">
					{#if dropdownFooterSnippet}
						{@render dropdownFooterSnippet()}
					{:else if hasDropdownFooterCreateButton}
						<Button
							label={createButtonLabel}
							className={createButtonClassName}
							onClick={onCreateButtonClick}
						></Button>
					{/if}
				</div>
			{/if}
		</div>
	{/if}
</div>
