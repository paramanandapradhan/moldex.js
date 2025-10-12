import { ScreenSizeEnum } from "../../stores/screen-size/screen-size-store.svelte";
import { DialogSizeEnum } from "../dialog/dialog-service";
export declare const screenSize: {
    size: ScreenSizeEnum;
    readonly isXXL: boolean;
    readonly isXL: boolean;
    readonly isLg: boolean;
    readonly isMd: boolean;
    readonly isSm: boolean;
    readonly isXs: boolean;
    readonly isMobileScreen: boolean;
};
export declare const handleScreenSizeUpdate: (size: number) => void;
export declare function isSmallScreen(): boolean;
export declare function isMobileScreen(): boolean;
export declare function getDialogSize(): DialogSizeEnum.SM | DialogSizeEnum.FULL;
export declare function isTouchDevice(): boolean;
