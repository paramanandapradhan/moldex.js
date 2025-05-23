

const belowTwenty = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
const scales = ["", "Thousand", "Lakh", "Crore"];

export enum CurrencySymbols {
    AED = "د.إ",
    AUD = "$",
    BDT = "৳",
    BHD = ".د.ب",
    BRL = "R$",
    CAD = "$",
    CHF = "CHF",
    CNY = "¥",
    CZK = "Kč",
    DKK = "kr",
    EGP = "£",
    EUR = "€",
    GBP = "£",
    HKD = "$",
    HUF = "Ft",
    IDR = "Rp",
    ILS = "₪",
    INR = "₹",
    JOD = "د.ا",
    JPY = "¥",
    KRW = "₩",
    KWD = "د.ك",
    LKR = "Rs",
    MXN = "$",
    MYR = "RM",
    NGN = "₦",
    NOK = "kr",
    NPR = "₨",
    NZD = "$",
    OMR = "ر.ع.",
    PHP = "₱",
    PKR = "₨",
    PLN = "zł",
    QAR = "ر.ق",
    RUB = "₽",
    SAR = "﷼",
    SEK = "kr",
    SGD = "$",
    THB = "฿",
    TRY = "₺",
    USD = "$",
    VND = "₫",
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
export function numberToWords(num: number): string {
    if (num === 0) return "Zero";

    const crore = Math.floor(num / 10000000);
    const lakh = Math.floor((num % 10000000) / 100000);
    const thousand = Math.floor((num % 100000) / 1000);
    const hundred = Math.floor((num % 1000) / 100);
    const remainder = num % 100;

    let result = '';

    if (crore > 0) {
        result += `${convertTwoDigits(crore)} Crore`;
    }
    if (lakh > 0) {
        result += result ? `, ${convertTwoDigits(lakh)} Lakh` : `${convertTwoDigits(lakh)} Lakh`;
    }
    if (thousand > 0) {
        result += result ? `, ${convertTwoDigits(thousand)} Thousand` : `${convertTwoDigits(thousand)} Thousand`;
    }
    if (hundred > 0) {
        result += result ? `, ${convertTwoDigits(hundred)} Hundred` : `${convertTwoDigits(hundred)} Hundred`;
    }
    if (remainder > 0) {
        result += result ? ` and ${convertTwoDigits(remainder)}` : `${convertTwoDigits(remainder)}`;
    }

    return result.trim();
}

/**
 * Converts a two-digit number into words.
 * 
 * @param num - The number to convert.
 * @returns The number in words.
 */
export function convertTwoDigits(num: number): string {
    if (num < 20) {
        return belowTwenty[num];
    }
    const ten = Math.floor(num / 10);
    const unit = num % 10;
    return `${tens[ten]}${unit ? " " + belowTwenty[unit] : ""}`;
}


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
export function toCurrency(value: number = 0, symbol: string = '$'): string {
    const isNegative = value < 0;
    const currencyValue = Math.abs(value).toFixed(2);
    return `${isNegative ? '- ' : ''}${symbol} ${currencyValue}`;
}


/**
 * Formats a number into Indian currency format with commas
 * Example: 1234567890.50 -> "1,23,45,67,890.50"
 * 
 * @param amount - The number to format (can include decimals).
 * @returns A string formatted with commas as per the Indian numbering system.
 */
export function formatIndianCurrency(amount: number | string): string {
    let amountStr = typeof amount === 'number' ? amount.toFixed(2) : parseFloat(amount).toFixed(2);
    let [integerPart, decimalPart] = amountStr.split(".");
    let lastThreeDigits = integerPart.slice(-3);
    let otherDigits = integerPart.slice(0, -3);
    if (otherDigits !== "") {
        otherDigits = otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
    }

    return otherDigits + (otherDigits ? "," : "") + lastThreeDigits + "." + decimalPart;
}

