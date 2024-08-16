import { BROWSER } from "esm-env";
import { get, writable } from "svelte/store";

export const isXxl = writable<boolean>(false);
export const isXl = writable<boolean>(false);
export const isLg = writable<boolean>(false);
export const isMd = writable<boolean>(false);
export const isSm = writable<boolean>(false);
export const isXs = writable<boolean>(true);

export const handleScreenSizeUpdate = (size: number) => {
    // console.log('screenSizeChanged', size)
    if (BROWSER && size) {
        isXxl.set(false);
        isXl.set(false);
        isLg.set(false);
        isMd.set(false);
        isSm.set(false);
        isXs.set(false);
        if (size >= 1400) {
            isXxl.set(true);
        } else if (size >= 1200) {
            isXl.set(true);
        } else if (size >= 992) {
            isLg.set(true);
        } else if (size >= 768) {
            isMd.set(true);
        } else if (size >= 576) {
            isSm.set(true);
        } else if (size < 576) {
            isXs.set(true);
        }
    }
};

export function isSmallScreen() {
    return get(isSm) || get(isXs);
}

export function isMobileScreen() {
    return isSmallScreen();
}
