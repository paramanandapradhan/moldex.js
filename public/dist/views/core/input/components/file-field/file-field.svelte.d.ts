import { type InputFieldProps } from '../input-field/input-field.svelte';
type $$ComponentProps = InputFieldProps & {
    accepts?: string;
    multiple?: boolean;
    value?: File | File[] | null;
};
declare const FileField: import("svelte").Component<$$ComponentProps, {
    focus: () => void;
    getElement: () => any;
    select: () => void;
}, "value">;
type FileField = ReturnType<typeof FileField>;
export default FileField;
