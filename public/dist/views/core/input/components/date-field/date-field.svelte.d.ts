import type { InputFieldProps } from '../../types';
type $$ComponentProps = InputFieldProps & {
    value?: Date | string | number | null | undefined;
};
declare const DateField: import("svelte").Component<$$ComponentProps, {
    focus: () => void;
    getElement: () => any;
    select: () => void;
}, "value">;
type DateField = ReturnType<typeof DateField>;
export default DateField;
