import { createScreenSizeStore, } from "../../stores/screen-size/screen-size-store.svelte.js";
import { BROWSER } from "esm-env";
import { DialogSizeEnum } from "../dialog/dialog-service.js";
import { ScreenSize } from "../../types.js";
export const screenSizeStore = createScreenSizeStore();
export const handleScreenSizeUpdate = (size) => {
    // console.log('screenSizeChanged', size)
    if (BROWSER && size) {
        if (size >= 1400) {
            screenSizeStore.size = ScreenSize.XXL;
        }
        else if (size >= 1200) {
            screenSizeStore.size = ScreenSize.XL;
        }
        else if (size >= 992) {
            screenSizeStore.size = ScreenSize.LG;
        }
        else if (size >= 768) {
            screenSizeStore.size = ScreenSize.MD;
        }
        else if (size >= 576) {
            screenSizeStore.size = ScreenSize.SM;
        }
        else if (size < 576) {
            screenSizeStore.size = ScreenSize.SM;
        }
    }
};
export function isSmallScreen() {
    return screenSizeStore.isSm || screenSizeStore.isXs;
}
export function isMobileScreen() {
    return isSmallScreen();
}
export function getDialogSize() {
    return isMobileScreen() ? DialogSizeEnum.FULL : DialogSizeEnum.SM;
}
export function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 || window.matchMedia("(pointer: coarse)").matches;
}
