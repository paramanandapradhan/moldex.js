<script lang="ts">
	import type { InputFieldSize } from "../../types";


	type RangeFieldPropsType = {
		id?: string;
		name?: string;
		className?: string;
		size?: InputFieldSize;
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
		oninput,
		onblur,
		onfocus
	}: RangeFieldPropsType = $props();

	let rangeSizeClassName = $derived.by(() => {
		let className = '';
		switch (size) {
			case 'lg':
				className = 'h-3 ';
				break;
			case 'md':
				className = 'h-2 ';
				break;
			case 'sm':
				className = 'h-1 ';
				break;
			case 'xs':
				className = 'h-2-px ';
				break;
		}
		return className;
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
	class="range-slider range-lg w-full cursor-pointer appearance-none rounded-lg bg-gray-200 outline-none focus:outline-none dark:bg-gray-700 {rangeSizeClassName} {className}"
	{min}
	{max}
	{step}
	style="--thumbSize: {thumbSize};"
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
		background-color: var(--color-primary-600);
		border-radius: 50%;
	}

	/* Thumb styling for Firefox */
	.range-slider::-moz-range-thumb {
		-moz-appearance: none;
		width: var(--thumbSize);
		height: var(--thumbSize);
		background-color: var(--color-primary-600);
		border-radius: 50%;
	}

	/* Thumb styling for Edge */
	.range-slider::-ms-thumb {
		-ms-appearance: none;
		width: var(--thumbSize);
		height: var(--thumbSize);
		background-color: var(--color-primary-600);
		border-radius: 50%;
	}
</style>
