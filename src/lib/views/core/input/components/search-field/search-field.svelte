<script lang="ts">
	import { mdiMagnify } from '$lib/views/core/icon';
	import Icon from '$lib/views/core/icon/components/icon/icon.svelte';
	import InputField, { type InputFieldProps } from '../input-field/input-field.svelte';

	let {
		className,
		placeholder,
		iconClassName,
		value = $bindable(''),
		onSearch,
		...props
	}: InputFieldProps & {
		iconClassName?: string;
		onSearch?: (value: string) => void;
	} = $props();

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
	<Icon path={mdiMagnify} className="mx-3 text-gray-400 {iconClassName}"></Icon>
{/snippet}
<InputField
	bind:value
	bind:this={inputFieldRef}
	{...props}
	type="search"
	maxlength={props?.maxlength || 200}
	leftSnippet={searchIcon}
	className="pl-12 {className}"
	{placeholder}
	onInput={handleInput}
/>
