import type { Snippet } from "svelte";
import type { AriaRole, HTMLInputTypeAttribute } from "svelte/elements";


export type ComboboxFieldProps = {
    chipClassName?: string;
    chipCloseIconClassName?: string;
    chipCloseIconPath?: string;
    chipRemovable?: boolean;
    chipsContainerClassName?: string;
    onChipRemove?: (item: any) => void;
    comboboxIconClassName?: string;
    comboboxIconPath?: string;
    createButtonClassName?: string;
    createButtonLabel?: string;
    displayClassName?: string;
    displayFieldName?: string;
    displayItemsCount?: number;
    dropdownBodyClassName?: string;
    dropdownBodySnippet?: Snippet;
    dropdownClassName?: string;
    dropdownFooterClassName?: string;
    dropdownFooterSnippet?: Snippet;
    dropdownHeaderClassName?: string;
    dropdownHeaderSnippet?: Snippet;
    emptyMessage?: string;
    emptyMessageSnippet?: Snippet;
    hasComboboxIcon?: boolean;
    hasDropdownFooter?: boolean;
    hasDropdownFooterCreateButton?: boolean;
    hasDropdownHeader?: boolean;
    hasDropdownHeaderSearch?: boolean;
    hasCheckbox?: boolean;
    iconClassName?: string;
    iconPathFieldName?: string;
    identityFieldName?: string;
    itemClassName?: string;
    items?: any[];
    multiple?: boolean;
    onCreateButtonClick?: (ev: MouseEvent) => void;
    onSearch?: (value: string) => void;
    searchClassName?: string;
    searchFieldName?: string;
    searchPlaceholder?: string;
    showChip?: boolean;
    subtitleClassName?: string;
    subtitleFieldName?: string;
    titleClassName?: string;
    titleFieldName?: string;
    checkboxIconPath?: string;
    uncheckboxIconPath?: string;
    checkboxIconClassName?: string;
    uncheckboxIconClassName?: string;
    checkboxClassName?: string;
    dropPosition?: 'top' | 'bottom' | 'middle';
    itemTileSnippet?: Snippet<[item: any, index: any]>;
};

export type InputFieldSize = 'lg' | 'md' | 'sm' | 'xs';
export type InputFieldAppearance =
    | 'normal'
    | 'box'
    | 'fill'
    | 'underline'
    | 'fill-underline'
    | 'none';

export type InputValue =
    | any
    | string
    | string[]
    | number
    | number[]
    | Date
    | Date[]
    | File
    | File[]
    | null
    | undefined;

export type InputFieldProps = {
    appearance?: InputFieldAppearance;
    ariaControls?: string;
    ariaExpanded?: boolean;
    autofocus?: boolean;
    className?: string;
    cols?: number;
    containerClassName?: string;
    contentSnippet?: Snippet;
    contentSnippetClassName?: string;
    disabled?: boolean;
    floatingLabel?: boolean;
    hasRequiredSymbol?: boolean;
    iconClassName?: string;
    iconPath?: string;
    id?: string;
    label?: string;
    labelClassName?: string;
    leftSnippet?: Snippet;
    leftSnippetContainerClassName?: string;
    max?: number | string;
    maxlength?: number;
    min?: number | string;
    minlength?: number;
    multiple?: boolean;
    name?: string;
    title?: string;
    onBlur?: (ev: any) => void;
    onChange?: (ev: any) => void;
    onClick?: (ev: MouseEvent) => void;
    onDblClick?: (ev: MouseEvent) => void;
    onDrag?: (ev: DragEvent) => void;
    onDragOver?: (ev: DragEvent) => void;
    onDrop?: (ev: DragEvent) => void;
    onFocus?: (ev: any) => void;
    onInput?: (ev: any) => void;
    onKeyDown?: (ev: KeyboardEvent) => void;
    onKeyPress?: (ev: KeyboardEvent) => void;
    onKeyUp?: (ev: KeyboardEvent) => void;
    onMouseDown?: (ev: MouseEvent) => void;
    onMouseUp?: (ev: MouseEvent) => void;
    onPaste?: (ev: ClipboardEvent) => void;
    pattern?: string;
    placeholder?: string;
    readonly?: boolean;
    required?: boolean;
    requiredSymbol?: string;
    requiredSymbolColor?: string;
    rightSnippet?: Snippet;
    rightSnippetContainerClassName?: string;
    role?: AriaRole;
    rows?: number;
    size?: InputFieldSize;
    step?: number;
    type?: HTMLInputTypeAttribute | 'textarea';
    value?: InputValue;
};

