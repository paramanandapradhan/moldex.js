<script lang="ts">
	import type { ComboboxFieldProps, InputFieldProps } from '$lib/views/core';
	import ComboboxField from '$lib/views/core/input/components/combobox-field/combobox-field.svelte';
	import CurrencyLoader from '$lib/views/extra/loaders/currency-loader.svelte';
	import type { Currency } from '../types';

	type Props = {
		value?: string | null;
	};

	let {
		value = $bindable(null),
		titleFieldName = 'label',
		displayFieldName = 'label',
		searchFieldName = 'label',
		identityFieldName = 'code',
		hasDropdownHeader = true,
		hasDropdownHeaderSearch = true,
		hasDropdownFooter = true,
		hasDropdownFooterCreateButton = true,
		...props
	}: ComboboxFieldProps & InputFieldProps & Props = $props();

	let currencies: Currency[] = $state([]);
	let items = $derived(
		currencies.map((c) => ({
			...c,
			label: `${c.symbol}  ${c.code} — ${c.name}`
		}))
	);
</script>

<CurrencyLoader bind:currencies>
	<ComboboxField
		bind:value
		{items}
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
</CurrencyLoader>
