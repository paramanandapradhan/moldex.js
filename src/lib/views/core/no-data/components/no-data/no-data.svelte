<script lang="ts">
	import Icon from '$lib/views/core/icon/components/icon/icon.svelte';
	import type { Snippet } from 'svelte';

	type PlacementType = 'top' | 'bottom' | 'left' | 'right';

	type PropsType = {
		message?: string;
		/** Render `message` as raw HTML. Default false → escaped as plain text (XSS-safe). */
		allowHtml?: boolean;
		className?: string;
		iconPath?: string;
		iconClassName?: string;
		iconPlacement?: PlacementType;
		children?: Snippet;
	};

	let {
		message = 'No data found!',
		allowHtml = false,
		className = '',
		iconPath = '',
		iconClassName = '',
		iconPlacement = 'top',
		children
	}: PropsType = $props();

	const iconPlacementClassNameMap: any = {
		top: 'flex-col',
		bottom: 'flex-col-reverse',
		left: 'flex-row',
		right: 'flex-row-reverse'
	};

	let iconPlacementClassName: string = $derived(iconPlacementClassNameMap[iconPlacement]);
 
</script>

<div
	class="flex items-center justify-center gap-3 text-neutral-500 dark:text-neutral-400 p-4 {iconPlacementClassName} {className}"
>
	{#if children}
		{@render children()}
	{:else}
		{#if iconPath}
			<Icon path={iconPath} className="w-6 h-6 {iconClassName}" />
		{/if}
		<div>{#if allowHtml}{@html message}{:else}{message}{/if}</div>
	{/if}
</div>
