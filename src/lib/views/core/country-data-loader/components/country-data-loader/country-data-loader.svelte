<script lang="ts">
	import EasyScriptLoader from "@cloudparker/easy-script-loader-svelte";
    export let scriptUrl: string =
		'https://cdn.jsdelivr.net/gh/paramanandapradhan/easy-countrydata@main/dist/index.js';


</script>

<EasyScriptLoader scriptName="EasyCountryData" {scriptUrl} on:load={() => console.log('Script loaded')} />


