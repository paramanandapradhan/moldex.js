<script module lang="ts">
	export type ListItem = {
		id?: string;
		title?: string;
		subtitle?: string;
		titleClassName?: string;
		subtitleClassName?: string;
		url?: string;
		disabled?: boolean;
		iconPath?: string;
		iconClassName?: string;
		imgSrc?: string;
		imgClassName?: string;
		className?: string;
		openInNewWindow?: boolean;
		divider?: boolean;
		isChecked?: boolean;
		onclick?: (ev: MouseEvent, item: ListItem) => void;
	};

	export type ButtonListItemProps = {
		item: ListItem;
		index: number;
		id?: string;
		className?: string;
		hasCheckbox?: boolean;
		checkIconPath?: string;
		uncheckIconPath?: string;
		checkIconClassName?: string;
		uncheckIconClassName?: string;
		checkClassName?: string;
		iconClassName?: string;
		imgClassName?: string;
		titleClassName?: string;
		subtitleClassName?: string;
		hasArrow?: boolean;
		arrowIconPath?: string;
		arrowClassName?: string;
		onClick?: (ev: MouseEvent, item: ListItem, index: number) => void;
		children?: Snippet<[ListItem, number]>;
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

	let {
		item,
		index,
		id = '',
		className = '',
		hasCheckbox = false,
		uncheckIconPath = mdiCheckCircleOutline,
		checkIconPath = mdiCheckCircle,
		checkIconClassName = '',
		uncheckIconClassName = '',
		iconClassName = '',
		imgClassName = '',
		titleClassName = '',
		subtitleClassName = '',
		checkClassName = '',
		hasArrow = false,
		arrowIconPath = mdiChevronRight,
		arrowClassName = '',
		onClick,
		children
	}: ButtonListItemProps = $props();
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
			{#if item?.title}
				<div class="text-ellipsis overflow-hidden {titleClassName} {item?.titleClassName || ''}">
					{item?.title || ''}
				</div>
			{/if}
			{#if item?.subtitle}
				<div
					class="text-ellipsis overflow-hidden text-base-400 dark:text-base-300 text-sm font-light {subtitleClassName} {item?.subtitleClassName ||
						''}"
				>
					{item?.subtitle || ''}
				</div>
			{/if}
		</div>
		{#if hasCheckbox}
			<div>
				<Icon
					path={item?.isChecked ? checkIconPath : uncheckIconPath}
					className="w-5 h-5 {checkClassName} {item?.isChecked
						? `text-primary ${checkIconClassName}`
						: `text-base-400 ${uncheckIconClassName}`}"
				/>
			</div>
		{/if}

		{#if hasArrow}
			<div>
				<Icon path={arrowIconPath} className="w-5 h-5 text-base-500 {arrowClassName}  " />
			</div>
		{/if}
	</div>
{/snippet}

{#snippet buttonSnippet()}
	<button
		id="{id}-item-item-{index}"
		type="button"
		class="w-full select-none block px-3 py-2 text-start leading-normal text-base-900 dark:text-base-200 hover:bg-base-100 dark:hover:bg-base-700 focus:bg-base-50 dark:focus:bg-base-700 focus:outline-none {className} {item.className}"
		role="menuitem"
		onclick={(ev) => onClick && onClick(ev, item, index)}
		disabled={item?.disabled}
		use:ripple
	>
		{@render itemInternal()}
	</button>
{/snippet}

{#snippet linkSnippet()}
	<a
		id="{id}-item-item-{index}"
		href={item?.url}
		class="block select-none px-3 py-1 w-full text-start leading-normal text-base-900 dark:text-base-200 hover:bg-base-100 dark:hover:bg-base-700 focus:bg-base-50 dark:focus:bg-base-700 focus:outline-none {className} {item.className}"
		role="menuitem"
		target={item?.openInNewWindow ? '_blank' : ''}
		onclick={(ev) => onClick && onClick(ev, item, index)}
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
