import type { Snippet } from 'svelte';
type Props = {
    items: any[];
    itemHeight: number;
    containerHeight: number;
    itemSnippet: Snippet<[item: any, index: number]>;
    buffer?: number;
};
declare const VirtualScrollingList: import("svelte").Component<Props, {}, "">;
type VirtualScrollingList = ReturnType<typeof VirtualScrollingList>;
export default VirtualScrollingList;
