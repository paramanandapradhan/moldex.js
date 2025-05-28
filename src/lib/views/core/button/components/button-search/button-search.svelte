<script lang="ts">
	import {
		mdiMagnify,
		type ButtonAppearance,
		type ButtonProps,
		type ButtonSize,
		type InputFieldAppearance,
		type InputFieldSize
	} from '$lib';
	import ButtonDropdown from '$lib/views/core/button/components/button-dropdown/button-dropdown.svelte';
	import Icon from '$lib/views/core/icon/components/icon/icon.svelte';
	import SearchField from '$lib/views/core/input/components/search-field/search-field.svelte';
	import type { Snippet } from 'svelte';
	type Props = {
		searchAppearance?: InputFieldAppearance;
		searchClassName?: string;
		searchSize?: InputFieldSize;
		onSearch?: (searchText: string) => void;

		className?: string;
		appearance?: ButtonAppearance;
		size?: ButtonSize;
		children?: Snippet;
		iconClassName?: string;

		dropdownClassName?: string;
		searchText?: string;
	};

	let {
		searchText = $bindable(''),
		searchClassName,
		searchAppearance,
		searchSize,
		onSearch,
		className,
		appearance,
		size,
		children,
		iconClassName,
		dropdownClassName,
		...others
	}: ButtonProps & Props = $props();
</script>

{#snippet dropdownSearch()}
	<div class="p-4">
		<SearchField
			value={searchText}
			{onSearch}
			autofocus
			className="min-w-52 {searchClassName}"
			appearance={searchAppearance}
			size={searchSize}
		/>
	</div>
{/snippet}

<ButtonDropdown
	dropdownSnippet={dropdownSearch}
	{className}
	{appearance}
	{size}
	{dropdownClassName}
	{...others}
>
	{#if children}
		{@render children()}
	{:else}
		<Icon path={mdiMagnify} className="{iconClassName} {searchText ? '!text-primary' : ''}" />
	{/if}
</ButtonDropdown>
