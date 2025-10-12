import type { Snippet } from 'svelte';
type BreakpointType = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type PropsType = {
    children?: Snippet;
    className?: string;
    id?: string;
    responsiveBreakpoint?: BreakpointType;
    sidebarPosition?: 'none' | 'left' | 'right';
};
declare const ContentArea: import("svelte").Component<PropsType, {}, "">;
type ContentArea = ReturnType<typeof ContentArea>;
export default ContentArea;
