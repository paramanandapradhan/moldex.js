<script lang="ts">
	import '../../../tailwind.css';
	import { ripple, type RipplePropsType } from '$lib/actions/ripple.js';
	import Spinner from '$lib/common/components/spinner/spinner.svelte';
	import Icon from '$lib/icon/components/icon/icon.svelte';
	import type { Snippet } from 'svelte';

	type PropsType = {
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
		onclick?: (ev: MouseEvent) => void;
	};

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
		onclick = (ev: MouseEvent) => {}
	}: PropsType = $props();

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
	<div class="flex w-full items-center gap-2">
		{#if spinner}
			<Spinner className="w-4 h-4 {spinnerClassName}" />
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
{/snippet}

<button {id} {type} {form} class={className} {onclick} {disabled} use:maybeRipple>
	{#if children}
		{@render children()}
	{:else}
		{@render buttonContent()}
	{/if}
</button>
