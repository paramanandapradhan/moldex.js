import type { Snippet } from 'svelte';
type PropsType = {
    forName?: string;
    label?: string;
    className?: string;
    required?: boolean;
    children?: Snippet;
    requiredSymbolColor?: string;
    requiredSymbol?: string;
    hasRequiredSymbol?: boolean;
};
declare const Label: import("svelte").Component<PropsType, {}, "">;
type Label = ReturnType<typeof Label>;
export default Label;
