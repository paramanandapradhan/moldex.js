<script lang="ts">
	import '../../../../../tailwind.css';
	import EasyScriptLoader from '@cloudparker/easy-script-loader-svelte';
	import { BROWSER } from 'esm-env';

	type PropsType = {
		input?: string;
	};

	let { input }: PropsType = $props();

	let countries: any[] = $state([]);
	let country: any | null = $state(null);

	let EasyCountryData: any;

	async function init() {
		if (EasyCountryData) {
			countries = EasyCountryData.getCountries();
		}
	}

	function handleScriptLoad(lib: CustomEvent) {
		EasyCountryData = lib;
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

	$effect(() => {
		BROWSER && prepare(input, countries);
	});
</script>

<EasyScriptLoader
	scriptName="EasyCountryData"
	scriptUrl="https://cdn.jsdelivr.net/gh/paramanandapradhan/easy-countrydata@main/dist/index.js"
	onload={handleScriptLoad}
/>
{#if country}
	<span> {country?.name || ''} </span>
{/if}
