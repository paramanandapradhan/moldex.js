<script lang="ts">
	import { ripple } from '$lib/actions';
	import { openFilePickerDialog } from '$lib/services';
	import { mdiAttachment } from '$lib/views/core/icon';
	import Icon from '$lib/views/core/icon/components/icon/icon.svelte';
	import InputField, { type InputFieldProps } from '../input-field/input-field.svelte';

	let {
		appearance,
		size,
		className,
		accepts = '',
		multiple = false,
		value = $bindable(null),
		...props
	}: InputFieldProps & {
		accepts?: string;
		multiple?: boolean;
		value?: File | File[] | null;
	} = $props();

	let btnRoundedClassName = $state('');
	let btnIconSizeClassName = $state('');
	let fileNameDisplay = $state('');

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

	async function handleFileAttachment<T extends File | File[]>() {
		let res: File | File[] | null = null;
		res = await openFilePickerDialog<T>(accepts, { multiple: multiple || false });
		if (res) {
			value = res;
			if (multiple) {
				let files: File[] = value as File[];
				fileNameDisplay = files.map((file) => file.name).join(', ');
			} else {
				let file: File = value as File;
				fileNameDisplay = file.name;
			}
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

{#snippet fileButton()}
	<button
		id="btn-file-picker"
		type="button"
		class="px-3 h-full hover:bg-gray-100 focus:outline-primary {btnRoundedClassName} "
		use:ripple
		onclick={handleFileAttachment}
	>
		<Icon path={mdiAttachment} className=" {btnIconSizeClassName}"></Icon>
	</button>
{/snippet}

<InputField
	bind:this={inputFieldRef}
	{...props}
	{appearance}
	{size}
	value={fileNameDisplay}
	className="pr-14 {className}"
	type="text"
	readonly
	rightSnippet={fileButton}
/>
