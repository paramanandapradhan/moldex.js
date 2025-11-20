import type { DialogExports } from '../../types';
type PropsType = {
    value?: number;
    label?: string;
    name?: string;
    maxlength?: number;
    className?: string;
    autofocus?: boolean;
    required?: boolean;
};
type $$ComponentProps = PropsType & DialogExports;
declare const NumberFieldDialog: import("svelte").Component<$$ComponentProps, {}, "value">;
type NumberFieldDialog = ReturnType<typeof NumberFieldDialog>;
export default NumberFieldDialog;
