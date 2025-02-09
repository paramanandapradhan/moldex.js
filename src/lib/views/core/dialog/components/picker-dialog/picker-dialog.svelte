<script lang="ts" module>
	export type PickerDialogProps = {
		items?: string[] | any[];
		multiple?: boolean;
		value?: string | string[];
		identityFieldName?: string;
		titleFieldName?: string;
		searchFieldName?: string;
		subtitleFieldName?: string;
		hasCheckbox?: boolean;
		hasArrow?: boolean;
		maxlength?: number;
		maxlengthMsg?: string;
		checkboxIconPath?: string;
		uncheckboxIconPath?: string;
		arrowIconPath?: string;
		checkboxIconClassName?: string;
		uncheckboxIconClassName?: string;
		arrowClassName?: string;
		checkboxClassName?: string;
		itemTileSnippet?: Snippet<[item: any, index: number]>;
	};
</script>

<script lang="ts">
	import { DialogSizeEnum, getDialogSize, showToast } from '$lib/services';

	import ButtonListItem from '$lib/views/core/button/components/button-list-item/button-list-item.svelte';
	import ButtonSearch from '$lib/views/core/button/components/button-search/button-search.svelte';
	import type { Snippet } from 'svelte';
	import type { DialogExports } from '../dialog/dialog.svelte';
	import Icon from '$lib/views/core/icon/components/icon/icon.svelte';
	import { mdiCheckCircle, mdiCheckCircleOutline, mdiChevronRight } from '$lib/views/core/icon';

	let {
		value,
		items = [],
		multiple = false,
		identityFieldName = '_id',
		titleFieldName = 'name',
		subtitleFieldName,
		searchFieldName = 'name',
		hasCheckbox,
		hasArrow,
		maxlength = 0,
		maxlengthMsg = 'Selection limit reached!',
		checkboxIconPath = mdiCheckCircle,
		uncheckboxIconPath = mdiCheckCircleOutline,
		arrowIconPath = mdiChevronRight,
		checkboxIconClassName = '',
		uncheckboxIconClassName = '',
		arrowClassName = '',
		checkboxClassName = '',
		itemTileSnippet,
		closeDialog,
		setResult,
		setOnOkClick,
		setHeaderSnippet,
		setDialogTitle
	}: DialogExports & PickerDialogProps = $props();

	// Reactive store for selected items
	let selected: { items: { [key: string]: string } } = $state({ items: {} });
	let searchText: string = $state('');

	let records: any[] = $derived.by(() => {
		if (items && typeof items[0] == 'string') {
			return items.map((name) => {
				return {
					[identityFieldName]: name,
					[titleFieldName]: name
				};
			});
		}

		return [...items];
	});

	let filteredRecords: any[] = $derived.by(() => {
		if (searchText) {
			return records.filter((item) => {
				return (item[searchFieldName] || '').toLowerCase().indexOf(searchText) >= 0;
			});
		}
		return records;
	});

	// Initialize selected items from `value`
	$effect(() => {
		if (value) {
			if (Array.isArray(value)) {
				value.forEach((val) => (selected.items[val] = val));
			} else {
				selected.items[value] = value;
			}
		}
	});

	// Handle item selection
	function handleItemClick(ev: Event, item: any, index: number) {
		let itemId = item[identityFieldName];

		if (!multiple) {
			if (selected.items[itemId]) {
				selected.items = {};
			} else {
				selected.items = { [itemId]: itemId };
			}

			let selectedItemId = Object.keys(selected.items)[0];
			setResult(selectedItemId);

			closeDialog();
		} else {
			// Multiple selection: add/remove item
			if (selected.items[itemId]) {
				delete selected.items[itemId];
			} else {
				let itemLength = Object.keys(selected.items).length;
				if (maxlength > 0 && itemLength >= maxlength) {
					showToast({ msg: maxlengthMsg });
				} else {
					selected.items[itemId] = itemId;
				}
			}
			let itemLength = Object.keys(selected.items).length;
			if (itemLength) {
				setDialogTitle(`Selected (${itemLength})`);
			} else {
				setDialogTitle('');
			}
		}
	}

	function handleOkClick(ev: MouseEvent | TouchEvent) {
		if (multiple) {
			closeDialog(Object.keys(selected.items));
		}
	}

	function handleSearch(txt: string) {
		searchText = txt;
	}

	setOnOkClick(handleOkClick);
	setHeaderSnippet(headerSnippet);
</script>

{#snippet headerSnippet()}
	<ButtonSearch className="rounded-full !p-3 " onSearch={handleSearch} />
{/snippet}

<div class="mb-4 min-h-80">
	{#each filteredRecords as record, index}
		{@const isSelected = !!selected.items[record[identityFieldName]]}
		<div>
			{#if itemTileSnippet}
				<ButtonListItem>
					{@render itemTileSnippet(record, index)}
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

					{#if hasArrow}
						<div>
							<Icon path={arrowIconPath} className="w-5 h-5 text-base-500 {arrowClassName}  " />
						</div>
					{/if}
				</ButtonListItem>
			{:else}
				<ButtonListItem
					onClick={(ev) => handleItemClick(ev, record, index)}
					title={record[titleFieldName]}
					subtitle={record[subtitleFieldName || ''] || ''}
					{hasCheckbox}
					{hasArrow}
					isChecked={isSelected}
				/>
			{/if}
		</div>
	{/each}
</div>
