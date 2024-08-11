import type { Snippet } from 'svelte';
import type { ListItemType } from '../button-list-item/button-list-item.svelte';
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
declare const ButtonMenu: $$__sveltets_2_IsomorphicComponent<{
    id?: string;
    className?: string;
    screenOnlyDesc?: string;
    style?: string;
    disabled?: boolean | undefined | null;
    imgSrc?: string;
    imgClassName?: string;
    imgAlt?: string;
    leftIconPath?: string;
    leftIconClassName?: string;
    rightIconPath?: string;
    rightIconClassName?: string;
    label?: string;
    labelClassName?: string;
    dropdownClassName?: string;
    dropdownStyle?: string;
    hasCheck?: boolean;
    checkIconPath?: string;
    checkIconClassName?: string;
    menus?: string[] | ListItemType[];
    containerClassName?: string;
    backgropClassName?: string;
    menuItemClassName?: string;
    uncheckIconPath?: string;
    uncheckIconClassName?: string;
    dropdownOpenClassName?: string;
    dropdownCloseClassName?: string;
    checkClassName?: string;
    listIconClassName?: string;
    listImgClassName?: string;
    listLabelClassName?: string;
    listDescClassName?: string;
    dividerClassName?: string;
    dropIconPath?: string;
    dropIconClassName?: string;
    onmenuclick?: (ev: MouseEvent, item: string | ListItemType, index: number) => void;
    children?: Snippet;
    buttonChildren?: Snippet;
    menuItemChildren?: Snippet<[ListItemType, number]>;
    menuItemInnerChildren?: Snippet<[ListItemType, number]>;
}, {
    [evt: string]: CustomEvent<any>;
}, {}, {}, "">;
type ButtonMenu = InstanceType<typeof ButtonMenu>;
export default ButtonMenu;
