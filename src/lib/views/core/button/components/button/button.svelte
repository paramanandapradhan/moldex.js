<script module lang="ts">
	export type ButtonPropsType = {
		id?: string;
		type?: 'button' | 'submit' | 'reset';
		form?: string | null;
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
		useRipple?: boolean;
		onClick?: (ev: MouseEvent) => void;
	};
</script>

<script lang="ts">
	import '../../../../../tailwind.css';
	import { ripple, type RipplePropsType } from '$lib/actions/ripple.js';
	import type { Snippet } from 'svelte';
	import { Spinner } from '$lib/views/core/spinner';
	import { Icon } from '$lib/views/core/icon';

	let {
		id = '',
		form = undefined,
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
		useRipple = true,
		onClick = (ev: MouseEvent) => {}
	}: ButtonPropsType = $props();

	function maybeRipple(node: HTMLElement, options?: RipplePropsType) {
		if (useRipple) {
			return ripple(node, options);
		}
		return {
			destroy() {}
		};
	}
</script>

{#snippet buttonContent()}
	{#if spinner}
		<Spinner className="w-4 h-4 {spinnerClassName}" />
	{/if}
	{#if !onlySpinner}
		{#if iconPath}
			<Icon path={iconPath} className="w-6 h-6 {iconClassName}" />
		{/if}
		{#if label}
			<span>{label || ''}</span>
		{/if}
		{#if rightIconPath}
			<Icon path={rightIconPath} className="w-6 h-6 {rightIconClassName}" />
		{/if}
	{/if}
{/snippet}

<button
	{id}
	{type}
	{form}
	class="flex items-center justify-center gap-2 outline-none disabled:bg-white disabled:text-gray-400 rounded {className}"
	onclick={onClick}
	{disabled}
	use:maybeRipple
>
	{#if children}
		{@render children()}
	{:else}
		{@render buttonContent()}
	{/if}
</button>
