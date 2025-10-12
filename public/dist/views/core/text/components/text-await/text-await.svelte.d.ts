type PropsType = {
    input?: Promise<any | null> | undefined;
    key?: string;
    hasTitle?: string;
    placeholder?: string;
    emptyText?: string;
};
declare const TextAwait: import("svelte").Component<PropsType, {}, "">;
type TextAwait = ReturnType<typeof TextAwait>;
export default TextAwait;
