<script context="module" lang="ts">
	export type InputFieldTypesType = 'text' | 'number' | 'date';
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
		value?: string;
		type?: InputFieldTypesType;
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
	import Icon from '$lib/views/core/icon/components/icon/icon.svelte';

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
		iconPath,
		iconClassName = '',
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

	let inputRef: HTMLInputElement | null = $state(null);

	let sizeClassName = $state('');
	let appearanceClassName = $state('');
	let floatingLabelClassName = $state('');
	let floatingLabelPaddingClassName = $state('');
	let floatingLabelTextClassName = $state('');
	let iconPaddingClassName = $state();
	let iconSizeClassName = $state();
	let floatingLabelIconTextPaddingClassName = $state('');

	$effect(() => {
		if (iconPath || floatingLabel) {
			containerClassName = (containerClassName || '') + ' relative';
		}
	});

	$effect(() => {
		if (iconPath) {
			let flpcn;
			switch (size) {
				case 'lg':
					iconPaddingClassName = 'ps-12';
					flpcn = ` peer-placeholder-shown:ps-12 `;
					iconSizeClassName = '!w-8 !h-8';
					break;
				case 'md':
					iconPaddingClassName = 'ps-10';
					flpcn = ` peer-placeholder-shown:ps-10 `;
					iconSizeClassName = '!w-6 !h-6';
					break;
				case 'sm':
					iconPaddingClassName = 'ps-9';
					flpcn = ` peer-placeholder-shown:ps-9 `;
					iconSizeClassName = '!w-5 !h-5';
					break;
				case 'xs':
					iconPaddingClassName = 'ps-7';
					flpcn = ` peer-placeholder-shown:ps-7 `;
					iconSizeClassName = '!w-3 !h-3';
					break;
			}
			floatingLabelIconTextPaddingClassName = flpcn;
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
				floatingLabelPaddingClassName = floatingLabelIconTextPaddingClassName + flpcn;
			}

			labelClassName =
				(labelClassName || '') +
				`absolute duration-300 transform top-0 rounded -translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-0 peer-placeholder-shown:start-0 peer-focus:start-1 bg-white peer-placeholder-shown:bg-transparent peer-focus:bg-white start-1 ${floatingLabelPaddingClassName} ${floatingLabelTextClassName}`;
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
					appearanceClassName = 'hover:bg-gray-100 focus:bg-gray-100 border-0 focus:outline-none focus:ring-0 appearance-none';
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
		className={labelClassName}
		{required}
		{requiredSymbolColor}
		{requiredSymbol}
		{hasRequiredSymbol}
	></Label>
{/snippet}

{#snippet createIcon()}
	<div class="absolute inset-y-0 start-0 flex items-center ps-2.5 pointer-events-none {className}">
		<Icon path={iconPath!} className="text-gray-500 {iconSizeClassName} {iconClassName}" />
	</div>
{/snippet}

{#if !floatingLabel && (label || iconPath)}
	{@render labelSnippet()}
{/if}
<div class={containerClassName}>
	{#if iconPath}
		{@render createIcon()}
	{/if}
	<input
		bind:this={inputRef}
		bind:value
		{type}
		{id}
		{name}
		class="block w-full peer {iconPaddingClassName} {appearanceClassName} {floatingLabelClassName}  {sizeClassName}   {className}"
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

	{#if label && floatingLabel}
		{@render labelSnippet()}
	{/if}
</div>

<style>
</style>
