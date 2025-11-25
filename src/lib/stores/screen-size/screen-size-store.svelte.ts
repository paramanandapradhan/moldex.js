import { ScreenSize } from "$lib/types";

export function createScreenSizeStore(initial: ScreenSize = ScreenSize.XXL) {

    let _size: ScreenSize = $state(initial);

    return {
        get size() {
            return _size;
        },
        get isXXL() {
            return _size === ScreenSize.XXL;
        },
        get isXL() {
            return _size === ScreenSize.XL;
        },
        get isLg() {
            return _size === ScreenSize.LG;
        },
        get isMd() {
            return _size === ScreenSize.MD;
        },
        get isSm() {
            return _size === ScreenSize.SM;
        },
        get isXs() {
            return _size === ScreenSize.XS;
        },
        get isMobileScreen() {
            return this.isXs || this.isSm || this.isMd;
        },
        set size(size: ScreenSize) {
            _size = size;
        }
    }
}