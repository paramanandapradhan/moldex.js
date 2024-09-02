<script lang="ts">
	import { ButtonListItem } from '$lib/views/core';
	import ButtonBack from '$lib/views/core/button/components/button-back/button-back.svelte';
	import ButtonCloseIcon from '$lib/views/core/button/components/button-close-icon/button-close-icon.svelte';
	import ButtonClose from '$lib/views/core/button/components/button-close/button-close.svelte';
	import type { ListItemType } from '$lib/views/core/button/components/button-list-item/button-list-item.svelte';
	import ButtonOk from '$lib/views/core/button/components/button-ok/button-ok.svelte';
	import SearchField from '$lib/views/core/input/components/search-field/search-field.svelte';
	import type { Snippet } from 'svelte';
	import type { DialogExportsType } from '../dialog/dialog.svelte';

	type PropsType = {
		value?: any | any[];
		multiple?: boolean;
		items?: any[];
		itemSnippet?: Snippet<[any, number]>;
		itemTitle?: string;
		itemSubtitle?: string;
		search?: string | string[];
		identity?: string;
		iconPath?: string;
		hasCheckbox?: boolean;
		hasArrow?: boolean;
		itemTitleClassName?: string;
		itemSubtitleClassName?: string;
		okButtonLable?: string;
		okButtonClassName?: string;
		closeButtonLabel?: string;
		closeButtonClassName?: string;
	};

	let {
		value,
		multiple = false,
		items,
		itemTitle,
		itemSubtitle,
		hasCheckbox,
		hasArrow,
		search,
		identity,
		itemTitleClassName,
		itemSubtitleClassName,
		okButtonLable = 'Select',
		okButtonClassName = '',
		closeButtonLabel = 'Close',
		closeButtonClassName = '',
		itemSnippet,
		closeDialog,
		setResult
	}: PropsType &
		DialogExportsType & {
			items?: any[];
			itemSnippet?: Snippet<[any, number]>;
		} = $props();

	let searchText: string = $state('');

	let idField = Symbol('_id');
	let searchField = Symbol('_search');

	type CustomListItemType = ListItemType & { [key: symbol]: string };

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

	let preparedItems: any[] = $derived.by(() => {
		return (items || []).map((item: any, index) => {
			let res: CustomListItemType = {
				[idField]: identity && item.hasOwnProperty(identity) ? item[identity] : index
			};
			if (itemTitle) {
				res.title = item.hasOwnProperty(itemTitle) ? item[itemTitle] : itemTitle;
			}
			if (itemSubtitle) {
				res.subtitle = item.hasOwnProperty(itemSubtitle) ? item[itemSubtitle] : itemSubtitle;
			}
			if (search) {
				if (typeof search === 'string') {
					res[searchField] = (item[search] || '').trim().toLowerCase();
				} else {
					res[searchField] = (search.map((fieldName) => item[fieldName]).join(' ') || '')
						.trim()
						.toLowerCase();
				}
			} else {
				res[searchField] = `${res.title || ''} ${res.subtitle || ''}`.trim().toLowerCase();
			}
			if (selectedItemsSet.has(res[idField])) {
				res.isChecked = true;
			} else {
				res.isChecked = false;
			}

			return res;
		});
	});

	let filteredItems: any[] = $derived.by(() => {
		if (searchText) {
			return preparedItems.filter((item: any) => {
				return item[searchField].indexOf(searchText) >= 0;
			});
		} else {
			return [...preparedItems];
		}
	});

	function handleSearch(text: string) {
		searchText = text;
	}

	function handleItemSelected(ev: MouseEvent, item: CustomListItemType, index: number) {
		let id = item[idField];
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

		if (!multiple) {
			if (selectedItemsSet.size) {
				setTimeout(() => {
					setResult(Array.from(selectedItemsSet)[0]);
					closeDialog();
				}, 300);
			}
		}
	}

	function handleClose() {
		closeDialog();
	}

	function handleOk() {
		setResult(Array.from(selectedItemsSet));
		closeDialog();
	}

	$effect(() => {
		setResult(null);
	});
</script>

<div class="flex gap-3 p-3">
	<ButtonBack onlyMobile onClick={handleClose} />
	<div class="flex-grow">
		<SearchField
			name="search"
			className="rounded-full"
			onSearch={handleSearch}
			placeholder="Search..."
		/>
	</div>
	<ButtonCloseIcon onlyWeb onClick={handleClose} />
</div>
<div class="flex-grow overflow-y-auto">
	{#each filteredItems as item, index}
		<div>
			<ButtonListItem
				{item}
				id="list"
				{index}
				titleClassName={itemTitleClassName}
				subtitleClassName={itemSubtitleClassName}
				{hasArrow}
				{hasCheckbox}
				onClick={(ev) => handleItemSelected(ev, item, index)}
				className="px-4"
			/>
		</div>
	{/each}
</div>
{#if multiple}
	<div class="flex items-center justify-end gap-3 p-4">
		<ButtonOk label={okButtonLable} className={okButtonClassName} onClick={handleOk} />
		<ButtonClose label={closeButtonLabel} className={closeButtonClassName} onClick={handleClose} />
	</div>
{/if}
