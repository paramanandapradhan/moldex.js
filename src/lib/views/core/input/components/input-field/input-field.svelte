<script module lang="ts">
	export type InputFieldSize = 'lg' | 'md' | 'sm' | 'xs';
	export type InputFieldAppearance =
		| 'normal'
		| 'box'
		| 'fill'
		| 'underline'
		| 'fill-underline'
		| 'none';

	export type InputValue =
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

	export type InputFieldProps = {
		appearance?: InputFieldAppearance;
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
		size?: InputFieldSize;
		step?: number;
		type?: HTMLInputTypeAttribute | 'textarea';
		value?: InputValue;
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
	}: InputFieldProps = $props();

	let inputRef: HTMLInputElement | HTMLTextAreaElement | null = $state(null);

	let nameDerived = $derived(name || id);
	let idDerived = $derived(id || name);

	let containerClassNameDerived = $derived.by(() => {
		if (floatingLabel || leftSnippet != null || rightSnippet != null) {
			return (containerClassName || '') + ' relative';
		}
		return containerClassName;
	});

	let sizeClassName = $derived.by(() => {
		let sizeClassName = '';
		if (size) {
			switch (size) {
				case 'lg':
					sizeClassName = 'p-4 text-neutral';
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
		return sizeClassName;
	});

	let floatingLabelPaddingClassName = $derived.by(() => {
		if (floatingLabel) {
			if (size) {
				let floatingClassName = '';
				switch (size) {
					case 'lg':
						floatingClassName = ` px-1 peer-focus:px-1 peer-placeholder-shown:px-4 `;
						break;
					case 'md':
						floatingClassName = ' px-1 peer-focus:px-1 peer-placeholder-shown:px-2.5 ';
						break;
					case 'sm':
						floatingClassName = ' px-1 peer-focus:px-1 peer-placeholder-shown:px-2';
						break;
					case 'xs':
						floatingClassName = ' px-0 peer-focus:px-0 peer-placeholder-shown:px-1 ';
						break;
				}
				return floatingClassName;
			}
		}
		return '';
	});

	let floatingLabelTextClassName = $derived.by(() => {
		let className = '';
		if (floatingLabel) {
			if (size) {
				switch (size) {
					case 'lg':
						className = 'text-neutral';
						break;
					case 'md':
						className = 'text-sm';
						break;
					case 'sm':
						className = 'text-xs';
						break;
					case 'xs':
						className = 'text-xs';
						break;
				}
			}
		}
		return className;
	});

	let floatingLabelClassName = $derived.by(() => {
		if (floatingLabel) {
			return `absolute duration-300 transform top-0 rounded -translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-0 peer-placeholder-shown:start-0 peer-focus:start-1 bg-white peer-focus:bg-white dark:bg-neutral-700 peer-focus:bg-neutral-800 peer-placeholder-shown:bg-transparent  start-1 ${floatingLabelPaddingClassName} ${floatingLabelTextClassName}`;
		}
		return '';
	});

	let appearanceClassName = $derived.by(() => {
		let className = '';
		if (appearance) {
			switch (appearance) {
				case 'normal':
					className =
						'border rounded-lg bg-neutral-100 dark:bg-neutral-700 border-neutral-300 dark:border-neutral-500 text-neutral-950 dark:text-neutral-50 focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 focus:bg-neutral-50 dark:focus:bg-neutral-800 ';
					break;
				case 'box':
					className =
						'border bg-neutral-100 dark:bg-neutral-700 border-neutral-300 dark:border-neutral-500 text-neutral-950 dark:text-neutral-50 focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 focus:bg-neutral-50 dark:focus:bg-neutral-800 ';
					break;
				case 'fill':
					className =
						' border-0 appearance-none  focus:ring-0 bg-neutral-100 dark:bg-neutral-700 text-neutral-950 dark:text-neutral-50 focus:bg-neutral-50 dark:focus:bg-neutral-800 ';
					break;
				case 'underline':
					className =
						'bg-transparent border-0 border-b-2 appearance-none focus:ring-0 text-neutral-950 dark:text-neutral-50 border-neutral-300 dark:border-neutral-700 focus:border-primary-500 dark:focus:border-primary-500';
					break;
				case 'fill-underline':
					className =
						'border-0 border-b-2 appearance-none ring-0 text-neutral-950 dark:text-neutral-50 bg-neutral-100 dark:bg-neutral-700 border-neutral-300 dark:border-neutral-500 focus:border-primary-500 dark:focus:border-primary-500 ';
					break;
				case 'none':
					className =
						'border-0 focus:ring-0 appearance-none text-neutral-950 dark:text-neutral-50 bg-transparent dark:bg-transparent focus:bg-neutral-100 dark:focus:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800';
					break;
			}
		}
		return className;
	});

	export function focus() {
		inputRef && inputRef.focus();
	}

	export function getElement() {
		return inputRef;
	}

	export function select() {
		return inputRef && (inputRef as HTMLInputElement).select();
	}

	export function getBoundingClientRect() {
		if (inputRef) {
			return inputRef.getBoundingClientRect();
		}
	}

	$effect(() => {
		setTimeout(() => {
			if (inputRef && autofocus) {
				inputRef.focus();
			}
		}, 10);
	});
</script>

{#snippet labelSnippet()}
	<Label
		forName={idDerived}
		{label}
		className=" {floatingLabel ? '' : 'mb-1 '} {floatingLabelClassName}  {labelClassName}"
		{required}
		{requiredSymbolColor}
		{requiredSymbol}
		{hasRequiredSymbol}
	/>
{/snippet}

{#if !floatingLabel && label}
	{@render labelSnippet()}
{/if}

<div class="w-full {containerClassNameDerived}">
	{#if leftSnippet}
		<div
			class="left-children absolute flex items-center justify-center {leftSnippetContainerClassName}"
		>
			{@render leftSnippet()}
		</div>
	{/if}

	{#if type == 'textarea'}
		<textarea
			bind:this={inputRef}
			bind:value
			class="peer block w-full outline-none {appearanceClassName} {sizeClassName} {className}"
			{title}
			id={idDerived}
			name={nameDerived}
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
			class="peer block w-full outline-none {appearanceClassName} {sizeClassName} {className}"
			{title}
			{type}
			id={idDerived}
			name={nameDerived}
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
			class="pointer-events-none absolute inset-0 block w-full overflow-hidden {appearanceClassName} {sizeClassName}   {contentSnippetClassName}"
		>
			{@render contentSnippet()}
		</div>
	{/if}
	{#if rightSnippet}
		<div
			class="right-children absolute flex items-center justify-center {rightSnippetContainerClassName}"
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
