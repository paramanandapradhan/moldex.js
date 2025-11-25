
import { createScreenSizeStore, } from "$lib/stores/screen-size/screen-size-store.svelte.js";
import { BROWSER } from "esm-env";
import { DialogSizeEnum } from "../dialog/dialog-service.js";
import { ScreenSize } from "$lib/types.js";


export const screenSize = createScreenSizeStore();

export const handleScreenSizeUpdate = (size: number) => {
    // console.log('screenSizeChanged', size)
    if (BROWSER && size) {
        if (size >= 1400) {
            screenSize.size = ScreenSize.XXL;
        } else if (size >= 1200) {
            screenSize.size = ScreenSize.XL;
        } else if (size >= 992) {
            screenSize.size = ScreenSize.LG;
        } else if (size >= 768) {
            screenSize.size = ScreenSize.MD;
        } else if (size >= 576) {
            screenSize.size = ScreenSize.SM;
        } else if (size < 576) {
            screenSize.size = ScreenSize.SM;
        }
    }
};

export function isSmallScreen() {
    return screenSize.isSm || screenSize.isXs;
}

export function isMobileScreen() {
    return isSmallScreen();
}

export function getDialogSize() {
    return isMobileScreen() ? DialogSizeEnum.FULL : DialogSizeEnum.SM;
}

export function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || (navigator as any).msMaxTouchPoints > 0 || window.matchMedia("(pointer: coarse)").matches;
}
