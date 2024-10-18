<script module lang="ts">
	export type InputFieldSizeType = 'lg' | 'md' | 'sm' | 'xs';
	export type InputFieldAppearanceType =
		| 'normal'
		| 'box'
		| 'fill'
		| 'underline'
		| 'fill-underline'
		| 'none';

	export type InputValueType =
		| any
		| string
		| string[]
		| number
		| number[]
		| Date
		| Date[]
		| File
		| File[]
		| null
		| undefined;

	export type InputFieldPropsType = {
		appearance?: InputFieldAppearanceType;
		ariaControls?: string;
		ariaExpanded?: boolean;
		autofocus?: boolean;
		className?: string;
		cols?: number;
		containerClassName?: string;
		contentSnippet?: Snippet;
		contentSnippetClassName?: string;
		disabled?: boolean;
		floatingLabel?: boolean;
		hasRequiredSymbol?: boolean;
		iconClassName?: string;
		iconPath?: string;
		id?: string;
		label?: string;
		labelClassName?: string;
		leftSnippet?: Snippet;
		leftSnippetContainerClassName?: string;
		max?: number | string;
		maxlength?: number;
		min?: number | string;
		minlength?: number;
		multiple?: boolean;
		name?: string;
		title?: string;
		onBlur?: (ev: any) => void;
		onChange?: (ev: any) => void;
		onClick?: (ev: MouseEvent) => void;
		onDblClick?: (ev: MouseEvent) => void;
		onDrag?: (ev: DragEvent) => void;
		onDragOver?: (ev: DragEvent) => void;
		onDrop?: (ev: DragEvent) => void;
		onFocus?: (ev: any) => void;
		onInput?: (ev: any) => void;
		onKeyDown?: (ev: KeyboardEvent) => void;
		onKeyPress?: (ev: KeyboardEvent) => void;
		onKeyUp?: (ev: KeyboardEvent) => void;
		onMouseDown?: (ev: MouseEvent) => void;
		onMouseUp?: (ev: MouseEvent) => void;
		pattern?: string;
		placeholder?: string;
		readonly?: boolean;
		required?: boolean;
		requiredSymbol?: string;
		requiredSymbolColor?: string;
		rightSnippet?: Snippet;
		rightSnippetContainerClassName?: string;
		role?: AriaRole;
		rows?: number;
		size?: InputFieldSizeType;
		step?: number;
		type?: HTMLInputTypeAttribute | 'textarea';
		value?: InputValueType;
	};
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLInputTypeAttribute, AriaRole } from 'svelte/elements';
	import Label from '../label/label.svelte';

	let {
		appearance = 'normal',
		ariaControls,
		ariaExpanded,
		autofocus = false,
		className = '',
		cols,
		containerClassName = '',
		contentSnippet,
		contentSnippetClassName,
		disabled = false,
		floatingLabel = false,
		hasRequiredSymbol = true,
		id = '',
		label = '',
		labelClassName = '',
		leftSnippet,
		leftSnippetContainerClassName = '',
		max,
		maxlength,
		min,
		minlength,
		multiple = false,
		name = '',
		title,
		onBlur,
		onChange,
		onClick,
		onDblClick,
		onDrag,
		onDragOver,
		onDrop,
		onFocus,
		onInput,
		onKeyDown,
		onKeyPress,
		onKeyUp,
		onMouseDown,
		onMouseUp,
		pattern,
		placeholder = '',
		readonly = false,
		required = false,
		requiredSymbol = '*',
		requiredSymbolColor = 'red',
		rightSnippet,
		rightSnippetContainerClassName = '',
		role,
		rows = 5,
		size = 'md',
		step,
		type = 'text',
		value = $bindable()
	}: InputFieldPropsType = $props();

	let inputRef: HTMLInputElement | HTMLTextAreaElement | null = $state(null);

	let sizeClassName = $state('');
	let appearanceClassName = $state('');
	let floatingLabelClassName = $state('');
	let floatingLabelPaddingClassName = $state('');
	let floatingLabelTextClassName = $state('');

	export function focus() {
		inputRef && inputRef.focus();
	}

	export function getElement() {
		return inputRef;
	}

	export function select() {
		return inputRef && (inputRef as HTMLInputElement).select();
	}

	$effect(() => {
		if (floatingLabel || leftSnippet != null || rightSnippet != null) {
			containerClassName = (containerClassName || '') + ' relative';
		}
	});

	$effect(() => {
		if (floatingLabel) {
			if (size) {
				let flpcn = '';
				switch (size) {
					case 'lg':
						flpcn = ` px-1 peer-focus:px-1 peer-placeholder-shown:px-4 `;
						floatingLabelTextClassName = 'text-base';
						break;
					case 'md':
						flpcn = ' px-1 peer-focus:px-1 peer-placeholder-shown:px-2.5 ';
						floatingLabelTextClassName = 'text-sm';

						break;
					case 'sm':
						flpcn = ' px-1 peer-focus:px-1 peer-placeholder-shown:px-2';
						floatingLabelTextClassName = 'text-xs';
						break;
					case 'xs':
						flpcn = ' px-0 peer-focus:px-0 peer-placeholder-shown:px-1 ';
						floatingLabelTextClassName = 'text-xs';
						break;
				}
				floatingLabelPaddingClassName = flpcn;
			}

			floatingLabelClassName = `absolute duration-300 transform top-0 rounded -translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-0 peer-placeholder-shown:start-0 peer-focus:start-1 bg-white peer-focus:bg-white dark:bg-base-700 peer-focus:bg-base-800 peer-placeholder-shown:bg-transparent  start-1 ${floatingLabelPaddingClassName} ${floatingLabelTextClassName}`;
		}
	});

	$effect(() => {
		if (appearance) {
			switch (appearance) {
				case 'normal':
					appearanceClassName =
						'border rounded-lg bg-base-100 dark:bg-base-700 border-base-300 dark:border-base-500 text-base-950 dark:text-base-50 focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 focus:bg-base-50 dark:focus:bg-base-800 ';
					break;
				case 'box':
					appearanceClassName =
						'border bg-base-100 dark:bg-base-700 border-base-300 dark:border-base-500 text-base-950 dark:text-base-50 focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 focus:bg-base-50 dark:focus:bg-base-800 ';
					break;
				case 'fill':
					appearanceClassName =
						' border-0 appearance-none  focus:ring-0 bg-base-100 dark:bg-base-700 text-base-950 dark:text-base-50 focus:bg-base-50 dark:focus:bg-base-800 ';
					break;
				case 'underline':
					appearanceClassName =
						'bg-transparent border-0 border-b-2 appearance-none focus:ring-0 text-base-950 dark:text-base-50 border-base-300 dark:border-base-700 focus:border-primary-500 dark:focus:border-primary-500';
					break;
				case 'fill-underline':
					appearanceClassName =
						'border-0 border-b-2 appearance-none ring-0 text-base-950 dark:text-base-50 bg-base-100 dark:bg-base-700 border-base-300 dark:border-base-500 focus:border-primary-500 dark:focus:border-primary-500 ';
					break;
				case 'none':
					appearanceClassName =
						'border-0 focus:ring-0 appearance-none text-base-950 dark:text-base-50 bg-transparent dark:bg-transparent focus:bg-base-100 dark:focus:bg-base-800 hover:bg-base-100 dark:hover:bg-base-800';
					break;
			}
		}
	});

	$effect(() => {
		if (size) {
			switch (size) {
				case 'lg':
					sizeClassName = 'p-4 text-base';
					break;
				case 'md':
					sizeClassName = 'p-2.5 text-sm';
					break;
				case 'sm':
					sizeClassName = 'p-2 text-xs';
					break;
				case 'xs':
					sizeClassName = 'p-1 text-xs';
					break;
			}
		}
	});

	$effect(() => {
		if (name && !id) {
			id = name;
		} else if (id && !name) {
			name = id;
		}
	});

	$effect(() => {
		setTimeout(() => {
			if (inputRef && autofocus) {
				inputRef.focus();
			}
		}, 300);
	});
