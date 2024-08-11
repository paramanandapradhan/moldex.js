export type RipplePropsType = {
    /**
     * The color of the ripple effect, default is rgba(0, 0, 0, 0.12)
     */
    color?: string;
    /**
     * If true, the ripple effect will be light color rgba(255, 255, 255, 0.12), default is false.
     */
    light?: boolean;
};
export declare const DARK_RIPPLE_COLOR = "rgba(0, 0, 0, 0.12)";
export declare const LIGHT_RIPPLE_COLOR = "rgba(255, 255, 255, 0.12)";
export declare function ripple(node: HTMLElement, { color, light }?: RipplePropsType): {
    destroy(): void;
};
export declare function isTouchDevice(): boolean;
