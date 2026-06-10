<script lang="ts">
	import { ripple } from '$lib/actions';
	import { openPickerDialog } from '$lib/services';
	import EasyScriptLoader from '@cloudparker/easy-script-loader-svelte';
	import InputField from '../input-field/input-field.svelte';
	import type { EasyCountryDataType, InputFieldProps, LibPhoneNumberType } from '../../types';

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

	let dailCodeValue = $derived.by(() => {
		if (value && LibPhoneNumber) {
			let { dialCode } = validatePhoneNumber(value);
			if (dialCode) return dialCode;
		}
		return formatDialCode(dialCode);
	});

	let phoneNumberValue = $derived.by(() => {
		if (value && LibPhoneNumber) {
			let { phoneNumber } = validatePhoneNumber(value);
			if (phoneNumber) return phoneNumber;
		}
		// Incomplete / unparseable number: show the national part only. We MUST
		// drop the dial-code prefix here — otherwise the dial-code digits leak into
		// the number box and get re-prepended on every keystroke (e.g. "91919191…").
		return stripDialPrefix(value || '', dialCode);
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

	function stripToDigits(s: string): string {
		return (s || '').replace(/\D+/g, '');
	}

	// Returns the national digits of a stored value, removing the dial-code prefix.
	// The value is stored as `${dialCode}${national}` (e.g. "+919999999999"), so we
	// strip exactly one leading dial-code occurrence. When the value carries no
	// explicit dial prefix (no leading "+"), every digit is treated as national so
	// we never accidentally chop real digits that happen to match the dial code.
	function stripDialPrefix(val: string, dial: string): string {
		const trimmed = (val || '').trim();
		const dialFmt = formatDialCode(dial);
		if (trimmed.startsWith(dialFmt)) {
			return stripToDigits(trimmed.slice(dialFmt.length)).slice(0, 15);
		}
		const digits = stripToDigits(trimmed);
		const dialDigits = stripToDigits(dial);
		if (trimmed.startsWith('+') && dialDigits && digits.startsWith(dialDigits)) {
			return digits.slice(dialDigits.length).slice(0, 15);
		}
		return digits.slice(0, 15);
	}

	function normalizePastedPhone(raw: string): string {
		// Keep leading + if any, strip everything non-digit, and re-prepend +
		const trimmed = (raw || '').trim();
		const hasPlus = trimmed.startsWith('+') || trimmed.startsWith('00');
		const digits = stripToDigits(trimmed);
		if (!digits) return '';
		// '00' international prefix → '+'
		if (trimmed.startsWith('00')) return `+${digits.replace(/^0+/, '')}`;
		return hasPlus ? `+${digits}` : digits;
	}

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
		dialcode = `${dialcode}`.trim();
		return dialcode.startsWith('+') ? dialcode : `+${dialcode}`;
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
		const dial = dailCodeValue;
		// Try canonical parse with current dial; fall back to raw digits
		const parsed = validatePhoneNumber(`${dial}${cleaned}`);
		applyDialAndNumber(dial, parsed.phoneNumber || cleaned);
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

		const normalized = normalizePastedPhone(raw);
		if (!normalized) return;

		// If pasted value carries a country code, try to parse + split
		if (normalized.startsWith('+') && LibPhoneNumber) {
			const parsed = validatePhoneNumber(normalized);
			if (parsed.dialCode && parsed.phoneNumber) {
				applyDialAndNumber(parsed.dialCode, parsed.phoneNumber);
				return;
			}
			// Best-effort split: strip leading + and try common dial-code lengths
			const digits = normalized.slice(1);
			for (const len of [3, 2, 1]) {
				if (digits.length <= len) continue;
				const guessDial = digits.slice(0, len);
				const guessNum = digits.slice(len);
				const tryParsed = validatePhoneNumber(`+${guessDial}${guessNum}`);
				if (tryParsed.dialCode && tryParsed.phoneNumber) {
					applyDialAndNumber(tryParsed.dialCode, tryParsed.phoneNumber);
					return;
				}
			}
			// Fallback: assume +<1-3 digit dial><rest> by trimming current dial if it matches
			const curDigits = stripToDigits(dailCodeValue);
			if (curDigits && digits.startsWith(curDigits)) {
				applyDialAndNumber(`+${curDigits}`, digits.slice(curDigits.length).slice(0, 15));
				return;
			}
			// Last resort: keep current dial, take last 15 digits as national
			applyDialAndNumber(dailCodeValue, digits.slice(-15));
			return;
		}

		// No country code in paste → treat as national for the displayed dial
		const nationalDigits = stripToDigits(normalized).slice(0, 15);
		const parsed = validatePhoneNumber(`${dailCodeValue}${nationalDigits}`);
		applyDialAndNumber(dailCodeValue, parsed.phoneNumber || nationalDigits);
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
