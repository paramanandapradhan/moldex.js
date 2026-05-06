<script lang="ts">
	import type { ComboboxFieldProps, InputFieldProps } from '$lib/views/core';
	import ComboboxField from '$lib/views/core/input/components/combobox-field/combobox-field.svelte';
	import DatetimeFormatLoader from '$lib/views/extra/loaders/datetime-format-loader.svelte';
	import type { DateTimeFormat } from '../types';

	type Props = {
		value?: string | null;
		groups?: ('date' | 'time' | 'datetime')[];
		previewDate?: Date;
	};

	let {
		value = $bindable(null),
		groups = ['date', 'time', 'datetime'],
		previewDate = new Date(),
		titleFieldName = 'label',
		displayFieldName = 'label',
		searchFieldName = 'label',
		identityFieldName = 'format',
		hasDropdownHeader = true,
		hasDropdownHeaderSearch = true,
		hasDropdownFooter = true,
		hasDropdownFooterCreateButton = true,
		...props
	}: ComboboxFieldProps & InputFieldProps & Props = $props();

	let formats: DateTimeFormat[] = $state([]);
	let items = $derived(
		formats.map((f) => ({
			...f,
			label: `${f.format}   →   ${f.preview ?? ''}`
		}))
	);
</script>

<DatetimeFormatLoader bind:formats {groups} {previewDate}>
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
</DatetimeFormatLoader>
