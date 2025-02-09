<script lang="ts">
	import ComboboxField from '$lib/views/core/input/components/combobox-field/combobox-field.svelte';
</script>

<div class="min-h-full">
	<div class="p-6">
		<ComboboxField
			name="items"
			label="Items"
			items={['Item1', 'Item2', 'Item3']}
			multiple
			hasCheckbox
		/>
	</div>
</div>
