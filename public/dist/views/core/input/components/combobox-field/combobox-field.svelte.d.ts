import type { ComboboxFieldProps, InputFieldProps } from '../../types';
type $$ComponentProps = InputFieldProps & ComboboxFieldProps;
declare const ComboboxField: import("svelte").Component<$$ComponentProps, {
    focus: () => void;
}, "value">;
type ComboboxField = ReturnType<typeof ComboboxField>;
export default ComboboxField;
