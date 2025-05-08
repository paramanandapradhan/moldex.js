<script lang="ts" module>
	export type PickerDialogProps = {
		items?: string[] | any[];
		multiple?: boolean;
		value?: any;
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
		checkboxIconClassName?: string;
		uncheckboxIconClassName?: string;
		checkboxClassName?: string;
		arrowIconPath?: string;
		arrowClassName?: string;
		hasIcon?: boolean;
		iconPath?: string;
		iconClassName?: string;
		isCircularIcon?: boolean;
		circularIconClassName?: string;
		itemTileSnippet?: Snippet<[item: any, index: number]>;
	};
</script>

<script lang="ts">
	import { showToast } from '$lib/services';

	import ButtonListItem from '$lib/views/core/button/components/button-list-item/button-list-item.svelte';
	import ButtonSearch from '$lib/views/core/button/components/button-search/button-search.svelte';
	import VirtualScrollingList from '$lib/views/core/common/components/virtual-scrolling/virtual-scrolling-list.svelte';
	import { mdiCheckCircle, mdiCheckCircleOutline, mdiChevronRight } from '$lib/views/core/icon';
	import Icon from '$lib/views/core/icon/components/icon/icon.svelte';
	import { onMount, type Snippet } from 'svelte';
	import { SvelteSet } from 'svelte/reactivity';
	import type { DialogExports } from '../dialog/dialog.svelte';

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
		isCircularIcon,
		hasIcon,
		iconClassName,
		circularIconClassName,
		iconPath,
		itemTileSnippet,
		closeDialog,
		setResult,
		setOnOkClick,
		setHeaderSnippet,
		setDialogTitle
	}: DialogExports & PickerDialogProps = $props();

	let containerHeight: number = $state(0);

	// Reactive store for selected items
	let selectedSet: SvelteSet<any> = $state(
		value ? new SvelteSet(Array.isArray(value) ? value : [value]) : new SvelteSet()
	);

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

	// Handle item selection
	function handleItemClick(ev: Event, item: any, index: number) {
		let itemId = item[identityFieldName];
		// console.log('handleItemClick', { itemId, multiple });
		if (!multiple) {
			if (selectedSet.has(itemId)) {
				selectedSet.delete(itemId);
				setResult(undefined);
			} else {
				selectedSet.add(itemId);
				setResult(itemId);
			}
			closeDialog();
		} else {
			// Multiple selection: add/remove item
			if (selectedSet.has(itemId)) {
				selectedSet.delete(itemId);
			} else {
				if (selectedSet.size >= maxlength) {
					showToast({ msg: maxlengthMsg });
				} else {
					selectedSet.add(itemId);
				}
			}
			if (selectedSet.size) {
				setDialogTitle(`Selected (${selectedSet.size})`);
			} else {
				setDialogTitle('');
			}
		}
	}

	function handleOkClick(ev: MouseEvent | TouchEvent) {
		if (multiple) {
			closeDialog(Array.from(selectedSet));
		}
	}

	function handleSearch(txt: string) {
		searchText = txt;
	}

	onMount(() => {
		setOnOkClick(handleOkClick);
		setHeaderSnippet(headerSnippet);
	});
</script>

{#snippet headerSnippet()}
	<ButtonSearch className="rounded-full !p-3 " onSearch={handleSearch} />
{/snippet}

<div class="mb-4 min-h-96 h-full" bind:clientHeight={containerHeight}>
	<VirtualScrollingList items={filteredRecords} {containerHeight} itemHeight={56}>
		{#snippet itemSnippet(item: any, index: number)}
			{@const isSelected = selectedSet.has(item[identityFieldName])}
			<div>
				{#if itemTileSnippet}
					<ButtonListItem onClick={(ev) => handleItemClick(ev, item, index)}>
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

						{#if hasArrow}
							<div>
								<Icon path={arrowIconPath} className="w-5 h-5 text-base-500 {arrowClassName}  " />
							</div>
						{/if}
					</ButtonListItem>
				{:else}
					<ButtonListItem
						onClick={(ev) => handleItemClick(ev, item, index)}
						title={item[titleFieldName]}
						subtitle={item[subtitleFieldName || ''] || ''}
						{hasCheckbox}
						{hasArrow}
						isChecked={isSelected}
						{checkboxIconPath}
						{uncheckboxIconPath}
						{checkboxIconClassName}
						{uncheckboxIconClassName}
						{checkboxClassName}
						{arrowIconPath}
						{arrowClassName}
						{hasIcon}
						{isCircularIcon}
						{circularIconClassName}
						{iconClassName}
						{iconPath}
					/>
				{/if}
			</div>
		{/snippet}
	</VirtualScrollingList>
</div>
