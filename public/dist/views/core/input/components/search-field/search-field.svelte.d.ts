import type { InputFieldProps } from '../../types';
type $$ComponentProps = InputFieldProps & {
    iconClassName?: string;
    onSearch?: (value: string) => void;
};
declare const SearchField: import("svelte").Component<$$ComponentProps, {
    focus: () => void;
    getElement: () => any;
    select: () => void;
}, "value">;
type SearchField = ReturnType<typeof SearchField>;
export default SearchField;
