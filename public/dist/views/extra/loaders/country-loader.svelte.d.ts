export type Country = {
    isoCode: string;
    dialCode: string;
    name: string;
};
import type { Snippet } from 'svelte';
type Props = {
    countries?: Country[];
    onLoad?: (countries?: Country[]) => void;
    children?: Snippet;
};
declare const CountryLoader: import("svelte").Component<Props, {
    loadCountries: () => Promise<void>;
}, "countries">;
type CountryLoader = ReturnType<typeof CountryLoader>;
export default CountryLoader;
