import { DialogSizeEnum, openCropperDialog } from "../dialog/dialog-service.js";
import { getExtFromFileType, readFileAsDataURL } from "./file-service.js";
import { nanoid } from "nanoid";
 

export type ImageCaptures = ImageCaptureEnum.USER | ImageCaptureEnum.ENVIRONMENT;

export enum ImageCaptureEnum {
    USER = 'user',
    ENVIRONMENT = 'environment',
}

export type OutputImageFormats = OutputImageFormatEnum.JPG | OutputImageFormatEnum.WEBP | OutputImageFormatEnum.PNG;

export enum OutputImageFormatEnum {
    WEBP = 'image/webp',
    JPG = 'image/jpeg',
    PNG = 'image/png',
}

export class FilePickerAccepts {
    static image = '.png,.PNG,.jpg,.JPG,.jpeg,.JPEG,.webp,.WEBP';
    static document = '.pdf,.PDF,.doc,.DOC,.docx,.DOCX,.xls,.XLS,.xlsx,.XLSX,.ppt,.PPT,.pptx,.PPTX,.txt,.TXT,';
    static video = '.mp4,.MP4,.mov,.MOV,.avi,.AVI,.wmv,.WMV,.flv,.FLV,.mkv,.MKV,.webm,.WEBM,';
    static audio = '.mp3,.MP3,.wav,.WAV,.aac,.AAC,.flac,.FLAC,.ogg,.OGG,.wma,.WMA,';
    static text = '.txt,.TXT,';
}

/**
 * Processes an image file by resizing, reducing file size, and converting it to a specified format based on the provided options.
 * @param file - The original image file.
 * @param options - Options for resizing, compressing, and converting the image.
 * @returns A promise that resolves to a processed File object with the correct filename and extension.
 */
export async function processImageFile(
    file: File,
    options: {
        maxWidth?: number;
        maxHeight?: number;
        maxSizeInBytes?: number;
        outputFormat?: OutputImageFormats;
        quality?: number;
    } = {}
): Promise<File> {
    // // Return the original file if no processing is needed
    // if (!options?.maxWidth && !options?.maxHeight && !options?.maxSizeInBytes && !options?.outputFormat) {
    //     return file;
    // }
    options = options || {};
    if (!options.maxWidth) {
        options.maxWidth = 1920;
    }
    if (!options.maxHeight) {
        options.maxHeight = options.maxWidth;
    }
    if (!options.quality || options.quality < 0) {
        options.quality = 0.8;
    }
    if (options.quality > 1) {
        options.quality = options.quality / 100;
    }
    if (options.outputFormat) {
        options.outputFormat = OutputImageFormatEnum.WEBP;
    }

    // Read the image as a data URL
    const imageDataUrl = await readFileAsDataURL(file);
    const img = new Image();

    return new Promise((resolve, reject) => {
        img.onload = async () => {
            // Create a canvas to resize/compress/convert the image
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');

            // Calculate the new dimensions
            const { width, height } = calculateNewDimensions(img, options.maxWidth, options.maxHeight);
            canvas.width = width;
            canvas.height = height;

            // Draw the image on the canvas
            context?.drawImage(img, 0, 0, width, height);

            // Determine the output format and quality
            const outputFormat = options?.outputFormat || file.type;
            const quality = options?.quality !== undefined ? options.quality : 0.8; // Default quality 80%

            // Convert canvas to Blob (compressed image in specified format)
            canvas.toBlob(
                async (blob) => {
                    if (!blob) {
                        reject(new Error('Canvas conversion to Blob failed.'));
                        return;
                    }

                    // Check the file size and reduce quality if necessary
                    let compressedBlob = blob;
                    if (options.maxSizeInBytes && blob.size > options.maxSizeInBytes) {
                        compressedBlob = await compressImage(canvas, options.maxSizeInBytes, outputFormat, quality);
                    }

                    // Create a new File from the compressed Blob with the correct filename and extension
                    const newFileName = generateNewFileName(file.name, outputFormat);
                    const processedFile = new File([compressedBlob], newFileName, { type: outputFormat });
                    resolve(processedFile);
                },
                outputFormat,
                quality // Use the specified quality
            );
        };
        img.onerror = (error) => reject(error);
        img.src = imageDataUrl; // Set the image source
    });
}

/**
 * Generates a new filename based on the original filename and output format.
 * @param originalName - The original filename.
 * @param outputFormat - The desired output format (e.g., 'image/jpeg', 'image/png').
 * @returns A new filename with the correct extension.
 */
export function generateNewFileName(originalName: string, outputFormat: string): string {
    // Get the file extension based on the output format
    const formatExtensionMap: { [key: string]: string } = {
        'image/jpeg': '.jpeg',
        'image/png': '.png',
        'image/webp': '.webp',
    };

    // Extract the base name without the extension
    const baseName = originalName.replace(/\.[^/.]+$/, ''); // Remove existing extension
    const newExtension = formatExtensionMap[outputFormat] || ''; // Get the new extension

    return `${baseName}${newExtension}`;
}


