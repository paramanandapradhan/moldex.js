<script lang="ts">
	import type { ComboboxFieldProps, InputFieldProps } from '$lib/views/core';
	import ComboboxField from '$lib/views/core/input/components/combobox-field/combobox-field.svelte';
	import TimezoneLoader from '$lib/views/extra/loaders/timezone-loader.svelte';
	import type { Timezone } from '../types';

	type Props = {
		value?: string | null;
	};

	let {
		value = $bindable(null),
		titleFieldName = 'label',
		displayFieldName = 'label',
		searchFieldName = 'label',
		identityFieldName = 'name',
		hasDropdownHeader = true,
		hasDropdownHeaderSearch = true,
		hasDropdownFooter = true,
		hasDropdownFooterCreateButton = true,
		...props
	}: ComboboxFieldProps & InputFieldProps & Props = $props();

	let timezones: Timezone[] = $state([]);
	let items = $derived(
		timezones.map((t) => {
			const long = t.longName ? ` — ${t.longName}` : '';
			const region = t.region ? ` (${t.region})` : '';
			return {
				...t,
				label: `(${t.offset})  ${t.city}${region}${long}  ·  ${t.name}`
			};
		})
	);
</script>

<TimezoneLoader bind:timezones>
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
</TimezoneLoader>
