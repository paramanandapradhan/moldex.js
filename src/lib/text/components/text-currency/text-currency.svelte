<script lang="ts">
	import { BROWSER } from 'esm-env';

	export let input: number | undefined;
	export let symbol: string = '$'; //'₹';
	export let hasSymbol: boolean = true;

	let value: string;

	function prepare(..._: any) {
		value = Math.abs(input || 0).toFixed(2);
	}

	$: BROWSER && prepare(input);
</script>

<span>
	{#if (input || 0) < 0}
		{'-'}
	{/if}
	{#if hasSymbol}
		{symbol || ''}
	{/if}
	{value || ''}
</span>
