import { mount } from 'svelte';
import { cropImageFile, FilePickerAccepts, ImageCaptureEnum, OutputImageFormatEnum, processImageFile } from '../utils/image-service';
import { CropperDialog, DateFieldDialog, DatetimeFieldDialog, Dialog, LoadingDialog, MsgDialog, NumberFieldDialog, PickerDialog, TextareaFieldDialog, TextFieldDialog } from '../../views/index.js';
import { getDialogSize, isMobileScreen } from '../screen/screen-service';
export var DialogSizeEnum;
(function (DialogSizeEnum) {
    DialogSizeEnum["XS"] = "xs";
    DialogSizeEnum["SM"] = "sm";
    DialogSizeEnum["MD"] = "md";
    DialogSizeEnum["LG"] = "lg";
    DialogSizeEnum["XL"] = "xl";
    DialogSizeEnum["FULL"] = "full";
})(DialogSizeEnum || (DialogSizeEnum = {}));
function addDialog(props) {
    const dialog = mount(Dialog, { target: document.getElementsByTagName('body')[0], props });
    return dialog;
}
export async function openDialog(props = {}) {
    return new Promise((resolve) => {
        let dialog = addDialog({ ...props, onClose, onResult, });
        dialog.openDialog();
        function onClose() {
            if (dialog) {
                if (props.onClose) {
                    props.onClose();
                }
            }
        }
        function onResult(value) {
            resolve(value);
            if (props.onResult) {
                props.onResult(value);
            }
        }
    });
}
export async function openConfirmDialog(params = {}) {
    let msg = params.msg || 'Are you sure?';
    params.title = params.title || 'Confirm';
    params.footerOkButtonLabel = params.footerOkButtonLabel || 'Confirm';
    return await openDialog({
        bodyComponent: MsgDialog,
        props: { msg },
        ...params,
        hasTitle: true,
        hasHeader: true,
        hasFooter: true,
        hasFooterCloseButton: true,
        hasFooterOkButton: true,
    });
}
export async function openAlertDialog(params = {}) {
    let msg = params.msg || 'Alert Information?';
    params.title = params.title || 'Alert';
    params.footerOkButtonLabel = params.footerOkButtonLabel || 'Confirm';
    return await openDialog({
        bodyComponent: MsgDialog,
        props: { msg },
        ...params,
        hasTitle: true,
        hasHeader: true,
        hasFooter: true,
        hasFooterCloseButton: true,
        hasFooterOkButton: false,
        footerCloseButtonLabel: 'OK'
    });
}
export async function openDeleteConfirmDialog({ msg = 'Are you sure to delete?', title = 'Delete', footerOkButtonLabel = 'Delete', footerOkButtonClassName = 'bg-red-500 hover:bg-red-700 focus:bg-red-700', ...params } = {}) {
    return await openConfirmDialog({
        msg,
        title,
        footerOkButtonLabel,
        footerOkButtonClassName,
        ...params,
        size: DialogSizeEnum.SM,
    });
}
export async function openPickerDialog({ items, value, multiple, hasCheckbox = true, hasArrow, maxlength, maxlengthMsg, identityFieldName, titleFieldName, searchFieldName, subtitleFieldName, hasIcon, iconPath, iconClassName, isCircularIcon, circularIconClassName, itemTileSnippet, ...params }) {
    if (hasArrow) {
        multiple = false;
        hasCheckbox = false;
    }
    return await openDialog({
        bodyComponent: PickerDialog,
        props: {
            items,
            value,
            multiple,
            hasCheckbox,
            hasArrow,
            maxlength,
            maxlengthMsg,
            identityFieldName,
            titleFieldName,
            searchFieldName,
            subtitleFieldName,
            hasIcon,
            iconPath,
            iconClassName,
            isCircularIcon,
            circularIconClassName,
            itemTileSnippet,
        },
        hasHeader: true,
        hasTitle: true,
        hasHeaderBack: isMobileScreen(),
        hasHeaderClose: !isMobileScreen(),
        footerOkButtonLabel: 'Select',
        footerClassName: 'border-t',
        title: 'Pick',
        ...params,
        hasFooter: multiple,
        hasFooterOkButton: multiple,
        hasFooterCloseButton: multiple,
    });
}
export async function openNumberFieldDialog({ title, value, label, name, maxlength, fieldClassName, autofocus, required, appearance, size, floatingLabel, ...params } = {}) {
    return await openDialog({
        bodyComponent: NumberFieldDialog,
        props: { value, label, name, maxlength, className: fieldClassName, autofocus, required, appearance, size, floatingLabel, },
        ...params,
        hasHeader: true,
        hasHeaderBack: isMobileScreen(),
        hasHeaderClose: !isMobileScreen(),
        size: getDialogSize(),
        hasTitle: true,
        title: title || 'Prompt',
        hasFooter: true,
        hasFooterCloseButton: true,
        hasFooterOkButton: true,
        footerOkButtonType: 'submit',
        targetFormId: 'number-field-dialog-form'
    });
}
export async function openTextFieldDialog({ title, value, label, name, maxlength, fieldClassName, autofocus, required, appearance, size, floatingLabel, ...params } = {}) {
    return await openDialog({
        bodyComponent: TextFieldDialog,
        props: { value, label, name, maxlength, className: fieldClassName, autofocus, required, appearance, size, floatingLabel, },
        ...params,
        hasHeader: true,
        hasHeaderBack: isMobileScreen(),
        hasHeaderClose: !isMobileScreen(),
        size: getDialogSize(),
        hasTitle: true,
        title: title || 'Prompt',
        hasFooter: true,
        hasFooterCloseButton: true,
        hasFooterOkButton: true,
        footerOkButtonType: 'submit',
        targetFormId: 'text-field-dialog-form'
    });
}
export async function openDateFieldDialog({ title, value, label, name, maxlength, fieldClassName, autofocus, required, appearance, size, floatingLabel, rows, ...params } = {}) {
    return await openDialog({
        bodyComponent: DateFieldDialog,
        props: { value, label, name, maxlength, className: fieldClassName, autofocus, required, appearance, size, floatingLabel, rows },
        ...params,
        hasHeader: true,
        hasHeaderBack: isMobileScreen(),
        hasHeaderClose: !isMobileScreen(),
        size: isMobileScreen() ? DialogSizeEnum.FULL : DialogSizeEnum.SM,
        hasTitle: true,
        title: title || 'Prompt',
        hasFooter: true,
        hasFooterCloseButton: true,
        hasFooterOkButton: true,
        footerOkButtonType: 'submit',
        targetFormId: 'date-field-dialog-form'
    });
}
export async function openDateTimeFieldDialog({ title, value, label, name, maxlength, fieldClassName, autofocus, required, appearance, size, floatingLabel, rows, ...params } = {}) {
    return await openDialog({
        bodyComponent: DatetimeFieldDialog,
        props: { value, label, name, maxlength, className: fieldClassName, autofocus, required, appearance, size, floatingLabel, rows },
        ...params,
        hasHeader: true,
        hasHeaderBack: isMobileScreen(),
        hasHeaderClose: !isMobileScreen(),
        size: isMobileScreen() ? DialogSizeEnum.FULL : DialogSizeEnum.SM,
        hasTitle: true,
        title: title || 'Prompt',
        hasFooter: true,
        hasFooterCloseButton: true,
        hasFooterOkButton: true,
        footerOkButtonType: 'submit',
        targetFormId: 'datetime-field-dialog-form'
    });
}
export async function openTextareaFieldDialog({ title, value, label, name, maxlength, fieldClassName, autofocus, required, appearance, size, floatingLabel, rows, ...params } = {}) {
    return await openDialog({
        bodyComponent: TextareaFieldDialog,
        props: { value, label, name, maxlength, className: fieldClassName, autofocus, required, appearance, size, floatingLabel, rows },
        ...params,
        hasHeader: true,
        hasHeaderBack: isMobileScreen(),
        hasHeaderClose: !isMobileScreen(),
        size: isMobileScreen() ? DialogSizeEnum.FULL : DialogSizeEnum.SM,
        hasTitle: true,
        title: title || 'Prompt',
        hasFooter: true,
        hasFooterCloseButton: true,
        hasFooterOkButton: true,
        footerOkButtonType: 'submit',
        targetFormId: 'textarea-field-dialog-form'
    });
}
export async function openLoadingDialog({ msg = "Please wait...", loadingDialogContainerClassName, loadingDialogClassName, loadingDialogSpinnerClassName, loadingDialogMsgClassName, ...params } = {}) {
    let props = {
        bodyComponent: LoadingDialog,
        props: { msg, className: loadingDialogClassName, containerClassName: loadingDialogContainerClassName, spinnerClassName: loadingDialogSpinnerClassName, msgClassName: loadingDialogMsgClassName },
        ...params,
        hasHeader: false,
        hasFooter: false,
        size: DialogSizeEnum.SM,
    };
    let dialog = addDialog(props);
    dialog.openDialog();
    return dialog;
}
/**
 * Return Cropped Image DataUrl
 * @param props
 * @returns
 */
