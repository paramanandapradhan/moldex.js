<script lang="ts">
	import { ripple } from '$lib/actions/ripple.js';
	import { colorToHex, isValidHexColor } from '$lib/services/index.js';
	import Icon from '$lib/views/core/icon/components/icon/icon.svelte';
	import { mdiSquare } from '$lib/views/core/icon/index.js';
	import type { InputFieldProps } from '../../types';
	import InputField  from '../input-field/input-field.svelte';

	let {
		id,
		name,
		size,
		appearance,
		value = $bindable('#000000'),
		...props
	}: InputFieldProps & { value?: string } = $props();

	let colorRef: HTMLInputElement;

	let btnIconSizeClassName: string = $derived.by(() => {
		let className = '';
		if (size) {
			switch (size) {
				case 'lg':
					className = '!h-6 !w-6';
					break;
				case 'md':
					className = '!h-5 !w-5';
					break;
				case 'sm':
					className = '!h-4 !w-4';
					break;
				case 'xs':
					className = '!h-3.5 !w-3.5';
					break;
			}
		}
		return className;
	});

	let btnPaddingClassName: string = $derived.by(() => {
		switch (size) {
			case 'lg':
				return 'px-3';
			case 'sm':
				return 'px-1.5';
			case 'xs':
				return 'px-1';
			default:
				return 'px-2';
		}
	});

	let inputPaddingRightClassName: string = $derived.by(() => {
		switch (size) {
			case 'lg':
				return 'pr-10';
			case 'sm':
				return 'pr-7';
			case 'xs':
				return 'pr-6';
			default:
				return 'pr-8';
		}
	});

	let btnRoundedClassName: string = $derived.by(() => {
		if (!appearance || appearance == 'normal') {
			return 'rounded-tr-xl rounded-br-xl';
		}
		return '';
	});

	let colorValue: string = $derived.by(() => {
		if (isValidHexColor(value)) {
			return  value;
		}
		return '#000000';
	});

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
			if (colorRef) {
				colorRef.value = colorToHex(value);
			}
		}
	});
</script>

{#snippet colorButton()}
	<button
		id="btn-color-picker-{name || id}"
		type="button"
		class="h-full {btnPaddingClassName} hover:bg-neutral-100 focus:outline-primary dark:hover:bg-neutral-900 {btnRoundedClassName}"
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
		className="{inputPaddingRightClassName} {props?.className}"
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
