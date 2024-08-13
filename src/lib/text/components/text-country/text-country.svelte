<script lang="ts">
	import EasyScriptLoader from '@cloudparker/easy-script-loader-svelte';
	import { BROWSER } from 'esm-env';

	export let input: string | undefined;

	let countries: any[] = [];
	let country: any | null = null;
	let EasyCountryData: any;

	async function init() {
		if (EasyCountryData) {
			countries = EasyCountryData.getCountries();
		}
	}

	function handleScriptLoad(ev: CustomEvent) {
		EasyCountryData = ev.detail;
		init();
	}

	async function prepare(..._: any) {
		if (input) {
			if (countries?.length) {
				country = countries.find((o) => o.isoCode == input);
			}
		} else {
			country = null;
		}
	}

	$: BROWSER && prepare(input, countries);
</script>

<EasyScriptLoader
	scriptName="EasyCountryData"
	scriptUrl="https://cdn.jsdelivr.net/gh/paramanandapradhan/easy-countrydata@main/dist/index.js"
	on:load={handleScriptLoad}
/>
{#if country}
	<span> {country?.name || ''} </span>
{/if}
