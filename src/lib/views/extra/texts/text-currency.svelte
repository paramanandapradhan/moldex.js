<script lang="ts">
	import { CURRENCIES } from '$lib/views/extra/loaders/currency-loader.svelte';

	type Props = {
		input?: string | null;
		showCode?: boolean;
		showSymbol?: boolean;
		showName?: boolean;
	};

	let {
		input,
		showCode = true,
		showSymbol = true,
		showName = true
	}: Props = $props();

	let currency = $derived(input ? CURRENCIES.find((c) => c.code === input) : undefined);
</script>

{#if currency}
	<span>
		{#if showSymbol}{currency.symbol}{/if}
		{#if showCode}{currency.code}{/if}
		{#if showName}{currency.name}{/if}
	</span>
{/if}
