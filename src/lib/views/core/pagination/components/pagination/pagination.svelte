<script lang="ts">
	import '../../../../../tailwind.css';
	import { ripple } from '$lib/actions';
	import ButtonMenu from '$lib/views/core/button/components/button-menu/button-menu.svelte';
	import Button from '$lib/views/core/button/components/button/button.svelte';
	import { BROWSER } from 'esm-env';
	import { mdiChevronLeft, mdiChevronRight, mdiPageFirst, mdiPageLast } from '$lib/views/core/icon';

	type PropsType = {
		length?: number;
		pageIndex?: number;
		pageSize?: number;
		pageSizeOptions?: number[];
		itemsText?: string;
		pageSizeText?: string;
		pageText?: string;
		onPageSizeChange?: (size: number) => void;
		onPageIndexChange?: (index: number) => void;
	};

	let {
		length = 0,
		pageIndex = 0,
		pageSize = 10,
		pageSizeOptions = [5, 10, 25, 50, 100, 200],
		itemsText = 'Items',
		pageSizeText = 'Page Size',
		pageText = 'Page',
		onPageSizeChange,
		onPageIndexChange
	}: PropsType = $props();

	let pageCount: number = $state(0);

	let hasFirst: boolean = $state(true);
	let hasLast: boolean = $state(true);
	let hasNext: boolean = $state(true);
	let hasPrev: boolean = $state(true);

	const handlePageSize = (size: any) => {
		// console.log('handlePageSize', size);
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

	function preparePage(..._: any) {
		// console.log('preparePage');
		hasFirst = true;
		hasPrev = true;

		hasNext = true;
		hasLast = true;

		length = length || 0;
		pageSize = pageSize || 10;
		pageCount = Math.ceil(length / pageSize);

		if (pageIndex <= 0) {
			pageIndex = 0;
			hasPrev = false;
			hasFirst = false;
		}

		if (pageCount && pageIndex >= pageCount - 1) {
			pageIndex = pageCount - 1;
			hasNext = false;
			hasLast = false;
		}

		onPageSizeChange && onPageSizeChange(pageSize);
		onPageIndexChange && onPageIndexChange(pageIndex);
	}

	$effect(() => {
		BROWSER && preparePage(length, pageSize, pageIndex, pageCount);
	});
</script>

{#snippet pageButton({ onClick, disabled, icon }: any)}
	<Button
		className="hover:bg-gray-100 p-1 px-2 outline-none focus:bg-gray-200 disabled:bg-white disabled:text-gray-400 rounded"
		{disabled}
		onClick={onClick}
		iconPath={icon}
	/>
{/snippet}

<div class="flex items-center flex-wrap justify-end text-gray-500 gap-3 -mb-2">
	<div class="flex-grow">{itemsText} {length}</div>
	<div class="flex items-center flex-nowrap gap-2">
		<div>{pageSizeText}</div>
		<div class="">
			<ButtonMenu
				className="px-3 py-2 rounded hover:bg-gray-100 outline-none focus:bg-gray-200"
				title={pageSize}
				dropdownClassName="w-20"
			>
				{#each pageSizeOptions as opt, index (index)}
					<div class="w-full">
						<button
							class="w-full text-start hover:bg-gray-100 p-1 px-4 outline-none focus:bg-gray-200"
							use:ripple
							onclick={() => handlePageSize(opt)}
						>
							{opt}
						</button>
					</div>
				{/each}
			</ButtonMenu>
		</div>
		<div class="text-gray-500">
			<span>
				{pageText}
			</span>
			<span>
				({pageIndex + 1} / {pageCount})
			</span>
		</div>
	</div>

	<div class="flex items-center flex-nowrap gap-0">
		<div>
			{@render pageButton({
				icon: mdiPageFirst,
				disabled: !hasFirst,
				onclick: () => handlePage('first')
			})}
		</div>
		<div>
			{@render pageButton({
				icon: mdiChevronLeft,
				disabled: !hasPrev,
				onclick: () => handlePage('prev')
			})}
		</div>
		<div>
			{@render pageButton({
				icon: mdiChevronRight,
				disabled: !hasNext,
				onclick: () => handlePage('next')
			})}
		</div>
		<div>
			{@render pageButton({
				icon: mdiPageLast,
				disabled: !hasLast,
				onclick: () => handlePage('last')
			})}
		</div>

		<!-- <button
			type="button"
			class=" hover:bg-gray-100 p-1 px-2 outline-none focus:bg-gray-200 disabled:bg-white disabled:text-gray-400 rounded"
			disabled={!hasFirst}
			use:ripple
			onclick={(e) => handlePage('first')}
		>
			<Icon path={mdiPageFirst} />
		</button> -->
		<!-- <button
			type="button"
			class="hover:bg-gray-100 p-1 px-2 outline-none focus:bg-gray-200 disabled:bg-white disabled:text-gray-400 rounded"
			disabled={!hasPrev}
			use:ripple
			onclick={(e) => handlePage('prev')}
		>
			<Icon path={mdiChevronLeft} />
		</button> -->
		<!-- <button
			type="button"
			class="hover:bg-gray-100 p-1 px-2 outline-none focus:bg-gray-200 disabled:bg-white disabled:text-gray-400 rounded"
			disabled={!hasNext}
			use:ripple
			onclick={(e) => handlePage('next')}
		>
			<Icon path={mdiChevronRight} />
		</button> -->
		<!-- <button
			type="button"
			class="hover:bg-gray-100 p-1 px-2 outline-none focus:bg-gray-200 disabled:bg-white disabled:text-gray-400 rounded"
			disabled={!hasLast}
			use:ripple
			onclick={(e) => handlePage('last')}
		>
			<Icon path={mdiPageLast} />
		</button> -->
	</div>
</div>
