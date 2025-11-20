import type { Snippet } from 'svelte';

export type ToastPropsType = {
    id?: string;
    msg: string;
    duration?: number;
    className?: string;
    children?: Snippet;
};