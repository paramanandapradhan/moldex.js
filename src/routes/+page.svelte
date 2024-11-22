<script lang="ts">
	import { CheckboxField, openCropperDialog } from '$lib';
	import { readUrlAsFile } from '$lib/services/utils/file-service';
	import RadioField from '$lib/views/core/input/components/radio-field/radio-field.svelte';
	import RangeField from '$lib/views/core/input/components/range-field/range-field.svelte';

	let enc: any;
</script>

<div class="min-h-full">
	<div class="m-6">
		<RadioField
			name="enc"
			bind:value={enc}
			items={[
				{ label: 'None', value: 'nopass' },
				{ label: 'WPA/WPA2', value: 'wpa' },
				{ label: 'WEP', value: 'wep' }
			]}
		/>
	</div>

	<div class="m-6">
		<CheckboxField name="file" label="Is File" />
	</div>
</div>