</script>

{#snippet labelSnippet()}
	<Label
		forName={id}
		{label}
		className=" {floatingLabel ? '' : 'mb-1 '} {floatingLabelClassName} {labelClassName}"
		{required}
		{requiredSymbolColor}
		{requiredSymbol}
		{hasRequiredSymbol}
	/>
{/snippet}

{#if !floatingLabel && label}
	{@render labelSnippet()}
{/if}

<div class="w-full {containerClassName}">
	{#if leftSnippet}
		<div
			class="absolute flex items-center justify-center left-children {leftSnippetContainerClassName}"
		>
			{@render leftSnippet()}
		</div>
	{/if}

	{#if type == 'textarea'}
		<textarea
			bind:this={inputRef}
			bind:value
			class="block w-full peer outline-none {appearanceClassName} {sizeClassName} {className}"
			{title}
			{id}
			{name}
			{placeholder}
			{required}
			{disabled}
			{readonly}
			{maxlength}
			{minlength}
			{rows}
			{cols}
			onchange={onChange}
			oninput={onInput}
			onfocus={onFocus}
			onblur={onBlur}
			ondblclick={onDblClick}
			onclick={onClick}
			onmousedown={onMouseDown}
			onmouseup={onMouseUp}
			onkeydown={onKeyDown}
			onkeyup={onKeyUp}
			onkeypress={onKeyPress}
			ondrop={onDrop}
			ondrag={onDrag}
			ondragover={onDragOver}
		></textarea>
	{:else}
		<input
			bind:this={inputRef}
			bind:value
			class="block w-full peer outline-none {appearanceClassName} {sizeClassName} {className}"
			{title}
			{type}
			{id}
			{name}
			{placeholder}
			{required}
			{disabled}
			{readonly}
			{maxlength}
			{minlength}
			{min}
			{max}
			{step}
			{pattern}
			{multiple}
			{role}
			onchange={onChange}
			oninput={onInput}
			onfocus={onFocus}
			onblur={onBlur}
			ondblclick={onDblClick}
			onclick={onClick}
			onmousedown={onMouseDown}
			onmouseup={onMouseUp}
			onkeydown={onKeyDown}
			onkeyup={onKeyUp}
			onkeypress={onKeyPress}
			ondrop={onDrop}
			ondrag={onDrag}
			ondragover={onDragOver}
			aria-controls={ariaControls}
			aria-expanded={ariaExpanded}
		/>
	{/if}
	{#if contentSnippet}
		<div
			class="absolute inset-0 pointer-events-none block w-full overflow-hidden {appearanceClassName} {sizeClassName}   {contentSnippetClassName}"
		>
			{@render contentSnippet()}
		</div>
	{/if}
	{#if rightSnippet}
		<div
			class="absolute flex items-center justify-center right-children {rightSnippetContainerClassName}"
		>
			{@render rightSnippet()}
		</div>
	{/if}

	{#if label && floatingLabel}
		{@render labelSnippet()}
	{/if}
</div>

<style>
	.left-children {
		left: 2px;
		top: 2px;
		bottom: 2px;
	}

	.right-children {
		right: 2px;
		top: 2px;
		bottom: 2px;
	}
</style>
