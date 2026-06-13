import type { LibPhoneNumberType } from '../../types';

/** Maximum number of national digits we ever keep (E.164 caps the whole number at 15). */
export const MAX_NATIONAL_DIGITS = 15;

/** Removes every non-digit character. */
export function stripToDigits(s: string): string {
	return (s || '').replace(/\D+/g, '');
}

/** Ensures a dial code is rendered with a single leading "+" (e.g. "91" → "+91"). */
export function formatDialCode(dialcode: string): string {
	dialcode = `${dialcode}`.trim();
	return dialcode.startsWith('+') ? dialcode : `+${dialcode}`;
}

/**
 * Returns the national digits of a stored value, removing the dial-code prefix.
 * The value is stored as `${dialCode}${national}` (e.g. "+919999999999"), so we
 * strip exactly one leading dial-code occurrence. When the value carries no
 * explicit dial prefix (no leading "+"), every digit is treated as national so
 * we never accidentally chop real digits that happen to match the dial code.
 */
export function stripDialPrefix(val: string, dial: string): string {
	const trimmed = (val || '').trim();
	const dialFmt = formatDialCode(dial);
	if (trimmed.startsWith(dialFmt)) {
		return stripToDigits(trimmed.slice(dialFmt.length)).slice(0, MAX_NATIONAL_DIGITS);
	}
	const digits = stripToDigits(trimmed);
	const dialDigits = stripToDigits(dial);
	if (trimmed.startsWith('+') && dialDigits && digits.startsWith(dialDigits)) {
		return digits.slice(dialDigits.length).slice(0, MAX_NATIONAL_DIGITS);
	}
	return digits.slice(0, MAX_NATIONAL_DIGITS);
}

/** Normalises pasted free-text into either `+<digits>` or bare `<digits>`. */
export function normalizePastedPhone(raw: string): string {
	const trimmed = (raw || '').trim();
	const hasPlus = trimmed.startsWith('+') || trimmed.startsWith('00');
	const digits = stripToDigits(trimmed);
	if (!digits) return '';
	// '00' international prefix → '+'
	if (trimmed.startsWith('00')) return `+${digits.replace(/^0+/, '')}`;
	return hasPlus ? `+${digits}` : digits;
}

/**
 * Parses `number` with libphonenumber and returns the national number + dial code
 * only when the result is a VALID phone number. Returns `{}` otherwise (including
 * when the library has not loaded yet) so callers can fall back gracefully.
 */
export function validatePhoneNumber(
	lib: LibPhoneNumberType | null,
	number: string
): { phoneNumber?: string; dialCode?: string } {
	try {
		const parsed = lib?.parsePhoneNumber(number);
		if (parsed && parsed.isValid()) {
			return {
				phoneNumber: parsed.nationalNumber || '',
				dialCode: formatDialCode(parsed.countryCallingCode)
			};
		}
	} catch {
		/* unparseable → treated as not-yet-valid */
	}
	return {};
}

/**
 * Resolves any stored `value` into its dial-code + national parts. Tries the
 * current dial first (so bare local numbers keep their selected country), then
 * an explicit "+", then a bare international number stored without the "+".
 * Returns `null` unless libphonenumber considers the result VALID, so a number
 * being typed is never mis-detected as a foreign dial code.
 */
export function splitValue(
	lib: LibPhoneNumberType | null,
	dialCode: string,
	val: string
): { dial: string; national: string } | null {
	const trimmed = (val || '').trim();
	if (!trimmed || !lib) return null;

	// Already carries an explicit "+": trust it as-is.
	if (trimmed.startsWith('+')) {
		const { dialCode: dial, phoneNumber } = validatePhoneNumber(lib, trimmed);
		return dial && phoneNumber ? { dial, national: phoneNumber } : null;
	}

	const digits = stripToDigits(trimmed);
	if (!digits) return null;

	// No "+": prefer interpreting the digits as national under the currently
	// selected dial code, so a bare local number keeps its country.
	const underCurrent = validatePhoneNumber(lib, `${formatDialCode(dialCode)}${digits}`);
	if (underCurrent.dialCode && underCurrent.phoneNumber) {
		return { dial: underCurrent.dialCode, national: underCurrent.phoneNumber };
	}
	// Otherwise treat it as an E.164 number stored without the leading "+"
	// (e.g. "919876543210" → +91 / 9876543210).
	const asInternational = validatePhoneNumber(lib, `+${digits}`);
	if (asInternational.dialCode && asInternational.phoneNumber) {
		return { dial: asInternational.dialCode, national: asInternational.phoneNumber };
	}
	return null;
}

/**
 * Resolves the dial + national to store after the user types into the number box.
 * `dial` is the currently-displayed dial code; `rawInput` is the raw box contents.
 */
export function parseTypedNumber(
	lib: LibPhoneNumberType | null,
	dial: string,
	rawInput: string
): { dial: string; national: string } {
	const cleaned = stripToDigits(rawInput).slice(0, MAX_NATIONAL_DIGITS);
	const parsed = validatePhoneNumber(lib, `${formatDialCode(dial)}${cleaned}`);
	return { dial: formatDialCode(dial), national: parsed.phoneNumber || cleaned };
}

/**
 * Resolves the dial + national to store from arbitrary pasted text. Mirrors the
 * typing rules but additionally tries to recover a country code embedded in the
 * pasted value. `currentDial` is the dial currently shown on the picker button.
 * Returns `null` when the paste contains no usable digits.
 */
export function parsePastedValue(
	lib: LibPhoneNumberType | null,
	currentDial: string,
	raw: string
): { dial: string; national: string } | null {
	const normalized = normalizePastedPhone(raw);
	if (!normalized) return null;

	// Pasted value carries a country code → try to parse + split.
	if (normalized.startsWith('+')) {
		const parsed = validatePhoneNumber(lib, normalized);
		if (parsed.dialCode && parsed.phoneNumber) {
			return { dial: parsed.dialCode, national: parsed.phoneNumber };
		}
		// Best-effort split: try common dial-code lengths.
		const digits = normalized.slice(1);
		for (const len of [3, 2, 1]) {
			if (digits.length <= len) continue;
			const guessDial = digits.slice(0, len);
			const guessNum = digits.slice(len);
			const tryParsed = validatePhoneNumber(lib, `+${guessDial}${guessNum}`);
			if (tryParsed.dialCode && tryParsed.phoneNumber) {
				return { dial: tryParsed.dialCode, national: tryParsed.phoneNumber };
			}
		}
		// Fallback: trim the current dial if the digits start with it.
		const curDigits = stripToDigits(currentDial);
		if (curDigits && digits.startsWith(curDigits)) {
			return {
				dial: formatDialCode(curDigits),
				national: digits.slice(curDigits.length).slice(0, MAX_NATIONAL_DIGITS)
			};
		}
		// Last resort: keep current dial, take the last 15 digits as national.
		return { dial: formatDialCode(currentDial), national: digits.slice(-MAX_NATIONAL_DIGITS) };
	}

	// No country code in paste → treat as national for the current dial.
	const nationalDigits = stripToDigits(normalized).slice(0, MAX_NATIONAL_DIGITS);
	const parsed = validatePhoneNumber(lib, `${formatDialCode(currentDial)}${nationalDigits}`);
	return { dial: formatDialCode(currentDial), national: parsed.phoneNumber || nationalDigits };
}
