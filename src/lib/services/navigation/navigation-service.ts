import { BROWSER } from 'esm-env';
import { goto } from '$app/navigation';
import { createRefererStore } from '$lib/stores/referrer-store/referrer-store.svelte.js';
import { vibrate } from '../utils/utils-service.js';
import { playMelody } from '../utils/melody-service.js';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface NavigationOptions {
    replaceState?: boolean;
    noscroll?: boolean;
    keepfocus?: boolean;
    state?: { tabName?: string };
    event?: MouseEvent;
    vibration?: number | number[];
    sound?: [string, number][];
}

export type BackStateType = {
    _id: string;
    isModal?: boolean;
    isOffcanvas?: boolean;
    listener: (state: BackStateType) => void;
    data?: any;
};

// ─── Referrer store ───────────────────────────────────────────────────────────

export const referrer = createRefererStore();

// ─── Back-state stack ─────────────────────────────────────────────────────────
// Plain array — intentionally not reactive (not UI state)

let backStateArray: BackStateType[] = [];

export const pushBackState = (obj: BackStateType) => {
    backStateArray.push(obj);
};

export const popBackState = (): BackStateType | undefined => {
    return backStateArray.pop();
};

/**
 * Push a dummy history entry so the browser's back gesture fires a `popstate`
 * event instead of leaving the page. Stores the id in the state object so we
 * can identify Moldex-pushed entries.
 */
export const registerBackPress = (state: BackStateType) => {
    if (BROWSER) {
        pushBackState(state);
        window.history.pushState({ _moldex: state._id }, '');
    }
};

export const addBackKeyListener = (callback: (event?: PopStateEvent) => boolean) => {
    if (BROWSER) {
        const listener = (event: PopStateEvent) => {
            if (callback) {
                const result = callback(event);
                if (result) {
                    window.history.pushState({}, '');
                }
            }
        };
        window.history.pushState({}, '');
        window.addEventListener('popstate', listener);
        return listener;
    }
};

export const removeBackKeyListener = (listener: EventListener) => {
    if (BROWSER) {
        window.removeEventListener('popstate', listener);
    }
};

// ─── Safe back navigation ─────────────────────────────────────────────────────

/**
 * Returns `true` when there is a previous entry in session history that
 * belongs to the same origin — i.e. the user navigated here from within
 * the same application.
 */
export function canGoBack(): boolean {
    if (!BROWSER) return false;
    // history.length > 1 → at least one entry exists before the current page
    // document.referrer from the same origin → we arrived from our own app
    const sameOriginReferrer =
        document.referrer !== '' &&
        document.referrer.startsWith(window.location.origin);
    return window.history.length > 1 && sameOriginReferrer;
}

/**
 * Navigate back to the previous page **only** if it is within the same app.
 * Falls back to `homePath` (default `/`) when there is no in-app history,
 * so the user is never stranded on a blank tab or sent to an external site.
 */
export function goBack(homePath = '/'): void {
    if (!BROWSER) return;
    if (canGoBack()) {
        window.history.back();
    } else {
        goto(homePath, { replaceState: true });
    }
}

/**
 * Navigate to the application home page via SvelteKit's `goto`
 * (keeps it a SPA navigation, no full page reload).
 */
export function goHome(homePath = '/'): void {
    if (!BROWSER) return;
    goto(homePath);
}

// ─── Misc helpers ─────────────────────────────────────────────────────────────

export function createRedirectUrl(): string | null {
    if (!BROWSER) return null;
    const pathname = window.location.pathname;
    const redirectInSearchParams = new URLSearchParams(window.location.search).get('redirect');
    return redirectInSearchParams || pathname + window.location.search || '';
}

/**
 * Navigate to a URL with optional Ctrl+click new-tab, vibration, and sound.
 */
export async function navigate(url: string, options: NavigationOptions = {}) {
    const { event, vibration, sound, ...gotoOptions } = options;

    const openInNewTab = (targetUrl: string, tabName?: string) => {
        const sanitizedUrl = new URL(targetUrl, window.location.origin).href;
        const safeTabName = tabName?.replace(/[^a-zA-Z0-9-_]/g, '') || '_blank';
        window.open(sanitizedUrl, safeTabName, 'noopener,noreferrer');
    };

    try {
        if (vibration) vibrate(vibration);
        if (sound) playMelody(sound);

        if (event instanceof MouseEvent && event.ctrlKey) {
            openInNewTab(url, gotoOptions.state?.tabName);
            return;
        }

        goto(url, gotoOptions);
    } catch (error) {
        console.error('Error navigating:', error);
    }
}
