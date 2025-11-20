<script lang="ts">
	import { showToast } from '$lib/services/index.js';
	import type { InputValue } from '$lib/views/core/input';
	import TextareaField from '$lib/views/core/input/components/textarea-field/textarea-field.svelte';
	import type { DialogExports } from '../../types';

	type PropsType = {
		value?: InputValue;
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
	}: PropsType & DialogExports = $props();

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
