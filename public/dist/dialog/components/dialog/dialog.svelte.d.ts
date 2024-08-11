export type DialogPropsType = {
    id?: string;
    formId?: string | null;
    cancelable?: boolean;
    className?: string;
    containerClassName?: string;
    backdropClassName?: string;
    isFullScreen?: boolean;
    hasTitle?: boolean;
    hasSubtitle?: boolean;
    title?: string;
    subtitle?: string;
    titleClassName?: string;
    subtitleClassName?: string;
    hasHeader?: boolean;
    hasHeaderShadow?: boolean;
    headerClassName?: string;
    hasHeaderClose?: boolean;
    headerCloseButtonClassName?: string;
    headerCloseIconPath?: string;
    headerCloseIconClassName?: string;
    hasHeaderBack?: boolean;
    headerBackButtonClassName?: string;
    headerBackIconPath?: string;
    headerBackIconClassName?: string;
    hasFooter?: boolean;
    hasFooterShadow?: boolean;
    hasFooterCloseButton?: boolean;
    hasFooterOkButton?: boolean;
    footerClassName?: string;
    footerCloseLabel?: string;
    footerCloseButtonClassName?: string;
    footerOkLable?: string;
    footerOkButtonClassName?: string;
    footerOkButtonType?: 'button' | 'submit' | 'reset';
    footerOkButtonSpinner?: boolean;
    footerOkButtonDisabled?: boolean;
    bodyClassName?: string;
    component?: any;
    componetProps?: any;
    size?: 'sm' | 'md' | 'lg' | 'full';
    children?: Snippet;
    headerChildren?: Snippet<[dialogExports: DialogExportsType]>;
    bodyChildren?: Snippet<[dialogExports: DialogExportsType]>;
    footerChildren?: Snippet<[dialogExports: DialogExportsType]>;
    onclose?: () => void;
    onresult?: (value: any) => void;
};
export type DialogExportsType = {
    closeDialog: () => void;
    setResult: (value: any) => void;
    setOkSpinner: (value: boolean) => void;
    setOkDisabled: (value: boolean) => void;
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
declare const Dialog: $$__sveltets_2_IsomorphicComponent<DialogPropsType, {
    [evt: string]: CustomEvent<any>;
}, {}, {
    toggleDialog: () => void;
    openDialog: () => void;
    closeDialog: () => Promise<any>;
    setResult: (value: any) => void;
    setOkDisabled: (value: boolean) => void;
    setOkSpinner: (value: boolean) => void;
}, "">;
type Dialog = InstanceType<typeof Dialog>;
export default Dialog;
