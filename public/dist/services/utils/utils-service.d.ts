/**
 * Generates a random number between the specified minimum and maximum values (inclusive of the minimum and exclusive of the maximum).
 *
 * @param min - The minimum value (inclusive) of the random number range.
 * @param max - The maximum value (exclusive) of the random number range.
 * @returns A random number between `min` (inclusive) and `max` (exclusive).
 *
 * @example
 * // Generate a random number between 1 (inclusive) and 5 (exclusive)
 * const randomNumber = random(1, 5); // Possible values: 1.0, 2.4, 3.6, etc.
 *
 * @example
 * // Generate a random number between 10 (inclusive) and 20 (exclusive)
 * const randomNumber = random(10, 20); // Possible values: 10.0, 15.3, 19.8, etc.
 */
export declare function random(min: number, max: number): number;
/**
 * Strips the Base64 content from a Data URL string.
 *
 * This function removes the `data:[<mediatype>][;base64],` prefix from a Data URL string,
 * leaving only the Base64 content. If the input is not a valid Data URL, the original input is returned.
 *
 * @param dataUrl - The Data URL string to be stripped.
 * @returns The stripped Base64 content, or the original string if it is not a valid Data URL.
 *
 * @example
 * // Remove the prefix from a Data URL string
 * const dataUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...';
 * const base64Content = stripDataUrl(dataUrl);
 * console.log(base64Content); // Output: "iVBORw0KGgoAAAANSUhEUgAA..."
 */
export declare function stripDataUrl(dataUrl: string): string;
/**
* Function to download content from a given URL and convert it to a Base64-encoded string.
* @param url - The URL to download the content from.
* @returns A promise that resolves to the Base64-encoded string of the downloaded content.
*/
export declare function readUrlAsBase64(url: string): Promise<string>;
/**
 * Validates if a given string is a valid email address.
 *
 * This function uses a regular expression to validate email addresses based on common patterns.
 *
 * @param email - The email address string to validate.
 * @returns A boolean indicating whether the email is valid.
 *
 * @example
 * const isValid = isValidEmailAddress('test@example.com');
 * console.log(isValid); // Output: true
 */
export declare function isValidEmailAddress(email: string): boolean;
/**
 * Validates if a given string is a valid URL.
 *
 * This function uses a regular expression to validate URLs based on common URL patterns.
 *
 * @param url - The URL string to validate.
 * @returns A boolean indicating whether the URL is valid.
 *
 * @example
 * const isValid = isValidUrl('https://www.example.com');
 * console.log(isValid); // Output: true
 */
export declare function isValidUrl(url: string): boolean;
/**
 * Creates a mailto URI and opens it in the user's default email client.
 *
 * This function constructs a mailto URI based on the provided email details and opens it using `window.open`.
 * It supports specifying the recipient, subject, and body of the email.
 *
 * @param param - An object containing the email details:
 *    - `to`: The recipient email address.
 *    - `body`: Optional. The body content of the email.
 *    - `subject`: Optional. The subject of the email.
 *
 * @example
 * // Create a mailto link with recipient, subject, and body
 * createMailtoLink({
 *     to: 'recipient@example.com',
 *     subject: 'Hello',
 *     body: 'This is a sample email message.'
 * });
 */
export declare function createMailtoLink({ to, body, subject }: {
    to: string;
    body?: string;
    subject?: string;
}): void;
/**
 * Copies the provided text or HTML content to the clipboard.
 *
 * This function handles copying both plain text and rich text (HTML) content.
 * It uses the Clipboard API where available and falls back to older methods for unsupported browsers.
 *
 * @param content - The content to be copied to the clipboard. It can be either a string (plain text) or an HTMLElement (rich text).
 * @returns A promise that resolves to `true` if the copy operation is successful, or `false` otherwise.
 *
 * @example
 * // Copy plain text to clipboard
 * copyToClipboard('Hello, World!').then((success) => {
 *     console.log(success ? 'Copied successfully!' : 'Failed to copy.');
 * });
 *
 * @example
 * // Copy rich text (HTML element) to clipboard
 * const element = document.getElementById('myElement');
 * if (element) {
 *     copyToClipboard(element).then((success) => {
 *         console.log(success ? 'Copied successfully!' : 'Failed to copy.');
 *     });
 * }
 */
export declare function copyToClipboard(content: string | HTMLElement): Promise<boolean>;
/**
 * Formats a string by replacing placeholders `{index}` with corresponding arguments.
 *
 * This function replaces placeholders in the format `{0}`, `{1}`, etc., in the provided string
 * with the corresponding values from the `args` array.
 *
 * @param str - The string containing placeholders.
 * @param args - The values to replace the placeholders with.
 * @returns A formatted string with the placeholders replaced by the corresponding arguments.
 *
 * @example
 * const formatted = formatString('Hello, {0}!', 'World');
 * console.log(formatted); // Output: "Hello, World!"
 */
