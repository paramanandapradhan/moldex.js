<script lang="ts">
	import PasswordField from '$lib/views/core/input/components/password-field/password-field.svelte';
	import PhoneField from '$lib/views/core/input/components/phone-field/phone-field.svelte';
</script>

<div class="p-10">
	<div class="my-3">
		<PasswordField label="Enter Password" name="password" />
	</div>
	<div class="my-3">
		<PhoneField label="Enter Phone Number" name="phone" dialCode="+1" />
	</div>
</div>
