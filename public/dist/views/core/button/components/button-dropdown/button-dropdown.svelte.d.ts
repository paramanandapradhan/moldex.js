import { type Snippet } from 'svelte';
import type { ButtonAppearance, ButtonSize, ButtonType } from '../../types';
export type ButtonDropdownProps = {
    appearance?: ButtonAppearance;
    size?: ButtonSize;
    label?: string;
    type?: ButtonType;
    children?: Snippet;
    dropdownSnippet?: Snippet;
    id?: string;
    backdropClassName?: string;
    className?: string;
    containerClassName?: string;
    dropdownClassName?: string;
    dropdownCloseClassName?: string;
    dropdownOpenClassName?: string;
    disabled?: boolean;
    dropPosition?: 'top' | 'bottom' | 'middle';
};
declare const ButtonDropdown: import("svelte").Component<ButtonDropdownProps, {
    toggleDropdown: (ev: MouseEvent | TouchEvent) => void;
}, "">;
type ButtonDropdown = ReturnType<typeof ButtonDropdown>;
export default ButtonDropdown;
