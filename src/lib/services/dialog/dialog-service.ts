
import { mount, unmount } from 'svelte';
import Dialog, { type DialogPropsType } from '../../views/dialog/components/dialog/dialog.svelte';

function addDialog(props: DialogPropsType) {
    const dialog = mount(Dialog, { target: document.getElementsByTagName('body')[0]!, props });
    dialog.openDialog();
    return dialog;
}

export function openDialog<R>(props: DialogPropsType = {}): Promise<R> {
    return new Promise((resolve) => {
        let dialog = addDialog({ ...props, onclose, onresult, });
        function onclose() {
            if (dialog) {
                if (props.onclose) {
                    props.onclose();
                }
            }
        }

        function onresult(value: R) {
            resolve(value);
            if (props.onresult) {
                onresult(value);
            }

        }
    });
}

