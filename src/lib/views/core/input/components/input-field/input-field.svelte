<script module lang="ts">
	export type InputFieldSizeType = 'lg' | 'md' | 'sm' | 'xs';
	export type InputFieldAppearanceType =
		| 'normal'
		| 'box'
		| 'fill'
		| 'underline'
		| 'fill-underline'
		| 'none';

	export type InputFieldPropsType = {
		id?: string;
		label?: string;
		name?: string;
		className?: string;
		value?: string | number | Date | File | File[] | null | undefined;
		type?: HTMLInputTypeAttribute | 'textarea' | 'combobox';
		labelClassName?: string;
		containerClassName?: string;
		placeholder?: string;
		required?: boolean;
		disabled?: boolean;
		autofocus?: boolean;
		readonly?: boolean;
		maxlength?: number;
		minlength?: number;
		min?: number;
		max?: number;
		step?: number;
		requiredSymbolColor?: string;
		requiredSymbol?: string;
		hasRequiredSymbol?: boolean;
		size?: InputFieldSizeType;
		appearance?: InputFieldAppearanceType;
		floatingLabel?: boolean;
		pattern?: string;
		multiple?: boolean;
		iconPath?: string;
		iconClassName?: string;
		leftChildrenContainerClassName?: string;
		rightChildrenContainerClassName?: string;
		rows?: number;
		cols?: number;
		leftChildren?: Snippet;
		rightChildren?: Snippet;
		onchange?: (ev: any) => void;
		oninput?: (ev: any) => void;
		onfocus?: (ev: any) => void;
		onblur?: (ev: any) => void;
		ondblclick?: (ev: MouseEvent) => void;
		onclick?: (ev: MouseEvent) => void;
		onmousedown?: (ev: MouseEvent) => void;
		onmouseup?: (ev: MouseEvent) => void;
		onkeydown?: (ev: KeyboardEvent) => void;
		onkeyup?: (ev: KeyboardEvent) => void;
		onkeypress?: (ev: KeyboardEvent) => void;
		ondrop?: (ev: DragEvent) => void;
		ondrag?: (ev: DragEvent) => void;
		ondragover?: (ev: DragEvent) => void;
	};
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLInputTypeAttribute } from 'svelte/elements';
	import Label from '../label/label.svelte';

	let {
		id = '',
		name = '',
		value = $bindable(''),
		className = '',
		label = '',
		type = 'text',
		labelClassName = '',
		containerClassName = '',
		placeholder = '',
		required = false,
		requiredSymbolColor = 'red',
		requiredSymbol = '*',
		hasRequiredSymbol = true,
		disabled = false,
		autofocus = false,
		readonly = false,
		maxlength,
		minlength,
		min,
		max,
		step,
		size = 'md',
		appearance = 'normal',
		floatingLabel = false,
		pattern = '',
		multiple = false,
		leftChildrenContainerClassName = '',
		rightChildrenContainerClassName = '',
		rows = 5,
		cols,
		leftChildren,
		rightChildren,
		onchange,
		oninput,
		onfocus,
		onblur,
		ondblclick,
		onclick,
		onmousedown,
		onmouseup,
		onkeydown,
		onkeyup,
		onkeypress,
		ondrop,
		ondrag,
		ondragover
	}: InputFieldPropsType = $props();

	let inputRef: HTMLInputElement | HTMLTextAreaElement | HTMLButtonElement | null = $state(null);

	let sizeClassName = $state('');
	let appearanceClassName = $state('');
	let floatingLabelClassName = $state('');
	let floatingLabelPaddingClassName = $state('');
	let floatingLabelTextClassName = $state('');

	export function focus() {
		inputRef && inputRef.focus();
	}

	$effect(() => {
		if (floatingLabel || leftChildren != null || rightChildren != null) {
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

			floatingLabelClassName = `absolute duration-300 transform top-0 rounded -translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-0 peer-placeholder-shown:start-0 peer-focus:start-1 bg-white peer-placeholder-shown:bg-transparent peer-focus:bg-white start-1 ${floatingLabelPaddingClassName} ${floatingLabelTextClassName}`;
		}
	});

	$effect(() => {
		if (appearance) {
			switch (appearance) {
				case 'normal':
					appearanceClassName =
						'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 ';
					break;
				case 'box':
					appearanceClassName =
						'bg-gray-50 border border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500   ';
					break;
				case 'fill':
					appearanceClassName =
						'bg-gray-100 border-0 appearance-none focus:bg-gray-200 focus:outline-none focus:ring-0';
					break;

				case 'underline':
					appearanceClassName =
						'bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600';
					break;
				case 'fill-underline':
					appearanceClassName =
						'bg-gray-100 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600';
					break;
				case 'none':
					appearanceClassName =
						'hover:bg-gray-100 focus:bg-gray-100 border-0 focus:outline-none focus:ring-0 appearance-none';
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
		if (inputRef && autofocus) {
			inputRef.focus();
		}
	});
</script>

{#snippet labelSnippet()}
	<Label
		forName={id}
		{label}
		className="{floatingLabelClassName} {labelClassName}"
		{required}
		{requiredSymbolColor}
		{requiredSymbol}
		{hasRequiredSymbol}
	/>
{/snippet}

{#if !floatingLabel && label}
	{@render labelSnippet()}
{/if}
<div class={containerClassName}>
	{#if leftChildren}
		<div
			class="absolute flex items-center justify-center left-children {leftChildrenContainerClassName}"
		>
			{@render leftChildren()}
		</div>
	{/if}
	{#if type == 'combobox'}
		<button
			bind:this={inputRef}
			class="block w-full peer {appearanceClassName} {sizeClassName} {className}"
			{id}
			{name}
			{placeholder}
			{disabled}
			{onchange}
			{oninput}
			{onfocus}
			{onblur}
			{ondblclick}
			{onclick}
			{onmousedown}
			{onmouseup}
			{onkeydown}
			{onkeyup}
			{onkeypress}
			{ondrop}
			{ondrag}
			{ondragover}
		></button>
	{:else if type == 'textarea'}
		<textarea
			bind:this={inputRef}
			bind:value
			class="block w-full peer {appearanceClassName} {sizeClassName} {className}"
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
			{onchange}
			{oninput}
			{onfocus}
			{onblur}
			{ondblclick}
			{onclick}
			{onmousedown}
			{onmouseup}
			{onkeydown}
			{onkeyup}
			{onkeypress}
			{ondrop}
			{ondrag}
			{ondragover}
		></textarea>
	{:else}
		<input
			bind:this={inputRef}
			bind:value
			class="block w-full peer {appearanceClassName} {sizeClassName} {className}"
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
			{onchange}
			{oninput}
			{onfocus}
			{onblur}
			{ondblclick}
			{onclick}
			{onmousedown}
			{onmouseup}
			{onkeydown}
			{onkeyup}
			{onkeypress}
			{ondrop}
			{ondrag}
			{ondragover}
		/>
	{/if}
	{#if rightChildren}
		<div
			class="absolute flex items-center justify-center right-children {rightChildrenContainerClassName}"
		>
			{@render rightChildren()}
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
