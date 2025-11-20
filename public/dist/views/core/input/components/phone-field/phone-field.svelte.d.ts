import type { InputFieldProps } from '../../types';
type $$ComponentProps = InputFieldProps & {
    buttonClassName?: string;
    dialCode?: string;
};
declare const PhoneField: import("svelte").Component<$$ComponentProps, {
    focus: () => void;
    getElement: () => any;
    select: () => void;
}, "value" | "dialCode">;
type PhoneField = ReturnType<typeof PhoneField>;
export default PhoneField;
