import type { Snippet } from "svelte";

export type ButtonAppearance =
    | 'none'
    | 'primary'
    | 'neutral'
    | 'border'
    | 'border-neutral'
    | 'border-primary';

export type ButtonSize = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export type ButtonType = 'button' | 'submit' | 'reset';

export type ButtonProps = {
    title?: string;
    id?: string;
    type?: ButtonType;
    appearance?: ButtonAppearance;
    size?: ButtonSize;
    form?: string | null;
    className?: string;
    iconPath?: string;
    iconClassName?: string;
    label?: string;
    rightIconPath?: string;
    rightIconClassName?: string;
    spinner?: boolean;
    disabled?: boolean;
    spinnerClassName?: string;
    onlySpinner?: boolean;
    children?: Snippet;
    hasRipple?: boolean;
    rippleColor?: string | 'light' | 'dark';
    url?: string;
    target?: string;
    hasOpenInNew?: boolean;
    openInNewIconClassName?: string;
    openInNewIcon?: string;
    onClick?: (ev: MouseEvent) => void;
    onDblClick?: (ev: MouseEvent) => void;
    onContextMenu?: (ev: MouseEvent) => void;
    onDrop?: (ev: DragEvent) => void;
    onDragStart?: (ev: DragEvent) => void;
    onDragEnd?: (ev: DragEvent) => void;
    onDragEnter?: (ev: DragEvent) => void;
    onDragLeave?: (ev: DragEvent) => void;
    onDragOver?: (ev: DragEvent) => void;
};

export type ButtonListItemProps = {
    appearance?: ButtonAppearance;
    size?: ButtonSize;
    index?: number;
    id?: string;
    className?: string;
    checkboxIconPath?: string;
    uncheckboxIconPath?: string;
    checkboxIconClassName?: string;
    uncheckboxIconClassName?: string;
    hasIcon?: boolean;
    iconClassName?: string;
    hasImg?: boolean;
    imgClassName?: string;
    hasArrow?: boolean;
    arrowIconPath?: string;
    arrowClassName?: string;
    title?: string;
    subtitle?: string;
    titleClassName?: string;
    subtitleClassName?: string;
    url?: string;
    disabled?: boolean;
    iconPath?: string;
    isCircularIcon?: boolean;
    circularIconClassName?: string;
    imgSrc?: string;
    hasCheckbox?: boolean;
    checkboxClassName?: string;
    isChecked?: boolean;
    hasMenu?: boolean;
    menus?: Menu[] | string[];
    menuIconPath?: string;
    menuIconClassName?: string;
    menuButtonClassName?: string;
    menuButtonLabel?: string;
    hasDivider?: boolean;
    dividerClassName?: string;
    onMenu?: (ev: Event, menu: Menu | string) => void;
    onClick?: (ev: MouseEvent) => void;
    children?: Snippet;
};

export type Menu = {
    _id?: string;
    title?: string;
    subtitle?: string;
    hasIcon?: boolean;
    iconPath?: string;
    iconClassName?: string;
    hasCheckbox?: boolean;
    checkboxClassName?: string;
    isChecked?: boolean;
};

export type SwitchProps = {
    id?: string;
    checked?: boolean;
    disabled?: boolean;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
    onChange?: (checked: boolean) => void;
};