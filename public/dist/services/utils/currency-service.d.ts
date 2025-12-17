export declare enum CurrencySymbols {
    AED = "\u062F.\u0625",
    AUD = "$",
    BDT = "\u09F3",
    BHD = ".\u062F.\u0628",
    BRL = "R$",
    CAD = "$",
    CHF = "CHF",
    CNY = "\u00A5",
    CZK = "K\u010D",
    DKK = "kr",
    EGP = "\u00A3",
    EUR = "\u20AC",
    GBP = "\u00A3",
    HKD = "$",
    HUF = "Ft",
    IDR = "Rp",
    ILS = "\u20AA",
    INR = "\u20B9",
    JOD = "\u062F.\u0627",
    JPY = "\u00A5",
    KRW = "\u20A9",
    KWD = "\u062F.\u0643",
    LKR = "Rs",
    MXN = "$",
    MYR = "RM",
    NGN = "\u20A6",
    NOK = "kr",
    NPR = "\u20A8",
    NZD = "$",
    OMR = "\u0631.\u0639.",
    PHP = "\u20B1",
    PKR = "\u20A8",
    PLN = "z\u0142",
    QAR = "\u0631.\u0642",
    RUB = "\u20BD",
    SAR = "\uFDFC",
    SEK = "kr",
    SGD = "$",
    THB = "\u0E3F",
    TRY = "\u20BA",
    USD = "$",
    VND = "\u20AB",
    ZAR = "R"
}
export interface CurrencyRates {
    [currencyCode: string]: number;
}
export interface CurrencyApiResponse {
    result: string;
    provider: string;
    documentation: string;
    terms_of_use: string;
    time_last_update_unix: number;
    time_last_update_utc: string;
    time_next_update_unix: number;
    time_next_update_utc: string;
    time_eol_unix: number;
    base_code: string;
    rates: CurrencyRates;
}
export interface CurrencyData {
    baseCode: string;
    rates: CurrencyRates;
    lastUpdate: string;
    nextUpdate: string;
}
/**
 * Converts a number into words based on the Indian numbering system.
 * Supports up to Crore level and works for numbers up to 99 Crore.
 *
 * @param num - The number to convert to words.
 * @returns A string representing the number in words.
 *
 * @example
 * numberToWords(190005000) // Output: "Nineteen Crore, Fifty Thousand"
 * numberToWords(123456789) // Output: "Twelve Crore, Thirty-Four Lakh, Fifty-Six Thousand, Seven Hundred and Eighty-Nine"
 */
export declare function numberToWords(num: number): string;
/**
 * Converts a two-digit number into words.
 *
 * @param num - The number to convert.
 * @returns The number in words.
 */
export declare function convertTwoDigits(num: number): string;
/**
 * Converts a number to a currency-formatted string.
 *
 * This function formats a given number as a currency string, using a specified currency symbol
 * (default is '$'). It handles negative values by adding a '-' sign in front of the formatted value.
 *
 * @param value - The numeric value to format as currency.
 * @param symbol - The currency symbol to use. Default is '$'.
 * @returns A formatted string representing the currency value.
 *
 * @example
 * const formattedValue = toCurrency(1234.56, '$');
 * console.log(formattedValue); // Output: "$ 1234.56"
 *
 * @example
 * const formattedNegative = toCurrency(-1234.56, '€');
 * console.log(formattedNegative); // Output: "- € 1234.56"
 */
export declare function toCurrency(value?: number, symbol?: string): string;
/**
 * Formats a number into Indian currency format with commas
 * Example: 1234567890.50 -> "1,23,45,67,890.50"
 *
 * @param amount - The number to format (can include decimals).
 * @returns A string formatted with commas as per the Indian numbering system.
 */
export declare function formatIndianCurrency(amount: number | string): string;
/**
 * Fetches currency exchange rates for a given base currency
 * @param baseCurrency - The base currency code (e.g., 'USD', 'EUR', 'INR')
 * @param forceRefresh - Force a refresh even if cached data exists (default: false)
 * @returns Currency data with exchange rates
 * @throws Error if the API request fails
 */
export declare function getCurrencyRates(baseCurrency?: string, forceRefresh?: boolean): Promise<CurrencyData>;
/**
 * Converts an amount from one currency to another
 * @param amount - The amount to convert
 * @param fromCurrency - The source currency code
 * @param toCurrency - The target currency code
 * @returns The converted amount
 */
export declare function convertCurrency(amount: number, fromCurrency: string, toCurrency: string): Promise<number>;
/**
 * Gets a specific exchange rate between two currencies
 * @param fromCurrency - The source currency code
 * @param toCurrency - The target currency code
 * @returns The exchange rate
 */
export declare function getExchangeRate(fromCurrency: string, toCurrency: string): Promise<number>;
/**
 * Clears the currency cache for a specific currency or all currencies
 * @param baseCurrency - Optional base currency to clear, if not provided clears all
 */
export declare function clearCurrencyCache(baseCurrency?: string): void;
/**
 * Gets the cached currency data without fetching
 * @param baseCurrency - The base currency code
 * @returns Cached currency data or null if not cached
 */
export declare function getCachedCurrencyRates(baseCurrency: string): CurrencyData | null;
/**
 * Formats a currency amount with the appropriate symbol and formatting
 * @param amount - The amount to format
 * @param currencyCode - The currency code (e.g., 'USD', 'EUR', 'INR')
 * @param locale - The locale for formatting (defaults to 'en-US')
 * @returns Formatted currency string
 */
export declare function formatCurrency(amount: number, currencyCode: string, locale?: string): string;
