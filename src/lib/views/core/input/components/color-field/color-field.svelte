<script lang="ts">
	import { ripple } from '$lib/actions';
	import { colorToHex, isValidHexColor } from '$lib/services';
	import { mdiSquare } from '$lib/views/core/icon';
	import Icon from '$lib/views/core/icon/components/icon/icon.svelte';
	import InputField, { type InputFieldProps } from '../input-field/input-field.svelte';

	let {
		id,
		name,
		size,
		appearance,
		value = $bindable('#000000'),
		...props
	}: InputFieldProps & { value?: string } = $props();

	let colorRef: HTMLInputElement;
	let btnIconSizeClassName: string = $state('');
	let btnRoundedClassName: string = $state('');
	let colorValue: string = $state('#000000');

	let inputRef: any | null = $state(null);

	export function focus() {
		inputRef?.focus();
	}

	export function getElement() {
		return inputRef;
	}

	export function select() {
		return inputRef && inputRef.select();
	}

	function handleColorBtnClick() {
		if (colorRef) {
			colorRef.click();
		}
	}

	function handleColorPickerChange(ev: any) {
		let input: HTMLInputElement = ev?.target;
		if (input) {
			value = input.value;
		}
	}

	$effect(() => {
		if (isValidHexColor(value)) {
			colorValue = value;
			if (colorRef) {
				colorRef.value = colorToHex(value);
			}
		}
	});

	$effect(() => {
		if (size) {
			switch (size) {
				case 'lg':
					btnIconSizeClassName = '!h-7 !w-7';
					break;
				case 'md':
					btnIconSizeClassName = '!h-6 !w-6';
					break;
				case 'sm':
					btnIconSizeClassName = '!h-5 !w-5';
					break;
				case 'xs':
					btnIconSizeClassName = '!h-4 !w-4';
					break;
			}
		}
	});

	$effect(() => {
		if (!appearance || appearance == 'normal') {
			btnRoundedClassName = 'rounded-tr-lg rounded-br-lg';
		}
	});
</script>

{#snippet colorButton()}
	<button
		id="btn-color-picker-{name || id}"
		type="button"
		class="px-2 h-full hover:bg-neutral-100 dark:hover:bg-neutral-900 focus:outline-primary {btnRoundedClassName}"
		use:ripple
		onclick={handleColorBtnClick}
	>
		<Icon path={mdiSquare} color={colorValue} className=" {btnIconSizeClassName} " />
	</button>
{/snippet}

<div class="relative">
	<InputField
		{...props}
		type="text"
		{id}
		{name}
		bind:this={inputRef}
		className="pr-8 {props?.className}"
		rightSnippet={colorButton}
		maxlength={9}
		bind:value={value as string}
	/>

	<input
		class="color-input"
		type="color"
		placeholder=" "
		bind:this={colorRef}
		tabindex={-1}
		oninput={handleColorPickerChange}
	/>
</div>

<style>
	.color-input {
		position: absolute;
		opacity: 0;
		left: 0;
		bottom: 0;
		right: 0;
		height: 1px;
	}
</style>
