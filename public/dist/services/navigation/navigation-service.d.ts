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
 * Returns `true` when there is a previous entry in session history that
 * belongs to the same origin — i.e. the user navigated here from within
 * the same application.
 */
export declare function canGoBack(): boolean;
/**
 * Navigate back to the previous page **only** if it is within the same app.
 * Falls back to `homePath` (default `/`) when there is no in-app history,
 * so the user is never stranded on a blank tab or sent to an external site.
 */
export declare function goBack(homePath?: string): void;
/**
 * Navigate to the application home page via SvelteKit's `goto`
 * (keeps it a SPA navigation, no full page reload).
 */
export declare function goHome(homePath?: string): void;
export declare function createRedirectUrl(): string | null;
/**
 * Navigate to a URL with optional Ctrl+click new-tab, vibration, and sound.
 */
export declare function navigate(url: string, options?: NavigationOptions): Promise<void>;
