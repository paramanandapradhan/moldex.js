import type { Snippet } from "svelte";


export type NavbarProps = {
    disabledLogo?: boolean;
    backIconPath?: string;
    backButtonClassName?: string;
    centerContainerClassName?: string;
    centerSnippet?: Snippet<[]>;
    children?: Snippet;
    className?: String;
    drawerButtonClassName?: string;
    hasBack?: boolean;
    hasLogo?: boolean;
    hasMore?: boolean;
    hasSubtitle?: boolean;
    hasTitle?: boolean;
    id?: string;
    leftContainerClassName?: string;
    leftSnippet?: Snippet<[]>;
    logoButtonClassName?: string;
    logoIconClassName?: string;
    logoIconPath?: string;
    logoImgClassName?: string;
    logoImgSrc?: string;
    moreIconPath?: string;
    morePosition?: 'left' | 'right';
    onLogo?: () => void;
    onMore?: () => void;
    onBack?: () => void;
    rightContainerClassName?: string;
    rightSnippet?: Snippet<[]>;
    subtitle?: string;
    subtitleClassName?: string;
    title?: string;
    titleClassName?: string;
};