export async function openCropperDialog({ outputWidth, outputFormat = OutputImageFormatEnum.WEBP, outputQuality = 0.8, outputType = 'file', inputImageFile, className, outputAspectRatio, ...params }) {
    return await openDialog({
        bodyComponent: CropperDialog,
        props: {
            outputWidth,
            outputFormat,
            outputQuality,
            outputType,
            inputImageFile,
            className,
            outputAspectRatio,
        },
        ...params,
        hasHeader: true,
        hasFooter: true,
        hasFooterOkButton: true,
        hasFooterCloseButton: true,
        footerOkButtonLabel: params.footerOkButtonLabel || 'CROP',
        hasTitle: true,
        title: params.title || 'Crop Image',
        hasHeaderBack: isMobileScreen(),
        hasHeaderClose: !isMobileScreen(),
        size: getDialogSize(),
    });
}
/**
 * Opens a file picker dialog and returns the selected file or files.
 * This function uses native browser APIs to ensure compatibility across different browsers.
 * @param accepts - A string or array of accepted file types (e.g., 'image/*', '.pdf').
 * @param multiple - A boolean indicating if multiple files can be selected.
 * @returns A promise that resolves to a File or an array of File objects, or null if no files were selected.
 */
export async function openFilePickerDialog(accepts = '*/*', options = { multiple: false }) {
    // Check if the browser supports the required File API and input element
    if (typeof window === 'undefined' || typeof document === 'undefined' || !window.File || !window.FileList || !window.FileReader) {
        console.error('File APIs are not fully supported in this browser.');
        return null;
    }
    return new Promise((resolve, reject) => {
        try {
            // Create an input element of type 'file'
            const inputElement = document.createElement('input');
            inputElement.type = 'file';
            inputElement.style.display = 'none'; // Hide the input element
            // Set accepted file types if provided
            if (Array.isArray(accepts)) {
                inputElement.accept = accepts.join(',');
            }
            else {
                inputElement.accept = accepts;
            }
            // Set multiple attribute based on the parameter
            inputElement.multiple = options.multiple;
            // Listen for changes (i.e., when files are selected)
            inputElement.addEventListener('change', () => {
                // Check if files were selected
                if (inputElement.files) {
                    // If multiple is true, return an array of File objects
                    if (options.multiple) {
                        resolve(Array.from(inputElement.files));
                    }
                    else {
                        // Otherwise, return the first selected File
                        resolve(inputElement.files[0]);
                    }
                }
                else {
                    resolve(null); // No files selected
                }
            });
            // Append the input element to the body and simulate a click to open the dialog
            document.body.appendChild(inputElement);
            inputElement.click();
            // Remove the input element from the DOM after use to prevent memory leaks
            document.body.removeChild(inputElement);
        }
        catch (error) {
            console.error('An error occurred while opening the file picker dialog:', error);
            reject(error); // Handle any unexpected errors
        }
    });
}
/**
 * Opens an image picker dialog that supports mobile devices, camera capture, gallery selection, and file explorer.
 * Allows the user to specify output format and quality for the selected images.
 * @param accepts - A string or array of accepted file types (e.g., 'image/*').
 * @param options - Additional options for capturing images (e.g., required resolution, file size, output format).
 * @returns A promise that resolves to a processed File object or an array of File objects, or null if no file was selected.
 */
