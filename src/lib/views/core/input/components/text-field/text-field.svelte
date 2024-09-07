<script lang="ts">
	import InputField, {
		type InputFieldPropsType,
	} from '../input-field/input-field.svelte';

	let { maxlength, value = $bindable(''), ...props }: InputFieldPropsType = $props();
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
