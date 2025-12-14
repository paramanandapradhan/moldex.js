<script lang="ts">
	import type { ComboboxFieldProps, InputFieldProps } from '$lib/views/core';
	import ComboboxField from '$lib/views/core/input/components/combobox-field/combobox-field.svelte';
	import StateLoader, { type State } from '$lib/views/extra/loaders/state-loader.svelte';

	type Props = {
		value?: State | null;
		countryCode?: string;
	};

	let {
		value = $bindable(null),
		countryCode = undefined,
		titleFieldName = 'name',
		displayFieldName = 'name',
		searchFieldName = 'name',
		identityFieldName = '_id',
		hasDropdownHeader = true,
		hasDropdownHeaderSearch = true,
		hasDropdownFooter = true,
		hasDropdownFooterCreateButton = true,
		...props
	}: ComboboxFieldProps & InputFieldProps & Props = $props();

	let states: State[] = $state([]);
</script>

<StateLoader bind:states {countryCode}>
	<ComboboxField
		bind:value
		items={states}
		{titleFieldName}
		{displayFieldName}
		{searchFieldName}
		{identityFieldName}
		{hasDropdownHeader}
		{hasDropdownHeaderSearch}
		{hasDropdownFooter}
		{hasDropdownFooterCreateButton}
		dropdownFooterClassName="border-t"
		createButtonClassName="border-primary text-primary hover:text-primary"
		{...props}
	/>
</StateLoader>
