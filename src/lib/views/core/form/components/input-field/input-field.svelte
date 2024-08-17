<script context="module" lang="ts">
	export type InputFieldTypesType = 'text' | 'number' | 'date';
	export type InputFieldSizeType = 'lg' | 'md' | 'sm';

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
	};
</script>

<script lang="ts">
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
		size = 'md'
	}: InputFieldPropsType = $props();

	let inputRef: HTMLInputElement | null = $state(null);

	let sizeClassName = $state('');

	$effect(() => {
		if (size) {
			if (size == 'sm') {
				sizeClassName = 'p-2 text-xs';
			} else if (size == 'lg') {
				sizeClassName = 'p-4 text-base';
			} else {
				sizeClassName = 'p-2.5 text-sm';
			}
		}
	});

	$effect(() => {
		if (name && !id) {
			id = name;
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

<div class={containerClassName}>
	{#if label}
		{@render labelSnippet()}
	{/if}
	<input
		bind:this={inputRef}
		bind:value
		{type}
		{id}
		class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500 {sizeClassName} {className}"
		{placeholder}
		{required}
		{disabled}
		{readonly}
		{maxlength}
		{minlength}
		{min}
		{max}
		{step}
	/>
</div>
