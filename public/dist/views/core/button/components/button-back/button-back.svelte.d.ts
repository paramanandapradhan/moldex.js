type PropsType = {
    id?: string;
    iconPath?: string;
    iconClassName?: string;
    className?: string;
    onlyMobile?: boolean;
    /**
     * Fallback path when there is no in-app history to go back to.
     * Defaults to '/' (the application root).
     */
    homePath?: string;
    /**
     * Custom click handler. When provided it overrides the default goBack behaviour.
     */
    onClick?: (ev: MouseEvent) => void;
};
declare const ButtonBack: import("svelte").Component<PropsType, {}, "">;
type ButtonBack = ReturnType<typeof ButtonBack>;
export default ButtonBack;
