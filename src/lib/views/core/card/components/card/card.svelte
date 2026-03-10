<script lang="ts">
	import type { Snippet } from 'svelte';

	type CardVariant = 'elevated' | 'outlined' | 'filled';

	type PropsType = {
		variant?: CardVariant;
		className?: string;
		headerClassName?: string;
		bodyClassName?: string;
		footerClassName?: string;
		header?: Snippet;
		footer?: Snippet;
		children?: Snippet;
		hoverable?: boolean;
		padding?: boolean;
	};

	let {
		variant = 'elevated',
		className = '',
		headerClassName = '',
		bodyClassName = '',
		footerClassName = '',
		header,
		footer,
		children,
		hoverable = false,
		padding = true
	}: PropsType = $props();

	const variantClass: Record<CardVariant, string> = {
		elevated: 'bg-white dark:bg-neutral-800 shadow-sm border border-neutral-100 dark:border-neutral-700',
		outlined: 'bg-white dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700',
		filled: 'bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700'
	};
</script>

<div
	class="rounded-xl overflow-hidden {variantClass[variant]} {hoverable
		? 'transition-shadow hover:shadow-md cursor-pointer'
		: ''} {className}"
>
	{#if header}
		<div class="border-b border-neutral-100 dark:border-neutral-700 {padding ? 'px-4 py-3' : ''} {headerClassName}">
			{@render header()}
		</div>
	{/if}

	<div class="{padding ? 'p-4' : ''} {bodyClassName}">
		{#if children}
			{@render children()}
		{/if}
	</div>

	{#if footer}
		<div class="border-t border-neutral-100 dark:border-neutral-700 {padding ? 'px-4 py-3' : ''} {footerClassName}">
			{@render footer()}
		</div>
	{/if}
</div>
