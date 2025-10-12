<script lang="ts">
	import CountryLoader, { type Country } from '../loaders/country-loader.svelte';

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
