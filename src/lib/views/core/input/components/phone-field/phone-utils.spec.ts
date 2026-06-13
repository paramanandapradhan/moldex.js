import { describe, it, expect } from 'vitest';
import { parsePhoneNumber } from 'libphonenumber-js';
import type { LibPhoneNumberType } from '../../types';
import {
	formatDialCode,
	normalizePastedPhone,
	parsePastedValue,
	parseTypedNumber,
	splitValue,
	stripDialPrefix,
	stripToDigits,
	validatePhoneNumber,
	MAX_NATIONAL_DIGITS
} from './phone-utils';

// Wrap the real libphonenumber-js so the utils receive the same shape the
// component injects from the CDN global at runtime.
const lib = {
	parsePhoneNumber: (n: string) => parsePhoneNumber(n)
} as unknown as LibPhoneNumberType;

describe('stripToDigits', () => {
	it('keeps only digits', () => {
		expect(stripToDigits('+91 (987) 654-3210')).toBe('919876543210');
	});
	it('handles empty / nullish', () => {
		expect(stripToDigits('')).toBe('');
		expect(stripToDigits(undefined as unknown as string)).toBe('');
	});
});

describe('formatDialCode', () => {
	it('prepends a single +', () => {
		expect(formatDialCode('91')).toBe('+91');
		expect(formatDialCode('+91')).toBe('+91');
		expect(formatDialCode(' 1 ')).toBe('+1');
	});
});

describe('stripDialPrefix', () => {
	it('strips a matching dial prefix', () => {
		expect(stripDialPrefix('+919876543210', '+91')).toBe('9876543210');
	});
	it('strips when only the digits of the dial match (leading +)', () => {
		expect(stripDialPrefix('+919876543210', '91')).toBe('9876543210');
	});
	it('treats a value without + as all-national (never chops real digits)', () => {
		// No leading "+", so the leading "91" must NOT be treated as a dial code.
		expect(stripDialPrefix('919876543210', '+91')).toBe('919876543210');
	});
	it('caps the national part at the E.164 maximum', () => {
		const long = '+91' + '9'.repeat(30);
		expect(stripDialPrefix(long, '+91').length).toBe(MAX_NATIONAL_DIGITS);
	});
});

describe('normalizePastedPhone', () => {
	it('keeps an explicit + and strips formatting', () => {
		expect(normalizePastedPhone('+91 98765 43210')).toBe('+919876543210');
	});
	it('converts a 00 international prefix to +', () => {
		expect(normalizePastedPhone('0091 98765 43210')).toBe('+919876543210');
	});
	it('leaves a bare national number without a +', () => {
		expect(normalizePastedPhone('(202) 456-1111')).toBe('2024561111');
	});
	it('returns empty string when there are no digits', () => {
		expect(normalizePastedPhone('not a phone')).toBe('');
		expect(normalizePastedPhone('')).toBe('');
	});
});

describe('validatePhoneNumber', () => {
	it('returns national + dial for a valid number', () => {
		expect(validatePhoneNumber(lib, '+919876543210')).toEqual({
			phoneNumber: '9876543210',
			dialCode: '+91'
		});
	});
	it('returns {} for an invalid / partial number', () => {
		expect(validatePhoneNumber(lib, '+9198')).toEqual({});
	});
	it('returns {} when the library has not loaded yet', () => {
		expect(validatePhoneNumber(null, '+919876543210')).toEqual({});
	});
});

describe('splitValue', () => {
	it('splits an explicit E.164 value', () => {
		expect(splitValue(lib, '+1', '+919876543210')).toEqual({
			dial: '+91',
			national: '9876543210'
		});
	});

	it('REGRESSION: splits an E.164 value stored without the leading +', () => {
		// The reported bug: "919876543210" used to leak its "91" into the box.
		expect(splitValue(lib, '+1', '919876543210')).toEqual({
			dial: '+91',
			national: '9876543210'
		});
	});

	it('keeps a bare local number under the currently selected dial', () => {
		// US national digits with dial +1 must NOT be mis-detected as another country.
		expect(splitValue(lib, '+1', '2024561111')).toEqual({
			dial: '+1',
			national: '2024561111'
		});
	});

	it('returns null for a partial number being typed', () => {
		expect(splitValue(lib, '+91', '+9198')).toBeNull();
		expect(splitValue(lib, '+91', '98')).toBeNull();
	});

	it('returns null when empty or the library has not loaded', () => {
		expect(splitValue(lib, '+1', '')).toBeNull();
		expect(splitValue(null, '+1', '+919876543210')).toBeNull();
	});
});

