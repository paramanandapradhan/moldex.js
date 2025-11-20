
import { Toast, type ToastPropsType } from "$lib/views";
import { mount } from "svelte";

function addToast(props: ToastPropsType) {
    const toast: any = mount(Toast, { target: document.getElementsByTagName('body')[0]!, props });
    toast.openToast();
    return toast;
}

export function showToast(props: ToastPropsType | string) {
    let newProps: ToastPropsType = { msg: 'Ok' };
    if (typeof props === 'string') {
        newProps.msg = props as string;
    } else {
        newProps = props;
    }
    addToast(newProps);
}

export function showSuccessToast() {
    showToast('Success')
}

export function showFailedToast() {
    showToast('Failed')
}

export function showErrorToast() {
    showToast('Error')
}

