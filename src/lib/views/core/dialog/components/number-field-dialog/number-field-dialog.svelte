<script lang="ts">
	import { showToast } from '$lib/services';
	import NumberField from '$lib/views/core/input/components/number-field/number-field.svelte';
	import type { DialogExports } from '../dialog/dialog.svelte';

	type PropsType = {
		value?: number;
		label?: string;
		name?: string;
		maxlength?: number;
		className?: string;
		autofocus?: boolean;
		required?: boolean;
	};

	let {
		value = $bindable(0),
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

	let _value: number = $state(value || 0);

	function handleSubmit(ev: SubmitEvent) {
		ev?.preventDefault();
		_value = _value || 0;
		if (required) {
			showToast({ msg: 'This is a required field!' });
		} else {
			setResult(_value);
			closeDialog();
		}
	}
</script>

<div class="p-6">
	<form id="number-field-dialog-form" onsubmit={handleSubmit}>
		<NumberField
			{...props}
			{label}
			{name}
			{maxlength}
			{className}
			{autofocus}
			{required}
			bind:value={_value}
		/>
	</form>
</div>
