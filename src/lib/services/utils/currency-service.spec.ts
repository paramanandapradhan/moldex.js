import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
	numberToWords,
	convertTwoDigits,
	toCurrency,
	formatIndianCurrency,
	formatCurrency,
	getCurrencyRates,
	getCachedCurrencyRates,
	clearCurrencyCache,
	convertCurrency,
	getExchangeRate,
	CurrencySymbols
} from './currency-service';

describe('convertTwoDigits', () => {
	it('converts numbers below twenty', () => {
		expect(convertTwoDigits(0)).toBe('');
		expect(convertTwoDigits(5)).toBe('Five');
		expect(convertTwoDigits(15)).toBe('Fifteen');
	});
	it('converts tens and tens+units', () => {
		expect(convertTwoDigits(20)).toBe('Twenty');
		expect(convertTwoDigits(34)).toBe('Thirty Four');
		expect(convertTwoDigits(99)).toBe('Ninety Nine');
	});
});

describe('numberToWords', () => {
	it('handles zero', () => {
		expect(numberToWords(0)).toBe('Zero');
	});
	it('handles each Indian scale', () => {
		expect(numberToWords(5)).toBe('Five');
		expect(numberToWords(100)).toBe('One Hundred');
		expect(numberToWords(1000)).toBe('One Thousand');
		expect(numberToWords(100000)).toBe('One Lakh');
		expect(numberToWords(10000000)).toBe('One Crore');
	});
	it('joins scales with separators and "and"', () => {
		expect(numberToWords(115)).toBe('One Hundred and Fifteen');
		expect(numberToWords(123456789)).toBe(
			'Twelve Crore, Thirty Four Lakh, Fifty Six Thousand, Seven Hundred and Eighty Nine'
		);
	});
});

describe('toCurrency', () => {
	it('formats positive values with a symbol', () => {
		expect(toCurrency(1234.56, '$')).toBe('$ 1234.56');
		expect(toCurrency(5)).toBe('$ 5.00');
	});
	it('prefixes negative values with a minus sign', () => {
		expect(toCurrency(-1234.56, '€')).toBe('- € 1234.56');
	});
	it('defaults to 0 and $', () => {
		expect(toCurrency()).toBe('$ 0.00');
	});
});

describe('formatIndianCurrency', () => {
	it('groups digits in the Indian system', () => {
		expect(formatIndianCurrency(1234567890.5)).toBe('1,23,45,67,890.50');
		expect(formatIndianCurrency(1000)).toBe('1,000.00');
		expect(formatIndianCurrency(100)).toBe('100.00');
	});
	it('accepts numeric strings', () => {
		expect(formatIndianCurrency('1234.5')).toBe('1,234.50');
	});
});

describe('formatCurrency', () => {
	it('formats with Intl for valid currency codes', () => {
		expect(formatCurrency(1234.56, 'USD')).toBe('$1,234.56');
		expect(formatCurrency(1234.56, 'inr')).toBe('₹1,234.56');
	});
	it('falls back gracefully for an invalid currency code', () => {
		expect(formatCurrency(1234.56, 'INVALID')).toBe('INVALID 1234.56');
	});
});

describe('CurrencySymbols', () => {
	it('exposes known symbols', () => {
		expect(CurrencySymbols.INR).toBe('₹');
		expect(CurrencySymbols.USD).toBe('$');
		expect(CurrencySymbols.EUR).toBe('€');
	});
});

describe('currency rates (network)', () => {
	const apiResponse = {
		result: 'success',
		base_code: 'USD',
		rates: { USD: 1, INR: 83, EUR: 0.9 },
		time_last_update_utc: 'Mon, 01 Jan 2024 00:00:01 +0000',
		time_next_update_utc: 'Tue, 02 Jan 2024 00:00:01 +0000',
		time_next_update_unix: Math.floor(Date.now() / 1000) + 86400
	};

	beforeEach(() => {
		clearCurrencyCache();
		vi.spyOn(console, 'log').mockImplementation(() => {});
		vi.spyOn(console, 'warn').mockImplementation(() => {});
		vi.spyOn(console, 'error').mockImplementation(() => {});
	});
	afterEach(() => {
		vi.restoreAllMocks();
		vi.unstubAllGlobals();
	});

	it('fetches and caches rates (second call hits cache)', async () => {
		const fetchMock = vi.fn().mockResolvedValue({
			ok: true,
			json: async () => apiResponse
		});
		vi.stubGlobal('fetch', fetchMock);

		const first = await getCurrencyRates('USD');
		expect(first.baseCode).toBe('USD');
		expect(first.rates.INR).toBe(83);

		await getCurrencyRates('USD');
		expect(fetchMock).toHaveBeenCalledTimes(1); // served from cache

		expect(getCachedCurrencyRates('USD')?.rates.EUR).toBe(0.9);
		expect(getCachedCurrencyRates('JPY')).toBeNull();
	});

	it('converts and reads exchange rates', async () => {
		vi.stubGlobal(
			'fetch',
			vi.fn().mockResolvedValue({ ok: true, json: async () => apiResponse })
		);
		expect(await convertCurrency(10, 'USD', 'INR')).toBe(830);
		expect(await getExchangeRate('USD', 'EUR')).toBe(0.9);
	});

	it('throws when an exchange rate is missing', async () => {
		vi.stubGlobal(
			'fetch',
			vi.fn().mockResolvedValue({ ok: true, json: async () => apiResponse })
		);
		await expect(getExchangeRate('USD', 'ZZZ')).rejects.toThrow();
	});

	it('throws when the API request fails and there is no cache', async () => {
		vi.stubGlobal(
			'fetch',
			vi.fn().mockResolvedValue({ ok: false, status: 500, statusText: 'Server Error' })
		);
		await expect(getCurrencyRates('GBP')).rejects.toThrow();
	});

	it('clears the cache for a specific currency', async () => {
		vi.stubGlobal(
			'fetch',
			vi.fn().mockResolvedValue({ ok: true, json: async () => apiResponse })
		);
		await getCurrencyRates('USD');
		expect(getCachedCurrencyRates('USD')).not.toBeNull();
		clearCurrencyCache('USD');
		expect(getCachedCurrencyRates('USD')).toBeNull();
	});
});
