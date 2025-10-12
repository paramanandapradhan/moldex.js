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
