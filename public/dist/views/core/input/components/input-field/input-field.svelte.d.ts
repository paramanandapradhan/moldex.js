import type { InputFieldProps } from '../../types';
declare const InputField: import("svelte").Component<InputFieldProps, {
    focus: () => void;
    getElement: () => HTMLInputElement | HTMLTextAreaElement;
    select: () => void;
    getBoundingClientRect: () => DOMRect;
}, "value">;
type InputField = ReturnType<typeof InputField>;
export default InputField;
