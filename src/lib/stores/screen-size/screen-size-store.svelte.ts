export enum ScreenSizeEnum {
    XS = 'xs',
    SM = 'sm',
    MD = 'md',
    LG = 'lg',
    XL = 'xl',
    XXL = '2xl',
}

export function createScreenSizeStore(initial: ScreenSizeEnum = ScreenSizeEnum.XXL) {

    let _size: ScreenSizeEnum = $state(initial);

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
        set size(size: ScreenSizeEnum) {
            _size = size;
        }

    }
}