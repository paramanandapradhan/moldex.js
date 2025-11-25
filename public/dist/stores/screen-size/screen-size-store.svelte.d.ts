import { ScreenSize } from "../../types";
export declare function createScreenSizeStore(initial?: ScreenSize): {
    size: ScreenSize;
    readonly isXXL: boolean;
    readonly isXL: boolean;
    readonly isLg: boolean;
    readonly isMd: boolean;
    readonly isSm: boolean;
    readonly isXs: boolean;
    readonly isMobileScreen: any;
};
