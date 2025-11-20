<script lang="ts">
	import type { InputFieldProps } from '../../types';
	import InputField from '../input-field/input-field.svelte';

	let { value = $bindable(''), ...props }: InputFieldProps = $props();
	let inputFieldRef: any | null = $state(null);

	export function focus() {
		inputFieldRef?.focus();
	}

	export function getElement() {
		return inputFieldRef;
	}

	export function select() {
		return inputFieldRef && inputFieldRef.select();
	}
</script>

<InputField
	bind:this={inputFieldRef}
	{...props}
	type="textarea"
	maxlength={props?.maxlength || 300}
	bind:value
/>
