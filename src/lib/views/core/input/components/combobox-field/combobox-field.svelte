<script lang="ts">
	import ButtonListItem from '$lib/views/core/button/components/button-list-item/button-list-item.svelte';
	import Button from '$lib/views/core/button/components/button/button.svelte';

	import VirtualScrollingList from '$lib/views/core/common/components/virtual-scrolling/virtual-scrolling-list.svelte';
	import Icon from '$lib/views/core/icon/components/icon/icon.svelte';
	import {
		mdiCheckCircle,
		mdiCheckCircleOutline,
		mdiClose,
		mdiUnfoldMoreHorizontal
	} from '$lib/views/core/icon/index.js';
	import NoData from '$lib/views/core/no-data/components/no-data/no-data.svelte';
	import { SvelteSet } from 'svelte/reactivity';
	import { onMount } from 'svelte';
	import { computeDropdownPosition } from '$lib/services/utils/dropdown-service.js';
	import InputField from '../input-field/input-field.svelte';
	import SearchField from '../search-field/search-field.svelte';
	import type { ComboboxFieldProps, InputFieldProps } from '../../types';

	let {
		appearance,
		chipClassName,
		chipCloseIconClassName = '',
		chipCloseIconPath = mdiClose,
		chipsContainerClassName = '',
		chipRemovable = true,
		onChipRemove,
		className,
		comboboxIconClassName,
		comboboxIconPath = mdiUnfoldMoreHorizontal,
		showClear = false,
		clearIconPath = mdiClose,
		clearIconClassName = '',
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
		size = 'sm',
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
		dropPosition = 'bottom',
		dropdownAlign = 'left',
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
	let dropdownStyle = $state('position: fixed; top: 0; left: 0;');

	function computeDropdownStyle() {
		if (!isPlaced || !inputFieldRef) return;
		const rect = inputFieldRef.getBoundingClientRect();
		if (!rect) return;
		const { style } = computeDropdownPosition({
			anchorRect: rect,
			dropdownWidth: rect.width,
			// 320 == max-h-80; used until the real height is measured so the
			// initial flip decision is sensible even on the first frame.
			dropdownHeight: dropdownHeight || 320,
			position: dropPosition,
			align: dropdownAlign,
			matchAnchorWidth: true
		});
		dropdownStyle = style;
	}

	// Recompute whenever the dropdown is open and its height or the scroll
	// position changes (window scroll is bound via <svelte:window>).
	$effect(() => {
		if (isPlaced) {
			void dropdownHeight;
			void windowScrollY;
			computeDropdownStyle();
		}
	});

	onMount(() => {
		const reposition = () => isPlaced && computeDropdownStyle();
		window.addEventListener('resize', reposition);
		// Capture phase so nested scroll containers also reposition the dropdown.
		window.addEventListener('scroll', reposition, true);
		return () => {
			window.removeEventListener('resize', reposition);
			window.removeEventListener('scroll', reposition, true);
		};
	});

	let selectedItemsSet: SvelteSet<any> = $derived(
		value ? new SvelteSet<any>(Array.isArray(value) ? value : [value]) : new SvelteSet<any>()
	);

	let chipSizeClassName = $derived.by(() => {
		switch (size) {
			case 'lg':
				return 'text-base leading-none px-2 py-0';
			case 'sm':
				return 'text-xs leading-none px-1.5 py-0';
			case 'xs':
				return 'text-xs leading-none px-1.5 py-0';
			default:
				return 'text-sm leading-none px-2 py-0';
		}
	});

	let chipCloseIconSizeClassName = $derived.by(() => {
		switch (size) {
			case 'lg':
				return 'h-4 w-4';
			case 'sm':
				return 'h-3 w-3';
			case 'xs':
				return 'h-3 w-3';
			default:
				return 'h-3.5 w-3.5';
		}
	});

	let comboboxIconSizeClassName = $derived.by(() => {
		if (size) {
			switch (size) {
				case 'lg':
					return '!h-6 !w-6';
				case 'md':
					return '!h-5 !w-5';
				case 'sm':
					return '!h-4 !w-4';
				case 'xs':
					return '!h-3.5 !w-3.5';
			}
		}
	});

	let comboboxPaddingRightClassName = $derived.by(() => {
		const hasClear =
			showClear && selectedItemsSet.size && !props.disabled && !props.readonly;
		switch (size) {
			case 'lg':
				return hasClear ? 'pr-16' : 'pr-10';
			case 'sm':
				return hasClear ? 'pr-12' : 'pr-7';
			case 'xs':
				return hasClear ? 'pr-10' : 'pr-6';
			default:
				return hasClear ? 'pr-14' : 'pr-8';
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

	let selectedChipItems: { id: any; label: string }[] = $derived.by(() => {
		let array = Array.from(selectedItemsSet);
		return array.map((id) => {
			if (hasPrimitiveItemsData) {
				return { id, label: String(id) };
			}
			const item = itemsIdentityMap[id];
			const label =
				item && displayFieldName && item.hasOwnProperty(displayFieldName)
					? String(item[displayFieldName])
					: String(id);
			return { id, label };
		});
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
			if (props.disabled || props.readonly) return;
			clearAll();
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

	function removeSelectedItem(id: any) {
		if (!selectedItemsSet.has(id)) return;
		selectedItemsSet.delete(id);
		items = [...(items || [])];
		const array = Array.from(selectedItemsSet);
		if (array.length) {
			value = multiple ? array : array[0];
		} else {
			value = null;
		}
		const removedItem = hasPrimitiveItemsData ? id : itemsIdentityMap[id];
		onChipRemove && onChipRemove(removedItem);
		onChange && onChange(value);
	}

	function clearAll() {
		if (!selectedItemsSet.size) return;
		selectedItemsSet.clear();
		value = null;
		items = [...(items || [])];
		onChange && onChange(value);
	}

	function handleClearMouseDown(event: MouseEvent) {
		// Left click only — a right-click (context menu) must not clear the selection.
		if (event.button !== 0) return;
		event.preventDefault();
		event.stopPropagation();
		clearAll();
		focus();
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
	<div class="flex items-center gap-0.5 px-1">
		{#if showClear && selectedItemsSet.size && !props.disabled && !props.readonly}
			<button
				type="button"
				class="pointer-events-auto inline-flex cursor-pointer items-center rounded-full p-0.5 text-neutral-500 hover:bg-neutral-200 hover:text-neutral-700 dark:hover:bg-neutral-600 dark:hover:text-neutral-100"
				onmousedown={handleClearMouseDown}
				onclick={(e) => {
					e.preventDefault();
					e.stopPropagation();
				}}
				aria-label="Clear selection"
				title="Clear"
			>
				<Icon
					path={clearIconPath}
					className=" {comboboxIconSizeClassName} {clearIconClassName}"
				/>
			</button>
		{/if}
		{#if hasComboboxIcon}
			<Icon
				path={comboboxIconPath}
				className=" text-neutral-500 {comboboxIconSizeClassName} {comboboxIconClassName}"
			/>
		{/if}
	</div>
{/snippet}

{#snippet comboboxContentSnippet()}
	{#if contentSnippet}
		{@render contentSnippet()}
	{:else if showChip}
		{@const visibleChips = displayItemsCount
			? selectedChipItems.slice(0, displayItemsCount)
			: selectedChipItems}
		{@const overflow = displayItemsCount ? selectedChipItems.length - displayItemsCount : 0}
		<div
			class="flex flex-wrap items-center gap-1 {chipsContainerClassName} {displayClassName}"
			title={displayItemsTitle}
		>
			{#each visibleChips as chip (chip.id)}
				<span
					class="pointer-events-auto inline-flex items-center gap-1 rounded-full bg-neutral-200 font-medium text-neutral-700 dark:bg-neutral-600 dark:text-neutral-100 {chipSizeClassName} {chipClassName}"
				>
					<span class="text-nowrap">{chip.label}</span>
					{#if multiple && chipRemovable && !props.disabled && !props.readonly}
						<button
							type="button"
							class="inline-flex cursor-pointer items-center rounded-full hover:bg-neutral-300 dark:hover:bg-neutral-500"
							onmousedown={(e) => {
								if (e.button !== 0) return;
								e.preventDefault();
								e.stopPropagation();
								removeSelectedItem(chip.id);
							}}
							onclick={(e) => {
								e.preventDefault();
								e.stopPropagation();
							}}
							aria-label="Remove {chip.label}"
						>
							<Icon
								path={chipCloseIconPath}
								sizeClassName={chipCloseIconSizeClassName}
								className={chipCloseIconClassName}
							/>
						</button>
					{/if}
				</span>
			{/each}
			{#if overflow > 0}
				<span class="px-2 text-neutral-400">+ {overflow}</span>
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
		className="{comboboxPaddingRightClassName} text-transparent {className}"
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
			class="fixed z-20 flex max-h-80 flex-col rounded-xl bg-white text-neutral-600 shadow-lg focus:outline-none sm:text-sm dark:bg-neutral-900 {hasDropdownHeader
				? ''
				: 'pt-1'} {hasDropdownFooter ? '' : 'pb-1'} {dropdownClassName}"
			style={dropdownStyle}
			id="options"
			role="listbox"
			onkeydown={handleDropdownKeyDown}
		>
			{#if hasDropdownHeader}
				<div
					id="dropdown-header"
					class=" my-1 flex w-full items-center p-2 px-3 {dropdownHeaderClassName}"
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
				class="h-60 flex-grow overflow-y-auto {dropdownBodyClassName}"
				bind:clientHeight={bodyHeight}
			>
				{#if dropdownBodySnippet}
					{@render dropdownBodySnippet()}
				{:else if filteredItems?.length}
					<ul>
						<VirtualScrollingList
							items={filteredItems}
							itemHeight={40}
							containerHeight={bodyHeight}
						>
							{#snippet itemSnippet(item, index)}
								{@const isSelected = selectedItemsSet.has(item[identityFieldName])}
								<li
									class="h-full select-none"
									id="item-{index}"
									role="option"
									tabindex="-1"
									aria-selected={item.isChecked}
								>
									{#if itemTileSnippet}
										<ButtonListItem
											onClick={(ev) => handleItemClick(ev, item, index)}
											className="h-full !py-0 !px-3"
											size="sm"
										>
											{@render itemTileSnippet(item, index)}
											{#if hasCheckbox}
												<div>
													<Icon
														path={isSelected ? checkboxIconPath : uncheckboxIconPath}
														className="w-5 h-5 {checkboxClassName} {isSelected
															? `text-primary ${checkboxIconClassName}`
															: `text-neutral-400 ${uncheckboxIconClassName}`}"
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
											size="sm"
											className="h-full !py-0 !px-3 {itemClassName}"
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
