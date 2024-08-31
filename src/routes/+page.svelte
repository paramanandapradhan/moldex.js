<script lang="ts">
	import ComboboxField from '$lib/views/core/input/components/combobox-field/combobox-field.svelte';
	import PasswordField from '$lib/views/core/input/components/password-field/password-field.svelte';
	import RadioField from '$lib/views/core/input/components/radio-field/radio-field.svelte';
</script>

<div class="p-10">
	<div class="my-3">
		<RadioField
			items={['Male', 'Female', 'Other']}
			position="left"
			hasPrimitiveItemsData
			value={'Male'}
		/>
	</div>
</div>
