import Toast from "../../views/core/toast/components/toast/toast.svelte";
import { mount } from "svelte";
function addToast(props) {
    const toast = mount(Toast, { target: document.getElementsByTagName('body')[0], props });
    toast.openToast();
    return toast;
}
export function showToast(props) {
    let newProps = { msg: 'Ok' };
    if (typeof props === 'string') {
        newProps.msg = props;
    }
    else {
        newProps = props;
    }
    addToast(newProps);
}
export function showSuccessToast() {
    showToast('Success');
}
export function showFailedToast() {
    showToast('Failed');
}
export function showErrorToast() {
    showToast('Error');
}
