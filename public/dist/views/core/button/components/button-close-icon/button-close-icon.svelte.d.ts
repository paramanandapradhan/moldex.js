type PropsType = {
    id?: string;
    iconPath?: string;
    iconClassName?: string;
    className?: string;
    onlyWeb?: boolean;
    onClick?: (ev: MouseEvent) => void;
};
declare const ButtonCloseIcon: import("svelte").Component<PropsType, {}, "">;
type ButtonCloseIcon = ReturnType<typeof ButtonCloseIcon>;
export default ButtonCloseIcon;
