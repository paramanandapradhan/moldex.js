<script lang="ts">
	import { showToast } from '$lib/services';
	import { TextareaField, TextField } from '$lib/views/core/input';
	import type { InputValueType } from '$lib/views/core/input/components/input-field/input-field.svelte';
	import type { DialogExportsType } from '../dialog/dialog.svelte';

	type PropsType = {
		value?: InputValueType;
		label?: string;
		name?: string;
		maxlength?: number;
		className?: string;
		autofocus?: boolean;
		required?: boolean;
	};

	let {
		value = $bindable(''),
		label,
		name,
		maxlength,
		className,
		autofocus,
		required,
		setOnOkClick,
		setResult,
		closeDialog,
		...props
	}: PropsType & DialogExportsType = $props();

	function handleSubmit(ev: SubmitEvent) {
		ev?.preventDefault();
		value = ((value as string) || '').trim();
		if (required && !value) {
			showToast({ msg: 'This is a required field!' });
		} else {
			setResult(value);
			closeDialog();
		}
	}
</script>

<div class="p-6">
	<form id="textarea-field-dialog-form" onsubmit={handleSubmit}>
		<TextareaField
			{...props}
			{label}
			{name}
			{maxlength}
			{className}
			{autofocus}
			{required}
			bind:value
		/>
	</form>
</div>
