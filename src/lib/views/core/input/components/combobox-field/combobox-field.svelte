<script lang="ts">
	import { mdiUnfoldMoreHorizontal } from '$lib/views/core/icon';
	import Icon from '$lib/views/core/icon/components/icon/icon.svelte';
	import type { Snippet } from 'svelte';
	import InputField, { type InputFieldPropsType } from '../input-field/input-field.svelte';

	type PropsType = {
		iconClassName?: string;
		dropdownClassName?: string;
		dropdownHeaderClassName?: string;
		dropdownBodyClassName?: string;
		dropdownFooterClassName?: string;
		dropdownHeaderChildren?:Snippet;
		dropdownBodyChildren?:Snippet;
		dropdownFooterChildren?:Snippet;
	};
	let {
		className,
		size,
		appearance,
		iconClassName,
		id,
		name,
		dropdownClassName,
		dropdownHeaderClassName,
		dropdownBodyClassName,
		dropdownFooterClassName,
		...props
	}: InputFieldPropsType & PropsType = $props();

	let btnIconSizeClassName = $state('');
	let _value = $state('');
	let isPlaced = $state(false);

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

	function toggleDropdown() {
		isPlaced = !isPlaced;
	}

	function handleInputClick() {
		toggleDropdown();
	}

	function handleBackdropClick() {
		toggleDropdown();
	}

	function handleKeypress(event: KeyboardEvent) {
		console.log('handleKeypress');
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault(); // Prevent default action for spacebar to avoid scrolling
			toggleDropdown();
		}
	}
</script>

{#snippet rightIcon()}
	<div class="px-1">
		<Icon
			path={mdiUnfoldMoreHorizontal}
			className=" text-gray-500 {btnIconSizeClassName} {iconClassName}"
		/>
	</div>
{/snippet}

<div class="relative">
	<InputField
		{...props}
		bind:value={_value}
		type="text"
		role="combobox"
		onclick={handleInputClick}
		className="pr-8 text-transparent {className}"
		rightChildren={rightIcon}
		rightChildrenContainerClassName="pointer-events-none"
		readonly
		{size}
		{appearance}
		ariaControls="options"
		ariaExpanded={isPlaced}
		onkeypress={handleKeypress}
	/>
	{#if isPlaced}
		<button id="backdrop" class="fixed inset-0" onclick={handleBackdropClick} tabindex="-1"
		></button>
		<div
			class="absolute mt-1 max-h-96 w-full flex flex-col rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm {dropdownClassName}"
			id="options"
			role="listbox"
		>
			<div id="dropdown-header" class=" {dropdownHeaderClassName}">

			</div>
			<div id="dropdown-body" class=" flex-grow overflow-y-auto max-h-full {dropdownBodyClassName}">
				<ul>
					<li class="select-none" id="option-0" role="option" tabindex="-1">Item1</li>
					<li class="select-none" id="option-0" role="option" tabindex="-1">Item1</li>
				</ul>
			</div>
			<div id="dropdown-footer" class=" {dropdownFooterClassName}"></div>
		</div>
	{/if}
</div>
