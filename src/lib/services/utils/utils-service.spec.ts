import { describe, it, expect } from 'vitest';
import {
	random,
	stripDataUrl,
	isValidEmailAddress,
	isValidUrl,
	formatString,
	delay,
	sort,
	toArrayByKey,
	convertNumToAlphabets,
	inchToPixel,
	pixelToInch,
	alphabetNanoid,
	sanitizePhoneNumber,
	escapeHtml
} from './utils-service';

describe('random', () => {
	it('returns a value within [min, max)', () => {
		for (let i = 0; i < 1000; i++) {
			const r = random(1, 5);
			expect(r).toBeGreaterThanOrEqual(1);
			expect(r).toBeLessThan(5);
		}
	});
	it('throws when min >= max', () => {
		expect(() => random(5, 5)).toThrow();
		expect(() => random(10, 1)).toThrow();
	});
});

describe('stripDataUrl', () => {
	it('strips the data-url prefix', () => {
		expect(stripDataUrl('data:image/png;base64,AAAA')).toBe('AAAA');
	});
	it('returns empty string for a data url with no payload', () => {
		expect(stripDataUrl('data:image/png;base64')).toBe('');
	});
	it('returns the input unchanged when it is not a data url', () => {
		expect(stripDataUrl('hello')).toBe('hello');
	});
});

describe('isValidEmailAddress', () => {
	it('accepts valid addresses', () => {
		expect(isValidEmailAddress('test@example.com')).toBe(true);
		expect(isValidEmailAddress('a.b+c@sub.domain.co')).toBe(true);
	});
	it('rejects invalid addresses', () => {
		expect(isValidEmailAddress('no-at-sign')).toBe(false);
		expect(isValidEmailAddress('a@b')).toBe(false);
		expect(isValidEmailAddress('a b@c.com')).toBe(false);
		expect(isValidEmailAddress('@c.com')).toBe(false);
	});
});

describe('isValidUrl', () => {
	it('accepts valid urls', () => {
		expect(isValidUrl('https://www.example.com')).toBe(true);
		expect(isValidUrl('http://example.com/path?q=1#frag')).toBe(true);
		expect(isValidUrl('example.com')).toBe(true);
		expect(isValidUrl('http://127.0.0.1:8080')).toBe(true);
	});
	it('rejects invalid urls', () => {
		expect(isValidUrl('not a url')).toBe(false);
		expect(isValidUrl('ftp://example.com')).toBe(false);
		expect(isValidUrl('http://')).toBe(false);
	});
});

describe('formatString', () => {
	it('replaces indexed placeholders', () => {
		expect(formatString('Hello, {0}!', 'World')).toBe('Hello, World!');
		expect(formatString('{0} {1} {0}', 'a', 'b')).toBe('a b a');
	});
	it('leaves unmatched placeholders untouched', () => {
		expect(formatString('Hi {0} {1}', 'x')).toBe('Hi x {1}');
	});
	it('returns the input when there are no args', () => {
		expect(formatString('plain')).toBe('plain');
	});
});

describe('delay', () => {
	it('resolves after the given time', async () => {
		const start = Date.now();
		await delay(20);
		expect(Date.now() - start).toBeGreaterThanOrEqual(15);
	});
	it('resolves immediately for 0/default', async () => {
		await expect(delay()).resolves.toBeUndefined();
	});
});

describe('sort', () => {
	it('sorts plain values ascending and descending', () => {
		expect(sort({ array: [3, 1, 2] })).toEqual([1, 2, 3]);
		expect(sort({ array: [3, 1, 2], desc: true })).toEqual([3, 2, 1]);
	});
	it('sorts objects by field (case-insensitive)', () => {
		const arr = [{ name: 'bob' }, { name: 'Alice' }];
		expect(sort({ array: arr, field: 'name' })).toEqual([{ name: 'Alice' }, { name: 'bob' }]);
	});
	it('sorts by date when isDate is true', () => {
		const arr = [{ d: '2024-01-02' }, { d: '2024-01-01' }];
		expect(sort({ array: arr, field: 'd', isDate: true })).toEqual([
			{ d: '2024-01-01' },
			{ d: '2024-01-02' }
		]);
	});
	it('handles empty arrays', () => {
		expect(sort({ array: [] as number[] })).toEqual([]);
	});
});

describe('toArrayByKey', () => {
	it('converts an object to an array attaching the key', () => {
		const obj = { a: { name: 'Alice' }, b: { name: 'Bob' } };
		expect(toArrayByKey('id', obj)).toEqual([
			{ name: 'Alice', id: 'a' },
			{ name: 'Bob', id: 'b' }
		]);
	});
	it('returns an empty array for an empty/omitted object', () => {
		expect(toArrayByKey('id')).toEqual([]);
		expect(toArrayByKey('id', {})).toEqual([]);
	});
});

describe('convertNumToAlphabets', () => {
	it('maps digits 0-9 to a-j', () => {
		expect(convertNumToAlphabets(123)).toBe('bcd');
		expect(convertNumToAlphabets(0)).toBe('a');
		expect(convertNumToAlphabets(9876543210)).toBe('jihgfedcba');
	});
});

describe('inchToPixel / pixelToInch', () => {
	it('converts using 96 DPI', () => {
		expect(inchToPixel(1)).toBe(96);
		expect(pixelToInch(96)).toBe(1);
		expect(pixelToInch(inchToPixel(2))).toBe(2);
	});
	it('throws for negative or NaN inputs', () => {
		expect(() => inchToPixel(-1)).toThrow();
		expect(() => inchToPixel(NaN)).toThrow();
		expect(() => pixelToInch(-5)).toThrow();
		expect(() => pixelToInch('x' as unknown as number)).toThrow();
	});
});

describe('alphabetNanoid', () => {
	it('returns an id of the requested length', () => {
		expect(alphabetNanoid(10)).toHaveLength(10);
		expect(alphabetNanoid(4)).toHaveLength(4);
	});
	it('uses uppercase by default and lowercase on request', () => {
		expect(alphabetNanoid(20)).toMatch(/^[A-Z]+$/);
		expect(alphabetNanoid(20, true)).toMatch(/^[a-z]+$/);
	});
});

describe('sanitizePhoneNumber', () => {
	it('strips every non-digit character', () => {
		expect(sanitizePhoneNumber('+1 (202) 456-1111')).toBe('12024561111');
		expect(sanitizePhoneNumber('abc')).toBe('');
		expect(sanitizePhoneNumber('')).toBe('');
	});
});

describe('escapeHtml (XSS hardening)', () => {
	it('escapes all HTML-significant characters', () => {
		expect(escapeHtml('<img src=x onerror=alert(1)>')).toBe(
			'&lt;img src=x onerror=alert(1)&gt;'
		);
		expect(escapeHtml(`<a href="x" id='y'>&</a>`)).toBe(
			'&lt;a href=&quot;x&quot; id=&#39;y&#39;&gt;&amp;&lt;/a&gt;'
		);
	});
	it('escapes ampersands before other entities (no double-encoding bug)', () => {
		expect(escapeHtml('a & b < c')).toBe('a &amp; b &lt; c');
	});
	it('coerces non-strings and treats null/undefined as empty', () => {
		expect(escapeHtml(42)).toBe('42');
		expect(escapeHtml(null)).toBe('');
		expect(escapeHtml(undefined)).toBe('');
	});
	it('leaves safe text unchanged', () => {
		expect(escapeHtml('Plain Name 123')).toBe('Plain Name 123');
	});
});
