import type { Snippet } from 'svelte';
interface $$__sveltets_2_IsomorphicComponent<Props extends Record<string, any> = any, Events extends Record<string, any> = any, Slots extends Record<string, any> = any, Exports = {}, Bindings = string> {
    new (options: import('svelte').ComponentConstructorOptions<Props>): import('svelte').SvelteComponent<Props, Events, Slots> & {
        $$bindings?: Bindings;
    } & Exports;
    (internal: unknown, props: Props & {
        $$events?: Events;
        $$slots?: Slots;
    }): Exports & {
        $set?: any;
        $on?: any;
    };
    z_$$bindings?: Bindings;
}
declare const Drawer: $$__sveltets_2_IsomorphicComponent<{
    children?: Snippet;
    id?: string;
    backdropClassName?: string;
    className?: string;
    containerClassName?: string;
    drawerContainerClassName?: string;
    drawerClassName?: string;
}, {
    [evt: string]: CustomEvent<any>;
}, {}, {
    toggleDrawer: () => void;
    openDrawer: () => void;
    closeDrawer: () => void;
}, "">;
type Drawer = InstanceType<typeof Drawer>;
export default Drawer;
