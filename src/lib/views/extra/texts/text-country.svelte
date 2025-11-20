<script lang="ts">
	import CountryLoader  from '$lib/views/extra/loaders/country-loader.svelte';
	import type { Country } from '../types';

	type Props = {
		input?: string;
	};

	let { input }: Props = $props();

	let countries: Country[] = $state([]);

	let country = $derived.by(() => {
		if (input && countries?.length) {
			return countries.find((c) => c.isoCode == input);
		}
	});
</script>

<CountryLoader bind:countries>
    {country?.name || ''}
</CountryLoader>
