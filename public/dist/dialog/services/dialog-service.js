import { mount, unmount } from 'svelte';
import Dialog, {} from '../components/dialog/dialog.svelte';
function addDialog(props) {
    const dialog = mount(Dialog, { target: document.getElementsByTagName('body')[0], props });
    dialog.openDialog();
    return dialog;
}
export function openDialog(props = {}) {
    return new Promise((resolve) => {
        let dialog = addDialog({ ...props, onclose, onresult, });
        function onclose() {
            if (dialog) {
                if (props.onclose) {
                    props.onclose();
                }
            }
        }
        function onresult(value) {
            resolve(value);
            if (props.onresult) {
                onresult(value);
            }
        }
    });
}
