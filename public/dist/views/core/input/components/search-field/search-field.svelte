<script lang="ts">
	 
	import Icon from '../../../icon/components/icon/icon.svelte';
	import { mdiMagnify } from '../../../icon/index.js';
	import type { InputFieldProps } from '../../types';
	import InputField from '../input-field/input-field.svelte';

	let {
		className,
		placeholder,
		iconClassName,
		size = 'sm',
		value = $bindable(''),
		onSearch,
		...props
	}: InputFieldProps & {
		iconClassName?: string;
		onSearch?: (value: string) => void;
	} = $props();

	let iconSizeClassName = $derived.by(() => {
		switch (size) {
			case 'lg':
				return '!h-6 !w-6';
			case 'sm':
				return '!h-4 !w-4';
			case 'xs':
				return '!h-3.5 !w-3.5';
			default:
				return '!h-5 !w-5';
		}
	});

	let iconMarginClassName = $derived.by(() => {
		switch (size) {
			case 'lg':
				return 'mx-3';
			case 'sm':
				return 'mx-2';
			case 'xs':
				return 'mx-1.5';
			default:
				return 'mx-2.5';
		}
	});

	let inputPaddingLeftClassName = $derived.by(() => {
		switch (size) {
			case 'lg':
				return 'pl-12';
			case 'sm':
				return 'pl-8';
			case 'xs':
				return 'pl-7';
			default:
				return 'pl-10';
		}
	});

	const debouncedSearch = debounce(search, 300);
	let lastQuery: string;

	let inputFieldRef: any | null = $state(null);

	export function focus() {
		inputFieldRef?.focus();
	}

	export function getElement() {
		return inputFieldRef;
	}
	export function select() {
		inputFieldRef && inputFieldRef.select();
	}

	function handleInput(ev: any) {
		// console.log(ev);
		let input: HTMLInputElement = ev?.target;
		if (input) {
			let searchText = (input.value || '').toLowerCase().trim();
			debouncedSearch(searchText);
		}
	}

	function search(query: string) {
		if (lastQuery != query) {
			onSearch && onSearch(query);
			lastQuery = query;
		}
	}

	function debounce<T extends (...args: any[]) => void>(
		func: T,
		wait: number
	): (...args: Parameters<T>) => void {
		let timeout: ReturnType<typeof setTimeout>;

		return function (...args: Parameters<T>) {
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				func(...args);
			}, wait);
		};
	}
</script>

{#snippet searchIcon()}
	<Icon path={mdiMagnify} sizeClassName={iconSizeClassName} className="{iconMarginClassName} text-neutral-400 dark:text-neutral-500 {iconClassName}"></Icon>
{/snippet}
<InputField
	bind:value
	bind:this={inputFieldRef}
	{...props}
	{size}
	type="search"
	maxlength={props?.maxlength || 200}
	leftSnippet={searchIcon}
	className="{inputPaddingLeftClassName} {className}"
	{placeholder}
	onInput={handleInput}
/>
