type CheckboxSizeType = 'sm' | 'md' | 'lg';
type CheckboxPropsType = {
    className?: string;
    containerClassName?: string;
    desc?: string;
    descClassName?: string;
    id?: string;
    label?: string;
    labelClassName?: string;
    name?: string;
    onChange?: (value: boolean) => void;
    position?: 'left' | 'right';
    size?: CheckboxSizeType;
    value?: boolean;
};
declare const CheckboxField: import("svelte").Component<CheckboxPropsType, {
    getElement: () => HTMLInputElement;
    select: () => void;
}, "value">;
type CheckboxField = ReturnType<typeof CheckboxField>;
export default CheckboxField;
