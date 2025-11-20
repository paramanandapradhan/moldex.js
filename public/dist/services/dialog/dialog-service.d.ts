import { ImageCaptureEnum, type ImageCaptures, type OutputImageFormats } from '../utils/image-service';
import { type CropperDialogProps, type DialogProps, type DialogSize, type InputFieldProps, type PickerDialogProps } from '../../views/index.js';
export declare enum DialogSizeEnum {
    XS = "xs",
    SM = "sm",
    MD = "md",
    LG = "lg",
    XL = "xl",
    FULL = "full"
}
export type PickerDialogPropsType = {
    items?: any[];
    itemTitle?: string;
    itemSubtitle?: string;
    hasArrow?: boolean;
    hasCheck?: boolean;
    multiple?: boolean;
    okButtonLabel?: string;
    okButtonClassName?: string;
    closeButtonLabel?: string;
    closeButtonClassName?: string;
    identity?: string;
    value?: any | any[];
    search?: string | string[];
};
export declare function openDialog<R>(props?: DialogProps): Promise<R>;
export declare function openConfirmDialog(params?: DialogProps & {
    msg?: string;
}): Promise<unknown>;
export declare function openAlertDialog(params?: DialogProps & {
    msg?: string;
}): Promise<unknown>;
export declare function openDeleteConfirmDialog({ msg, title, footerOkButtonLabel, footerOkButtonClassName, ...params }?: DialogProps & {
    msg?: string;
}): Promise<unknown>;
export declare function openPickerDialog<R>({ items, value, multiple, hasCheckbox, hasArrow, maxlength, maxlengthMsg, identityFieldName, titleFieldName, searchFieldName, subtitleFieldName, hasIcon, iconPath, iconClassName, isCircularIcon, circularIconClassName, itemTileSnippet, ...params }: DialogProps & PickerDialogProps): Promise<R>;
export declare function openNumberFieldDialog({ title, value, label, name, maxlength, fieldClassName, autofocus, required, appearance, size, floatingLabel, ...params }?: DialogProps & InputFieldProps & {
    fieldClassName?: string;
}): Promise<unknown>;
export declare function openTextFieldDialog({ title, value, label, name, maxlength, fieldClassName, autofocus, required, appearance, size, floatingLabel, ...params }?: DialogProps & InputFieldProps & {
    fieldClassName?: string;
}): Promise<unknown>;
export declare function openTextareaFieldDialog({ title, value, label, name, maxlength, fieldClassName, autofocus, required, appearance, size, floatingLabel, rows, ...params }?: DialogProps & InputFieldProps & {
    fieldClassName?: string;
}): Promise<unknown>;
export declare function openLoadingDialog({ msg, loadingDialogContainerClassName, loadingDialogClassName, loadingDialogSpinnerClassName, loadingDialogMsgClassName, ...params }?: DialogProps & {
    msg?: string;
    loadingDialogContainerClassName?: string;
    loadingDialogClassName?: string;
    loadingDialogSpinnerClassName?: string;
    loadingDialogMsgClassName?: string;
}): Promise<any>;
/**
 * Return Cropped Image DataUrl
 * @param props
 * @returns
 */
export declare function openCropperDialog<T, R>({ outputWidth, outputFormat, outputQuality, outputType, inputImageFile, className, outputAspectRatio, ...params }: DialogProps & CropperDialogProps): Promise<R | string | File>;
/**
 * Opens a file picker dialog and returns the selected file or files.
 * This function uses native browser APIs to ensure compatibility across different browsers.
 * @param accepts - A string or array of accepted file types (e.g., 'image/*', '.pdf').
 * @param multiple - A boolean indicating if multiple files can be selected.
 * @returns A promise that resolves to a File or an array of File objects, or null if no files were selected.
 */
export declare function openFilePickerDialog<T extends File | File[]>(accepts?: string | string[], options?: {
    multiple: boolean;
}): Promise<T | null>;
/**
 * Opens an image picker dialog that supports mobile devices, camera capture, gallery selection, and file explorer.
 * Allows the user to specify output format and quality for the selected images.
 * @param accepts - A string or array of accepted file types (e.g., 'image/*').
 * @param options - Additional options for capturing images (e.g., required resolution, file size, output format).
 * @returns A promise that resolves to a processed File object or an array of File objects, or null if no file was selected.
 */
export declare function openImagePickerDialog<T extends File | File[]>(accepts?: string | string[], options?: {
    multiple?: boolean;
    capture?: ImageCaptures;
    maxWidth?: number;
    maxHeight?: number;
    maxSizeInBytes?: number;
    outputFormat?: OutputImageFormats;
    quality?: number;
}): Promise<T | null>;
export declare function openImagePickerDialogWithCropper({ outputFormat, outputWidth, outputQuality, outputAspectRatio, dialogSize, capture, maxHeight, maxSizeInBytes, maxWidth, quality }?: {
    outputFormat?: OutputImageFormats;
    outputWidth?: number;
    outputQuality?: number;
    outputAspectRatio?: number;
    dialogSize?: DialogSize;
    capture?: ImageCaptureEnum;
    maxWidth?: number;
    maxHeight?: number;
    maxSizeInBytes?: number;
    quality?: number;
}): Promise<File | null>;
