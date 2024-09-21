<script lang="ts" module>
</script>

<script lang="ts">
	import '../../../../../tailwind.css';

	import { ripple } from '$lib/actions/ripple.js';

	import {
		Icon,
		mdiCheckCircle,
		mdiCheckCircleOutline,
		mdiChevronDown
	} from '$lib/views/core/icon';
	import type { Snippet } from 'svelte';
	import type { ListItemType } from '../button-list-item/button-list-item.svelte';
	import ButtonListItem from '../button-list-item/button-list-item.svelte';
	import Button from '../button/button.svelte';

	class MenuStateEnum {
		static OPENED = 'OPENED';
		static CLOSED = 'CLOSED';
	}

	type PropsType = {
		backgropClassName?: string;
		buttonSnippet?: Snippet;
		checkClassName?: string;
		checkIconClassName?: string;
		checkIconPath?: string;
		children?: Snippet;
		className?: string;
		containerClassName?: string;
		disabled?: boolean | undefined | null;
		dividerClassName?: string;
		dropdownClassName?: string;
		dropdownCloseClassName?: string;
		dropdownOpenClassName?: string;
		dropdownStyle?: string;
		dropIconClassName?: string;
		dropIconPath?: string;
		hasCheckbox?: boolean;
		id?: string;
		imgAlt?: string;
		imgClassName?: string;
		imgSrc?: string;
		leftIconClassName?: string;
		leftIconPath?: string;
		listIconClassName?: string;
		listImgClassName?: string;
		listSubtitleClassName?: string;
		listTitleClassName?: string;
		menuItemClassName?: string;
		menuItemInnerSnippet?: Snippet<[ListItemType, number]>;
		menuItemSnippet?: Snippet<[ListItemType, number]>;
		menus?: string[] | ListItemType[];
		omMenu?: (ev: MouseEvent, item: string | ListItemType, index?: number) => void;
		rightIconClassName?: string;
		rightIconPath?: string;
		screenOnlyDesc?: string;

		title?: string | any;
		titleClassName?: string;
		uncheckIconClassName?: string;
		uncheckIconPath?: string;
	};

	let {
		backgropClassName = '',
		buttonSnippet,
		checkClassName = '',
		checkIconClassName = '',
		checkIconPath = mdiCheckCircle,
		children,
		className = '',
		containerClassName = '',
		dividerClassName = '',
		dropdownClassName = '',
		dropdownCloseClassName = '',
		dropdownOpenClassName = '',
		dropdownStyle = '',
		dropIconClassName = '',
		dropIconPath = mdiChevronDown,
		hasCheckbox = false,
		id = 'menu',
		imgAlt = 'Menu',
		imgClassName = '',
		imgSrc = '',
		leftIconClassName = '',
		leftIconPath = '',
		listIconClassName = '',
		listImgClassName = '',
		listSubtitleClassName = '',
		listTitleClassName = '',
		menuItemClassName = '',
		menuItemInnerSnippet,
		menuItemSnippet,
		menus = [],
		omMenu = (ev: MouseEvent, item: string | ListItemType, index?: number) => {},
		rightIconClassName = '',
		rightIconPath = '',
		screenOnlyDesc = 'Menu',

		title = '',
		titleClassName = '',
		uncheckIconClassName = '',
		uncheckIconPath = mdiCheckCircleOutline
	}: PropsType = $props();

	let expanded = $state(false);
	let dropdownState: MenuStateEnum = $state(MenuStateEnum.CLOSED);

	let selectedMenu: ListItemType | null | undefined = $state(null);

	let options: ListItemType[] = $derived.by(() => {
		if (menus?.length) {
			let item = menus[0];
			if (typeof item == 'string') {
				return menus.map((str) => {
					if (str == '-' || str == '') {
						return { divider: true } as ListItemType;
					} else {
						return { title: str } as ListItemType;
					}
				});
			} else {
				return [...menus] as ListItemType[];
			}
		}
		return [];
	});

	function hendleToggleDropdown(ev: MouseEvent) {
		ev && ev.stopPropagation();
		if (dropdownState == MenuStateEnum.CLOSED) {
			dropdownState = MenuStateEnum.OPENED;
		} else {
			dropdownState = MenuStateEnum.CLOSED;
		}
	}

	function handlemenuItemClick(ev: MouseEvent, menu: ListItemType, index: number) {
		hendleToggleDropdown(ev);
		if (omMenu) {
			let item = menus[index];

			if (item) {
				omMenu(ev, item, index);
			}
			selectedMenu = menu;
		}
	}
</script>

<div class="relative min-h-max {containerClassName}">
	<Button
		type="button"
		className="flex items-center justify-center flex-nowrap text-start {className}"
		{id}
		onClick={hendleToggleDropdown}
	>
		<span class="sr-only">{screenOnlyDesc}</span>
		<div class="flex items-center flex-nowrap gap-2">
			{#if buttonSnippet}
				{@render buttonSnippet()}
			{:else}
				{#if imgSrc}
					<img class="h-8 w-8 rounded-full bg-gray-50 {imgClassName}" src={imgSrc} alt={imgAlt} />
				{/if}
				{#if leftIconPath}
					<Icon path={leftIconPath} className={leftIconClassName} />
				{/if}
				{#if title}
					<span class="text-nowrap {titleClassName}">
						{@html title}
					</span>
				{/if}
				{#if rightIconPath}
					<Icon path={rightIconPath} className=" {rightIconClassName}" />
				{/if}
				{#if dropIconPath}
					<Icon path={dropIconPath} className="w-5 h-5 text-gray-400 {dropIconClassName}" />
				{/if}
			{/if}
		</div>
	</Button>
	{#if dropdownState == MenuStateEnum.OPENED}
		<button
			type="button"
			id="{id}-menu-backdrop"
			class="cursor-auto fixed inset-0 z-10 {backgropClassName}"
			onclick={hendleToggleDropdown}
			tabindex="-1"
		></button>
	{/if}
	<div
		class="absolute mt-1 z-10 min-w-40 max-h-1/2vh overflow-y-auto origin-top-right right-0 rounded-md bg-base-50 dark:bg-base-800 py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none transition ease-out duration-100 {dropdownClassName} {dropdownState ==
		MenuStateEnum.CLOSED
			? `invisible transform opacity-0 scale-95 ${dropdownOpenClassName}`
			: `transform opacity-100 scale-100 ${dropdownCloseClassName}`}"
		style={dropdownStyle}
		role="menu"
		aria-orientation="vertical"
		aria-labelledby={id}
		tabindex="-1"
	>
		{#if children}
			{@render children()}
		{:else}
			{#each options as menu, index (menu.id || index)}
				{#if menu?.divider}
					<div class="border-t border-gray-200 dark:border-gray-700 {dividerClassName}"></div>
				{:else if menuItemSnippet}
					{@render menuItemSnippet(menu, index)}
				{:else}
					<ButtonListItem
						item={menu}
						{index}
						{hasCheckbox}
						{id}
						className={menuItemClassName}
						{uncheckIconPath}
						{checkIconPath}
						{checkIconClassName}
						{uncheckIconClassName}
						{checkClassName}
						iconClassName={listIconClassName}
						imgClassName={listImgClassName}
						titleClassName={listTitleClassName}
						subtitleClassName={listSubtitleClassName}
						children={menuItemInnerSnippet}
						onClick={handlemenuItemClick}
					/>
				{/if}
			{/each}
		{/if}
	</div>
</div>
