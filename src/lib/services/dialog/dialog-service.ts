
import { Dialog, type DialogPropsType, type InputFieldAppearanceType, type InputFieldPropsType, type InputFieldSizeType } from '$lib/views';
import ListDialog from '$lib/views/core/dialog/components/list-dialog/list-picker-dialog.svelte';
import MsgDialog from '$lib/views/core/dialog/components/msg-dialog/msg-dialog.svelte';
import TextFieldDialog from '$lib/views/core/dialog/components/text-field-dialog/text-field-dialog.svelte';
import { mount, } from 'svelte';
import { isMobileScreen } from '../screen/screen-service';
import TextareaFieldDialog from '$lib/views/core/dialog/components/textarea-field-dialog/textarea-field-dialog.svelte';

export type PickerDialogPropsType = {
    items?: any[],
    itemTitle?: string,
    itemSubtitle?: string,
    hasArrow?: boolean,
    hasCheck?: boolean,
    multiple?: boolean,
    okButtonLabel?: string,
    okButtonClassName?: string,
    closeButtonLabel?: string;
    closeButtonClassName?: string;
    identity?: string;
    value?: any | any[],
    search?: string | string[];
}

function addDialog(props: DialogPropsType) {
    const dialog = mount(Dialog, { target: document.getElementsByTagName('body')[0]!, props });
    dialog.openDialog();
    return dialog;
}

export async function openDialog<R>(props: DialogPropsType = {}): Promise<R> {
    return new Promise((resolve) => {
        let dialog = addDialog({ ...props, onClose, onResult, });
        function onClose() {
            if (dialog) {
                if (props.onClose) {
                    props.onClose();
                }
            }
        }

        function onResult(value: R) {
            resolve(value);
            if (props.onResult) {
                props.onResult(value);
            }

        }
    });
}

export async function openConfirmDialog(params: DialogPropsType & { msg?: string } = {}) {
    let msg = params.msg || 'Are you sure?';
    params.title = params.title || 'Confirm';
    params.footerOkLable = params.footerOkLable || 'Confirm';

    return await openDialog({
        bodyComponent: MsgDialog,
        props: { msg },
        ...params,
        hasTitle: true,
        hasHeader: true,
        hasFooter: true,
        hasFooterCloseButton: true,
        hasFooterOkButton: true,
    })
}

export async function openDeleteConfirmDialog(params: DialogPropsType & { msg?: string } = {}) {
    return await openConfirmDialog({
        msg: 'Are you sure to delete?',
        title: 'Delete',
        footerOkLable: 'Delete',
        footerOkButtonClassName: 'bg-red-500 hover:bg-red-700 focus:bg-red-700'
    })
}

export async function openListPickerDialog<R>({
    items,
    itemTitle,
    itemSubtitle,
    hasArrow,
    hasCheck,
    okButtonClassName,
    okButtonLabel,
    closeButtonClassName,
    closeButtonLabel,
    multiple,
    identity,
    value,
    search,
    ...params }: DialogPropsType & PickerDialogPropsType = {}) {
    return await openDialog<R>({
        component: ListDialog,
        props: {
            items,
            itemTitle,
            itemSubtitle,
            hasArrow,
            hasCheck,
            okButtonClassName,
            okButtonLabel,
            closeButtonClassName,
            closeButtonLabel,
            multiple,
            identity,
            value,
            search
        },
        ...params
    })
}


export async function openTextFieldDialog({ title, value, label, name, maxlength, className, autofocus, required, appearance, size, floatingLabel, ...params }: DialogPropsType & InputFieldPropsType = {}) {

    return await openDialog({
        bodyComponent: TextFieldDialog,
        props: { value, label, name, maxlength, className, autofocus, required, appearance, size, floatingLabel, },
        ...params,
        hasHeader: true,
        hasHeaderBack: isMobileScreen(),
        hasHeaderClose: !isMobileScreen(),
        size: isMobileScreen() ? 'full' : 'sm',
        hasTitle: true,
        title: title || 'Prompt',
        hasFooter: true,
        hasFooterCloseButton: true,
        hasFooterOkButton: true,
        footerOkButtonType: 'submit',
        submitButtonFormId: 'text-field-dialog-form'
    })
}

export async function openTextareaFieldDialog({ title, value, label, name, maxlength, className, autofocus, required, appearance, size, floatingLabel, rows, ...params }: DialogPropsType & InputFieldPropsType = {}) {

    return await openDialog({
        bodyComponent: TextareaFieldDialog,
        props: { value, label, name, maxlength, className, autofocus, required, appearance, size, floatingLabel, rows },
        ...params,
        hasHeader: true,
        hasHeaderBack: isMobileScreen(),
        hasHeaderClose: !isMobileScreen(),
        size: isMobileScreen() ? 'full' : 'sm',
        hasTitle: true,
        title: title || 'Prompt',
        hasFooter: true,
        hasFooterCloseButton: true,
        hasFooterOkButton: true,
        footerOkButtonType: 'submit',
        submitButtonFormId: 'textarea-field-dialog-form'
    })
}