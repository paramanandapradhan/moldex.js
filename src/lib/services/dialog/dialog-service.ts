
import { Dialog, type DialogPropsType } from '$lib/views';
import { mount, } from 'svelte';

function addDialog(props: DialogPropsType) {
    const dialog = mount(Dialog, { target: document.getElementsByTagName('body')[0]!, props });
    dialog.openDialog();
    return dialog;
}

export function openDialog<R>(props: DialogPropsType = {}): Promise<R> {
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

