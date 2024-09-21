import { goto, pushState } from '$app/navigation';
import { createRefererStore } from '$lib/stores/referrer-store/referrer-store.svelte';

import { BROWSER } from 'esm-env';

export type BackStateType = {
    _id: string,
    isModal?: boolean,
    isOffcanvas?: boolean,
    listener: (state: BackStateType) => void
    data?: any
};

export const referrer = createRefererStore();

let backStateArray: BackStateType[] = [];

export const pushBackState = (obj: BackStateType) => {
    backStateArray.push(obj);
}

export const popBackState = (): BackStateType | undefined => {
    return backStateArray.pop();
}

export const registerBackPress = (state: BackStateType) => {
    if (BROWSER) {
        pushBackState(state);
        pushState('', {});
    }
}

export const addBackKeyListener = (callback: (event?: PopStateEvent) => boolean) => {
    if (BROWSER) {
        let listener = (event: PopStateEvent) => {
            if (callback) {
                let result = callback(event);
                if (result) {
                    pushState('', {});
                }
            }
        }
        pushState('', {});
        window.addEventListener('popstate', listener);
        return listener;
    }
}

export const removeBackKeyListener = (listener: () => boolean) => {
    if (BROWSER) {
        window.removeEventListener('popstate', listener);
    }
}

export function goBack() {
    history.back();
}

export function goHome() {
    goto('/', { replaceState: true });
};

export function createRedirectUrl(): string | null {
    let pathname = window.location.pathname;
    let redirectUrl: string | null = pathname + window.location.search || '';
    let redirectInSearchParams = new URLSearchParams(window.location.search).get('redirect')
    return redirectInSearchParams || redirectUrl || '';
}

