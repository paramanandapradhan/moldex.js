import type { Snippet } from 'svelte';
type PlacementType = 'top' | 'bottom' | 'left' | 'right';
type PropsType = {
    message?: string;
    className?: string;
    iconPath?: string;
    iconClassName?: string;
    iconPlacement?: PlacementType;
    children?: Snippet;
};
declare const NoData: import("svelte").Component<PropsType, {}, "">;
type NoData = ReturnType<typeof NoData>;
export default NoData;
