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
		imgSrc?: string;
		hasCheckbox?: boolean;
		checkboxClassName?: string;
		isChecked?: boolean;
		onClick?: (ev: MouseEvent) => void;
		children?: Snippet;
	};
</script>

<script lang="ts">
	import '../../../../../tailwind.css';

	import {
		Icon,
		mdiCheckCircle,
		mdiCheckCircleOutline,
		mdiChevronRight
	} from '$lib/views/core/icon';
	import type { Snippet } from 'svelte';
	import Button, { type ButtonAppearance, type ButtonSize } from '../button/button.svelte';

	let {
		appearance,
		size,
		index,
		id = '',
		className = '',
		checkboxIconPath = mdiCheckCircle,
		uncheckboxIconPath = mdiCheckCircleOutline,
		checkboxIconClassName = '',
		uncheckboxIconClassName = '',
		hasIcon = false,
		iconClassName = '',
		hasImg = false,
		imgClassName = '',
		iconPath,
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
		onClick = (ev: MouseEvent) => {},
		children
	}: ButtonListItemProps = $props();
</script>

{#snippet itemInternal()}
	<div class="flex w-full items-center gap-4">
		{#if hasIcon && iconPath}
			<div>
				<Icon path={iconPath} className="{iconClassName} {iconClassName}" />
			</div>
		{/if}

		{#if hasImg && imgSrc}
			<div>
				<img src={imgSrc} class="w-6 h-6 {imgClassName} {imgClassName}" alt="item-img-{index}" />
			</div>
		{/if}

		<div class="flex-grow">
			{#if title}
				<div class="text-ellipsis overflow-hidden {titleClassName}  }">
					{title || ''}
				</div>
			{/if}
			{#if subtitle}
				<div
					class="text-ellipsis overflow-hidden text-base-400 dark:text-base-300 text-sm font-light {subtitleClassName} }"
				>
					{subtitle || ''}
				</div>
			{/if}
		</div>
		{#if hasCheckbox}
			<div>
				<Icon
					path={isChecked ? checkboxIconPath : uncheckboxIconPath}
					className="w-5 h-5 {checkboxClassName} {isChecked
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
	</div>
{/snippet}

<Button
	id="{id}-list-item-{index}"
	type="button"
	className=" w-full text-start justify-start rounded-none {className}"
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
