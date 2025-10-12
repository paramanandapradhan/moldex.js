export var ScreenSizeEnum;
(function (ScreenSizeEnum) {
    ScreenSizeEnum["XS"] = "xs";
    ScreenSizeEnum["SM"] = "sm";
    ScreenSizeEnum["MD"] = "md";
    ScreenSizeEnum["LG"] = "lg";
    ScreenSizeEnum["XL"] = "xl";
    ScreenSizeEnum["XXL"] = "2xl";
})(ScreenSizeEnum || (ScreenSizeEnum = {}));
export function createScreenSizeStore(initial = ScreenSizeEnum.XXL) {
    let _size = $state(initial);
    return {
        get size() {
            return _size;
        },
        get isXXL() {
            return _size === ScreenSizeEnum.XXL;
        },
        get isXL() {
            return _size === ScreenSizeEnum.XL;
        },
        get isLg() {
            return _size === ScreenSizeEnum.LG;
        },
        get isMd() {
            return _size === ScreenSizeEnum.MD;
        },
        get isSm() {
            return _size === ScreenSizeEnum.SM;
        },
        get isXs() {
            return _size === ScreenSizeEnum.XS;
        },
        get isMobileScreen() {
            return this.isXs || this.isSm || this.isMd;
        },
        set size(size) {
            _size = size;
        }
    };
}
