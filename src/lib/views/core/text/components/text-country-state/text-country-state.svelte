<script lang="ts">
	import '../../../../../tailwind.css';
	import EasyScriptLoader from '@cloudparker/easy-script-loader-svelte';
	import { BROWSER } from 'esm-env';

	let { input }: { input: string } = $props();

	let states: any[] = $state([]);
	let state: any | null = $state(null);

	let EasyCountryStateData: any;

	async function init() {
		if (EasyCountryStateData) {
			states = EasyCountryStateData.getStates() || [];
		}
	}

	async function prepare(..._: any) {
		if (input) {
			await init();
			if (states?.length) {
				state = states.find((o) => o._id == input);
			}
		} else {
			state = null;
		}
	}

	function handleScriptLoad(ev: CustomEvent) {
		EasyCountryStateData = ev.detail;
		init();
	}

	$effect(() => {
		BROWSER && prepare(input, states);
	});
</script>

<EasyScriptLoader
	scriptName="EasyCountryStateData"
	scriptUrl="https://cdn.jsdelivr.net/gh/paramanandapradhan/easy-country-state-data@main/dist/index.js"
	on:load={handleScriptLoad}
/>

{#if state}
	<span> {state?.name || ''} </span>
{/if}
