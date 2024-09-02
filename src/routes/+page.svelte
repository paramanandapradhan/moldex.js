<script lang="ts">
	import InputField from '$lib/views/core/input/components/input-field/input-field.svelte';
	import PhoneField from '$lib/views/core/input/components/phone-field/phone-field.svelte';

	let phone = $state('+917411909057');
	let dialCode = $state("+91");
</script>

<div class="p-10">
	<div class="my-3">
		<PhoneField bind:value={phone} name="Phone" label="Phone Number"  bind:dialCode={dialCode} />
	</div>
	<div>
	{dialCode}	{phone} 
	</div>
</div>
