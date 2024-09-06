<script lang="ts">
	import InputField, {
		type InputFieldPropsType,
		type InputValueType
	} from '../input-field/input-field.svelte';

	let {
		maxlength,
		value = $bindable<InputValueType>(''),
		...props
	}: InputFieldPropsType = $props();
	let inputFieldRef: InputField | null = $state(null);

	export function focus() {
		inputFieldRef?.focus();
	}
</script>

<InputField
	{...props}
	bind:value
	bind:this={inputFieldRef}
	type="text"
	maxlength={maxlength || 200}
/>
