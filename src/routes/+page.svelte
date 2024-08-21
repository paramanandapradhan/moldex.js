<script lang="ts">
	import { mdiBellOutline } from '$lib';
	import InputField from '$lib/views/core/input/components/input-field/input-field.svelte';
</script>

<div class="p-10">
	<div>
		<InputField name="name" label="User Name" size="xs" />
	</div>
	<div>
		<InputField name="name" label="User Name" appearance="fill" size="sm" />
	</div>
	<div>
		<InputField name="name" label="User Name" appearance="fill" size="xs" />
	</div>
	<div>
		<InputField name="name" label="User Name" appearance="underline" size="xs" />
	</div>
	<div>
		<InputField name="name" label="User Name" appearance="fill-underline" size="xs" />
	</div>
	<div>
		<InputField name="name" label="User Name" appearance="fill-underline" />
	</div>

	<div class="mt-4">
		<InputField name="namef1" label="User Name" floatingLabel />
	</div>

	<div class="mt-4">
		<InputField name="namef2" label="User Name" size="lg" floatingLabel />
	</div>
	<div class="mt-4">
		<InputField name="namef3" label="User Name" appearance="box" size="xs" floatingLabel />
	</div>
	<div class="mt-4">
		<InputField
			name="namef4"
			label="User Name"
			appearance="normal"
			iconPath={mdiBellOutline}
			size="lg"
			floatingLabel
		/>
	</div>
	<div class="mt-4">
		<InputField
			name="namef5"
			label="User Name"
			appearance="normal"
			iconPath={mdiBellOutline}
			floatingLabel
		/>
	</div>
	<div class="mt-4">
		<InputField
			name="namef6"
			label="User Name"
			appearance="normal"
			size="sm"
			iconPath={mdiBellOutline}
			floatingLabel
		/>
	</div>
	<div class="mt-4">
		<InputField
			name="namef7"
			label="User Name"
			appearance="box"
			size="xs"
			iconPath={mdiBellOutline}
			 floatingLabel
		/>
	</div>

	<div class="mt-4">
		<InputField
			name="namef7"
			label="User Name"
			appearance="none"
			size="sm"
			 
			  
		/>
	</div>
</div>
