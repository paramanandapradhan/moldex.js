<script lang="ts">
	import ButtonMenu from '$lib/views/core/button/components/button-menu/button-menu.svelte';
	import Button from '$lib/views/core/button/components/button/button.svelte';
	import {
		mdiChevronDown,
		mdiChevronLeft,
		mdiChevronRight,
		mdiPageFirst,
		mdiPageLast
	} from '$lib/views/core/icon';

	type PropsType = {
		itemsCount?: number;
		pageIndex?: number;
		pageSize?: number;
		pageSizeOptions?: number[];
		itemsText?: string;
		pageSizeText?: string;
		pageText?: string;
		disbaleSizeMenuButton?: boolean;
		onPageSizeChange?: (size: number) => void;
		onPageIndexChange?: (index: number) => void;
	};

	let {
		itemsCount = $bindable(0),
		pageIndex = $bindable(0),
		pageSize = $bindable(10),
		pageSizeOptions = [5, 10, 25, 50, 100, 200],
		itemsText = 'Items',
		pageSizeText = 'Page Size',
		pageText = 'Page',
		disbaleSizeMenuButton,
		onPageSizeChange,
		onPageIndexChange
	}: PropsType = $props();

	let pageCount: number = $derived(Math.ceil(itemsCount / pageSize));

	let hasFirst: boolean = $derived(pageIndex > 0);
	let hasPrev: boolean = $derived(pageIndex > 0);

	let hasLast: boolean = $derived(pageIndex < pageCount - 1);
	let hasNext: boolean = $derived(pageIndex < pageCount - 1);

	const handlePageSize = (size: any) => {
		pageIndex = 0;
		pageSize = size;
	};

	const handlePage = (type?: string) => {
		// console.log('handlePage');
		let index = 0;
		switch (type) {
			case 'first':
				index = 0;
				break;
			case 'last':
				index = pageCount - 1;
				break;
			case 'next':
				index = pageIndex;
				index++;
				break;
			case 'prev':
				index = pageIndex;
				index--;
				break;
		}

		if (index <= 0) index = 0;
		if (index >= pageCount) index = pageCount - 1;

		pageIndex = index;
	};

	function handlePageSizeMenu(ev: Event, menu: string) {
		try {
			let size = parseInt(menu);
			handlePageSize(size);
		} catch (error) {}
	}

	$effect(() => {
		onPageSizeChange && onPageSizeChange(pageSize);
	});

	$effect(() => {
		onPageIndexChange && onPageIndexChange(pageIndex);
	});
</script>

{#snippet pageButton({ onClick, disabled, icon }: any)}
	<Button {disabled} {onClick} iconPath={icon} />
{/snippet}

<div class="flex items-center flex-wrap justify-end text-base-500 gap-3 -mb-2">
	<div class="flex-grow">{itemsText} {itemsCount}</div>
	<div class="flex items-center flex-nowrap gap-2">
		<div>{pageSizeText}</div>
		<div class="">
			<ButtonMenu
				disabled={disbaleSizeMenuButton}
				iconPath={mdiChevronDown}
				label={'' + pageSize}
				menus={pageSizeOptions.map((o) => '' + o)}
				onMenu={(ev, menu) => handlePageSizeMenu(ev, menu as string)}
			/>
		</div>
		<div class="text-base-500">
			<span>
				{pageText}
			</span>
			<span>
				({pageIndex + 1} / {pageCount})
			</span>
		</div>
	</div>

	<div class="flex items-center flex-nowrap gap-1">
		<div>
			{@render pageButton({
				icon: mdiPageFirst,
				disabled: !hasFirst,
				onClick: () => handlePage('first')
			})}
		</div>
		<div>
			{@render pageButton({
				icon: mdiChevronLeft,
				disabled: !hasPrev,
				onClick: () => handlePage('prev')
			})}
		</div>
		<div>
			{@render pageButton({
				icon: mdiChevronRight,
				disabled: !hasNext,
				onClick: () => handlePage('next')
			})}
		</div>
		<div>
			{@render pageButton({
				icon: mdiPageLast,
				disabled: !hasLast,
				onClick: () => handlePage('last')
			})}
		</div>
	</div>
</div>