export declare function formatString(str: string, ...args: any[]): string;
/**
 * Delays the execution of code for a specified number of milliseconds.
 *
 * This function returns a promise that resolves after the specified delay.
 *
 * @param milliseconds - The number of milliseconds to wait before resolving the promise. Default is 0.
 * @returns A promise that resolves after the specified delay.
 *
 * @example
 * delay(1000).then(() => console.log('1 second later'));
 */
export declare function delay(milliseconds?: number): Promise<void>;
/**
 * Sorts an array of objects or values based on a specified field or value.
 *
 * This function sorts an array of objects based on a specified field or directly sorts an array of values.
 * It supports both ascending and descending orders and can handle date values.
 *
 * @typeParam T - The type of elements in the array.
 * @param param - An object containing the array to sort, the field to sort by (optional),
 *                whether to sort in descending order, and whether to sort as date values.
 * @param param.array - The array of objects or values to sort.
 * @param param.field - Optional. The field of the objects to sort by.
 * @param param.desc - Optional. If true, sorts in descending order. Default is false (ascending).
 * @param param.isDate - Optional. If true, sorts the values as dates.
 * @returns The sorted array.
 *
 * @example
 * const arr = [{ name: 'Alice' }, { name: 'Bob' }];
 * const sortedArr = sort({ array: arr, field: 'name', desc: true });
 * console.log(sortedArr); // Output: [{ name: 'Bob' }, { name: 'Alice' }]
 */
export declare function sort<T>({ array, field, desc, isDate }: {
    array: T[];
    field?: keyof T;
    desc?: boolean;
    isDate?: boolean;
}): T[];
/**
 * Triggers a vibration effect on supported devices.
 *
 * This function uses the Vibration API to trigger a vibration effect. If the Vibration API is not
 * supported or if permissions are not granted, the function will have no effect.
 *
 * @param value - A single number representing the duration of the vibration in milliseconds, or
 *                an array of numbers representing vibration patterns.
 *
 * @example
 * // Single vibration for 200 milliseconds
 * vibrate(200);
 *
 * @example
 * // Vibration pattern: 200ms on, 100ms off, 200ms on
 * vibrate([200, 100, 200]);
 */
export declare function vibrate(value?: number | number[]): void;
/**
 * Plays a simple click effect using the vibration API (if supported).
 *
 * This function triggers a short vibration effect to simulate a click or feedback action on devices
 * that support the Vibration API.
 *
 * @example
 * playClickEffect(); // Triggers a short vibration effect.
 */
export declare function playClickEffect(): void;
/**
 * Converts an object into an array of its values, attaching a specified key to each value.
 *
 * This function takes an object and converts it into an array of its values, where each value is
 * augmented with a new property specified by the `key` parameter. The property is set to the key
 * of the original object.
 *
 * @param key - The property name to attach to each value.
 * @param obj - The object to be converted to an array.
 * @returns An array of values with the specified key attached.
 *
 * @example
 * const obj = { a: { name: 'Alice' }, b: { name: 'Bob' } };
 * const array = toArrayByKey('id', obj);
 * console.log(array); // Output: [{ name: 'Alice', id: 'a' }, { name: 'Bob', id: 'b' }]
 */
export declare function toArrayByKey(key: string, obj?: Record<string, any>): any[];
/**
 * Converts a numeric string into its corresponding alphabets (0-9 => a-j).
 *
 * This function maps each digit in the provided number to its corresponding alphabet:
 * - 0 => a, 1 => b, 2 => c, ... , 9 => j.
 *
 * @param num - The number to be converted to a string of alphabets.
 * @returns A string representing the number converted to alphabets.
 *
 * @example
 * const result = convertNumToAlphabets(123); // "bcd"
 * console.log(result); // Output: "bcd"
 */
export declare function convertNumToAlphabets(num: number): string;
/**
 * Converts a length in inches to pixels based on a DPI of 96.
 *
 * This function converts inches to pixels assuming a screen DPI (Dots Per Inch) of 96.
 * It is useful for calculating dimensions in pixels when working with different units of measurement.
 *
 * @param inches - The length in inches to be converted to pixels.
 * @returns The length in pixels corresponding to the provided inches.
 *
 * @throws An error if the input is not a valid number or is negative.
 *
 * @example
 * const pixels = inchToPixel(1); // 1 inch to pixels
 * console.log(pixels); // Output: 96
 */
export declare function inchToPixel(inches: number): number;
/**
 * Converts a length in pixels to inches based on a DPI of 96.
 *
 * This function converts pixels to inches assuming a screen DPI (Dots Per Inch) of 96.
 * It is useful for converting pixel measurements to physical dimensions.
 *
 * @param pixels - The length in pixels to be converted to inches.
 * @returns The length in inches corresponding to the provided pixels.
 *
 * @throws An error if the input is not a valid number or is negative.
 *
 * @example
 * const inches = pixelToInch(96); // 96 pixels to inches
 * console.log(inches); // Output: 1
 */
export declare function pixelToInch(pixels: number): number;
export declare function alphabetNanoid(length?: number, lowercase?: boolean): string;
export declare function sanitizePhoneNumber(input: string): string;
export declare function isChrome(): boolean;
