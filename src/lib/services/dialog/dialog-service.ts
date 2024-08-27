
import { Dialog, type DialogPropsType } from '$lib/views';
import ListDialog from '$lib/views/core/dialog/components/list-dialog/list-dialog.svelte';
import MsgDialog from '$lib/views/core/dialog/components/msg-dialog/msg-dialog.svelte';
import { mount, } from 'svelte';

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

export async function openListDialog({ items, label, desc, hasArrow, hasCheck, ...params }: DialogPropsType & { items?: any[], label?: string, desc?: string, hasArrow?: boolean, hasCheck?: boolean } = {}) {
    return await openDialog({
        component: ListDialog,
        props: {
            items,
            label,
            desc,
            hasArrow,
            hasCheck
        },
        ...params
    })
}

