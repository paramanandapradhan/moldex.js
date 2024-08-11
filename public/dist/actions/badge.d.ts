export type BadgeProsType = {
    containerClassName?: string;
    badgePositionClassName?: string;
    badgeContainerClassName?: string;
    badgeClassName?: string;
    badgeBackgroundClassName?: string;
    badgeText?: string;
    hasBadgeBackground?: boolean;
};
export declare function badge(node: HTMLElement, { containerClassName, badgePositionClassName, badgeContainerClassName, badgeClassName, badgeBackgroundClassName, badgeText, hasBadgeBackground }?: BadgeProsType): {
    destroy(): void;
};
