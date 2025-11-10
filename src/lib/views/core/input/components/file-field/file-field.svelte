<script lang="ts">
	import { ripple } from '$lib/actions/ripple.js';
	import { openFilePickerDialog } from '$lib/services/index.js';

	 
	import Icon from '$lib/views/core/icon/components/icon/icon.svelte';
	import { mdiAttachment } from '$lib/views/core/icon/index.js';
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
</script>

{#snippet fileButton()}
	<button
		id="btn-file-picker"
		type="button"
		class="h-full px-3 hover:bg-gray-100 focus:outline-primary {btnRoundedClassName} "
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
