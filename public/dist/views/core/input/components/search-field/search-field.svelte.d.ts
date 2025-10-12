import { type InputFieldProps } from '../input-field/input-field.svelte';
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
