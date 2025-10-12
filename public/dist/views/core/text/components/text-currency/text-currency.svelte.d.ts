import type { CurrencySymbols } from '../../../../../services';
type Props = {
    input: number;
    symbol?: CurrencySymbols | string;
    hasSymbol?: boolean;
    empty?: string;
    decimal?: number;
};
declare const TextCurrency: import("svelte").Component<Props, {}, "">;
type TextCurrency = ReturnType<typeof TextCurrency>;
export default TextCurrency;
