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
		chipClassName?: string;
		comboboxIconClassName?: string;
		comboboxIconPath?: string;
		createButtonClassName?: string;
		createButtonLabel?: string;
		displayClassName?: string;
		displayFieldName?: string;
		displayItemsCount?: number;
		dropdownBodyClassName?: string;
		dropdownBodySnippet?: Snippet;
		dropdownClassName?: string;
		dropdownFooterClassName?: string;
		dropdownFooterSnippet?: Snippet;
		dropdownHeaderClassName?: string;
		dropdownHeaderSnippet?: Snippet;
		emptyMessage?: string;
		emptyMessageSnippet?: Snippet;
		hasComboboxIcon?: boolean;
		hasDropdownFooter?: boolean;
		hasDropdownFooterCreateButton?: boolean;
		hasDropdownHeader?: boolean;
		hasDropdownHeaderSearch?: boolean;
		hasItemsCheckbox?: boolean;
		hasPrimitiveItemsData?: boolean;
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
		showChip?: boolean;
		itemSubtitleClassName?: string;
		itemSubtitleFieldName?: string;
		itemTitleClassName?: string;
		itemTitleFieldName?: string;
	};

	let {
		appearance,
		chipClassName,
		className,
		comboboxIconClassName,
		comboboxIconPath = mdiUnfoldMoreHorizontal,
		contentSnippet,
		createButtonClassName,
		createButtonLabel = 'Add',
		displayClassName,
		displayFieldName,
		displayItemsCount,
		dropdownBodyClassName,
		dropdownBodySnippet,
		dropdownClassName,
		dropdownFooterClassName,
		dropdownFooterSnippet,
		dropdownHeaderClassName,
		dropdownHeaderSnippet,
		emptyMessage = 'No items exists!',
		emptyMessageSnippet,
		hasComboboxIcon = true,
		hasDropdownFooter,
		hasDropdownFooterCreateButton,
		hasDropdownHeader,
		hasDropdownHeaderSearch,
		hasItemsCheckbox,
		hasPrimitiveItemsData,
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
		showChip,
		size,
		itemSubtitleClassName,
		itemSubtitleFieldName,
		itemTitleClassName,
		itemTitleFieldName,
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

	let isPlaced = $state(false);
	let searchText: string = $state('');

	let itemsIdentityMap: any = {};

	let _value = $derived.by(() => {
		return selectedItemsSet?.size ? '&nbsp;' : '';
	});

	let displayItems: string[] = $derived.by(() => {
		let array = Array.from(selectedItemsSet);
		let results = array.map((id) => {
			if (hasPrimitiveItemsData) {
				return [id];
			} else {
				let item = itemsIdentityMap[id];
				if (item) {
					if (displayFieldName && item.hasOwnProperty(displayFieldName)) {
						return item[displayFieldName];
					}
				}
			}
		});
		return results;
	});

	let displayItemsTitle = $derived(displayItems.join(', '));

	let displayText: string = $derived.by(() => {
		let results: string[] = displayItems;
		if (!showChip) {
			if (results?.length) {
				if (multiple) {
					let res: string = results.join(', ');
					if (displayItemsCount != null && displayItemsCount > 1) {
						res = results.slice(0, displayItemsCount).join(', ');
						if (results.length > displayItemsCount) {
							res += `<span class="text-gray-400 px-2">+ ${results.length - displayItemsCount} </span>`;
						}
					}
					return res;
				} else {
					return results[0] || '';
				}
			}
		}

		return '';
	});

	let selectedItemsSet: Set<any> = $derived.by(() => {
		let set = new Set<any>();
		if (value != null) {
			if (Array.isArray(value)) {
				value.forEach((v) => set.add(v));
			} else if (value) {
				set.add(value);
			}
		}
		return set;
	});

	let preparedItems: CustomListItemType[] = $derived.by(() => {
		return (items || []).map((item, index) => {
			let res: CustomListItemType = {};
			if (hasPrimitiveItemsData) {
				res.title = item;
				res[idFieldSymbol] = item;
				res[searchFieldSymbol] = ('' + item).toLowerCase().trim();
			} else {
				if (identityFieldName && item.hasOwnProperty(identityFieldName)) {
					res[idFieldSymbol] = item[identityFieldName];
				} else {
					res[idFieldSymbol] = index;
				}

				itemsIdentityMap[res[idFieldSymbol]] = item;

				if (itemTitleFieldName && item.hasOwnProperty(itemTitleFieldName)) {
					res.title = item[itemTitleFieldName];
				}
				if (itemSubtitleFieldName && item.hasOwnProperty(itemSubtitleFieldName)) {
					res.subtitle = item[itemSubtitleFieldName];
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
		if (isPlaced) {
			closeDropdown();
		} else {
			openDropdown();
		}
	}

	function closeDropdown() {
		searchText = '';
		isPlaced = false;
		focus();
	}

	function openDropdown() {
		isPlaced = true;
	}

	function handleInputClick() {
		toggleDropdown();
	}

	function handleBackdropClick() {
		toggleDropdown();
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			closeDropdown();
		} else if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault(); // Prevent default action for spacebar to avoid scrolling
			toggleDropdown();
		} else if (/^[a-zA-Z0-9]$/.test(event.key)) {
			searchFieldRef && searchFieldRef.focus();
		} else if (event.key === 'Backspace' || event.key === 'Delete') {
			event.preventDefault(); // Prevent default action for these keys if necessary
			selectedItemsSet.clear();
			value = null;
		}
	}

	function handleDropdownKeyDown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			closeDropdown();
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
			closeDropdown();
		}

		// console.log('handleItemSelected', selectedItemsSet, value);
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

{#snippet comboboxContentSnippet()}
	{#if contentSnippet}
		{@render contentSnippet()}
	{:else if showChip}
		<div class="flex items-center {displayClassName}" title={displayItemsTitle}>
			{#each displayItems?.slice(0, displayItemsCount) as item, index}
				<div
					class="inline-flex items-center bg-gray-200 text-gray-700 text-sm font-medium px-2 mx-1 rounded-full text-nowrap {chipClassName}"
				>
					{item}
				</div>
			{/each}
			{#if displayItemsCount && displayItems?.length > (displayItemsCount || 1)}
				<div class="px-2 text-gray-400">+ {displayItems?.length - (displayItemsCount || 1)}</div>
			{/if}
		</div>
	{:else}
		<div class="flex items-center {displayClassName}" title={displayItemsTitle}>
			{@html displayText}
		</div>
	{/if}
{/snippet}

<div class="relative">
	<InputField
		bind:this={inputFieldRef}
		{...props}
		value={_value}
		type="text"
		role="combobox"
		onclick={handleInputClick}
		className="pr-8 text-transparent {className}"
		rightSnippet={rightIcon}
		rightSnippetContainerClassName="pointer-events-none"
		readonly
		{id}
		{name}
		{size}
		{appearance}
		ariaControls="options"
		ariaExpanded={isPlaced}
		onkeydown={handleKeyDown}
		contentSnippet={comboboxContentSnippet}
		title={displayItemsTitle || ''}
	/>
	{#if isPlaced}
		<button id="backdrop" class="fixed inset-0 z-10" onclick={handleBackdropClick} tabindex="-1"
		></button>
		<!-- svelte-ignore a11y_interactive_supports_focus -->
		<div
			class="absolute z-10 mt-1 max-h-80 w-full flex flex-col rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm {hasDropdownHeader
				? ''
				: 'pt-1'} {hasDropdownFooter ? '' : 'pb-1'} {dropdownClassName}"
			id="options"
			role="listbox"
			onkeydown={handleDropdownKeyDown}
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
							value={searchText}
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
									hasCheckbox={hasItemsCheckbox}
									className=" {itemClassName}"
									titleClassName=" {itemTitleClassName}"
									subtitleClassName=" {itemSubtitleClassName}"
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
							className="px-3 py-1 {createButtonClassName}"
							onClick={onCreateButtonClick}
						></Button>
					{/if}
				</div>
			{/if}
		</div>
	{/if}
</div>
