<script lang="ts">
	import Icon from '$lib/views/core/icon/components/icon/icon.svelte';
	import { mdiChevronDown } from '$lib/views/core/icon/index.js';
	import { SvelteSet } from 'svelte/reactivity';
	import type { Snippet } from 'svelte';

	type AccordionItem = {
		id: string;
		title: string;
		subtitle?: string;
		disabled?: boolean;
		iconPath?: string;
	};

	type PropsType = {
		items: AccordionItem[];
		multiple?: boolean;
		className?: string;
		itemClassName?: string;
		children: Snippet<[{ item: AccordionItem; isOpen: boolean }]>;
		onChange?: (id: string, isOpen: boolean) => void;
	};

	let {
		items = [],
		multiple = false,
		className = '',
		itemClassName = '',
		children,
		onChange
	}: PropsType = $props();

	// SvelteSet is a drop-in reactive replacement for Set — mutations like
	// .add() and .delete() are automatically tracked by Svelte's reactivity.
	const openIds = new SvelteSet<string>();

	function toggle(item: AccordionItem) {
		if (item.disabled) return;
		const isOpen = openIds.has(item.id);
		if (!multiple) {
			openIds.clear();
			if (!isOpen) openIds.add(item.id);
		} else {
			if (isOpen) openIds.delete(item.id);
			else openIds.add(item.id);
		}
		onChange?.(item.id, !isOpen);
	}
</script>

<div class="divide-y divide-neutral-200 dark:divide-neutral-700 rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden {className}">
	{#each items as item}
		{@const isOpen = openIds.has(item.id)}
		<div class="{itemClassName}">
			<button
				type="button"
				class="flex w-full items-center justify-between gap-4 px-4 py-3 text-left text-sm font-medium text-neutral-800 dark:text-neutral-200 bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors {item.disabled
					? 'opacity-40 cursor-not-allowed'
					: 'cursor-pointer'}"
				aria-expanded={isOpen}
				onclick={() => toggle(item)}
				disabled={item.disabled}
			>
				<div class="flex items-center gap-3 min-w-0">
					{#if item.iconPath}
						<Icon path={item.iconPath} sizeClassName="w-5 h-5 shrink-0 text-neutral-500 dark:text-neutral-400" />
					{/if}
					<div class="min-w-0">
						<div class="truncate">{item.title}</div>
						{#if item.subtitle}
							<div class="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 truncate">{item.subtitle}</div>
						{/if}
					</div>
				</div>
				<Icon
					path={mdiChevronDown}
					sizeClassName="w-5 h-5 shrink-0 text-neutral-500 transition-transform duration-200 {isOpen ? 'rotate-180' : ''}"
				/>
			</button>

			{#if isOpen}
				<div
					class="px-4 py-3 text-sm text-neutral-700 dark:text-neutral-300 bg-white dark:bg-neutral-800 border-t border-neutral-100 dark:border-neutral-700"
				>
					{@render children({ item, isOpen })}
				</div>
			{/if}
		</div>
	{/each}
</div>
