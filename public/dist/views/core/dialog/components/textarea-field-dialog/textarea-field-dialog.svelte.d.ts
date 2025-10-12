import type { InputValue } from '../../../input/components/input-field/input-field.svelte';
import type { DialogExports } from '../dialog/dialog.svelte';
type PropsType = {
    value?: InputValue;
    label?: string;
    name?: string;
    maxlength?: number;
    className?: string;
    autofocus?: boolean;
    required?: boolean;
};
type $$ComponentProps = PropsType & DialogExports;
declare const TextareaFieldDialog: import("svelte").Component<$$ComponentProps, {}, "value">;
type TextareaFieldDialog = ReturnType<typeof TextareaFieldDialog>;
export default TextareaFieldDialog;
