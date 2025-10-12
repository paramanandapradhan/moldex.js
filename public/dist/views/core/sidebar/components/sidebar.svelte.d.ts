import type { Snippet } from 'svelte';
type BreakpointType = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type PropsType = {
    children?: Snippet;
    className?: string;
    id?: string;
    responsiveBreakpoint?: BreakpointType;
    position?: 'left' | 'right';
};
declare const Sidebar: import("svelte").Component<PropsType, {}, "">;
type Sidebar = ReturnType<typeof Sidebar>;
export default Sidebar;
