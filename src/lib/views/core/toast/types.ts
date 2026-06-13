import type { Snippet } from 'svelte';

export type ToastPropsType = {
    id?: string;
    msg: string;
    duration?: number;
    className?: string;
    children?: Snippet;
    /** Render `msg` as raw HTML. Default false → escaped as plain text (XSS-safe). */
    allowHtml?: boolean;
};