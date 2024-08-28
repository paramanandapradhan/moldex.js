<script lang="ts">
	import '../../../../../tailwind.css';
	 
	import { ripple } from '$lib/actions/ripple.js';
	 
	import { Icon, mdiCheckCircle, mdiCheckCircleOutline, mdiChevronDown } from '$lib/views/core/icon';
	import type { Snippet } from 'svelte';
	import type { ListItemType } from '../button-list-item/button-list-item.svelte';
	import ButtonListItem from '../button-list-item/button-list-item.svelte';

	enum MenuStateEnum {
		OPENED,
		CLOSED
	}

	type PropsType = {
		id?: string;
		className?: string;
		screenOnlyDesc?: string;
		style?: string;
		disabled?: boolean | undefined | null;
		imgSrc?:string;
		imgClassName?: string;
		imgAlt?: string;
		leftIconPath?: string;
		leftIconClassName?: string;
		rightIconPath?: string;
		rightIconClassName?: string;
		title?: string | any;
		titleClassName?: string;
		dropdownClassName?: string;
		dropdownStyle?: string;
		hasCheck?: boolean;
		checkIconPath?: string;
		checkIconClassName?: string;
		menus?: string[] | ListItemType[];
		containerClassName?: string;
		backgropClassName?: string;
		menuItemClassName?: string;
		uncheckIconPath?: string;
		uncheckIconClassName?: string;
		dropdownOpenClassName?: string;
		dropdownCloseClassName?: string;
		checkClassName?: string;
		listIconClassName?: string;
		listImgClassName?: string;
		listTitleClassName?: string;
		listSubtitleClassName?: string;
		dividerClassName?: string;
		dropIconPath?: string;
		dropIconClassName?: string;
		onmenuclick?: (ev: MouseEvent, item: string | ListItemType, index: number) => void;
		children?: Snippet;
		buttonChildren?: Snippet;
		menuItemChildren?: Snippet<[ListItemType, number]>;
		menuItemInnerChildren?: Snippet<[ListItemType, number]>;
	};

	let {
		id = 'menu',
		className = '',
		screenOnlyDesc = 'Menu',
		style = '',
		imgSrc = '',
		imgClassName = '',
		imgAlt = 'Menu',
		leftIconPath = '',
		leftIconClassName = '',
		rightIconPath = '',
		rightIconClassName = '',
		dropIconPath = mdiChevronDown,
		dropIconClassName = '',
		titleClassName = '',
		title = 'Button',
		dropdownStyle = '',
		dropdownClassName = '',
		hasCheck = false,
		uncheckIconPath = mdiCheckCircleOutline,
		checkIconPath = mdiCheckCircle,
		checkIconClassName = '',
		containerClassName = '',
		backgropClassName = '',
		menus = [],
		menuItemClassName = '',
		uncheckIconClassName = '',
		dropdownOpenClassName = '',
		dropdownCloseClassName = '',
		checkClassName = '',
		listIconClassName = '',
		listImgClassName = '',
		listTitleClassName = '',
		listSubtitleClassName = '',
		dividerClassName = '',
		onmenuclick = (ev: MouseEvent, item: string | ListItemType, index: number) => {},
		children,
		buttonChildren,
		menuItemChildren,
		menuItemInnerChildren
	}: PropsType = $props();

	let expanded = $state(false);
	let dropdownState: MenuStateEnum = $state(MenuStateEnum.CLOSED);
	let options: ListItemType[] = $state([]);
	let selectedMenu: ListItemType | null | undefined = $state(null);

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
		if (onmenuclick) {
			let item = menus[index];

			if (item) {
				onmenuclick(ev, item, index);
			}
			selectedMenu = menu;
		}
	}

	$effect(() => {
		if (menus?.length) {
			let item = menus[0];
			if (typeof item == 'string') {
				options = menus.map((str) => {
					if (str == '-' || str == '') {
						return { divider: true } as ListItemType;
					} else {
						return { label: str } as ListItemType;
					}
				});
			} else {
			}
		} else {
			options = [];
		}
	});
</script>

<div class="relative min-h-max {containerClassName}">
	<button
		type="button"
		class="flex items-center justify-center flex-nowrap text-start {className}"
		{style}
		{id}
		aria-expanded={expanded}
		aria-haspopup="true"
		onclick={hendleToggleDropdown}
		use:ripple
	>
		<span class="sr-only">{screenOnlyDesc}</span>
		<div class="flex items-center flex-nowrap gap-2">
			{#if buttonChildren}
				{@render buttonChildren()}
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
			{/if}ß
		</div>
	</button>
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
		class="absolute mt-1 z-10 w-60 max-h-1/2vh overflow-y-auto origin-top-left rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none transition ease-out duration-100 {dropdownClassName} {dropdownState ==
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
					<div class="border-t border-gray-200 {dividerClassName}"></div>
				{:else if menuItemChildren}
					{@render menuItemChildren(menu, index)}
				{:else}
					<ButtonListItem
						item={menu}
						{index}
						{hasCheck}
						id={id}
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
						children={menuItemInnerChildren}
						onClick={handlemenuItemClick}
					/>
				{/if}
			{/each}
		{/if}
	</div>
</div>
