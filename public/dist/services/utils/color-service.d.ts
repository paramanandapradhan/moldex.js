/**
 * Validates whether a given string is a valid hexadecimal color code.
 *
 * This function checks if a given string matches the pattern for a valid hex color code,
 * which can be either 3 or 6 characters long, prefixed with '#'.
 *
 * @param hex - The string to validate as a hex color code.
 * @returns A boolean indicating whether the string is a valid hex color code.
 *
 * @example
 * console.log(isValidHexColor('#FFF'));   // Output: true
 * console.log(isValidHexColor('#123ABC')); // Output: true
 * console.log(isValidHexColor('#1234'));   // Output: false
 */
export declare function isValidHexColor(hex: string): boolean;
/**
 * Converts a named or RGB color string to its hexadecimal representation.
 *
 * This function creates a temporary DOM element, sets its color property to the provided color string,
 * and retrieves the computed color value. It then converts the RGB color to a hexadecimal format.
 *
 * @param color - A color string, such as a named color ('red'), RGB color ('rgb(255, 0, 0)'), or hex color ('#FF0000').
 * @returns The hexadecimal representation of the color.
 *
 * @throws An error if the color cannot be parsed.
 *
 * @example
 * console.log(colorToHex('red'));        // Output: #FF0000
 * console.log(colorToHex('rgb(0, 255, 0)')); // Output: #00FF00
 */
export declare function colorToHex(color: string): string;
/**
 * Converts RGB values to a hexadecimal color code.
 *
 * This function takes the red, green, and blue components and converts them to a hexadecimal string.
 * The resulting hex code is formatted as '#RRGGBB'.
 *
 * @param r - The red component (0-255).
 * @param g - The green component (0-255).
 * @param b - The blue component (0-255).
 * @returns The hexadecimal color code in the format '#RRGGBB'.
 *
 * @example
 * console.log(rgbToHex(255, 0, 0)); // Output: #FF0000
 */
export declare function rgbToHex(r: number, g: number, b: number): string;
