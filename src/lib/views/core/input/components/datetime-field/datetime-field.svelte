<script lang="ts">
	import InputField, { type InputFieldProps } from '../input-field/input-field.svelte';

	let { value = $bindable(), ...props }: InputFieldProps = $props();

	let inputFieldRef: any | null = $state(null);

	export function focus() {
		inputFieldRef?.focus();
	}

	export function getElement() {
		return inputFieldRef;
	}

	export function select() {
		inputFieldRef && inputFieldRef.select();
	}
</script>

<InputField bind:this={inputFieldRef} {...props} type="datetime-local" bind:value />
