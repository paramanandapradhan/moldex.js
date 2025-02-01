export const FILE_EXTENTIONS = [
    "java", "js", "ts", "json", "c", "cpp", "cs", "py", "ts", "php", "rb", "swift", "go",
    "rs", "kt", "scala", "pl", "lua", "hs", "sh", "ps1", "dart", "jl", "m", "f90", "txt",
    "r", "groovy", "asm", "pas", "ada", "sql", "md", "html", "css", "xml", "yaml", "xml",
    "bat",
]

export const FILE_VIEWER_HOST = 'https://viewer.cloudparker.com';


/**
 * Reads a file as a data URL.
 * @param file - The file to read.
 * @returns A promise that resolves to a data URL string.
 */
export function readFileAsDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
    });
}

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
export async function readFileAsText(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        // Event handler executed when the file reading operation is completed
        reader.onloadend = function () {
            // Check if the file was read successfully
            if (reader.readyState === FileReader.DONE) {
                resolve(reader.result as string);
            } else {
                reject(new Error('Failed to read file as text.'));
            }
        };

        // Event handler executed when an error occurs while reading the file
        reader.onerror = function () {
            reject(new Error(`Error reading file: ${reader.error?.message || 'Unknown error'}`));
        };

        // Read the file content as a text string
        reader.readAsText(file);
    });
}



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
export async function readFileAsBuffer(file: File): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        // Event handler executed when the file reading operation is completed
        reader.onloadend = () => {
            if (reader.readyState === FileReader.DONE) {
                resolve(reader.result as ArrayBuffer);
            } else {
                reject(new Error('Failed to read file as ArrayBuffer.'));
            }
        };

        // Event handler executed when an error occurs while reading the file
        reader.onerror = () => {
            reject(new Error(`Error reading file as ArrayBuffer: ${reader.error?.message || 'Unknown error'}`));
        };

        // Read the file content as a binary ArrayBuffer
        reader.readAsArrayBuffer(file);
    });
}



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
export async function readUrlAsFile(url: string, givenFileName?: string, givenMimeType?: string): Promise<File> {
    try {
        const response = await fetch(url);

        // Check if the fetch request was successful
        if (!response.ok) {
            throw new Error(`Failed to fetch file from URL: ${response.statusText}`);
        }

        // Extract filename from the Content-Disposition header if available
        const contentDisposition = response.headers.get('Content-Disposition');
        let fileName = "";

        if (contentDisposition) {
            const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
            if (filenameMatch && filenameMatch[1]) {
                fileName = filenameMatch[1].replace(/['"]/g, '');
            }
        }

        // Fallback to using the URL's last segment as the filename if Content-Disposition is not available
        if (!fileName) {
            const urlSegments = url.split('/');
            fileName = urlSegments[urlSegments.length - 1] || 'downloaded-file';
        }

        // Get MIME type from the Content-Type header, if available
        const mimeType = response.headers.get('Content-Type') || givenMimeType || 'application/octet-stream';

        // Read the file content as an ArrayBuffer
        const buffer = await response.arrayBuffer();

        // Create a File object with the buffer, filename, and MIME type
        return new File([buffer], givenFileName || fileName, { type: mimeType });
    } catch (error: any) {
        throw new Error(`Error converting URL to file: ${error.message}`);
    }
}

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
export async function readDataUrlAsFile(dataUrl: string, fileName: string = 'file', mimeType?: string): Promise<File> {
    try {
        // Extract the MIME type from the Data URL if not provided
        const mimeTypeMatch = dataUrl.match(/^data:([^;]+);/);
        const extractedMimeType = mimeTypeMatch ? mimeTypeMatch[1] : mimeType;

        // Convert the Base64 portion of the Data URL to a binary string
        const binaryString = atob(dataUrl.split(',')[1]);

        // Convert the binary string to an ArrayBuffer
        const length = binaryString.length;
        const buffer = new Uint8Array(length);
        for (let i = 0; i < length; i++) {
            buffer[i] = binaryString.charCodeAt(i);
        }

        // Create and return a File object
        return new File([buffer], fileName, { type: extractedMimeType || 'application/octet-stream' });
    } catch (error: any) {
        throw new Error(`Error converting Data URL to file: ${error.message}`);
    }
}

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
export async function convertBufferToFile(buffer: ArrayBuffer, fileName: string, mimeType: string): Promise<File> {
    try {
        // Create and return a File object from the ArrayBuffer
        return new File([buffer], fileName, { type: mimeType });
    } catch (error: any) {
        throw new Error(`Error converting ArrayBuffer to file: ${error.message}`);
    }
}



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
export function getFilenameExtension(filename: string): { name: string, ext: string | undefined } {
    if (!filename) return { name: '', ext: undefined };

    const parts = filename.split('.');
    const ext = parts.length > 1 ? parts.pop() : undefined;
    const name = parts.join('.');

    return { name, ext };
}



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
export function formatFileSize(bytes: number = 0): string {
    if (bytes < 1024) {
        return bytes + ' Bytes';
    } else if (bytes < 1024 * 1024) {
        return (bytes / 1024).toFixed(2) + ' KB';
    } else if (bytes < 1024 * 1024 * 1024) {
        return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    } else {
        return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
    }
}


export function getExtFromFileType(type: string): string | null {
    const mimeTypes: { [key: string]: string } = {
        "image/jpeg": "jpg",
        "image/png": "png",
        "image/gif": "gif",
        "image/webp": "webp",
        "image/svg+xml": "svg",
        "video/mp4": "mp4",
        "video/webm": "webm",
        "video/ogg": "ogv",
        "audio/mpeg": "mp3",
        "audio/ogg": "ogg",
        "audio/wav": "wav",
        "application/pdf": "pdf",
        "application/json": "json",
        "application/javascript": "js",
        "text/html": "html",
        "text/css": "css",
        "text/plain": "txt",
        "application/zip": "zip",
        "application/x-rar-compressed": "rar",
        "application/xml": "xml"
    };

    return mimeTypes[type] || null;
}

export function ellipsisFileNameAtCenter(name: string, sizeLimit: number = 15, startLength: number = 5, endLength: number = 3) {
    name = name || '';
    if (name.length > sizeLimit) {
        name = [
            name.substring(0, startLength),
            '…',
            name.substring(name.lastIndexOf('.') - endLength, name.length)
        ].join('');
        return name;
    }
    return name;
}

