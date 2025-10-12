import { type InputFieldSize } from '../input-field/input-field.svelte';
type RangeFieldPropsType = {
    id?: string;
    name?: string;
    className?: string;
    size?: InputFieldSize;
    value?: number;
    min?: number;
    max?: number;
    step?: number;
    thumbSize?: string;
    thumbColor?: string;
    oninput?: (ev: any) => void;
    onfocus?: (ev: any) => void;
    onblur?: (ev: any) => void;
};
declare const RangeField: import("svelte").Component<RangeFieldPropsType, {
    getElement: () => HTMLInputElement | null;
    focus: () => void | null;
    select: () => void | null;
}, "value">;
type RangeField = ReturnType<typeof RangeField>;
export default RangeField;
