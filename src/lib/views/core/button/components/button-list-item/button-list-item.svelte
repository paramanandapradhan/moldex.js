<script module lang="ts">
	export type ListItemType = {
		id?: string;
		label?: string;
		labelClassName?: string;
		desc?: string;
		descClassName?: string;
		url?: string;
		onclick?: (ev: MouseEvent, item: ListItemType) => void;
		disabled?: boolean;
		iconPath?: string;
		iconClassName?: string;
		imgSrc?: string;
		imgClassName?: string;
		className?: string;
		openInNewWindow?: boolean;
		divider?: boolean;
		hasArrow?: boolean;
		arrowIconPath?: string;
		arrowClassName?: string;
	};
</script>

<script lang="ts">
	import '../../../../../tailwind.css';
	import { ripple } from '$lib/actions/ripple.js';

	import type { Snippet } from 'svelte';
	import {
		Icon,
		mdiCheckCircle,
		mdiCheckCircleOutline,
		mdiChevronRight
	} from '$lib/views/core/icon';

	type PropsType = {
		item: ListItemType;
		index: number;
		listId?: string;
		className?: string;
		hasCheck?: boolean;
		checkIconPath?: string;
		uncheckIconPath?: string;
		checkIconClassName?: string;
		uncheckIconClassName?: string;
		checkClassName?: string;
		iconClassName?: string;
		imgClassName?: string;
		labelClassName?: string;
		descClassName?: string;
		checked?: boolean;
		hasArrow?: boolean;
		arrowIconPath?: string;
		arrowClassName?: string;
		onclick?: (ev: MouseEvent, item: ListItemType, index: number) => void;
		children?: Snippet<[ListItemType, number]>;
	};

	let {
		item,
		index,
		listId = '',
		className = '',
		hasCheck = false,
		uncheckIconPath = mdiCheckCircleOutline,
		checkIconPath = mdiCheckCircle,
		checkIconClassName = '',
		uncheckIconClassName = '',
		iconClassName = '',
		imgClassName = '',
		labelClassName = '',
		descClassName = '',
		checkClassName = '',
		checked = false,
		hasArrow = false,
		arrowIconPath = mdiChevronRight,
		arrowClassName = '',
		onclick = (ev: MouseEvent, item: ListItemType, index: number) => {},
		children
	}: PropsType = $props();
</script>

{#snippet itemInternal()}
	<div class="flex w-full items-center gap-4">
		{#if item?.iconPath}
			<div>
				<Icon path={item?.iconPath} className="{iconClassName} {item?.iconClassName}" />
			</div>
		{/if}
		{#if item?.imgSrc}
			<div>
				<img
					src={item?.imgSrc}
					class="w-6 h-6 {imgClassName} {item?.imgClassName}"
					alt="item-img-{index}"
				/>
			</div>
		{/if}
		<div class="flex-grow">
			{#if item?.label}
				<div class="text-ellipsis overflow-hidden {labelClassName} {item?.labelClassName || ''}">
					{item?.label || ''}
				</div>
			{/if}
			{#if item?.desc}
				<div
					class="text-ellipsis overflow-hidden text-gray-400 text-sm font-light {descClassName} {item?.descClassName ||
						''}"
				>
					{item?.desc || ''}
				</div>
			{/if}
		</div>
		{#if hasCheck}
			<div>
				<Icon
					path={checked ? checkIconPath : uncheckIconPath}
					className="w-5 h-5 {checkClassName} {checked
						? `text-primary ${checkIconClassName}`
						: `text-gray-400 ${uncheckIconClassName}`}"
				/>
			</div>
		{/if}

		{#if hasArrow}
			<div>
				<Icon path={arrowIconPath} className="w-5 h-5 text-gray-500 {arrowClassName}  " />
			</div>
		{/if}
	</div>
{/snippet}

{#snippet buttonSnippet()}
	<button
		id="{listId}-item-item-{index}"
		type="button"
		class="w-full select-none block px-3 py-2 text-start leading-6 text-gray-900 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none {className} {item.className}"
		role="menuitem"
		onclick={(ev) => onclick(ev, item, index)}
		disabled={item?.disabled}
		use:ripple
	>
		{@render itemInternal()}
	</button>
{/snippet}

{#snippet linkSnippet()}
	<a
		id="{listId}-item-item-{index}"
		href={item?.url}
		class="block select-none px-3 py-1 w-full text-start leading-6 text-gray-900 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none {className} {item.className}"
		role="menuitem"
		target={item?.openInNewWindow ? '_blank' : ''}
		onclick={(ev) => onclick(ev, item, index)}
		use:ripple
	>
		{@render itemInternal()}
	</a>
{/snippet}

{#if children}
	{@render children(item, index)}
{:else if item?.url && !item?.disabled}
	{@render linkSnippet()}
{:else}
	{@render buttonSnippet()}
{/if}
