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
    getCountry: (params: {
        name?: string;
        dialCode?: string;
        isoCode?: string;
    }) => CountryType;
};
import { type InputFieldProps } from '../input-field/input-field.svelte';
type $$ComponentProps = InputFieldProps & {
    buttonClassName?: string;
    dialCode?: string;
};
declare const PhoneField: import("svelte").Component<$$ComponentProps, {
    focus: () => void;
    getElement: () => any;
    select: () => void;
}, "value" | "dialCode">;
type PhoneField = ReturnType<typeof PhoneField>;
export default PhoneField;
