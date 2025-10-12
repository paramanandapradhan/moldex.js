import { type InputFieldProps } from '../input-field/input-field.svelte';
declare const EmailField: import("svelte").Component<InputFieldProps, {
    focus: () => void;
    getElement: () => any;
    select: () => void;
}, "value">;
type EmailField = ReturnType<typeof EmailField>;
export default EmailField;
