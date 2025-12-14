<script lang="ts">
	import EasyScriptLoader from '@cloudparker/easy-script-loader-svelte';
	import type { Snippet } from 'svelte';

	export type State = {
		_id: string;
		name: string;
		countryId: string;
	};

	type Props = {
		states?: State[];
		countryCode?: string;
		onLoad?: (states?: State[]) => void;
		children?: Snippet;
	};

	let { states = $bindable([]), countryCode, onLoad, children }: Props = $props();

	let EasyCountryStateData: any;

    export async function getState(id:string){
        if(EasyCountryStateData){
            return EasyCountryStateData.getState(id);
        }
        return null;
    }

	export async function loadStates(countryCode?: string) {
		if (EasyCountryStateData) {
			states = EasyCountryStateData.getStates(countryCode || null);
			onLoad && onLoad(states);
		}
	}

	function handleStatesLoaded(lib: any) {
		EasyCountryStateData = lib;
		loadStates();
	}

	$effect(() => {
		(async () => {
			loadStates(countryCode);
		})();
	});
</script>

<EasyScriptLoader
	scriptUrl="hhttps://cdn.jsdelivr.net/gh/paramanandapradhan/easy-country-state-data@main/dist/index.js"
	scriptName="EasyCountryStateData"
	onLoad={handleStatesLoaded}
/>

{#if children}
	{@render children()}
{/if}
