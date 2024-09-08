<script lang="ts">
	import { ripple } from '$lib/actions';
	import { mdiEyeOffOutline, mdiEyeOutline } from '$lib/views/core/icon';
	import Icon from '$lib/views/core/icon/components/icon/icon.svelte';
	import InputField, { type InputFieldPropsType } from '../input-field/input-field.svelte';

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
	}: InputFieldPropsType & {
		buttonClassName?: string;
		iconClassName?: string;
	} = $props();

	let btnRoundedClassName = $state('');
	let btnIconSizeClassName = $state('');

	let inputFieldRef: InputField | null = $state(null);

	export function focus() {
		inputFieldRef?.focus();
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
		class="px-3 h-full hover:bg-gray-100 {btnRoundedClassName} {buttonClassName}"
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
