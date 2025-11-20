import type { Snippet } from 'svelte';
import type { Country } from '../types';
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
