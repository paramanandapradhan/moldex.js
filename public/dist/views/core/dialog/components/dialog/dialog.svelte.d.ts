import { type Component as ComponetType, type Snippet } from 'svelte';
import type { DialogCloseButtonClickFunction, DialogExports, DialogProps } from '../../types';
declare const Dialog: ComponetType<DialogProps, {
    toggleDialog: () => void;
    openDialog: () => void;
    closeDialog: (value?: any) => Promise<any>;
    setResult: (value: any) => void;
    setOkEnabled: (value: boolean) => void;
    setOkSpinner: (value: boolean) => void;
    setOnData: (listener: (data: any) => void) => void;
    setOnOkClick: (onclick: (event: MouseEvent | TouchEvent, options: DialogExports) => void) => void;
    setOnCloseClick: (onclick: DialogCloseButtonClickFunction) => void;
    postData: (data: any) => void;
    setHeaderSnippet: (snippet: Snippet) => void;
    setFooterSnippet: (snippet: Snippet) => void;
    setDialogTitle: (dialogTitle: string) => void;
}, "">;
type Dialog = ReturnType<typeof Dialog>;
export default Dialog;
