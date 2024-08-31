<script lang="ts">
	import InputField, { type InputFieldPropsType } from '../input-field/input-field.svelte';

	let props: InputFieldPropsType = $props();

	let inputFieldRef: InputField | null = $state(null);

	export function focus() {
		inputFieldRef?.focus();
	}
</script>

<InputField bind:this={inputFieldRef} {...props} type="date" />
