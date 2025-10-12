import type { Snippet } from 'svelte';
type PropsType = {
    className?: string;
    backgroundClassName?: string;
    value?: number;
    showValue?: boolean;
    children?: Snippet;
};
declare const Progressbar: import("svelte").Component<PropsType, {}, "">;
type Progressbar = ReturnType<typeof Progressbar>;
export default Progressbar;
