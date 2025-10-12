import './ripple.css';
export type RipplePropsType = {
    color?: string | 'light' | 'dark';
};
export declare function ripple(node: HTMLElement, { color }?: RipplePropsType): {
    destroy(): void;
};
