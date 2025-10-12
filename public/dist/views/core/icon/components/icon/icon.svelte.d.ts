type IconPropsType = {
    path: string;
    className?: string;
    sizeClassName?: string;
    size?: number;
    fill?: string;
    viewBox?: string;
    color?: string;
};
declare const Icon: import("svelte").Component<IconPropsType, {}, "">;
type Icon = ReturnType<typeof Icon>;
export default Icon;
