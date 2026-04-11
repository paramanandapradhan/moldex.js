import { BROWSER } from 'esm-env';
import { goto } from '$app/navigation';
import { createRefererStore } from '../../stores/referrer-store/referrer-store.svelte.js';
import { vibrate } from '../utils/utils-service.js';
import { playMelody } from '../utils/melody-service.js';
// ─── Referrer store ───────────────────────────────────────────────────────────
export const referrer = createRefererStore();
// ─── Back-state stack ─────────────────────────────────────────────────────────
// Plain array — intentionally not reactive (not UI state)
let backStateArray = [];
export const pushBackState = (obj) => {
    backStateArray.push(obj);
};
export const popBackState = () => {
    return backStateArray.pop();
};
/**
 * Push a dummy history entry so the browser's back gesture fires a `popstate`
 * event instead of leaving the page. Stores the id in the state object so we
 * can identify Moldex-pushed entries.
 */
export const registerBackPress = (state) => {
    if (BROWSER) {
        pushBackState(state);
        window.history.pushState({ _moldex: state._id }, '');
    }
};
export const addBackKeyListener = (callback) => {
    if (BROWSER) {
        const listener = (event) => {
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
export const removeBackKeyListener = (listener) => {
    if (BROWSER) {
        window.removeEventListener('popstate', listener);
    }
};
// ─── Safe back navigation ─────────────────────────────────────────────────────
/**
 * Counter of in-app navigations performed via `navigate()`.
 * Used by `goBack()` to determine whether there is in-app history to return to,
 * without relying on `document.referrer` (which is not updated on SPA navigations).
 */
let inAppNavigationCount = 0;
/**
 * Returns `true` when at least one in-app navigation has been recorded,
 * meaning `goBack()` can safely step back without leaving the application.
 */
export function canGoBack() {
    return inAppNavigationCount > 0;
}
/**
 * Go back exactly one step in history **only** if that step is within the app.
 * Falls back to `homePath` (default `/`) when there is no in-app history,
 * so the user is never sent to another application or an external site.
 */
export function goBack(homePath = '/') {
    if (!BROWSER)
        return;
    if (inAppNavigationCount > 0) {
        inAppNavigationCount--;
        window.history.back();
    }
    else {
        goto(homePath, { replaceState: true });
    }
}
/**
 * Navigate to the application home page via SvelteKit's `goto`
 * (keeps it a SPA navigation, no full page reload).
 */
export function goHome(homePath = '/') {
    if (!BROWSER)
        return;
    goto(homePath);
}
// ─── Misc helpers ─────────────────────────────────────────────────────────────
export function createRedirectUrl() {
    if (!BROWSER)
        return null;
    const pathname = window.location.pathname;
    const redirectInSearchParams = new URLSearchParams(window.location.search).get('redirect');
    return redirectInSearchParams || pathname + window.location.search || '';
}
/**
 * Navigate to a URL with optional Ctrl+click new-tab, vibration, and sound.
 */
export async function navigate(url, options = {}) {
    if (typeof url !== 'string') {
        console.error('[navigate] Expected a string URL but received:', url);
        return;
    }
    const { event, vibration, sound, ...gotoOptions } = options;
    const openInNewTab = (targetUrl, tabName) => {
        const sanitizedUrl = new URL(targetUrl, window.location.origin).href;
        const safeTabName = tabName?.replace(/[^a-zA-Z0-9-_]/g, '') || '_blank';
        window.open(sanitizedUrl, safeTabName, 'noopener,noreferrer');
    };
    try {
        if (vibration)
            vibrate(vibration);
        if (sound)
            playMelody(sound);
        if (event instanceof MouseEvent && event.ctrlKey) {
            openInNewTab(url, gotoOptions.state?.tabName);
            return;
        }
        if (!gotoOptions.replaceState) {
            inAppNavigationCount++;
        }
        goto(url, gotoOptions);
    }
    catch (error) {
        console.error('Error navigating:', error);
    }
}
