import { mount } from "svelte";
import Toast, { type ToastPropsType } from "../components/toast/toast.svelte";

function addToast(props: ToastPropsType) {
    const toast = mount(Toast, { target: document.getElementsByTagName('body')[0]!, props });
    toast.openToast();
    return toast;
}

export function openToast(props: ToastPropsType | string) {
    let newProps: ToastPropsType = { msg: 'Ok' };
    if (typeof props === 'string') {
        newProps.msg = props as string;
    } else {
        newProps = props;
    }
    addToast(newProps);
}

export function openSuccessToast() {
    openToast('Success')
}

export function openFailedToast() {
    openToast('Failed')
}

export function openErrorToast() {
    openToast('Error')
}

