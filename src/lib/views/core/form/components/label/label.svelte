<script lang="ts">
	import type { Snippet } from 'svelte';

	type PropsType = {
		forName?: string;
		label?: string;
		className?: string;
		required?: boolean;
		children?: Snippet;
		requiredSymbolColor?: string;
		requiredSymbol?: string;
		hasRequiredSymbol?: boolean;
	};

	let {
		forName,
		label = '',
		className = '',
		required = false,
		requiredSymbolColor = 'red',
		requiredSymbol = '*',
		hasRequiredSymbol = true,
		children
	}: PropsType = $props();
</script>

<label
	for={forName || ''}
	class="block text-sm text-gray-500 {hasRequiredSymbol && required ? 'required' : ''} {className}"
	style="--requiredSymbolColor:{requiredSymbolColor}; --requiredSymbol: '{requiredSymbol}'; "
>
	{#if children}
		{@render children()}
	{:else}
		{label || ''}
	{/if}
</label>

<style>
	.required::after {
		content: var(--requiredSymbol);
		color: var(--requiredSymbolColor);
		font-weight: bold;
		margin-left: 4px;
	}
</style>
