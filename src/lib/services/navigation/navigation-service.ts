// import { goto, pushState } from '$app/navigation';
import { createRefererStore } from '$lib/stores/referrer-store/referrer-store.svelte';

import { BROWSER } from 'esm-env';
import { playMelody } from '../utils/melody-service';
import { goto } from '$app/navigation';
import { vibrate } from '../utils/utils-service';

// Define the extended options interface
export interface NavigationOptions {
    replaceState?: boolean;
    noscroll?: boolean;
    keepfocus?: boolean;
    state?: { tabName?: string };
    event?: MouseEvent; // The triggering event
    vibration?: number | number[]; // Vibration pattern or duration, e.g. Vibrates twice with a pause [200, 100, 200],
    sound?: [string, number][]; // Melody to play e.g. [ ['C4', 200], ['E4', 200],]
}


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
        window.history.pushState({}, '');
    }
}

export const addBackKeyListener = (callback: (event?: PopStateEvent) => boolean) => {
    if (BROWSER) {
        let listener = (event: PopStateEvent) => {
            if (callback) {
                let result = callback(event);
                if (result) {
                    window.history.pushState({}, '');
                }
            }
        }
        window.history.pushState({}, '');
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

/**
 * Jump back to the first history entry in this tab (i.e. “home”).
 * Falls back to a hard redirect if history is too shallow or cross‑origin.
 */
export function goHome(): void {
    // number of steps back to the first entry
    const stepsBack = -(window.history.length - 1);

    // if we have at least one previous entry, navigate there
    if (stepsBack < 0) {
        window.history.go(stepsBack);
    } else {
        // no history to go back to — just load your root
        window.location.replace('/');
    }
}

export function createRedirectUrl(): string | null {
    let pathname = window.location.pathname;
    let redirectUrl: string | null = pathname + window.location.search || '';
    let redirectInSearchParams = new URLSearchParams(window.location.search).get('redirect')
    return redirectInSearchParams || redirectUrl || '';
}



/**
 * Navigate to a URL with support for opening in a new tab, vibration, and sound effects.
 * @param url - The destination URL.
 * @param options - Extended options including vibration and sound.
 */
export async function navigate(url: string, options: NavigationOptions = {}) {
    const { event, vibration, sound, ...gotoOptions } = options;

    // Ensure window.open is safe and avoids potential abuse
    const openInNewTab = (targetUrl: string, tabName?: string) => {
        const sanitizedUrl = new URL(targetUrl, window.location.origin).href;
        const safeTabName = tabName?.replace(/[^a-zA-Z0-9-_]/g, '') || '_blank';
        window.open(sanitizedUrl, safeTabName, 'noopener,noreferrer');
    };;

    try {

        // Handle vibration if supported
        if (vibration) {
            vibrate(vibration);
        }

        // Handle sound playback
        if (sound) {
            playMelody(sound);
        }

        // Handle Ctrl key for opening in a new tab
        if (event && event instanceof MouseEvent && event.ctrlKey) {
            openInNewTab(url, gotoOptions.state?.tabName);
            return;
        }

        // Perform navigation using goto
        goto(url, gotoOptions);
    } catch (error) {
        console.error('Error navigating with enhancements:', error);
    }
}


