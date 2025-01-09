<script lang="ts">
	import type { ComboboxFieldProps, InputFieldProps } from '$lib/views/core';
	import ComboboxField from '$lib/views/core/input/components/combobox-field/combobox-field.svelte';
	import CountryLoader from '$lib/views/extra/loaders/country-loader.svelte';

	type Props = {
		value?: any;
	};

	let {
		value = $bindable(null),
		titleFieldName = 'name',
		displayFieldName = 'name',
		searchFieldName = 'name',
		identityFieldName = 'isoCode',
		hasDropdownHeader = true,
		hasDropdownHeaderSearch = true,
		hasDropdownFooter = true,
		hasDropdownFooterCreateButton = true,
		...props
	}: ComboboxFieldProps & InputFieldProps & Props = $props();

	let countries: any[] = $state([]);
</script>

<CountryLoader bind:countries>
	<ComboboxField
		bind:value
		items={countries}
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
</CountryLoader>
