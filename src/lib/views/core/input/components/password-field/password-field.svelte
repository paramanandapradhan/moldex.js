<script lang="ts">
	import { ripple } from '$lib/actions';
	import { mdiEyeOffOutline, mdiEyeOutline } from '$lib/views/core/icon';
	import Icon from '$lib/views/core/icon/components/icon/icon.svelte';
	import InputField, { type InputFieldProps } from '../input-field/input-field.svelte';

	let {
		type = 'password',
		size,
		appearance,
		buttonClassName,
		iconClassName,
		name,
		id,
		value = $bindable(),
		...props
	}: InputFieldProps & {
		buttonClassName?: string;
		iconClassName?: string;
	} = $props();

	let btnRoundedClassName = $state('');
	let btnIconSizeClassName = $state('');

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

	function handleTogglePassword() {
		if (type == 'password') {
			type = 'text';
		} else {
			type = 'password';
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

{#snippet showPasswordButton()}
	<button
		id="btn-eye-{name || id}"
		type="button"
		class="px-3 h-full hover:bg-base-100 focus:outline-primary {btnRoundedClassName} {buttonClassName}"
		use:ripple
		onclick={handleTogglePassword}
	>
		<Icon
			path={type == 'password' ? mdiEyeOffOutline : mdiEyeOutline}
			className=" {btnIconSizeClassName} {iconClassName}"
		/>
	</button>
{/snippet}

<InputField
	bind:this={inputFieldRef}
	{...props}
	{type}
	{id}
	{name}
	maxlength={props?.maxlength || 200}
	rightSnippet={showPasswordButton}
	{size}
	{appearance}
	bind:value
/>
