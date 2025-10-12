<script module lang="ts">
	export type ButtonListItemProps = {
		appearance?: ButtonAppearance;
		size?: ButtonSize;
		index?: number;
		id?: string;
		className?: string;
		checkboxIconPath?: string;
		uncheckboxIconPath?: string;
		checkboxIconClassName?: string;
		uncheckboxIconClassName?: string;
		hasIcon?: boolean;
		iconClassName?: string;
		hasImg?: boolean;
		imgClassName?: string;
		hasArrow?: boolean;
		arrowIconPath?: string;
		arrowClassName?: string;
		title?: string;
		subtitle?: string;
		titleClassName?: string;
		subtitleClassName?: string;
		url?: string;
		disabled?: boolean;
		iconPath?: string;
		isCircularIcon?: boolean;
		circularIconClassName?: string;
		imgSrc?: string;
		hasCheckbox?: boolean;
		checkboxClassName?: string;
		isChecked?: boolean;
		hasMenu?: boolean;
		menus?: Menu[] | string[];
		menuIconPath?: string;
		menuIconClassName?: string;
		menuButtonClassName?: string;
		menuButtonLabel?: string;
		hasDivider?: boolean;
		dividerClassName?: string;
		onMenu?: (ev: Event, menu: Menu | string) => void;
		onClick?: (ev: MouseEvent) => void;
		children?: Snippet;
	};
</script>

<script lang="ts">
	import {
		Icon,
		mdiCheckCircle,
		mdiCheckCircleOutline,
		mdiChevronRight
	} from '../../../icon';
	import type { Snippet } from 'svelte';
	import Button, { type ButtonAppearance, type ButtonSize } from '../button/button.svelte';
	import type { Menu } from '../button-menu/button-menu.svelte';
	import ButtonMenu from '../button-menu/button-menu.svelte';
	import IconCircle from '../../../icon/components/icon-circle/icon-circle.svelte';

	let {
		appearance,
		size,
		index,
		id = '',
		className,
		checkboxIconPath = mdiCheckCircle,
		uncheckboxIconPath = mdiCheckCircleOutline,
		checkboxIconClassName = '',
		uncheckboxIconClassName = '',
		hasIcon = false,
		iconClassName = '',
		hasImg = false,
		imgClassName = '',
		iconPath,
		isCircularIcon,
		circularIconClassName = '',
		imgSrc,
		hasArrow = false,
		arrowIconPath = mdiChevronRight,
		arrowClassName = '',
		title = '',
		subtitle = '',
		titleClassName = '',
		subtitleClassName = '',
		disabled = false,
		hasCheckbox,
		checkboxClassName = '',
		isChecked = false,
		hasMenu,
		menus,
		menuIconPath,
		menuIconClassName,
		menuButtonClassName,
		menuButtonLabel,
		hasDivider,
		dividerClassName,
		onMenu,
		onClick = (ev: MouseEvent) => {},
		children
	}: ButtonListItemProps = $props();
</script>

{#snippet itemInternal()}
	{#if hasIcon && iconPath}
		<div class="flex-none">
			{#if isCircularIcon}
				<IconCircle
					{iconPath}
					iconClassName=" {iconClassName}"
					circleClassName=" {circularIconClassName}"
				/>
			{:else}
				<Icon path={iconPath} className=" {iconClassName}" />
			{/if}
		</div>
	{/if}

	{#if hasImg && imgSrc}
		<div class="flex-none">
			<img src={imgSrc} class="w-6 h-6 {imgClassName} {imgClassName}" alt="item-img-{index}" />
		</div>
	{/if}

	<div class="flex-grow min-w-0">
		{#if title}
			<div class="overflow-hidden whitespace-nowrap overflow-ellipsis {titleClassName}">
				{title || ''}
			</div>
		{/if}
		{#if subtitle}
			<div
				class="overflow-hidden whitespace-nowrap overflow-ellipsis text-base-400 dark:text-base-300 text-sm font-light {subtitleClassName}"
			>
				{subtitle || ''}
			</div>
		{/if}
	</div>
	{#if hasCheckbox}
		<div class="flex-none">
			<Icon
				path={isChecked ? checkboxIconPath : uncheckboxIconPath}
				className="w-5 h-5 {checkboxClassName} {isChecked
					? `text-primary ${checkboxIconClassName}`
					: `text-base-400 ${uncheckboxIconClassName}`}"
			/>
		</div>
	{/if}

	{#if hasArrow}
		<div class="flex-none">
			<Icon path={arrowIconPath} className="w-5 h-5 text-base-500 {arrowClassName}  " />
		</div>
	{/if}
	{#if hasMenu}
		<div class="flex-none">
			<ButtonMenu
				{menus}
				{onMenu}
				label={menuButtonLabel}
				iconPath={menuIconPath}
				{menuIconClassName}
				className={menuButtonClassName}
			/>
		</div>
	{/if}
{/snippet}

<Button
	id="{id}-list-item-{index}"
	type="button"
	className="w-full !text-start !justify-start gap-4 hover:bg-base-50 transition rounded-none dark:hover:bg-base-700 h-full {className}"
	{onClick}
	{disabled}
	{appearance}
	{size}
>
	{#if children}
		{@render children()}
	{:else}
		{@render itemInternal()}
	{/if}
</Button>
{#if hasDivider}
	<hr class=" {dividerClassName}" />
{/if}
