export declare const FILE_EXTENTIONS: string[];
export declare const FILE_VIEWER_HOST = "https://viewer.cloudparker.com";
/**
 * Reads a file as a data URL.
 * @param file - The file to read.
 * @returns A promise that resolves to a data URL string.
 */
export declare function readFileAsDataURL(file: File): Promise<string>;
/**
 * Reads the contents of a given File object as a text string.
 *
 * This function uses the FileReader API to read the file content and returns it as a string.
 *
 * @param file - The File object to be read.
 * @returns A promise that resolves to the text content of the file as a string.
 *
 * @throws An error if the file could not be read.
 *
 * @example
 * // Create a file and read its content as text
 * const myFile = new File(['Hello, world!'], 'example.txt', { type: 'text/plain' });
 * readFileAsText(myFile).then((text) => {
 *     console.log(text); // Output: "Hello, world!"
 * });
 */
export declare function readFileAsText(file: File): Promise<string>;
/**
 * Reads the contents of a given File object as an ArrayBuffer.
 *
 * This function uses the FileReader API to read the file content as a binary ArrayBuffer.
 *
 * @param file - The File object to be read.
 * @returns A promise that resolves to the binary content of the file as an ArrayBuffer.
 *
 * @throws An error if the file could not be read.
 *
 * @example
 * // Create a file and read its content as an ArrayBuffer
 * const myFile = new File(['Hello, world!'], 'example.txt', { type: 'text/plain' });
 * readFileAsBuffer(myFile).then((buffer) => {
 *     console.log(buffer); // Output: ArrayBuffer { ... }
 * });
 */
export declare function readFileAsBuffer(file: File): Promise<ArrayBuffer>;
/**
 * Converts a given URL to a File object by downloading the content from the URL.
 *
 * This function fetches the file content from the provided URL and converts it into a File object.
 * It attempts to extract the filename and MIME type from the HTTP headers. If these are not available,
 * it falls back to using the provided filename and MIME type or extracts the filename from the URL.
 *
 * @param url - The URL to download the file from.
 * @param givenFileName - Optional. The fallback name for the file if no name can be extracted from the URL or headers.
 * @param givenMimeType - Optional. The fallback MIME type for the file if no MIME type is available in the headers.
 * @returns A promise that resolves to a File object containing the downloaded content.
 *
 * @throws An error if the download fails or the file cannot be converted.
 *
 * @example
 * // Convert an image URL to a File object and log its properties
 * readUrlAsFile('https://example.com/image.png', 'downloaded-image.png', 'image/png')
 *     .then((file) => {
 *         console.log(file.name);  // Output: "downloaded-image.png"
 *         console.log(file.type);  // Output: "image/png"
 *     })
 *     .catch((error) => console.error('Error converting URL to file:', error.message));
 */
export declare function readUrlAsFile(url: string, givenFileName?: string, givenMimeType?: string): Promise<File>;
/**
 * Converts a given Data URL (Base64 or Data URL format) to a File object.
 *
 * @param dataUrl - The Data URL string to convert into a File object.
 * @param fileName - Optional. The name for the created file.
 * @param mimeType - Optional. The MIME type of the file. If not provided, it will be extracted from the Data URL.
 * @returns A promise that resolves to a File object containing the content of the Data URL.
 *
 * @example
 * // Convert a Base64 string to a File object
 * const base64String = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...';
 * readDataUrlAsFile(base64String, 'example.png', 'image/png')
 *     .then((file) => {
 *         console.log(file.name);  // Output: "example.png"
 *         console.log(file.type);  // Output: "image/png"
 *     });
 */
export declare function readDataUrlAsFile(dataUrl: string, fileName?: string, mimeType?: string): Promise<File>;
/**
 * Converts a given ArrayBuffer to a File object.
 *
 * This function wraps an ArrayBuffer in a File object with the provided filename and MIME type.
 *
 * @param buffer - The ArrayBuffer containing the file data.
 * @param fileName - The name for the created file.
 * @param mimeType - The MIME type for the created file.
 * @returns A promise that resolves to a File object created from the ArrayBuffer.
 *
 * @example
 * // Convert an ArrayBuffer to a File object
 * const buffer = new ArrayBuffer(8);
 * convertBufferToFile(buffer, 'example.bin', 'application/octet-stream').then((file) => {
 *     console.log(file.name);  // Output: "example.bin"
 *     console.log(file.type);  // Output: "application/octet-stream"
 * });
 */
export declare function convertBufferToFile(buffer: ArrayBuffer, fileName: string, mimeType: string): Promise<File>;
/**
 * Extracts the filename and extension from a given filename string.
 *
 * This function splits a filename into its base name and extension parts.
 * If no extension is present, the extension will be `undefined`.
 *
 * @param filename - The filename string to be processed.
 * @returns An object containing the base name and extension of the filename.
 *
 * @example
 * // Extract filename and extension
 * const { name, ext } = getFilenameExtension('example.txt');
 * console.log(name); // Output: "example"
 * console.log(ext);  // Output: "txt"
 */
export declare function getFilenameExtension(filename: string): {
    name: string;
    ext: string | undefined;
};
/**
 * Converts a file size in bytes to a human-readable string.
 *
 * This function converts a file size in bytes to a string representation with appropriate units
 * (e.g., B, kB, MB, GB, TB) based on the size.
 *
 * @param size - The file size in bytes.
 * @returns A human-readable string representing the file size.
 *
 * @example
 * const sizeString = fileSizeString(1024);
 * console.log(sizeString); // Output: "1 kB"
 */
export declare function formatFileSize(bytes?: number): string;
export declare function getExtFromFileType(type: string): string | null;
export declare function ellipsisFileNameAtCenter(name: string, sizeLimit?: number, startLength?: number, endLength?: number): string;
