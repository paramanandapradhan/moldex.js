import type { DialogExports } from '../../types';
type PropsType = {
    msg?: string;
    msgClassName?: string;
    spinnerClassName?: string;
    containerClassName?: string;
    className?: string;
};
type $$ComponentProps = PropsType & DialogExports;
declare const LoadingDialog: import("svelte").Component<$$ComponentProps, {}, "">;
type LoadingDialog = ReturnType<typeof LoadingDialog>;
export default LoadingDialog;
