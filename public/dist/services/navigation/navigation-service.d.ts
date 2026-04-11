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
 * Returns `true` when at least one in-app navigation has been recorded,
 * meaning `goBack()` can safely step back without leaving the application.
 */
export declare function canGoBack(): boolean;
/**
 * Go back exactly one step in history **only** if that step is within the app.
 * Falls back to `homePath` (default `/`) when there is no in-app history,
 * so the user is never sent to another application or an external site.
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
