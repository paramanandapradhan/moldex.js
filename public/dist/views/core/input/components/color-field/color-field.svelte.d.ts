import type { InputFieldProps } from '../../types';
type $$ComponentProps = InputFieldProps & {
    value?: string;
};
declare const ColorField: import("svelte").Component<$$ComponentProps, {
    focus: () => void;
    getElement: () => any;
    select: () => any;
}, "value">;
type ColorField = ReturnType<typeof ColorField>;
export default ColorField;
