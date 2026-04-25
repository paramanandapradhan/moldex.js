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

// ─── Safe back / home navigation ─────────────────────────────────────────────
//
// Apps that add <NavigationTracker /> to their root layout get precise stack-
// based back/home behaviour.  Apps that don't use NavigationTracker fall back
// to the legacy inAppNavigationCount counter (unchanged behaviour).

/** @internal — written by NavigationTracker, read by goBack / goHome */
let _navStack: string[] = [];

/** @internal — set by goBack/goHome to suppress the next afterNavigate record */
let _skipNextRecord = false;

/**
 * Called by NavigationTracker on every SPA navigation.
 * Do not call this manually.
 */
export function recordNavigation(url: string): void {
    if (_skipNextRecord) {
        _skipNextRecord = false;
        return;
    }
    if (_navStack[_navStack.length - 1] !== url) {
        _navStack.push(url);
    }
}

/**
 * Returns `true` when the NavigationTracker has recorded at least one prior
 * page, meaning goBack() can safely step back.
 */
export function canGoBack(): boolean {
    return _navStack.length > 1;
}

/**
 * Go back exactly one step within the current app.
 * - When NavigationTracker is active: pops the stack and navigates to the
 *   previous page; never leaves the app (relative paths only).
 * - Fallback (no tracker): legacy counter-based behaviour.
 * - Floor: always lands on `homePath` at minimum (default `/`).
 */
export function goBack(homePath = '/'): void {
    if (!BROWSER) return;
    const safePath = typeof homePath === 'string' && homePath.startsWith('/') ? homePath : '/';

    if (_navStack.length > 0) {
        // Stack-based path (NavigationTracker is active)
        _skipNextRecord = true;
        _navStack.pop();
        const target = _navStack[_navStack.length - 1] ?? safePath;
        // Safety: only follow relative paths (never leave this origin)
        goto(target.startsWith('/') ? target : safePath, { replaceState: true });
        return;
    }

    // Legacy fallback for apps without NavigationTracker
    if (inAppNavigationCount > 0) {
        inAppNavigationCount--;
        window.history.back();
    } else {
        goto(safePath, { replaceState: true });
    }
}

/**
 * Navigate to the app home page and clear all back history so the user
 * cannot navigate back past this point.
 */
export function goHome(homePath = '/'): void {
    if (!BROWSER) return;
    const safePath = typeof homePath === 'string' && homePath.startsWith('/') ? homePath : '/';
    _skipNextRecord = true;
    _navStack = [safePath];
    // replaceState so pressing back after going home stays on home
    goto(safePath, { replaceState: true });
}

// ─── Legacy counter (kept for apps without NavigationTracker) ─────────────────

let inAppNavigationCount = 0;

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
    if (typeof url !== 'string') {
        console.error('[navigate] Expected a string URL but received:', url);
        return;
    }
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

        if (!gotoOptions.replaceState) {
            inAppNavigationCount++;
        }
        goto(url, gotoOptions);
    } catch (error) {
        console.error('Error navigating:', error);
    }
}
