<script lang="ts">
	import { ripple } from '$lib/actions';
	import { mdiSquare } from '$lib/views/core/icon';
	import Icon from '$lib/views/core/icon/components/icon/icon.svelte';
	import InputField, { type InputFieldPropsType } from '../input-field/input-field.svelte';

	let {
		size,
		appearance,
		value = $bindable('#000000'),
		...props
	}: InputFieldPropsType & { value?: string } = $props();

	let colorRef: HTMLInputElement;
	let btnIconSizeClassName: string = $state('');
	let btnRoundedClassName: string = $state('');

	function handleColorBtnClick() {
		if (colorRef) {
			colorRef.click();
		}
	}

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
		class="px-2 h-full hover:bg-gray-100 {btnRoundedClassName}"
		use:ripple
		onclick={handleColorBtnClick}
	>
		<Icon path={mdiSquare} color={value} className=" {btnIconSizeClassName} " />
	</button>
{/snippet}

<div class="relative">
	<InputField
		{...props}
		type="text"
		bind:value
		className="pr-8 {props?.className}"
		rightChildren={colorButton}
	/>

	<input
		class="color-input"
		type="color"
		bind:value
		placeholder=" "
		bind:this={colorRef}
		tabindex={-1}
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
