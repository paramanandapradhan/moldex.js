export type SwitchProps = {
    id?: string;
    checked?: boolean;
    disabled?: boolean;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
    onChange?: (checked: boolean) => void;
};
declare const Switch: import("svelte").Component<SwitchProps, {}, "">;
type Switch = ReturnType<typeof Switch>;
export default Switch;