export async function openImagePickerDialog(accepts = 'image/*', options = {}) {
    return new Promise((resolve, reject) => {
        try {
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
            // Create an input element of type 'file'
            const inputElement = document.createElement('input');
            inputElement.type = 'file';
            inputElement.accept = Array.isArray(accepts) ? accepts.join(',') : accepts;
            inputElement.multiple = options?.multiple || false;
            inputElement.style.display = 'none';
            // Set capture attribute if specified
            if (options?.capture) {
                inputElement.setAttribute('capture', options.capture);
            }
            // Listen for file selection
            inputElement.addEventListener('change', async () => {
                if (!inputElement.files) {
                    resolve(null); // No files selected
                    return;
                }
                const files = Array.from(inputElement.files);
                try {
                    // Process each selected file and resize/compress/convert if required
                    const processedFiles = await Promise.all(files.map((file) => processImageFile(file, options)));
                    // Return a single file or an array of files based on the multiple option
                    if (options?.multiple) {
                        resolve(processedFiles);
                    }
                    else {
                        resolve((processedFiles[0] || null));
                    }
                }
                catch (error) {
                    reject(error);
                }
            });
            // Append and trigger the file picker
            document.body.appendChild(inputElement);
            inputElement.click();
            document.body.removeChild(inputElement);
        }
        catch (error) {
            reject(error);
        }
    });
}
export async function openImagePickerDialogWithCropper({ outputFormat = OutputImageFormatEnum.WEBP, outputWidth = 800, outputQuality = 0.6, outputAspectRatio = 1, dialogSize = DialogSizeEnum.MD, capture, maxHeight, maxSizeInBytes, maxWidth, quality } = {}) {
    const file = (await openImagePickerDialog(FilePickerAccepts.image, {
        capture,
        maxHeight,
        maxSizeInBytes,
        maxWidth,
        quality
    }));
    let croppedFile = await cropImageFile({ inputImageFile: file, outputFormat, outputWidth, outputQuality, outputAspectRatio, dialogSize });
    return croppedFile;
}
;
