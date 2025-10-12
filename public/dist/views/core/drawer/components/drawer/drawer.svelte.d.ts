import type { Snippet } from 'svelte';
type PositionType = 'left' | 'right' | 'top' | 'bottom';
type PropsType = {
    backdropClassName?: string;
    children?: Snippet;
    className?: string;
    containerClassName?: string;
    drawerClassName?: string;
    floatingSnippet?: Snippet;
    id?: string;
    position?: PositionType;
};
declare const Drawer: import("svelte").Component<PropsType, {
    toggleDrawer: () => void;
    openDrawer: () => void;
    closeDrawer: () => void;
}, "">;
type Drawer = ReturnType<typeof Drawer>;
export default Drawer;
