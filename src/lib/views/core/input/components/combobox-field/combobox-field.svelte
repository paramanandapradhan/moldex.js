<script module lang="ts">
	export type ComboboxFieldProps = {
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
		hasCheckbox?: boolean;
		iconClassName?: string;
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
		subtitleClassName?: string;
		subtitleFieldName?: string;
		titleClassName?: string;
		titleFieldName?: string;
		checkboxIconPath?: string;
		uncheckboxIconPath?: string;
		checkboxIconClassName?: string;
		uncheckboxIconClassName?: string;
		checkboxClassName?: string;
		dropUp?: boolean;
		itemTileSnippet?: Snippet<[item: any, index: any]>;
	};
</script>

<script lang="ts">
	import ButtonListItem from '$lib/views/core/button/components/button-list-item/button-list-item.svelte';
	import Button from '$lib/views/core/button/components/button/button.svelte';
	import {
		mdiCheckCircle,
		mdiCheckCircleOutline,
		mdiUnfoldMoreHorizontal
	} from '$lib/views/core/icon';
	import Icon from '$lib/views/core/icon/components/icon/icon.svelte';
	import NoData from '$lib/views/core/no-data/components/no-data/no-data.svelte';
	import type { Snippet } from 'svelte';
	import InputField, { type InputFieldProps } from '../input-field/input-field.svelte';
	import SearchField from '../search-field/search-field.svelte';
	import { SvelteSet } from 'svelte/reactivity';
	import VirtualScrollingList from '$lib/views/core/common/components/virtual-scrolling/virtual-scrolling-list.svelte';

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
		displayFieldName = 'name',
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
		hasCheckbox,
		iconClassName,
		iconPathFieldName,
		id,
		identityFieldName = '_id',
		itemClassName,
		items,
		multiple,
		name,
		onCreateButtonClick,
		onSearch,
		searchClassName,
		searchFieldName = 'name',
		searchPlaceholder = 'Search...',
		showChip,
		size,
		subtitleClassName,
		subtitleFieldName,
		titleClassName,
		titleFieldName = 'name',
		value = $bindable(null),
		checkboxIconPath = mdiCheckCircle,
		uncheckboxIconPath = mdiCheckCircleOutline,
		checkboxIconClassName = '',
		uncheckboxIconClassName = '',
		checkboxClassName = '',
		dropUp,
		itemTileSnippet,
		onChange,
		...props
	}: InputFieldProps & ComboboxFieldProps = $props();

	let searchFieldRef: any | null = $state(null);

	let isPlaced = $state(false);
	let searchText: string = $state('');
	let dropdownHeight = $state(0);
	let windowScrollY = $state(0);
	let bodyHeight: number = $state(0);

	let isUpward = $derived.by(() => {
		windowScrollY;
		if (!isPlaced) return false;

		if (dropUp) return true;

		const rect = inputFieldRef.getBoundingClientRect();
		const spaceBelow = window.innerHeight - rect.bottom;
		const spaceAbove = rect.top;
		if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
			return true;
		} else {
			return false;
		}
	});

	let placementClassName = $derived(isUpward ? 'bottom-full mb-1' : 'mt-1');

	let selectedItemsSet: SvelteSet<any> = $derived(
		value ? new SvelteSet<any>(Array.isArray(value) ? value : [value]) : new SvelteSet<any>()
	);

	let comboboxIconSizeClassName = $derived.by(() => {
		if (size) {
			switch (size) {
				case 'lg':
					return '!h-7 !w-7';
				case 'md':
					return '!h-6 !w-6';
				case 'sm':
					return '!h-5 !w-5';
				case 'xs':
					return '!h-4 !w-4';
			}
		}
	});

	let hasPrimitiveItemsData = $derived.by(() => {
		if (items) {
			let firstItem = items[0];
			return (
				typeof firstItem == 'string' || typeof firstItem == 'number' || firstItem instanceof Date
			);
		}
		return false;
	});

	let _value = $derived.by(() => {
		return selectedItemsSet?.size ? '&nbsp;' : '';
	});

	let displayItems: string[] = $derived.by(() => {
		let array = Array.from(selectedItemsSet);
		let results = array.map((id) => {
			if (hasPrimitiveItemsData) {
				return id;
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

	let preparedItems = $derived.by(() => {
		return (items || []).map((item, index) => {
			let res: any = {};
			if (hasPrimitiveItemsData) {
				res[identityFieldName] = item;
				res[titleFieldName] = item;
				res[searchFieldName] = item;
			} else {
				res = item;
			}
			return res;
		});
	});

	let itemsIdentityMap: any = $derived.by(() => {
		return preparedItems.reduce((acc, val) => {
			acc[val[identityFieldName]] = val;
			return acc;
		}, {});
	});

	let filteredItems = $derived.by(() => {
		if (searchText) {
			return preparedItems.filter((item: any) => {
				return (item[searchFieldName] || '').toLowerCase().indexOf(searchText) >= 0;
			});
		} else {
			return [...preparedItems];
		}
	});

	let inputFieldRef: any | null = $state(null);

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

	function handleItemClick(ev: MouseEvent, item: any, index: number) {
		let id = item[identityFieldName];
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

		onChange && onChange(value);

		// console.log('handleItemClick', selectedItemsSet, value);
	}
</script>

{#snippet rightIcon()}
	<div class="px-1">
		{#if hasComboboxIcon}
			<Icon
				path={comboboxIconPath}
				className=" text-base-500 {comboboxIconSizeClassName} {comboboxIconClassName}"
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
					class="inline-flex items-center bg-base-200 text-base-700 text-sm font-medium px-2 mx-1 rounded-full text-nowrap {chipClassName}"
				>
					{item}
				</div>
			{/each}
			{#if displayItemsCount && displayItems?.length > (displayItemsCount || 1)}
				<div class="px-2 text-base-400">+ {displayItems?.length - (displayItemsCount || 1)}</div>
			{/if}
		</div>
	{:else}
		<div class="flex items-center {displayClassName}" title={displayItemsTitle}>
			{@html displayText}
		</div>
	{/if}
{/snippet}

<svelte:window bind:scrollY={windowScrollY} />

<div class="relative">
	<InputField
		bind:this={inputFieldRef}
		{...props}
		value={_value}
		type="text"
		role="combobox"
		onClick={handleInputClick}
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
		onKeyDown={handleKeyDown}
		contentSnippet={comboboxContentSnippet}
		title={displayItemsTitle || ''}
	/>
	{#if isPlaced}
		<button
			id="backdrop"
			class="fixed inset-0 z-10"
			onclick={handleBackdropClick}
			tabindex="-1"
			aria-label="backdrop"
		></button>
		<!-- svelte-ignore a11y_interactive_supports_focus -->
		<div
			bind:clientHeight={dropdownHeight}
			class="absolute z-10 {placementClassName} max-h-80 w-full flex flex-col rounded-md bg-white dark:bg-base-900 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm {hasDropdownHeader
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
			<div
				id="dropdown-body"
				class="flex-grow overflow-y-auto h-60 {dropdownBodyClassName}"
				bind:clientHeight={bodyHeight}
			>
				{#if dropdownBodySnippet}
					{@render dropdownBodySnippet()}
				{:else if filteredItems?.length}
					<ul>
						<VirtualScrollingList
							items={filteredItems}
							itemHeight={56}
							containerHeight={bodyHeight}
						>
							{#snippet itemSnippet(item, index)}
								{@const isSelected = selectedItemsSet.has(item[identityFieldName])}
								<li
									class="select-none h-full"
									id="item-{index}"
									role="option"
									tabindex="-1"
									aria-selected={item.isChecked}
								>
									{#if itemTileSnippet}
										<ButtonListItem
											onClick={(ev) => handleItemClick(ev, item, index)}
											className="h-full"
										>
											{@render itemTileSnippet(item, index)}
											{#if hasCheckbox}
												<div>
													<Icon
														path={isSelected ? checkboxIconPath : uncheckboxIconPath}
														className="w-5 h-5 {checkboxClassName} {isSelected
															? `text-primary ${checkboxIconClassName}`
															: `text-base-400 ${uncheckboxIconClassName}`}"
													/>
												</div>
											{/if}
										</ButtonListItem>
									{:else}
										<ButtonListItem
											title={item[titleFieldName] || ''}
											subtitle={item[subtitleFieldName || ''] || ''}
											{index}
											{hasCheckbox}
											className=" {itemClassName}"
											titleClassName=" {titleClassName}"
											subtitleClassName=" {subtitleClassName}"
											isChecked={isSelected}
											{checkboxIconPath}
											{uncheckboxIconPath}
											{checkboxIconClassName}
											{uncheckboxIconClassName}
											{checkboxClassName}
											onClick={(ev) => handleItemClick(ev, item, index)}
										/>
									{/if}
								</li>
							{/snippet}
						</VirtualScrollingList>
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
						/>
					{/if}
				</div>
			{/if}
		</div>
	{/if}
</div>
