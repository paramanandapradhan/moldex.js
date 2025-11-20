export declare enum ScreenSizeEnum {
    XS = "xs",
    SM = "sm",
    MD = "md",
    LG = "lg",
    XL = "xl",
    XXL = "2xl"
}
export declare function createScreenSizeStore(initial?: ScreenSizeEnum): {
    size: ScreenSizeEnum;
    readonly isXXL: boolean;
    readonly isXL: boolean;
    readonly isLg: boolean;
    readonly isMd: boolean;
    readonly isSm: boolean;
    readonly isXs: boolean;
    readonly isMobileScreen: any;
};
