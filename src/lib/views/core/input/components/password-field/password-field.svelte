<script lang="ts">
	import { ripple } from '$lib/actions/ripple.js';

 
	import Icon from '$lib/views/core/icon/components/icon/icon.svelte';
	import { mdiEyeOffOutline, mdiEyeOutline } from '$lib/views/core/icon/index.js';
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

	let btnRoundedClassName = $derived.by(() => {
		if (!appearance || appearance == 'normal') {
			return 'rounded-tr-lg rounded-br-lg';
		}
		return '';
	});

	let btnIconSizeClassName = $derived.by(() => {
		let className = '';
		if (size) {
			switch (size) {
				case 'lg':
					className = '!h-7 !w-7';
					break;
				case 'md':
					className = '!h-6 !w-6';
					break;
				case 'sm':
					className = '!h-5 !w-5';
					break;
				case 'xs':
					className = '!h-4 !w-4';
					break;
			}
		}
		return className;
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

	function handleTogglePassword() {
		if (type == 'password') {
			type = 'text';
		} else {
			type = 'password';
		}
	}

 
</script>

{#snippet showPasswordButton()}
	<button
		id="btn-eye-{name || id}"
		type="button"
		class="h-full px-3 hover:bg-neutral-100 focus:outline-primary {btnRoundedClassName} {buttonClassName}"
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
