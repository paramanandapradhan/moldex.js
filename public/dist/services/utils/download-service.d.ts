/**
 * Downloads a file from various data sources (string, URL, Data URL, or File object).
 *
 * This function handles downloading files from a variety of sources, including:
 * - String data (text, JSON, etc.)
 * - URLs (file URLs or remote URLs)
 * - Data URLs (Base64 encoded strings)
 * - File or Blob objects
 *
 * @param data - The data to download. It can be a string, URL, Data URL, or a File/Blob object.
 * @param filename - The name for the downloaded file.
 * @param mimeType - Optional. The MIME type of the file. Default is 'application/octet-stream'.
 *
 * @example
 * // Download a string as a text file
 * downloadFile('Hello, world!', 'example.txt', 'text/plain');
 *
 * @example
 * // Download a file from a URL
 * downloadFile('https://example.com/file.pdf', 'downloaded-file.pdf');
 *
 * @example
 * // Download a file from a Data URL
 * const dataUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...';
 * downloadFile(dataUrl, 'image.png');
 *
 * @example
 * // Download a File object
 * const myFile = new File(['Hello, world!'], 'example.txt', { type: 'text/plain' });
 * downloadFile(myFile);
 */
export declare function downloadFile(data: string | URL | File | Blob, filename?: string, mimeType?: string): void;
/**
 * Downloads plain string data as a file.
 *
 * @param data - The string data to download.
 * @param filename - The name for the downloaded file.
 * @param mimeType - The MIME type of the file.
 */
export declare function downloadStringData(data: string, filename: string, mimeType: string): void;
/**
 * Downloads a file from a given URL.
 *
 * @param url - The URL to download the file from.
 * @param filename - The name for the downloaded file.
 */
export declare function downloadFromUrl(url: string, filename: string): void;
/**
 * Downloads a file from a Data URL (Base64 encoded string).
 *
 * @param dataUrl - The Data URL to download.
 * @param filename - The name for the downloaded file.
 * @param mimeType - Optional. The MIME type of the file.
 */
export declare function downloadDataUrl(dataUrl: string, filename: string, mimeType?: string): void;
/**
 * Downloads a File or Blob object.
 *
 * @param file - The File or Blob object to download.
 * @param filename - The name for the downloaded file.
 */
export declare function downloadBlob(file: Blob, filename: string): void;
/**
 * Converts a Data URL to a Blob object.
 *
 * @param dataUrl - The Data URL to convert.
 * @param mimeType - Optional. The MIME type of the resulting Blob.
 * @returns A Blob object representing the data.
 */
export declare function dataUrlToBlob(dataUrl: string, mimeType?: string): Blob;
/**
 * Determines if a given string is a valid Data URL.
 *
 * @param str - The string to validate.
 * @returns A boolean indicating whether the string is a valid Data URL.
 */
export declare function isDataUrl(str: string): boolean;
/**
 * Determines if a given string is a valid URL.
 *
 * @param str - The string to validate.
 * @returns A boolean indicating whether the string is a valid URL.
 */
export declare function isUrl(str: string): boolean;
/**
 * Extracts the filename from a URL.
 *
 * @param url - The URL string.
 * @returns The extracted filename, or 'download' if the URL does not contain a filename.
 */
export declare function getFilenameFromUrl(url: string): string;
