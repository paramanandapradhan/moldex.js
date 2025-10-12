import { type InputFieldProps } from '../input-field/input-field.svelte';
type $$ComponentProps = InputFieldProps & {
    buttonClassName?: string;
    iconClassName?: string;
};
declare const PasswordField: import("svelte").Component<$$ComponentProps, {
    focus: () => void;
    getElement: () => any;
    select: () => void;
}, "value">;
type PasswordField = ReturnType<typeof PasswordField>;
export default PasswordField;
