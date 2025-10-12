import type { Snippet } from 'svelte';
export type ToastPropsType = {
    id?: string;
    msg: string;
    duration?: number;
    className?: string;
    children?: Snippet;
};
declare const Toast: import("svelte").Component<ToastPropsType, {
    openToast: () => void;
    closeClose: () => void;
}, "">;
type Toast = ReturnType<typeof Toast>;
export default Toast;