/**
 * Calculates the new dimensions for resizing the image while maintaining aspect ratio.
 * @param img - The original image.
 * @param maxWidth - The maximum width for the new image.
 * @param maxHeight - The maximum height for the new image.
 * @returns An object with the new width and height.
 */
export function calculateNewDimensions(img: HTMLImageElement, maxWidth?: number, maxHeight?: number): { width: number; height: number } {
    let width = img.width;
    let height = img.height;

    // Maintain aspect ratio while resizing
    if (maxWidth && width > maxWidth) {
        height = (maxWidth / width) * height;
        width = maxWidth;
    }
    if (maxHeight && height > maxHeight) {
        width = (maxHeight / height) * width;
        height = maxHeight;
    }

    return { width, height };
}

/**
 * Compresses an image to reduce its file size to be under the specified max size.
 * @param canvas - The canvas element with the image drawn on it.
 * @param maxSizeInBytes - The maximum allowed size in bytes.
 * @param format - The output format of the image (e.g., 'image/webp', 'image/jpeg').
 * @param initialQuality - The initial image quality (0 to 1).
 * @returns A promise that resolves to a compressed Blob object.
 */
export function compressImage(canvas: HTMLCanvasElement, maxSizeInBytes: number, format: string, initialQuality: number): Promise<Blob> {
    return new Promise((resolve) => {
        let quality = initialQuality; // Start with the specified quality
        let compressedBlob: Blob | null = null;

        // Reduce quality iteratively until the Blob size is below the max size
        const compressIteration = () => {
            canvas.toBlob(
                (blob) => {
                    if (!blob) return;
                    if (blob.size <= maxSizeInBytes || quality <= 0.1) {
                        resolve(blob);
                    } else {
                        quality -= 0.1; // Reduce quality
                        compressIteration(); // Recurse
                    }
                },
                format,
                quality
            );
        };

        compressIteration();
    });
}



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
export async function readFileAsImage(file: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        // Event handler executed when the file reading operation is completed
        reader.onloadend = () => {
            if (reader.readyState === FileReader.DONE) {
                const img = new Image();
                img.src = reader.result as string;

                // Resolve the promise when the image is successfully loaded
                img.onload = () => resolve(img);

                // Reject the promise if an error occurs while loading the image
                img.onerror = () => reject(new Error('Failed to load image from file.'));
            } else {
                reject(new Error('Failed to read file as Image.'));
            }
        };

        // Event handler executed when an error occurs while reading the file
        reader.onerror = () => {
            reject(new Error(`Error reading file as Image: ${reader.error?.message || 'Unknown error'}`));
        };

        // Read the file content as a data URL for image loading
        reader.readAsDataURL(file);
    });
}



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
export async function dataUrlToImage(dataUrl: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();

        // Resolve the promise when the image loads successfully
        img.onload = () => resolve(img);

        // Reject the promise if an error occurs while loading the image
        img.onerror = () => reject(new Error('Failed to load image from the provided Data URL or Base64 string.'));

        // Set the source of the image to the provided Data URL
        img.src = dataUrl;
    });
}

export async function cropImageFile(
    {
        inputImageFile,
        outputFormat = OutputImageFormatEnum.WEBP,
        outputWidth = 600,
        outputQuality = 0.6,
        outputAspectRatio = 1,
        dialogSize = DialogSizeEnum.MD,

    }: {
        inputImageFile: File,
        outputFormat?: OutputImageFormats,
        outputWidth?: number,
        outputQuality?: number,
        outputAspectRatio?: number,
        dialogSize?: DialogSizeEnum,
    }
): Promise<File | null> {
    let imageFile: File | null = null;
    let fileName = '';
    if (inputImageFile) {
        imageFile = (await openCropperDialog({
            inputImageFile,
            outputFormat,
            outputWidth,
            outputQuality,
            outputAspectRatio,
            size: dialogSize,
        })) as File;
        if (imageFile) {
            try {
                // console.log('imageFile', imageFile);
                let filenameNanoid = nanoid(10);
                fileName = (imageFile.name || '').toLocaleLowerCase().trim().replace(/ /g, '_').substring(0, 4);
                fileName = (fileName ? fileName + '-' + filenameNanoid : filenameNanoid) + `.${getExtFromFileType(outputFormat)}`;
            } catch (e: any) {
                console.error(e);
            }
        }
    }
    let newFile = null;
    if (imageFile && fileName) {
        // Add the file name to the file object, so that it can be used in the form.
        newFile = new File([imageFile!], fileName, { type: imageFile.type || 'image/webp' });
    }
    return newFile;
}

