type PropsType = {
    input: Date | number | string | {
        seconds: number;
        nanoseconds: number;
    };
    format?: 'ago' | string;
};
declare const TextDate: import("svelte").Component<PropsType, {}, "">;
type TextDate = ReturnType<typeof TextDate>;
export default TextDate;
