import type { DialogExports } from '../dialog/dialog.svelte';
type PropsType = {
    className?: string;
    msg?: string;
};
type $$ComponentProps = PropsType & DialogExports;
declare const MsgDialog: import("svelte").Component<$$ComponentProps, {}, "">;
type MsgDialog = ReturnType<typeof MsgDialog>;
export default MsgDialog;
