<script lang="ts">
	import type { Snippet } from 'svelte';

	type DividerOrientation = 'horizontal' | 'vertical';
	type DividerAlign = 'start' | 'center' | 'end';

	type PropsType = {
		orientation?: DividerOrientation;
		align?: DividerAlign;
		label?: string;
		className?: string;
		children?: Snippet;
	};

	let {
		orientation = 'horizontal',
		align = 'center',
		label = '',
		className = '',
		children
	}: PropsType = $props();

	let hasContent = $derived(!!(label || children));

	const alignClass: Record<DividerAlign, string> = {
		start: 'justify-start',
		center: 'justify-center',
		end: 'justify-end'
	};
</script>

{#if orientation === 'vertical'}
	<div
		class="self-stretch w-px bg-neutral-200 dark:bg-neutral-700 {className}"
		role="separator"
		aria-orientation="vertical"
	></div>
{:else if hasContent}
	<div
		class="flex items-center gap-3 {alignClass[align]} {className}"
		role="separator"
		aria-orientation="horizontal"
	>
		{#if align !== 'start'}
			<div class="flex-grow h-px bg-neutral-200 dark:bg-neutral-700"></div>
		{/if}
		<span class="shrink-0 text-xs text-neutral-500 dark:text-neutral-400 font-medium">
			{#if children}
				{@render children()}
			{:else}
				{label}
			{/if}
		</span>
		{#if align !== 'end'}
			<div class="flex-grow h-px bg-neutral-200 dark:bg-neutral-700"></div>
		{/if}
	</div>
{:else}
	<hr
		class="border-0 border-t border-neutral-200 dark:border-neutral-700 {className}"
		role="separator"
	/>
{/if}
