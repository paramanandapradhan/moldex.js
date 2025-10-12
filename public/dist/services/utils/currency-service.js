const belowTwenty = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
const scales = ["", "Thousand", "Lakh", "Crore"];
export var CurrencySymbols;
(function (CurrencySymbols) {
    CurrencySymbols["AED"] = "\u062F.\u0625";
    CurrencySymbols["AUD"] = "$";
    CurrencySymbols["BDT"] = "\u09F3";
    CurrencySymbols["BHD"] = ".\u062F.\u0628";
    CurrencySymbols["BRL"] = "R$";
    CurrencySymbols["CAD"] = "$";
    CurrencySymbols["CHF"] = "CHF";
    CurrencySymbols["CNY"] = "\u00A5";
    CurrencySymbols["CZK"] = "K\u010D";
    CurrencySymbols["DKK"] = "kr";
    CurrencySymbols["EGP"] = "\u00A3";
    CurrencySymbols["EUR"] = "\u20AC";
    CurrencySymbols["GBP"] = "\u00A3";
    CurrencySymbols["HKD"] = "$";
    CurrencySymbols["HUF"] = "Ft";
    CurrencySymbols["IDR"] = "Rp";
    CurrencySymbols["ILS"] = "\u20AA";
    CurrencySymbols["INR"] = "\u20B9";
    CurrencySymbols["JOD"] = "\u062F.\u0627";
    CurrencySymbols["JPY"] = "\u00A5";
    CurrencySymbols["KRW"] = "\u20A9";
    CurrencySymbols["KWD"] = "\u062F.\u0643";
    CurrencySymbols["LKR"] = "Rs";
    CurrencySymbols["MXN"] = "$";
    CurrencySymbols["MYR"] = "RM";
    CurrencySymbols["NGN"] = "\u20A6";
    CurrencySymbols["NOK"] = "kr";
    CurrencySymbols["NPR"] = "\u20A8";
    CurrencySymbols["NZD"] = "$";
    CurrencySymbols["OMR"] = "\u0631.\u0639.";
    CurrencySymbols["PHP"] = "\u20B1";
    CurrencySymbols["PKR"] = "\u20A8";
    CurrencySymbols["PLN"] = "z\u0142";
    CurrencySymbols["QAR"] = "\u0631.\u0642";
    CurrencySymbols["RUB"] = "\u20BD";
    CurrencySymbols["SAR"] = "\uFDFC";
    CurrencySymbols["SEK"] = "kr";
    CurrencySymbols["SGD"] = "$";
    CurrencySymbols["THB"] = "\u0E3F";
    CurrencySymbols["TRY"] = "\u20BA";
    CurrencySymbols["USD"] = "$";
    CurrencySymbols["VND"] = "\u20AB";
    CurrencySymbols["ZAR"] = "R";
})(CurrencySymbols || (CurrencySymbols = {}));
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
export function numberToWords(num) {
    if (num === 0)
        return "Zero";
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
export function convertTwoDigits(num) {
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
export function toCurrency(value = 0, symbol = '$') {
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
export function formatIndianCurrency(amount) {
    let amountStr = typeof amount === 'number' ? amount.toFixed(2) : parseFloat(amount).toFixed(2);
    let [integerPart, decimalPart] = amountStr.split(".");
    let lastThreeDigits = integerPart.slice(-3);
    let otherDigits = integerPart.slice(0, -3);
    if (otherDigits !== "") {
        otherDigits = otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
    }
    return otherDigits + (otherDigits ? "," : "") + lastThreeDigits + "." + decimalPart;
}
