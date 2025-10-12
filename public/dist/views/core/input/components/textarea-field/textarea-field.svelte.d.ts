import { type InputFieldProps } from '../input-field/input-field.svelte';
declare const TextareaField: import("svelte").Component<InputFieldProps, {
    focus: () => void;
    getElement: () => any;
    select: () => any;
}, "value">;
type TextareaField = ReturnType<typeof TextareaField>;
export default TextareaField;