export type LibPhoneNumberParseType = {
    isValid: () => boolean;
    nationalNumber: string;
    countryCallingCode: string;
};

export type LibPhoneNumberType = {
    parsePhoneNumber: (phoneNumber: string, dialCode?: string) => LibPhoneNumberParseType;
};

export type CountryType = {
    name: string;
    dialCode: string;
    isoCode: string;
};

export type EasyCountryDataType = {
    getCountries: () => CountryType[];
    getCountry: (params: { name?: string; dialCode?: string; isoCode?: string }) => CountryType;
};

export type RadioValueType = string | boolean | number | Date;
export type RadioItem = { value: any; label: string; desc?: string };
export type RadioItems = (RadioValueType | RadioItem)[];
export type RadioPosition = 'left' | 'right';
export type RadioDirection = 'vertical' | 'horizontal';
export type ChipItem = {
    id: string;
    name: string;
    desc?: string;
    [key: string]: any;
};

export type ChipFieldValue = string | string[] | null | undefined;

export type ChipFieldProps = {
    allowCreate?: boolean;
    autoSuggest?: boolean;
    chipClassName?: string;
    chipCloseIconClassName?: string;
    chipsContainerClassName?: string;
    closeIconPath?: string;
    descClassName?: string;
    descFieldName?: string;
    dropdownClassName?: string;
    dropdownItemClassName?: string;
    emptyMessage?: string;
    fieldClassName?: string;
    identityFieldName?: string;
    items?: ChipItem[];
    nameFieldName?: string;
    onChipsChange?: (value: ChipFieldValue) => void;
    separator?: string;
    valueType?: 'array' | 'csv';
};

export type DetailItem = {
    id?: string | number;
    label?: string;
    value?: string | number | null;
    desc?: string;
    iconPath?: string;
    [key: string]: any;
};

export type DetailListFieldProps = {
    descClassName?: string;
    descFieldName?: string;
    dropdownClassName?: string;
    dropdownItemClassName?: string;
    emptyMessage?: string;
    emptyMessageSnippet?: Snippet;
    iconClassName?: string;
    iconPathFieldName?: string;
    identityFieldName?: string;
    itemLabelClassName?: string;
    itemSnippet?: Snippet<[item: any, index: number]>;
    items?: DetailItem[];
    labelFieldName?: string;
    minSearchLength?: number;
    onItemSelect?: (item: DetailItem) => void;
    useNativeDatalist?: boolean;
    valueFieldName?: string;
};

export type TextChipProps = {
    chipClassName?: string;
    chipsContainerClassName?: string;
    descFieldName?: string;
    identityFieldName?: string;
    items?: ChipItem[];
    nameFieldName?: string;
    separator?: string;
    showDesc?: boolean;
    value?: ChipFieldValue;
};

export type RadioPropsType = {
    className?: string;
    groupContainerClassName?: string;
    hasPrimitiveItemsData?: boolean;
    id?: string;
    items?: RadioItems;
    labelClassName?: string;
    name?: string;
    position?: RadioPosition;
    direction?: RadioDirection;
    radioContainerClassName?: string;
    required?: boolean;
    subtitle?: string;
    subtitleClassName?: string;
    title?: string;
    titleClassName?: string;
    value?: RadioValueType;
    descClassName?: string;
    onChange?: (value: RadioValueType) => void;
};