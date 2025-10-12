export type CropperDialogPropsType = {
    outputAspectRatio?: number;
    outputWidth?: number;
    outputFormat?: OutputImageFormats;
    outputQuality?: number;
    outputType?: 'file' | 'base64';
    inputImageFile?: File | null;
    className?: string;
};
import type { DialogExports } from '../dialog/dialog.svelte';
import { type OutputImageFormats } from '../../../../../services';
type $$ComponentProps = CropperDialogPropsType & DialogExports;
declare const CropperDialog: import("svelte").Component<$$ComponentProps, {}, "">;
type CropperDialog = ReturnType<typeof CropperDialog>;
export default CropperDialog;
