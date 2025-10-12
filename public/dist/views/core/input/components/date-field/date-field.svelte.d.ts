import { type InputFieldProps } from '../input-field/input-field.svelte';
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
