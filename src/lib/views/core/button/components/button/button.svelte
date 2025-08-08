<script module lang="ts">
	export type ButtonAppearance =
		| 'none'
		| 'primary'
		| 'base'
		| 'border'
		| 'border-base'
		| 'border-primary';

	export type ButtonSize = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

	export type ButtonType = 'button' | 'submit' | 'reset';

	export type ButtonProps = {
		title?: string;
		id?: string;
		type?: ButtonType;
		appearance?: ButtonAppearance;
		size?: ButtonSize;
		form?: string | null;
		className?: string;
		iconPath?: string;
		iconClassName?: string;
		label?: string;
		rightIconPath?: string;
		rightIconClassName?: string;
		spinner?: boolean;
		disabled?: boolean;
		spinnerClassName?: string;
		onlySpinner?: boolean;
		children?: Snippet;
		hasRipple?: boolean;
		rippleColor?: string | 'light' | 'dark';
		url?: string;
		target?: string;
		hasOpenInNew?: boolean;
		openInNewIconClassName?: string;
		openInNewIcon?: string;
		onClick?: (ev: MouseEvent) => void;
		onDblClick?: (ev: MouseEvent) => void;
		onContextMenu?: (ev: MouseEvent) => void;
		onDrop?: (ev: DragEvent) => void;
		onDragStart?: (ev: DragEvent) => void;
		onDragEnd?: (ev: DragEvent) => void;
		onDragEnter?: (ev: DragEvent) => void;
		onDragLeave?: (ev: DragEvent) => void;
		onDragOver?: (ev: DragEvent) => void;
	};
</script>

<script lang="ts">
	import { ripple, type RipplePropsType } from '$lib/actions/ripple.js';
	import { Icon, mdiOpenInNew } from '$lib/views/core/icon';
	import { Spinner } from '$lib/views/core/spinner';
	import type { Snippet } from 'svelte';

	let {
		title,
		appearance = 'none',
		id = '',
		form = undefined,
		type = 'button',
		label = '',
		className = '',
		iconPath = '',
		iconClassName = '',
		rightIconPath = '',
		rightIconClassName = '',
		spinner = false,
		disabled = false,
		size = 'md',
		spinnerClassName = '',
		onlySpinner = false,
		children,
		hasRipple = true,
		rippleColor,
		onClick = (ev: MouseEvent) => {},
		url,
		target,
		hasOpenInNew,
		openInNewIconClassName,
		openInNewIcon = mdiOpenInNew,
		onDblClick,
		onContextMenu,
		onDrop,
		onDragStart,
		onDragEnd,
		onDragEnter,
		onDragLeave,
		onDragOver
	}: ButtonProps = $props();

	let btnAppearanceClassName = $derived.by(() => {
		switch (appearance) {
			case 'none':
				return 'text-base-800 dark:text-base-300 hover:text-base-900 disabled:text-base-400 dark:disabled:text-base-500 dark:hover:text-base-200';
			case 'base':
				return 'text-base-800 dark:text-base-300 hover:text-base-900 disabled:text-base-400 dark:disabled:text-base-500 dark:hover:text-base-200 bg-base-200 dark:bg-base-700 hover:bg-base-300 dark:hover:bg-base-600 disabled:hover:bg-base-200 dark:disabled:hover:bg-base-700 ';
			case 'primary':
				return 'text-primary-100 hover:text-primary-50 bg-primary-600 hover:bg-primary-500 disabled:text-base-400 dark:disabled:text-base-500 disabled:bg-base-200 dark:disabled:bg-base-700 disabled:hover:bg-base-200 dark:disabled:hover:bg-base-700  ';
			case 'border':
			case 'border-base':
				return 'border-2 text-base-800 dark:text-base-300 hover:text-base-900 disabled:text-base-400 dark:disabled:text-base-500 dark:hover:text-base-200 border-base-200 hover:border-base-300 dark:border-base-700 dark:hover:border-base-600 dark:disabled:border-base-200 dark:disabled:hover:border-base-200 dark:disabled:border-base-700 dark:disabled:hover:border-base-700  ';
			case 'border-primary':
				return 'border-2 text-primary hover:text-primary-500 disabled:text-base-400 dark:disabled:text-base-500 border-primary hover:border-primary-500 dark:border-primary-600 dark:hover:border-primary-500 dark:disabled:border-base-200 dark:disabled:hover:border-base-200 dark:disabled:border-base-700 dark:disabled:hover:border-base-700  ';
		}
	});

	let btnSizeClassName = $derived.by(() => {
		switch (size) {
			case 'none':
				return '';
			case 'xs':
				return 'px-1 py-0 text-xs';
			case 'sm':
				return 'px-3 py-1 text-sm';
			case 'md':
				return 'px-4 py-2';
			case 'lg':
				return 'px-6 py-3 text-lg';
			case 'xl':
				return 'px-8 py-4 text-xl';
			case '2xl':
				return 'px-10 py-6 text-2xl';
		}
	});

	function handleRipple(node: HTMLElement, options?: RipplePropsType) {
		if (hasRipple) {
			options = options || { color: rippleColor };
			return ripple(node, options);
		}
		return {
			destroy() {}
		};
	}
</script>

{#snippet buttonContent()}
	{#if spinner}
		<Spinner className="w-4 h-4 {spinnerClassName}" />
	{/if}
	{#if !onlySpinner}
		{#if iconPath}
			<Icon path={iconPath} className="w-6 h-6 {iconClassName}" />
		{/if}
		{#if label}
			<span>{label || ''}</span>
		{/if}
		{#if rightIconPath}
			<Icon path={rightIconPath} className="w-6 h-6 {rightIconClassName}" />
		{/if}
	{/if}
{/snippet}

{#if url}
	<a
		{id}
		href={url}
		{target}
		class="relative w-max flex items-center justify-center gap-2 focus:outline-primary dark:focus:outline-primary rounded {btnSizeClassName} {btnAppearanceClassName} {className}"
		onclick={onClick}
		use:handleRipple
		ondblclick={onDblClick}
		oncontextmenu={onContextMenu}
		ondrop={onDrop}
		ondragstart={onDragStart}
		ondragend={onDragEnd}
		ondragenter={onDragEnter}
		ondragleave={onDragLeave}
		ondragover={onDragOver}
		{title}
	>
		{#if children}
			{@render children()}
		{:else}
			{@render buttonContent()}
		{/if}
		{#if hasOpenInNew}
			<Icon path={openInNewIcon} className=" {openInNewIconClassName}" sizeClassName="w-4 h-4" />
		{/if}
	</a>
{:else}
	<button
		{id}
		{type}
		{form}
		{title}
		class="relative flex items-center justify-center gap-2 focus:outline-primary dark:focus:outline-primary rounded {btnSizeClassName} {btnAppearanceClassName} {className}"
		{disabled}
		use:handleRipple
		onclick={onClick}
		ondblclick={onDblClick}
		oncontextmenu={onContextMenu}
		ondrop={onDrop}
		ondragstart={onDragStart}
		ondragend={onDragEnd}
		ondragenter={onDragEnter}
		ondragleave={onDragLeave}
		ondragover={onDragOver}
	>
		{#if children}
			{@render children?.()}
		{:else}
			{@render buttonContent()}
		{/if}
	</button>
{/if}
