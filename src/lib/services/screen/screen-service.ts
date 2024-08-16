import { createScreenSizeStore, ScreenSizeEnum } from "$lib/stores/screen-size/screen-size-store.svelte";
import { BROWSER } from "esm-env";

export const screenSize = createScreenSizeStore();

export const handleScreenSizeUpdate = (size: number) => {
    // console.log('screenSizeChanged', size)
    if (BROWSER && size) {
        if (size >= 1400) {
            screenSize.size = ScreenSizeEnum.XXL;
        } else if (size >= 1200) {
            screenSize.size = ScreenSizeEnum.XL;
        } else if (size >= 992) {
            screenSize.size = ScreenSizeEnum.LG;
        } else if (size >= 768) {
            screenSize.size = ScreenSizeEnum.MD;
        } else if (size >= 576) {
            screenSize.size = ScreenSizeEnum.SM;
        } else if (size < 576) {
            screenSize.size = ScreenSizeEnum.SM;
        }
    }
};

export function isSmallScreen() {
    return screenSize.isSm || screenSize.isXs;
}

export function isMobileScreen() {
    return isSmallScreen();
}

export function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || (navigator as any).msMaxTouchPoints > 0 || window.matchMedia("(pointer: coarse)").matches;
}