describe('parseTypedNumber (writing in the box)', () => {
	it('builds dial + national while typing and normalises a valid number', () => {
		expect(parseTypedNumber(lib, '+91', '9876543210')).toEqual({
			dial: '+91',
			national: '9876543210'
		});
	});
	it('keeps raw digits for an incomplete number', () => {
		expect(parseTypedNumber(lib, '+91', '98765')).toEqual({
			dial: '+91',
			national: '98765'
		});
	});
	it('strips non-digits typed/forced into the box', () => {
		expect(parseTypedNumber(lib, '+1', '202-456-1111')).toEqual({
			dial: '+1',
			national: '2024561111'
		});
	});
	it('caps the national part at 15 digits', () => {
		const res = parseTypedNumber(lib, '+91', '9'.repeat(25));
		expect(res.national.length).toBe(MAX_NATIONAL_DIGITS);
	});
	it('normalises the dial code (adds +)', () => {
		expect(parseTypedNumber(lib, '91', '9876543210').dial).toBe('+91');
	});
});

describe('parsePastedValue (copy / paste)', () => {
	it('parses a pasted international number', () => {
		expect(parsePastedValue(lib, '+1', '+91 98765 43210')).toEqual({
			dial: '+91',
			national: '9876543210'
		});
	});
	it('parses a pasted 00-prefixed international number', () => {
		expect(parsePastedValue(lib, '+1', '0091 98765 43210')).toEqual({
			dial: '+91',
			national: '9876543210'
		});
	});
	it('treats a bare pasted number as national for the current dial', () => {
		expect(parsePastedValue(lib, '+1', '(202) 456-1111')).toEqual({
			dial: '+1',
			national: '2024561111'
		});
	});
	it('parses a bare national paste under a non-default dial', () => {
		expect(parsePastedValue(lib, '+91', '98765 43210')).toEqual({
			dial: '+91',
			national: '9876543210'
		});
	});
	it('returns null when the paste has no digits', () => {
		expect(parsePastedValue(lib, '+1', 'call me maybe')).toBeNull();
	});
	it('never lets the national part exceed 15 digits (last-resort split)', () => {
		const res = parsePastedValue(lib, '+1', '+9991234567890123456789');
		expect(res).not.toBeNull();
		expect(res!.national.length).toBeLessThanOrEqual(MAX_NATIONAL_DIGITS);
		expect(res!.dial.startsWith('+')).toBe(true);
	});
});

describe('dial-code selection (switching country keeps the national number)', () => {
	// Mirrors handleDialCodePicker: capture the national part, switch the dial,
	// recompose the value, then re-split — the national digits must survive.
	it('preserves the national number when switching dial code', () => {
		const original = splitValue(lib, '+1', '+12024561111');
		expect(original).toEqual({ dial: '+1', national: '2024561111' });

		const national = original!.national;
		const newDial = formatDialCode('+44');
		const recomposed = `${newDial}${national}`; // "+442024561111"

		// The national digits are unchanged regardless of validity under the new dial.
		expect(stripDialPrefix(recomposed, newDial)).toBe('2024561111');
	});

	it('does not re-prepend the old dial code after a switch', () => {
		// India number, then switch to US: the "91" must not survive in the box.
		const india = splitValue(lib, '+91', '+919876543210')!;
		const recomposed = `${formatDialCode('+1')}${india.national}`; // "+19876543210"
		expect(stripDialPrefix(recomposed, '+1')).toBe('9876543210');
	});
});
