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
declare const Navbar: $$__sveltets_2_IsomorphicComponent<{
    id?: string;
    className?: String;
    hasDrawer?: boolean;
    drawerIconPath?: string;
    drawerButtonClassName?: string;
    logoButtonClassName?: string;
    hasLogo?: boolean;
    logoIconPath?: string;
    logoIconClassName?: string;
    logoImgSrc?: string;
    logoImgClassName?: string;
    leftContainerClassName?: string;
    centerContainerClassName?: string;
    rightContainerClassName?: string;
    title?: string;
    subtitle?: string;
    titleClassName?: string;
    subtitleClassName?: string;
    hasTitle?: boolean;
    hasSubtitle?: boolean;
    children?: Snippet;
    leftChildren?: Snippet;
    centerChildren?: Snippet;
    rightChildren?: Snippet;
    ondrawer?: () => void;
    onlogo?: () => void;
}, {
    [evt: string]: CustomEvent<any>;
}, {}, {}, "">;
type Navbar = InstanceType<typeof Navbar>;
export default Navbar;
