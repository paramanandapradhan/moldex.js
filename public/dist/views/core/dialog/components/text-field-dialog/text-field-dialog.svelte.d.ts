import type { InputValue } from '../../../input';
import type { DialogExports } from '../../types';
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
declare const TextFieldDialog: import("svelte").Component<$$ComponentProps, {}, "value">;
type TextFieldDialog = ReturnType<typeof TextFieldDialog>;
export default TextFieldDialog;
