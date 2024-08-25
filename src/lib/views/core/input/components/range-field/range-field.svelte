<script lang="ts">
	import {
		type InputFieldSizeType
	} from '../input-field/input-field.svelte';

	type RangeFieldPropsType = {
		id?: string;
		name?: string;
		className?: string;
		size?: InputFieldSizeType;
		value?: number;
		min?: number;
		max?: number;
		step?: number;
		oninput?: (ev: any) => void;
		onfocus?: (ev: any) => void;
		onblur?: (ev: any) => void;
	};

	let {
		id,
		value = $bindable(50),
		size = 'md',
		min = 0,
		max = 100,
		name,
		step,
		className,
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
</script>

<input
	{id}
	{name}
	type="range"
	class=" w-full bg-gray-200 appearance-none cursor-pointer dark:bg-gray-700 rounded-lg range-lg outline-none focus:outline-none {rangeSizeClassName} {className}"
	{min}
	{max}
	{step}
	bind:value
	{oninput} 
	{onfocus}
	{onblur}
/>

<style>
	.h-2-px {
		height: 2px;
	}
</style>
