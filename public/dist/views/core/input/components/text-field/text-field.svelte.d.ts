import { type InputFieldProps } from '../input-field/input-field.svelte';
type $$ComponentProps = InputFieldProps & {
    value?: string | null | undefined;
};
declare const TextField: import("svelte").Component<$$ComponentProps, {
    focus: () => void;
    getElement: () => any;
    select: () => any;
}, "value">;
type TextField = ReturnType<typeof TextField>;
export default TextField;
