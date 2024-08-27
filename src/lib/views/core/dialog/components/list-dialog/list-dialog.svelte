<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { DialogExportsType } from '../dialog/dialog.svelte';
	import ButtonBack from '$lib/views/core/button/components/button-back/button-back.svelte';
	import SearchField from '$lib/views/core/input/components/search-field/search-field.svelte';
	import ButtonClose from '$lib/views/core/button/components/button-close/button-close.svelte';
	import { ButtonListItem } from '$lib/views/core';
	import type { ListItemType } from '$lib/views/core/button/components/button-list-item/button-list-item.svelte';

	type PropsType = {
		items?: any[];
		itemChildren?: Snippet<[any, number]>;
		label?: string;
		desc?: string;
		search?: string;
		identity?: string;
		iconPath?: string;
		hasCheck?: boolean;
		hasArrow?: boolean;
		labelClassName?: string;
		descClassName?: string;
	};

	let {
		items,
		label,
		desc,
		hasCheck,
		hasArrow,
		search,
		identity,
		labelClassName,
		descClassName,
		itemChildren,
		closeDialog,
		setResult
	}: PropsType &
		DialogExportsType & {
			items?: any[];
			itemChildren?: Snippet<[any, number]>;
		} = $props();

	let searchText: string = $state('');

	let idField = Symbol('_id');
	let searchField = Symbol('_search');

	let preparedItems: any[] = $derived.by(() => {
		return (items || []).map((item: any, index) => {
			let res: any = { [idField]: identity ? item[identity] : index };
			if (label) {
				res.label = item.hasOwnProperty(label) ? item[label] : label;
			}
			if (desc) {
				res.desc = item.hasOwnProperty(desc) ? item[desc] : desc;
			}
			if (search) {
				res[searchField] = (item[search] || '').trim().toLowerCase();
			} else {
				res[searchField] = `${res.label || ''} ${res.desc || ''}`.trim().toLowerCase();
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

	$effect(() => {
		console.log('preparedItems', preparedItems);
	});

	$effect(() => {
		console.log('filteredItems', filteredItems);
	});
</script>

<div class="flex gap-3 p-3">
	<ButtonBack onlyMobile onClick={closeDialog} />
	<div class="flex-grow">
		<SearchField name="search" className="rounded-full" onSearch={handleSearch} placeholder="Search..." />
	</div>
	<ButtonClose onlyWeb onlyIcon onClick={closeDialog} />
</div>
<div class="flex-grow overflow-y-auto">
	{#each filteredItems as item, index}
		<div>
			<ButtonListItem
				{item}
				id="list"
				{index}
				{labelClassName}
				{descClassName}
				{hasArrow}
				{hasCheck}
			/>
		</div>
	{/each}
</div>
