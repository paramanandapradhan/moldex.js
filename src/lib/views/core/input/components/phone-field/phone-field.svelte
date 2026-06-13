<script lang="ts">
	import { ripple } from '$lib/actions';
	import { openPickerDialog } from '$lib/services';
	import EasyScriptLoader from '@cloudparker/easy-script-loader-svelte';
	import InputField from '../input-field/input-field.svelte';
	import type { EasyCountryDataType, InputFieldProps, LibPhoneNumberType } from '../../types';
	import {
		formatDialCode,
		parsePastedValue,
		parseTypedNumber,
		splitValue,
		stripDialPrefix,
		stripToDigits
	} from './phone-utils.js';

	let {
		id,
		name,
		value = $bindable(''),
		size = 'sm',
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

	// Single source of truth for splitting the stored `value` into its dial code
	// and national parts. Returns `null` for partial / unparseable numbers so they
	// are treated as plain national digits while the user is still typing.
	let parsedValue = $derived.by(() => splitValue(LibPhoneNumber, dialCode, value));

	// Keep the bindable `dialCode` in sync with a value that carries its own
	// country code (e.g. a record loaded as "+919876543210" or "919876543210"),
	// so the dial button, value reconstruction and parent binding never drift.
	$effect(() => {
		if (parsedValue && parsedValue.dial !== formatDialCode(dialCode)) {
			dialCode = parsedValue.dial;
		}
	});

	let dailCodeValue = $derived(parsedValue ? parsedValue.dial : formatDialCode(dialCode));

	let phoneNumberValue = $derived.by(() => {
		if (parsedValue) return parsedValue.national;
		// Incomplete / unparseable number: show the national part only. We MUST
		// drop the dial-code prefix here — otherwise the dial-code digits leak into
		// the number box and get re-prepended on every keystroke (e.g. "91919191…").
		// Strip the *effective* dial (dailCodeValue), never a possibly-stale prop.
		return stripDialPrefix(value || '', dailCodeValue);
	});

	let btnRoundedClassName = $derived.by(() => {
		if (!appearance || appearance == 'normal') {
			return 'rounded-tl-xl rounded-bl-xl';
		}
	});

	let btnSizeClassName = $derived.by(() => {
		switch (size) {
			case 'lg':
				return 'w-20 text-base';
			case 'sm':
				return 'w-14 text-xs';
			case 'xs':
				return 'w-12 text-xs';
			default:
				return 'w-16 text-sm';
		}
	});

	let inputPaddingLeftClassName = $derived.by(() => {
		switch (size) {
			case 'lg':
				return 'pl-20';
			case 'sm':
				return 'pl-14';
			case 'xs':
				return 'pl-12';
			default:
				return 'pl-16';
		}
	});

	let labelPaddingStartClassName = $derived.by(() => {
		switch (size) {
			case 'lg':
				return 'peer-placeholder-shown:ps-20';
			case 'sm':
				return 'peer-placeholder-shown:ps-14';
			case 'xs':
				return 'peer-placeholder-shown:ps-12';
			default:
				return 'peer-placeholder-shown:ps-16';
		}
	});

	export function focus() {
		inputFieldRef?.focus();
	}

	export function getElement() {
		return inputFieldRef;
	}

	export function select() {
		inputFieldRef && inputFieldRef.select();
	}

	async function handleDialCodePicker() {
		if (EasyCountryData) {
			let items = EasyCountryData.getCountries();
			let res: string = await openPickerDialog<string>({
				value: dailCodeValue,
				items,
				identityFieldName: 'dialCode',
				itemTileSnippet: dialCodePickerItemTile
			});

			if (res) {
				// Capture the national number under the CURRENT (old) dial first, then
				// switch the dial and recompose — otherwise the old dial code leaks
				// into the national part when the new dial doesn't match the prefix.
				const national = phoneNumberValue;
				dialCode = formatDialCode(res);
				value = national ? `${dialCode}${national}` : '';
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

	function applyDialAndNumber(nextDial: string, nextNumber: string) {
		dialCode = formatDialCode(nextDial);
		value = nextNumber ? `${dialCode}${nextNumber}` : '';
	}

	function handleNumberInput(ev: InputEvent) {
		const target = ev.target as HTMLInputElement;
		const cleaned = stripToDigits(target.value || '').slice(0, 15);
		if (target.value !== cleaned) target.value = cleaned;
		// Use the DISPLAYED dial (parsed from the current value when it is valid),
		// not the raw `dialCode` prop — when the parent sets a value with a
		// different country code without binding dialCode, the prop is stale and
		// the first keystroke would silently rewrite the number to the wrong dial.
		const { dial, national } = parseTypedNumber(LibPhoneNumber, dailCodeValue, cleaned);
		applyDialAndNumber(dial, national);
	}

	function handleNumberKeyDown(ev: KeyboardEvent) {
		// allow clipboard / selection / nav shortcuts
		if (ev.ctrlKey || ev.metaKey) return;
		const allowed = [
			'Backspace',
			'Delete',
			'ArrowLeft',
			'ArrowRight',
			'ArrowUp',
			'ArrowDown',
			'Tab',
			'Home',
			'End',
			'Enter'
		];
		if (allowed.includes(ev.key)) return;
		if (ev.key >= '0' && ev.key <= '9') return;
		ev.preventDefault();
	}

	function handlePaste(ev: ClipboardEvent) {
		const raw = ev.clipboardData?.getData('text') || '';
		if (!raw) return;
		ev.preventDefault();

		const result = parsePastedValue(LibPhoneNumber, dailCodeValue, raw);
		if (result) applyDialAndNumber(result.dial, result.national);
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
		class="{btnSizeClassName} h-full hover:bg-gray-100 font-bold text-gray-400 focus:outline-primary {btnRoundedClassName} {buttonClassName}"
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
	maxlength={props?.maxlength || 15}
	leftSnippet={showDialCodeButton}
	{size}
	{appearance}
	{floatingLabel}
	className="{inputPaddingLeftClassName}  {className}"
	labelClassName=" {floatingLabel ? labelPaddingStartClassName : ''} {labelClassName}"
	onInput={handleNumberInput}
	onKeyDown={handleNumberKeyDown}
	onPaste={handlePaste}
/>
