import { toDate } from '../date/date-service';
import { customAlphabet } from 'nanoid'

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
export function random(min: number, max: number): number {
    if (min >= max) {
        throw new Error('The "max" value must be greater than the "min" value.');
    }
    return min + Math.random() * (max - min);
}


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
export function stripDataUrl(dataUrl: string): string {
    if (typeof dataUrl === 'string' && dataUrl.startsWith('data:')) {
        return dataUrl.split(',')[1] || '';
    }
    return dataUrl;
}

/**
* Function to download content from a given URL and convert it to a Base64-encoded string.
* @param url - The URL to download the content from.
* @returns A promise that resolves to the Base64-encoded string of the downloaded content.
*/
export async function readUrlAsBase64(url: string,): Promise<string> {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        const arrayBuffer = await response.arrayBuffer();

        const base64Content = btoa(
            new Uint8Array(arrayBuffer)
                .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );

        return base64Content;
    } catch (error) {
        console.error('Error downloading or converting content:', error);
        throw error;
    }
}

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
export function isValidEmailAddress(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email.toLowerCase());
}

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
export function isValidUrl(url: string): boolean {
    const urlPattern = new RegExp(
        '^(https?:\\/\\/)?' + // Protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // Domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // Port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // Query string
        '(\\#[-a-z\\d_]*)?$',
        'i'
    ); // Fragment locator
    return urlPattern.test(url);
}

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
export function createMailtoLink({ to, body = '', subject = '' }: { to: string; body?: string; subject?: string }): void {
    const mailtoUri = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUri, '_self');
}

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
export async function copyToClipboard(content: string | HTMLElement): Promise<boolean> {
    try {
        // If content is a string, attempt to copy it using the Clipboard API
        if (typeof content === 'string') {
            if (navigator.clipboard) {
                await navigator.clipboard.writeText(content);
                return true;
            } else {
                // Fallback for older browsers
                const textarea = document.createElement('textarea');
                textarea.value = content;
                textarea.setAttribute('readonly', '');
                textarea.style.position = 'absolute';
                textarea.style.left = '-9999px';
                document.body.appendChild(textarea);
                textarea.select();
                textarea.setSelectionRange(0, 99999); // For mobile devices
                const successful = document.execCommand('copy');
                document.body.removeChild(textarea);
                return successful;
            }
        }

        // If content is an HTML element, copy its contents as rich text
        if (content instanceof HTMLElement) {
            const range = document.createRange();
            range.selectNodeContents(content);
            const selection = window.getSelection();
            if (!selection) return false;

            selection.removeAllRanges();
            selection.addRange(range);

            // Execute the copy command
            const successful = document.execCommand('copy');
            selection.removeAllRanges();

            return successful;
        }

        return false; // Unsupported content type
    } catch (error) {
        console.error('Failed to copy content to clipboard:', error);
        return false;
    }
}


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
export function formatString(str: string, ...args: any[]): string {
    return args.reduce((formatted, arg, index) => {
        const regexp = new RegExp(`\\{${index}\\}`, 'g');
        return formatted.replace(regexp, arg);
    }, str);
}

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
export function delay(milliseconds: number = 0): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

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
export function sort<T>({ array, field, desc = false, isDate = false }:
    { array: T[], field?: keyof T, desc?: boolean, isDate?: boolean }): T[] {
    return array.sort((a, b) => {
        let valA: any = field ? a[field] : a;
        let valB: any = field ? b[field] : b;

        // Convert to Date objects if sorting by date
        if (isDate) {
            valA = toDate(valA as any);
            valB = toDate(valB as any);
        } else {
            // Convert to lowercase for case-insensitive string comparison
            if (typeof valA === 'string') valA = valA.toLowerCase();
            if (typeof valB === 'string') valB = valB.toLowerCase();
        }

        // Perform comparison and adjust for descending order if specified
        if (valA < valB) return desc ? 1 : -1;
        if (valA > valB) return desc ? -1 : 1;
        return 0;
    });
}

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
export function vibrate(value: number | number[] = 20): void {
    if (navigator?.vibrate) {
        navigator.vibrate(value);
    }
}

/**
 * Plays a simple click effect using the vibration API (if supported).
 * 
 * This function triggers a short vibration effect to simulate a click or feedback action on devices
 * that support the Vibration API.
 * 
 * @example
 * playClickEffect(); // Triggers a short vibration effect.
 */
export function playClickEffect(): void {
    vibrate(20);
}

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
export function toArrayByKey(key: string, obj: Record<string, any> = {}): any[] {
    return Object.keys(obj)
        .map((k) => {
            const data = obj[k];
            if (data) {
                data[key] = k;
            }
            return data;
        })
        .filter((item) => item !== undefined);
}

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
export function convertNumToAlphabets(num: number): string {
    const alphabets = 'abcdefghij';
    return num
        .toString()
        .split('')
        .map((digit) => alphabets[parseInt(digit, 10)] || '')
        .join('');
}

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
export function inchToPixel(inches: number): number {
    if (typeof inches !== 'number' || isNaN(inches) || inches < 0) {
        throw new Error('Invalid input: Inches must be a non-negative number.');
    }
    const DPI = 96; // Default DPI for screen resolution
    return inches * DPI;
}

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
export function pixelToInch(pixels: number): number {
    if (typeof pixels !== 'number' || isNaN(pixels) || pixels < 0) {
        throw new Error('Invalid input: Pixels must be a non-negative number.');
    }
    const DPI = 96; // Default DPI for screen resolution
    return pixels / DPI;
}


export function alphabetNanoid(length: number = 10, lowercase: boolean = false): string {
    let alphabet: string = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)).join('');

    if (lowercase) {
        alphabet = alphabet.toLowerCase();
    }

    const nanoid = customAlphabet(alphabet, length);
    return nanoid();
}

export function sanitizePhoneNumber(input: string): string {
    return input.replace(/\D/g, "");
}



export function isChrome() {
    // Chrome's userAgent contains "Chrome", and its vendor contains "Google Inc"
    // Note: Microsoft Edge's userAgent also contains "Chrome"
    return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
}


 