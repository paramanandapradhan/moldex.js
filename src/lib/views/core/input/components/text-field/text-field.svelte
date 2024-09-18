<script lang="ts">
	import InputField, {
		type InputFieldPropsType,
	} from '../input-field/input-field.svelte';

	let { maxlength, value = $bindable(''), ...props }: InputFieldPropsType = $props();
	let inputFieldRef: InputField | null = $state(null);

	export function focus() {
		inputFieldRef?.focus();
	}

	export function getElement(){
		return inputFieldRef;
	}

	export function select(){
		return inputFieldRef && inputFieldRef.select();
	}
</script>

<InputField
	{...props}
	bind:value
	bind:this={inputFieldRef}
	type="text"
	maxlength={maxlength || 200}
/>
