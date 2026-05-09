<script lang="ts">
	import Icon from '$lib/views/core/icon/components/icon/icon.svelte';
	import NoData from '$lib/views/core/no-data/components/no-data/no-data.svelte';
	import Label from '../label/label.svelte';
	import type { DetailItem, DetailListFieldProps, InputFieldProps } from '../../types';

	let {
		appearance = 'normal',
		className = '',
		containerClassName = '',
		descFieldName = 'desc',
		direction = 'horizontal',
		disabled = false,
		dividers = true,
		emptyMessage = 'No items',
		emptyMessageSnippet,
		fieldClassName = '',
		hasRequiredSymbol = true,
		iconClassName = '',
		iconPathFieldName = 'iconPath',
		id = '',
		identityFieldName = 'id',
		itemClassName = '',
		itemDescClassName = '',
		itemLabelClassName = '',
		itemSnippet,
		itemValueClassName = '',
		items = [],
		label = '',
		labelClassName = '',
		labelFieldName = 'label',
		name = '',
		onItemClick,
		required = false,
		requiredSymbol = '*',
		requiredSymbolColor = 'red',
		size = 'md',
		valueFieldName = 'value'
	}: InputFieldProps & DetailListFieldProps = $props();

	const idDerived = $derived(id || name);

	const sizeClassName = $derived.by(() => {
		switch (size) {
			case 'lg':
				return 'text-base';
			case 'md':
				return 'text-sm';
			case 'sm':
				return 'text-xs';
			case 'xs':
				return 'text-xs';
			default:
				return 'text-sm';
		}
	});

	const itemPaddingClassName = $derived.by(() => {
		switch (size) {
			case 'lg':
				return 'px-4 py-3';
			case 'md':
				return 'px-3 py-2';
			case 'sm':
				return 'px-2 py-1.5';
			case 'xs':
				return 'px-2 py-1';
			default:
				return 'px-3 py-2';
		}
	});

	const iconSizeClassName = $derived.by(() => {
		switch (size) {
			case 'lg':
				return 'h-6 w-6';
			case 'sm':
				return 'h-4 w-4';
			case 'xs':
				return 'h-3.5 w-3.5';
			default:
				return 'h-5 w-5';
		}
	});

	const appearanceClassName = $derived.by(() => {
		switch (appearance) {
			case 'normal':
				return 'border rounded-xl bg-neutral-100 dark:bg-neutral-700 border-neutral-300 dark:border-neutral-500 text-neutral-950 dark:text-neutral-50';
			case 'box':
				return 'border bg-neutral-100 dark:bg-neutral-700 border-neutral-300 dark:border-neutral-500 text-neutral-950 dark:text-neutral-50';
			case 'fill':
				return 'bg-neutral-100 dark:bg-neutral-700 text-neutral-950 dark:text-neutral-50';
			case 'underline':
				return 'border-b-2 bg-transparent text-neutral-950 dark:text-neutral-50 border-neutral-300 dark:border-neutral-700';
			case 'fill-underline':
				return 'border-b-2 bg-neutral-100 dark:bg-neutral-700 text-neutral-950 dark:text-neutral-50 border-neutral-300 dark:border-neutral-500';
			case 'none':
				return 'bg-transparent text-neutral-950 dark:text-neutral-50';
			default:
				return '';
		}
	});

	const dividerClassName = $derived(
		dividers ? 'divide-y divide-neutral-200 dark:divide-neutral-600' : ''
	);

	function getKey(item: DetailItem, index: number) {
		const id = item?.[identityFieldName];
		return id != null ? id : index;
	}

	function handleClick(item: DetailItem, index: number) {
		if (disabled) return;
		onItemClick && onItemClick(item, index);
	}
</script>

{#if label}
	<Label
		forName={idDerived}
		{label}
		className="mb-1 {labelClassName}"
		{required}
		{requiredSymbolColor}
		{requiredSymbol}
		{hasRequiredSymbol}
	/>
{/if}

<div
	id={idDerived}
	class="w-full overflow-hidden {appearanceClassName} {sizeClassName} {fieldClassName} {containerClassName}"
>
	{#if items.length === 0}
		{#if emptyMessageSnippet}
			{@render emptyMessageSnippet()}
		{:else}
			<NoData message={emptyMessage} />
		{/if}
	{:else}
		<ul class="flex w-full flex-col {dividerClassName}">
			{#each items as item, index (getKey(item, index))}
				{@const clickable = !!onItemClick && !disabled}
				<li class="w-full">
					{#if itemSnippet}
						{#if clickable}
							<button
								type="button"
								class="block w-full text-left hover:bg-neutral-200/60 dark:hover:bg-neutral-600/40 {itemPaddingClassName} {itemClassName} {className}"
								onclick={() => handleClick(item, index)}
							>
								{@render itemSnippet(item, index)}
							</button>
						{:else}
							<div class="block w-full {itemPaddingClassName} {itemClassName} {className}">
								{@render itemSnippet(item, index)}
							</div>
						{/if}
					{:else}
						{@const iconPath = item?.[iconPathFieldName]}
						{@const lbl = item?.[labelFieldName]}
						{@const val = item?.[valueFieldName]}
						{@const dsc = item?.[descFieldName]}
						{#snippet rowContent()}
							<div class="flex w-full items-start gap-3">
								{#if iconPath}
									<Icon
										path={iconPath}
										sizeClassName={iconSizeClassName}
										className="mt-0.5 shrink-0 text-neutral-500 dark:text-neutral-400 {iconClassName}"
									/>
								{/if}
								<div
									class="flex flex-1 min-w-0 {direction === 'vertical'
										? 'flex-col gap-0.5'
										: 'flex-row items-center justify-between gap-3'}"
								>
									<div class="min-w-0">
										{#if lbl != null}
											<div
												class="font-medium text-neutral-700 dark:text-neutral-200 {itemLabelClassName}"
											>
												{lbl}
											</div>
										{/if}
										{#if dsc}
											<div
												class="text-xs text-neutral-500 dark:text-neutral-400 {itemDescClassName}"
											>
												{dsc}
											</div>
										{/if}
									</div>
									{#if val != null && val !== ''}
										<div
											class="min-w-0 truncate text-neutral-900 dark:text-neutral-100 {direction ===
											'vertical'
												? ''
												: 'text-right'} {itemValueClassName}"
										>
											{val}
										</div>
									{/if}
								</div>
							</div>
						{/snippet}
						{#if clickable}
							<button
								type="button"
								class="block w-full text-left hover:bg-neutral-200/60 dark:hover:bg-neutral-600/40 {itemPaddingClassName} {itemClassName} {className}"
								onclick={() => handleClick(item, index)}
							>
								{@render rowContent()}
							</button>
						{:else}
							<div class="block w-full {itemPaddingClassName} {itemClassName} {className}">
								{@render rowContent()}
							</div>
						{/if}
					{/if}
				</li>
			{/each}
		</ul>
	{/if}
</div>
