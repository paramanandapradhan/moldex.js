<script lang="ts">
	import { mdiUnfoldMoreHorizontal } from '$lib/views/core/icon';
	import Icon from '$lib/views/core/icon/components/icon/icon.svelte';
	import type { Snippet } from 'svelte';
	import InputField, { type InputFieldPropsType } from '../input-field/input-field.svelte';
	import SearchField from '../search-field/search-field.svelte';
	import Button from '$lib/views/core/button/components/button/button.svelte';
	import type { ListItemType } from '$lib/views/core/button/components/button-list-item/button-list-item.svelte';
	import NoData from '$lib/views/core/no-data/components/no-data/no-data.svelte';
	import ButtonListItem from '$lib/views/core/button/components/button-list-item/button-list-item.svelte';

	type PropsType = {
		iconClassName?: string;
		dropdownClassName?: string;
		dropdownHeaderClassName?: string;
		dropdownBodyClassName?: string;
		dropdownFooterClassName?: string;
		dropdownHeaderSnippet?: Snippet;
		dropdownBodySnippet?: Snippet;
		dropdownFooterSnippet?: Snippet;
		hasDropdownHeader?: boolean;
		hasDropdownFooter?: boolean;
		hasDropdownFooterCreateButton?: boolean;
		createButtonLabel?: string;
		createButtonClassName?: string;
		hasDropdownHeaderSearch?: boolean;
		searchPlaceholder?: string;
		searchFieldName?: string;
		searchClassName?: string;
		hasCheckbox?: boolean;
		items?: any[];
		itemClassName?: string;
		identityFieldName?: string;
		titleFieldName?: string;
		subtitleFieldName?: string;
		titleClassName?: string;
		subtitleClassName?: string;
		iconPathFieldName?: string;
		iconPathClassName?: string;
		hasPrimitiveData?: boolean;
		emptyMessage?: string;
		onCreateButtonClick?: (ev: MouseEvent) => void;
		onSearch?: (value: string) => void;
	};
	let {
		value,
		className,
		size,
		appearance,
		iconClassName,
		id,
		name,
		dropdownClassName,
		dropdownHeaderClassName,
		dropdownBodyClassName,
		dropdownFooterClassName,
		hasDropdownHeader,
		hasDropdownFooter,
		hasDropdownFooterCreateButton,
		createButtonLabel,
		createButtonClassName,
		hasDropdownHeaderSearch,
		searchPlaceholder,
		searchFieldName,
		searchClassName,
		hasPrimitiveData,
		hasCheckbox,
		items,
		itemClassName,
		identityFieldName,
		titleFieldName,
		subtitleFieldName,
		titleClassName,
		subtitleClassName,
		iconPathFieldName,
		iconPathClassName,
		emptyMessage = 'No items exists!',
		onCreateButtonClick,
		onSearch,
		dropdownHeaderSnippet,
		dropdownBodySnippet,
		dropdownFooterSnippet,
		...props
	}: InputFieldPropsType & PropsType = $props();

	let idFieldSymbol = Symbol('_id');
	let searchFieldSymbol = Symbol('_search');

	type CustomListItemType = ListItemType & {
		[key: symbol]: string | number;
	};

	let btnIconSizeClassName = $state('');
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

				if (selectedItemsSet.has(res[idFieldSymbol])) {
					res.isChecked = true;
				} else {
					res.isChecked = false;
				}
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
					btnIconSizeClassName = '!h-7 !w-7';
					break;
				case 'md':
					btnIconSizeClassName = '!h-6 !w-6';
					break;
				case 'sm':
					btnIconSizeClassName = '!h-5 !w-5';
					break;
				case 'xs':
					btnIconSizeClassName = '!h-4 !w-4';
					break;
			}
		}
	});

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
		}
	}

	function handleSearch(value: string) {
		searchText = value;
	}
</script>

{#snippet rightIcon()}
	<div class="px-1">
		<Icon
			path={mdiUnfoldMoreHorizontal}
			className=" text-gray-500 {btnIconSizeClassName} {iconClassName}"
		/>
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
		<button id="backdrop" class="fixed inset-0" onclick={handleBackdropClick} tabindex="-1"
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
							name="search"
							placeholder={searchPlaceholder}
							className="w-full !rounded-full {searchClassName}"
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
								/>
							</li>
						{/each}
					</ul>
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
