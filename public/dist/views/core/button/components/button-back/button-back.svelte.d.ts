type PropsType = {
    id?: string;
    iconPath?: string;
    iconClassName?: string;
    className?: string;
    onlyMobile?: boolean;
    onClick?: (ev: MouseEvent) => void;
};
declare const ButtonBack: import("svelte").Component<PropsType, {}, "">;
type ButtonBack = ReturnType<typeof ButtonBack>;
export default ButtonBack;
