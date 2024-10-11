<script module lang="ts">
	export type LibPhoneNumberParseType = {
		isValid: () => boolean;
		nationalNumber: string;
		countryCallingCode: string;
	};

	export type LibPhoneNumberType = {
		parsePhoneNumber: (phoneNumber: string, dialCode?: string) => LibPhoneNumberParseType;
	};

	export type CountryType = {
		name: string;
		dialCode: string;
		isoCode: string;
	};

	export type EasyCountryDataType = {
		getCountries: () => CountryType[];
		getCountry: (params: { name?: string; dialCode?: string; isoCode?: string }) => CountryType;
	};
</script>

<script lang="ts">
	import { ripple } from '$lib/actions';
	import EasyScriptLoader from '@cloudparker/easy-script-loader-svelte';
	import InputField, { type InputFieldPropsType } from '../input-field/input-field.svelte';
	import { isMobileScreen, openListPickerDialog } from '$lib/services';
	import type { DialogSizeType } from '$lib/views/core/dialog';

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
	}: InputFieldPropsType & {
		buttonClassName?: string;
		dialCode?: string;
	} = $props();

	let EasyCountryData: EasyCountryDataType;
	let LibPhonenumber: LibPhoneNumberType | null = $state(null);
	let inputFieldRef: any | null = $state(null);

	let _dailCode: string = $state('');
	let _phoneNumber: string = $state('');

	$effect(() => {
		if (!_dailCode && !_phoneNumber && LibPhonenumber) {
			try {
				if (dialCode) {
					_dailCode = formatDialCode(dialCode);
				}
				if (value) {
					let parsed = LibPhonenumber?.parsePhoneNumber(value as string);
					if (parsed && parsed.isValid()) {
						_phoneNumber = parsed.nationalNumber || '';
						_dailCode = formatDialCode(parsed.countryCallingCode);
					}
				}
			} catch (error) {}
		}
	});

	let btnRoundedClassName = $derived.by(() => {
		if (!appearance || appearance == 'normal') {
			return 'rounded-tl-lg rounded-bl-lg';
		}
	});

	export function focus() {
		inputFieldRef?.focus();
	}

	export function getElement(){
		return inputFieldRef;
	}

	export function select(){
		  inputFieldRef && inputFieldRef.select();
	}

	function formatDialCode(dialcode: string) {
		dialcode = `${dialCode}`.trim();
		if (!dialCode.startsWith('+')) {
			dialcode = `+${dialCode}`;
		}
		return dialcode;
	}

	async function hanleDialCodePicker() {
		if (EasyCountryData) {
			let items = EasyCountryData.getCountries();
			// console.log('Countries', items);
			let size: DialogSizeType = isMobileScreen() ? 'full' : 'sm';
			let res: string = await openListPickerDialog<string>({
				items,
				itemTitle: 'dialCode',
				itemSubtitle: 'name',
				size,
				hasCheck: true,
				identity: 'dialCode',
				search: ['name', 'dialCode', 'isoCode']
			});

			console.log(res);
			if (res) {
				_dailCode = res;
				dialCode = _dailCode;
				updatePhonenumber(_dailCode, _phoneNumber);
				inputFieldRef && inputFieldRef.focus();
			}
		}
	}

	function handleEasyCountryDataScriptLoad(lib: EasyCountryDataType) {
		EasyCountryData = lib;
	}

	function handleLibphonenumberScriptLoad(lib: LibPhoneNumberType) {
		LibPhonenumber = lib;
	}

	function handleNumberInput(ev: InputEvent) {
		let target: HTMLInputElement = ev.target as HTMLInputElement;
		let _phoneNumber: string = target?.value || '';
		updatePhonenumber(_dailCode, _phoneNumber);
	}

	function updatePhonenumber(_dialCode: string, _phoneNumber: string) {
		if (LibPhonenumber) {
			if (_phoneNumber) {
				_dialCode = formatDialCode(_dialCode);
				try {
					// console.log('updatePhonenumber', { dialCode, phoneNumber });
					let parsed = LibPhonenumber.parsePhoneNumber(_dialCode + _phoneNumber);
					if (parsed && parsed.isValid()) {
						dialCode = _dialCode;
						value = _dialCode + _phoneNumber;
					} else {
						value = '';
					}
				} catch (error) {
					value = '';
				}
			}
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
				ev.key === 'ArrowDown'||
				ev.key === 'Tab'
			)
		) {
			ev.preventDefault();
		}
	}
</script>

{#snippet showPasswordButton()}
	<button
		id="btn-dialcode-picker-{name || id}"
		type="button"
		class="w-16 h-full hover:bg-gray-100 font-bold text-gray-400 focus:outline-primary {btnRoundedClassName} {buttonClassName}"
		use:ripple
		onclick={hanleDialCodePicker}
	>
		{_dailCode}
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
	onLoad={handleLibphonenumberScriptLoad}
/>

<InputField
	{...props}
	bind:this={inputFieldRef}
	value={_phoneNumber}
	type="tel"
	{id}
	{name}
	maxlength={props?.maxlength || 12}
	leftSnippet={showPasswordButton}
	{size}
	{appearance}
	{floatingLabel}
	className="pl-16  {className}"
	labelClassName=" {floatingLabel ? 'peer-placeholder-shown:ps-16' : ''} {labelClassName}"
	onInput={handleNumberInput}
	onKeyDown={handleNumberKeyDown}
/>
