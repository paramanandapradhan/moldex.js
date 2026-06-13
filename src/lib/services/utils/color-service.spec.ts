import { describe, it, expect } from 'vitest';
import { isValidHexColor, rgbToHex } from './color-service';

describe('isValidHexColor', () => {
	it('accepts 3- and 6-digit hex colors', () => {
		expect(isValidHexColor('#FFF')).toBe(true);
		expect(isValidHexColor('#123ABC')).toBe(true);
		expect(isValidHexColor('#abc')).toBe(true);
	});
	it('rejects malformed hex colors', () => {
		expect(isValidHexColor('#1234')).toBe(false); // 4 digits
		expect(isValidHexColor('FFF')).toBe(false); // missing #
		expect(isValidHexColor('#GGG')).toBe(false); // non-hex chars
		expect(isValidHexColor('')).toBe(false);
	});
});

describe('rgbToHex', () => {
	it('converts RGB triplets to uppercase hex', () => {
		expect(rgbToHex(255, 0, 0)).toBe('#FF0000');
		expect(rgbToHex(0, 255, 0)).toBe('#00FF00');
		expect(rgbToHex(0, 0, 0)).toBe('#000000');
		expect(rgbToHex(255, 255, 255)).toBe('#FFFFFF');
	});
	it('pads single-digit channels to two characters', () => {
		expect(rgbToHex(1, 2, 3)).toBe('#010203');
	});
	it('throws for out-of-range or non-numeric values', () => {
		expect(() => rgbToHex(-1, 0, 0)).toThrow();
		expect(() => rgbToHex(256, 0, 0)).toThrow();
		expect(() => rgbToHex(0, 0, 'x' as unknown as number)).toThrow();
	});
});
