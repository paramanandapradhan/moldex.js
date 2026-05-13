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
		return stripToDigits(value || '').slice(-15);
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

	function applyDialAndNumber(nextDial: string, nextNumber: string) {
		dialCode = formatDialCode(nextDial);
		value = nextNumber ? `${dialCode}${nextNumber}` : '';
	}

	function handleNumberInput(ev: InputEvent) {
		const target = ev.target as HTMLInputElement;
		const cleaned = stripToDigits(target.value || '').slice(0, 15);
		if (target.value !== cleaned) target.value = cleaned;
		// Try canonical parse with current dial; fall back to raw digits
		const parsed = validatePhoneNumber(`${formatDialCode(dialCode)}${cleaned}`);
		applyDialAndNumber(dialCode, parsed.phoneNumber || cleaned);
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
			// Fallback: assume +<1-3 digit dial><rest> by trimming current dialCode if it matches
			const curDigits = stripToDigits(dialCode);
			if (curDigits && digits.startsWith(curDigits)) {
				applyDialAndNumber(`+${curDigits}`, digits.slice(curDigits.length).slice(0, 15));
				return;
			}
			// Last resort: keep current dial, take last 15 digits as national
			applyDialAndNumber(dialCode, digits.slice(-15));
			return;
		}

		// No country code in paste → treat as national for current dialCode
		const nationalDigits = stripToDigits(normalized).slice(0, 15);
		const parsed = validatePhoneNumber(`${formatDialCode(dialCode)}${nationalDigits}`);
		applyDialAndNumber(dialCode, parsed.phoneNumber || nationalDigits);
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
