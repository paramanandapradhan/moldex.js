<script lang="ts">
	import { dateFormat, toDate } from '../../../../../services/index.js';
	import type { InputFieldProps } from '../../types';
	import InputField from '../input-field/input-field.svelte';

	let {
		value = $bindable(null),
		...props
	}: InputFieldProps & { value?: Date | string | number | null | undefined } = $props();

	let _value: string | undefined = $derived.by(() => {
		if (value) {
			return dateFormat(toDate(value)!, 'YYYY-MM-DD') as string;
		}
	});

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

	function handleInput(ev: Event) {
		let target: HTMLInputElement = ev?.target as HTMLInputElement;
		if (target?.value) {
			value = toDate(target?.value) as Date;
			console.log('handleInput value', value);
		}
	}
</script>

<InputField bind:this={inputFieldRef} {...props} type="date" value={_value} onInput={handleInput} />
