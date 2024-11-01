<script lang="ts">
	import InputField, { type InputFieldSizeType } from '../input-field/input-field.svelte';

	type RangeFieldPropsType = {
		id?: string;
		name?: string;
		className?: string;
		size?: InputFieldSizeType;
		value?: number;
		min?: number;
		max?: number;
		step?: number;
		thumbSize?: string;
		thumbColor?: string;
		oninput?: (ev: any) => void;
		onfocus?: (ev: any) => void;
		onblur?: (ev: any) => void;
	};

	let {
		id,
		value = $bindable(0),
		size = 'md',
		min = 0,
		max = 100,
		name,
		step,
		className,
		thumbSize = '16px',
		thumbColor = '#dc2626',
		oninput,
		onblur,
		onfocus
	}: RangeFieldPropsType = $props();

	let rangeSizeClassName = $state('');

	$effect(() => {
		switch (size) {
			case 'lg':
				rangeSizeClassName = 'h-3 ';
				break;
			case 'md':
				rangeSizeClassName = 'h-2 ';
				break;
			case 'sm':
				rangeSizeClassName = 'h-1 ';
				break;
			case 'xs':
				rangeSizeClassName = 'h-2-px ';
				break;
		}
	});

	let inputRef: HTMLInputElement | null = $state(null);

	export function getElement() {
		return inputRef;
	}

	export function focus() {
		return inputRef && inputRef.focus();
	}

	export function select() {
		return inputRef && inputRef.select();
	}
</script>

<input
	bind:this={inputRef}
	bind:value
	{id}
	{name}
	type="range"
	class="range-slider w-full bg-gray-200 appearance-none cursor-pointer dark:bg-gray-700 rounded-lg range-lg outline-none focus:outline-none {rangeSizeClassName} {className}"
	{min}
	{max}
	{step}
	style="--thumbSize: {thumbSize}; --thumbColor: {thumbColor};"
	{oninput}
	{onfocus}
	{onblur}
/>

<style>
	.h-2-px {
		height: 2px;
	}

	.range-slider {
		appearance: none;
		-webkit-appearance: none;
	}
	.range-slider::-webkit-slider-thumb {
		-webkit-appearance: none;
		width: var(--thumbSize);
		height: var(--thumbSize);
		background-color: var(--thumbColor);
		border-radius: 50%;
	}

	/* Thumb styling for Firefox */
	.range-slider::-moz-range-thumb {
		-moz-appearance: none;
		width: var(--thumbSize);
		height: var(--thumbSize);
		background-color: var(--thumbColor);
		border-radius: 50%;
	}

	/* Thumb styling for Edge */
	.range-slider::-ms-thumb {
		-ms-appearance: none;
		width: var(--thumbSize);
		height: var(--thumbSize);
		background-color: var(--thumbColor);
		border-radius: 50%;
	}
</style>
