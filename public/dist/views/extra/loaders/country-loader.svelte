<script lang="ts">
	import EasyScriptLoader from '@cloudparker/easy-script-loader-svelte';
	import type { Snippet } from 'svelte';
	import type { Country } from '../types';

	type Props = {
		countries?: Country[];
		onLoad?: (countries?: Country[]) => void;
		children?: Snippet;
	};

	let { countries = $bindable([]), onLoad, children }: Props = $props();

	let EasyCountryData: any;

	export async function getCountry({
		isoCode,
		dialCode,
		name
	}: {
		isoCode?: string;
		dialCode?: string;
		name?: string;
	}) {
		if (EasyCountryData) {
			return EasyCountryData.getCountry({ isoCode, dialCode, name });
		}
		return null;
	}

	export async function loadCountries() {
		if (EasyCountryData) {
			countries = EasyCountryData.getCountries();
			onLoad && onLoad(countries);
		}
	}

	function handleCountriesLoaded(lib: any) {
		EasyCountryData = lib;
		loadCountries();
	}
</script>

<EasyScriptLoader
	scriptUrl="https://cdn.jsdelivr.net/gh/paramanandapradhan/easy-countrydata@main/dist/index.js"
	scriptName="EasyCountryData"
	onLoad={handleCountriesLoaded}
/>

{#if children}
	{@render children()}
{/if}
