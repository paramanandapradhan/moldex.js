type PropsType = {
    itemsCount?: number;
    pageIndex?: number;
    pageSize?: number;
    pageSizeOptions?: number[];
    itemsText?: string;
    pageSizeText?: string;
    pageText?: string;
    dropPosition?: 'top' | 'bottom' | 'middle' | undefined;
    disableSizeMenuButton?: boolean;
    onPageSizeChange?: (size: number) => void;
    onPageIndexChange?: (index: number) => void;
};
declare const Pagination: import("svelte").Component<PropsType, {}, "itemsCount" | "pageIndex" | "pageSize">;
type Pagination = ReturnType<typeof Pagination>;
export default Pagination;
