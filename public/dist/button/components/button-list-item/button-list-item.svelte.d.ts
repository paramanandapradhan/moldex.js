export type ListItemType = {
    id?: string;
    label?: string;
    labelClassName?: string;
    desc?: string;
    descClassName?: string;
    url?: string;
    onclick?: (ev: MouseEvent, item: ListItemType) => void;
    disabled?: boolean;
    iconPath?: string;
    iconClassName?: string;
    imgSrc?: string;
    imgClassName?: string;
    className?: string;
    openInNewWindow?: boolean;
    divider?: boolean;
    hasArrow?: boolean;
    arrowIconPath?: string;
    arrowClassName?: string;
};
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
declare const ButtonListItem: $$__sveltets_2_IsomorphicComponent<{
    item: ListItemType;
    index: number;
    listId?: string;
    className?: string;
    hasCheck?: boolean;
    checkIconPath?: string;
    uncheckIconPath?: string;
    checkIconClassName?: string;
    uncheckIconClassName?: string;
    checkClassName?: string;
    iconClassName?: string;
    imgClassName?: string;
    labelClassName?: string;
    descClassName?: string;
    checked?: boolean;
    hasArrow?: boolean;
    arrowIconPath?: string;
    arrowClassName?: string;
    onclick?: (ev: MouseEvent, item: ListItemType, index: number) => void;
    children?: Snippet<[ListItemType, number]>;
}, {
    [evt: string]: CustomEvent<any>;
}, {}, {}, "">;
type ButtonListItem = InstanceType<typeof ButtonListItem>;
export default ButtonListItem;
