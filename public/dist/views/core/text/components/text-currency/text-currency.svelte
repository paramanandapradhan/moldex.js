<script lang="ts">
	import type { CurrencySymbols } from '../../../../../services';

	type Props = {
		input: number;
		symbol?: CurrencySymbols | string;
		hasSymbol?: boolean;
		empty?: string;
		decimal?: number;
	};

	let { input, symbol = '$', hasSymbol = true, empty = '-', decimal = 2 }: Props = $props();
	let value: string = $derived(Math.abs(input || 0).toFixed(decimal));
</script>

<span class="text-nowrap">
	{#if (input || 0) < 0}
		{empty}
	{/if}
	{#if hasSymbol}
		{symbol || ''}
	{/if}
	{value || ''}
</span>
