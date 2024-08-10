<script lang="ts">
	import { badge } from '$lib/actions/badge.js';
	import { ripple } from '$lib/actions/ripple.js';
	import Spinner from '$lib/common/components/spinner/spinner.svelte';
	import Icon from '$lib/icon/components/icon/icon.svelte';
	import type { Snippet } from 'svelte';

	type PropsType = {
		type?: 'button' | 'submit' | 'reset';
		className?: string;
		iconPath?: string;
		iconClassName?: string;
		label?: string;
		rightIconPath?: string;
		rightIconClassName?: string;
		spinner?: boolean;
		disabled?: boolean;
		spinnerClassName?: string;
		onlySpinner?: boolean;
		children?: Snippet;
		onclick?: (ev: MouseEvent) => void;
	};

	let {
		type = 'button',
		label = '',
		className = '',
		iconPath = '',
		iconClassName = '',
		rightIconPath = '',
		rightIconClassName = '',
		spinner = false,
		disabled = false,
		spinnerClassName = '',
		onlySpinner = false,
		children,
		onclick = (ev: MouseEvent) => {}
	}: PropsType = $props();
</script>

<button
	type="button"
	class={className}
	{onclick}
	{disabled}
	use:ripple
>
	{#if children}
		{@render children()}
	{:else}
		<div class="flex w-full items-center gap-1">
			{#if spinner}
				<Spinner className={spinnerClassName} />
			{/if}
			{#if !onlySpinner}
				{#if iconPath}
					<Icon path={iconPath} className={iconClassName} />
				{/if}
				{#if label}
					<span>{label || ''}</span>
				{/if}
				{#if rightIconPath}
					<Icon path={rightIconPath} className={rightIconClassName} />
				{/if}
			{/if}
		</div>
	{/if}
</button>
