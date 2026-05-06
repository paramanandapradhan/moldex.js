export interface NavigationOptions {
    replaceState?: boolean;
    noscroll?: boolean;
    keepfocus?: boolean;
    state?: {
        tabName?: string;
    };
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
export declare const referrer: {
    referer: string;
};
export declare const pushBackState: (obj: BackStateType) => void;
export declare const popBackState: () => BackStateType | undefined;
/**
 * Push a dummy history entry so the browser's back gesture fires a `popstate`
 * event instead of leaving the page. Stores the id in the state object so we
 * can identify Moldex-pushed entries.
 */
export declare const registerBackPress: (state: BackStateType) => void;
export declare const addBackKeyListener: (callback: (event?: PopStateEvent) => boolean) => (event: PopStateEvent) => void;
export declare const removeBackKeyListener: (listener: EventListener) => void;
/**
 * Called by NavigationTracker on every SPA navigation.
 * Do not call this manually.
 */
export declare function recordNavigation(url: string): void;
/**
 * Returns `true` when the NavigationTracker has recorded at least one prior
 * page, meaning goBack() can safely step back.
 */
export declare function canGoBack(): boolean;
/**
 * Go back exactly one step within the current app.
 * - When NavigationTracker is active: pops the stack and navigates to the
 *   previous page; never leaves the app (relative paths only).
 * - Fallback (no tracker): legacy counter-based behaviour.
 * - Floor: always lands on `homePath` at minimum (default `/`).
 */
export declare function goBack(homePath?: string): void;
/**
 * Navigate to the app home page and clear all back history so the user
 * cannot navigate back past this point.
 */
export declare function goHome(homePath?: string): void;
export declare function createRedirectUrl(): string | null;
/**
 * Navigate to a URL with optional Ctrl+click new-tab, vibration, and sound.
 */
export declare function navigate(url: string, options?: NavigationOptions): Promise<void>;
