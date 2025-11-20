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
export declare const registerBackPress: (state: BackStateType) => void;
export declare const addBackKeyListener: (callback: (event?: PopStateEvent) => boolean) => (event: PopStateEvent) => void;
export declare const removeBackKeyListener: (listener: () => boolean) => void;
export declare function goBack(): void;
/**
 * Jump back to the first history entry in this tab (i.e. “home”).
 * Falls back to a hard redirect if history is too shallow or cross‑origin.
 */
export declare function goHome(): void;
export declare function createRedirectUrl(): string | null;
/**
 * Navigate to a URL with support for opening in a new tab, vibration, and sound effects.
 * @param url - The destination URL.
 * @param options - Extended options including vibration and sound.
 */
export declare function navigate(url: string, options?: NavigationOptions): Promise<void>;
