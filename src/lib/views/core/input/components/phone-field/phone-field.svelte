 

<script lang="ts">
	import { ripple } from '$lib/actions';
	import { openPickerDialog } from '$lib/services';
	import EasyScriptLoader from '@cloudparker/easy-script-loader-svelte';
	import InputField  from '../input-field/input-field.svelte';
	import type { EasyCountryDataType, InputFieldProps, LibPhoneNumberType } from '../../types';

	let {
		id,
		name,
		value = $bindable(''),
		size,
		appearance,
		buttonClassName,
		className,
		dialCode = $bindable('+1'),
		floatingLabel,
		labelClassName,
		...props
	}: InputFieldProps & {
		buttonClassName?: string;
		dialCode?: string;
	} = $props();

	let EasyCountryData: EasyCountryDataType;
	let LibPhoneNumber: LibPhoneNumberType | null = $state(null);
	let inputFieldRef: any | null = $state(null);

	let dailCodeValue = $derived.by(() => {
		if (value && LibPhoneNumber) {
			let { dialCode } = validatePhoneNumber(value);
			return dialCode;
		}
		return formatDialCode(dialCode);
	});

	let phoneNumberValue = $derived.by(() => {
		if (value && LibPhoneNumber) {
			let { phoneNumber } = validatePhoneNumber(value);
			return phoneNumber;
		}
		return '';
	});

	let btnRoundedClassName = $derived.by(() => {
		if (!appearance || appearance == 'normal') {
			return 'rounded-tl-lg rounded-bl-lg';
		}
	});

	function validatePhoneNumber(number: string) {
		try {
			let parsed = LibPhoneNumber?.parsePhoneNumber(number as string);
			if (parsed && parsed.isValid()) {
				return {
					phoneNumber: parsed.nationalNumber || '',
					dialCode: formatDialCode(parsed.countryCallingCode)
				};
			}
		} catch (error) {}
		return {};
	}

	export function focus() {
		inputFieldRef?.focus();
	}

	export function getElement() {
		return inputFieldRef;
	}

	export function select() {
		inputFieldRef && inputFieldRef.select();
	}

	function formatDialCode(dialcode: string) {
		dialcode = `${dialCode}`.trim();
		return dialCode.startsWith('+') ? dialcode : `+${dialCode}`;
	}

	async function handleDialCodePicker() {
		if (EasyCountryData) {
			let items = EasyCountryData.getCountries();
			let res: string = await openPickerDialog<string>({
				value: dialCode,
				items,
				identityFieldName: 'dialCode',
				itemTileSnippet: dialCodePickerItemTile
			});

			if (res) {
				dialCode = res;
				if (dialCode && phoneNumberValue) {
					value = `${dialCode}${phoneNumberValue}`;
				}
				inputFieldRef && inputFieldRef.focus();
			}
		}
	}

	function handleEasyCountryDataScriptLoad(lib: EasyCountryDataType) {
		EasyCountryData = lib;
	}

	function handleLibPhoneNumberScriptLoad(lib: LibPhoneNumberType) {
		LibPhoneNumber = lib;
	}

	function handleNumberInput(ev: InputEvent) {
		let target: HTMLInputElement = ev.target as HTMLInputElement;
		let text: string = target?.value || '';
		let { phoneNumber } = validatePhoneNumber(`${dialCode}${text}`);
		if (phoneNumber) {
			value = `${dialCode}${phoneNumber}`;
		}
	}

	function handleNumberKeyDown(ev: KeyboardEvent) {
		if (
			!(
				(ev.key >= '0' && ev.key <= '9') ||
				ev.key === 'Backspace' ||
				ev.key === 'Delete' ||
				ev.key === 'ArrowLeft' ||
				ev.key === 'ArrowRight' ||
				ev.key === 'ArrowUp' ||
				ev.key === 'ArrowDown' ||
				ev.key === 'Tab'
			)
		) {
			ev.preventDefault();
		}
	}
</script>

{#snippet dialCodePickerItemTile(item: any, index: number)}
	<div class="w-14 text-sm font-bold text-neutral">
		{item.dialCode}
	</div>
	<div class="flex-grow">
		{item.name}
	</div>
{/snippet}

{#snippet showDialCodeButton()}
	<button
		id="btn-dialcode-picker-{name || id}"
		type="button"
		class="w-16 h-full hover:bg-gray-100 font-bold text-gray-400 focus:outline-primary {btnRoundedClassName} {buttonClassName}"
		use:ripple
		onclick={handleDialCodePicker}
	>
		{dailCodeValue}
	</button>
{/snippet}

<EasyScriptLoader
	scriptName="EasyCountryData"
	scriptUrl="https://cdn.jsdelivr.net/gh/paramanandapradhan/easy-countrydata@main/dist/index.js"
	onLoad={handleEasyCountryDataScriptLoad}
/>

<EasyScriptLoader
	scriptName="libphonenumber"
	scriptUrl="https://unpkg.com/libphonenumber-js@1.11.7/bundle/libphonenumber-min.js"
	onLoad={handleLibPhoneNumberScriptLoad}
/>

<InputField
	{...props}
	bind:this={inputFieldRef}
	value={phoneNumberValue}
	type="tel"
	{id}
	{name}
	maxlength={props?.maxlength || 12}
	leftSnippet={showDialCodeButton}
	{size}
	{appearance}
	{floatingLabel}
	className="pl-16  {className}"
	labelClassName=" {floatingLabel ? 'peer-placeholder-shown:ps-16' : ''} {labelClassName}"
	onInput={handleNumberInput}
	onKeyDown={handleNumberKeyDown}
/>
