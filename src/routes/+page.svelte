<script lang="ts">
	import ComboboxField from '$lib/views/core/input/components/combobox-field/combobox-field.svelte';
	import PasswordField from '$lib/views/core/input/components/password-field/password-field.svelte';
	import RadioField from '$lib/views/core/input/components/radio-field/radio-field.svelte';
	const options = [
		{
			label: 'Option 1',
			desc: 'This is the description for Option 1, which explains the first choice in detail.',
			value: 'option1'
		},
		{
			label: 'Option 2',
			desc: 'This is the description for Option 2, providing information about the second choice.',
			value: 'option2'
		},
		{
			label: 'Option 3',
			desc: 'This is the description for Option 3, offering insights into the third choice.',
			value: 'option3'
		},
		{
			label: 'Option 4',
			desc: 'This is the description for Option 4, elaborating on the details of the fourth choice.',
			value: 'option4'
		},
		{
			label: 'Option 5',
			desc: 'This is the description for Option 5, which gives an overview of the fifth choice.',
			value: 'option5'
		}
	];
</script>

<div class="p-10">
	<div class="my-3">
		<RadioField
			items={options}
			position="left"
			value={'Male'}
			direction="vertical"
		/>
	</div>
</div>
