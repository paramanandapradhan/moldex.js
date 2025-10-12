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
export function downloadFile(data, filename, mimeType) {
    // Determine the type of the data and handle accordingly
    if (typeof data === 'string') {
        if (isDataUrl(data)) {
            // Handle Data URL
            downloadDataUrl(data, filename || 'download', mimeType);
        }
        else if (isUrl(data)) {
            // Handle URL download
            downloadFromUrl(data, filename || getFilenameFromUrl(data));
        }
        else {
            // Handle plain string data
            downloadStringData(data, filename || 'download.txt', mimeType || 'application/octet-stream');
        }
    }
    else if (data instanceof File || data instanceof Blob) {
        // Handle File or Blob object
        downloadBlob(data, filename || data.name || 'download');
    }
    else {
        console.error('Unsupported data type for download.');
    }
}
/**
 * Downloads plain string data as a file.
 *
 * @param data - The string data to download.
 * @param filename - The name for the downloaded file.
 * @param mimeType - The MIME type of the file.
 */
export function downloadStringData(data, filename, mimeType) {
    const blob = new Blob([data], { type: mimeType });
    downloadBlob(blob, filename);
}
/**
 * Downloads a file from a given URL.
 *
 * @param url - The URL to download the file from.
 * @param filename - The name for the downloaded file.
 */
export function downloadFromUrl(url, filename) {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
/**
 * Downloads a file from a Data URL (Base64 encoded string).
 *
 * @param dataUrl - The Data URL to download.
 * @param filename - The name for the downloaded file.
 * @param mimeType - Optional. The MIME type of the file.
 */
export function downloadDataUrl(dataUrl, filename, mimeType) {
    const blob = dataUrlToBlob(dataUrl, mimeType);
    downloadBlob(blob, filename);
}
/**
 * Downloads a File or Blob object.
 *
 * @param file - The File or Blob object to download.
 * @param filename - The name for the downloaded file.
 */
export function downloadBlob(file, filename) {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(file);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    // Clean up the URL object to free up memory
    URL.revokeObjectURL(link.href);
    document.body.removeChild(link);
}
/**
 * Converts a Data URL to a Blob object.
 *
 * @param dataUrl - The Data URL to convert.
 * @param mimeType - Optional. The MIME type of the resulting Blob.
 * @returns A Blob object representing the data.
 */
export function dataUrlToBlob(dataUrl, mimeType) {
    const byteString = atob(dataUrl.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeType || 'application/octet-stream' });
}
/**
 * Determines if a given string is a valid Data URL.
 *
 * @param str - The string to validate.
 * @returns A boolean indicating whether the string is a valid Data URL.
 */
export function isDataUrl(str) {
    const pattern = /^data:([a-zA-Z0-9/+.-]+);base64,/;
    return pattern.test(str);
}
/**
 * Determines if a given string is a valid URL.
 *
 * @param str - The string to validate.
 * @returns A boolean indicating whether the string is a valid URL.
 */
export function isUrl(str) {
    try {
        new URL(str);
        return true;
    }
    catch (_) {
        return false;
    }
}
/**
 * Extracts the filename from a URL.
 *
 * @param url - The URL string.
 * @returns The extracted filename, or 'download' if the URL does not contain a filename.
 */
export function getFilenameFromUrl(url) {
    const segments = url.split('/');
    const filename = segments.pop();
    return filename && filename.includes('.') ? filename : 'download';
}
