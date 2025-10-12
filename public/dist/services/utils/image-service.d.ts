import type { DialogSize } from "../../views";
export type ImageCapttures = ImageCapttureEnum.USER | ImageCapttureEnum.ENVIRONMENT;
export declare enum ImageCapttureEnum {
    USER = "user",
    ENVIRONMENT = "environment"
}
export type OutputImageFormats = OutputImageFormatEnum.JPG | OutputImageFormatEnum.WEBP | OutputImageFormatEnum.PNG;
export declare enum OutputImageFormatEnum {
    WEBP = "image/webp",
    JPG = "image/jpeg",
    PNG = "image/png"
}
export declare class FilePickerAccepts {
    static image: string;
    static document: string;
    static video: string;
    static audio: string;
    static text: string;
}
/**
 * Processes an image file by resizing, reducing file size, and converting it to a specified format based on the provided options.
 * @param file - The original image file.
 * @param options - Options for resizing, compressing, and converting the image.
 * @returns A promise that resolves to a processed File object with the correct filename and extension.
 */
export declare function processImageFile(file: File, options?: {
    maxWidth?: number;
    maxHeight?: number;
    maxSizeInBytes?: number;
    outputFormat?: OutputImageFormats;
    quality?: number;
}): Promise<File>;
/**
 * Generates a new filename based on the original filename and output format.
 * @param originalName - The original filename.
 * @param outputFormat - The desired output format (e.g., 'image/jpeg', 'image/png').
 * @returns A new filename with the correct extension.
 */
export declare function generateNewFileName(originalName: string, outputFormat: string): string;
/**
 * Calculates the new dimensions for resizing the image while maintaining aspect ratio.
 * @param img - The original image.
 * @param maxWidth - The maximum width for the new image.
 * @param maxHeight - The maximum height for the new image.
 * @returns An object with the new width and height.
 */
export declare function calculateNewDimensions(img: HTMLImageElement, maxWidth?: number, maxHeight?: number): {
    width: number;
    height: number;
};
/**
 * Compresses an image to reduce its file size to be under the specified max size.
 * @param canvas - The canvas element with the image drawn on it.
 * @param maxSizeInBytes - The maximum allowed size in bytes.
 * @param format - The output format of the image (e.g., 'image/webp', 'image/jpeg').
 * @param initialQuality - The initial image quality (0 to 1).
 * @returns A promise that resolves to a compressed Blob object.
 */
export declare function compressImage(canvas: HTMLCanvasElement, maxSizeInBytes: number, format: string, initialQuality: number): Promise<Blob>;
/**
 * Reads the contents of a given File object as an HTMLImageElement.
 *
 * This function uses the FileReader API to read the file content and returns it as an HTMLImageElement.
 * It is useful for loading images for display or further processing.
 *
 * @param file - The File object to be read and converted into an HTMLImageElement.
 * @returns A promise that resolves to an HTMLImageElement representing the image content of the file.
 *
 * @throws An error if the file could not be read or if the image could not be loaded.
 *
 * @example
 * // Create an image file and read it as an HTMLImageElement
 * const imageFile = new File([ binary data here , 'example.png', { type: 'image/png' });
 * readFileAsImage(imageFile).then((img) => {
 *     document.body.appendChild(img); // Display the image on the page
 * });
 */
export declare function readFileAsImage(file: File): Promise<HTMLImageElement>;
/**
 * Converts a Base64 or Data URL string into an HTMLImageElement.
 *
 * This function creates an HTMLImageElement from a given Base64 or Data URL string.
 * It is useful for displaying images on the page or performing further image processing.
 *
 * @param dataUrl - The Base64 or Data URL string representing the image.
 * @returns A promise that resolves to an HTMLImageElement when the image is successfully loaded.
 *
 * @throws An error if the image cannot be loaded.
 *
 * @example
 * // Convert a Base64 string to an image element and append it to the document
 * const base64String = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...';
 * dataUrlToImage(base64String).then((img) => {
 *     document.body.appendChild(img); // Display the image on the page
 * }).catch((error) => {
 *     console.error('Failed to load image:', error.message);
 * });
 */
export declare function dataUrlToImage(dataUrl: string): Promise<HTMLImageElement>;
export declare function cropImageFile({ inputImageFile, outputFormat, outputWidth, outputQuality, outputAspectRatio, dialogSize, }: {
    inputImageFile: File;
    outputFormat?: OutputImageFormats;
    outputWidth?: number;
    outputQuality?: number;
    outputAspectRatio?: number;
    dialogSize?: DialogSize;
}): Promise<File | null>;
