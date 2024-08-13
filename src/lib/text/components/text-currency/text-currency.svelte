<script lang="ts">
	import { BROWSER } from 'esm-env';

	type PropsType = {
		input: number;
		symbol: string;
		hasSymbol: boolean;
	};

	let { input, symbol = '$', hasSymbol = true }: PropsType = $props();

	let value: string = $state('');

	function prepare(..._: any) {
		value = Math.abs(input || 0).toFixed(2);
	}

	$effect(() => {
		BROWSER && prepare(input);
	});
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
