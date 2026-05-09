<script lang="ts">
	import Icon from '$lib/views/core/icon/components/icon/icon.svelte';
	import NoData from '$lib/views/core/no-data/components/no-data/no-data.svelte';
	import InputField from '../input-field/input-field.svelte';
	import type { DetailItem, DetailListFieldProps, InputFieldProps } from '../../types';

	let {
		className = '',
		descClassName = '',
		descFieldName = 'desc',
		dropdownClassName = '',
		dropdownItemClassName = '',
		emptyMessage = 'No matches',
		emptyMessageSnippet,
		iconClassName = '',
		iconPathFieldName = 'iconPath',
		id = '',
		identityFieldName = 'id',
		itemLabelClassName = '',
		itemSnippet,
		items = [],
		labelFieldName = 'label',
		minSearchLength = 0,
		name = '',
		onChange,
		onItemSelect,
		size = 'md',
		useNativeDatalist = false,
		value = $bindable(''),
		valueFieldName = 'value',
		...props
	}: InputFieldProps & DetailListFieldProps = $props();

	let inputFieldRef: any = $state(null);
	let isOpen: boolean = $state(false);
	let activeIndex: number = $state(-1);

	const inputId = $derived(id || name || `detail-list-${Math.random().toString(36).slice(2, 9)}`);
	const datalistId = $derived(`${inputId}-datalist`);

	const valueText = $derived(value == null ? '' : String(value));

	const filteredItems = $derived.by(() => {
		const q = valueText.trim().toLowerCase();
		if (q.length < minSearchLength) return [] as DetailItem[];
		if (!q) return items;
		return items.filter((it) => {
			const lbl = String(it?.[labelFieldName] ?? '').toLowerCase();
			const val = String(it?.[valueFieldName] ?? '').toLowerCase();
			const dsc = String(it?.[descFieldName] ?? '').toLowerCase();
			return lbl.includes(q) || val.includes(q) || dsc.includes(q);
		});
	});

	const showDropdown = $derived(!useNativeDatalist && isOpen && filteredItems.length > 0);

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

	function getKey(item: DetailItem, index: number) {
		const idVal = item?.[identityFieldName];
		return idVal != null ? idVal : index;
	}

	function selectItem(item: DetailItem) {
		const next = item?.[valueFieldName] ?? item?.[labelFieldName] ?? '';
		value = String(next);
		onItemSelect && onItemSelect(item);
		onChange && onChange(value as any);
		isOpen = false;
		activeIndex = -1;
		inputFieldRef?.focus?.();
	}

	function handleInput(ev: any) {
		value = ev?.target?.value ?? '';
		isOpen = true;
		activeIndex = -1;
	}

	function handleFocus() {
		isOpen = true;
	}

	function handleBlur() {
		setTimeout(() => {
			isOpen = false;
		}, 150);
	}

	function handleKeyDown(ev: KeyboardEvent) {
		if (useNativeDatalist) return;
		if (ev.key === 'ArrowDown') {
			if (filteredItems.length === 0) return;
			ev.preventDefault();
			isOpen = true;
			activeIndex = (activeIndex + 1) % filteredItems.length;
		} else if (ev.key === 'ArrowUp') {
			if (filteredItems.length === 0) return;
			ev.preventDefault();
			isOpen = true;
			activeIndex = activeIndex <= 0 ? filteredItems.length - 1 : activeIndex - 1;
		} else if (ev.key === 'Enter') {
			if (isOpen && activeIndex >= 0 && filteredItems[activeIndex]) {
				ev.preventDefault();
				selectItem(filteredItems[activeIndex]);
			}
		} else if (ev.key === 'Escape') {
			isOpen = false;
			activeIndex = -1;
		}
	}

	export function focus() {
		inputFieldRef?.focus?.();
	}
</script>

<div class="relative w-full">
	<InputField
		bind:this={inputFieldRef}
		bind:value
		{...props}
		id={inputId}
		{name}
		{size}
		{className}
		role="combobox"
		ariaControls={datalistId}
		ariaExpanded={isOpen}
		onInput={handleInput}
		onFocus={handleFocus}
		onBlur={handleBlur}
		onKeyDown={handleKeyDown}
	/>

	{#if useNativeDatalist}
		<datalist id={datalistId}>
			{#each items as it (getKey(it, 0))}
				<option value={String(it?.[valueFieldName] ?? it?.[labelFieldName] ?? '')}>
					{it?.[labelFieldName] ?? ''}
				</option>
			{/each}
		</datalist>
	{:else if showDropdown}
		<div
			id={datalistId}
			class="absolute z-20 mt-1 max-h-72 w-full overflow-y-auto rounded-xl bg-white shadow-lg dark:bg-neutral-900 {dropdownClassName}"
			role="listbox"
		>
			<ul class="py-1">
				{#each filteredItems as it, index (getKey(it, index))}
					{@const lbl = it?.[labelFieldName]}
					{@const dsc = it?.[descFieldName]}
					{@const iconPath = it?.[iconPathFieldName]}
					{@const isActive = index === activeIndex}
					<li>
						<button
							type="button"
							role="option"
							aria-selected={isActive}
							class="flex w-full items-start gap-2 px-3 py-2 text-left {isActive
								? 'bg-neutral-100 dark:bg-neutral-800'
								: 'hover:bg-neutral-100 dark:hover:bg-neutral-800'} {dropdownItemClassName}"
							onmousedown={(e) => {
								e.preventDefault();
								selectItem(it);
							}}
							onmouseenter={() => (activeIndex = index)}
						>
							{#if itemSnippet}
								{@render itemSnippet(it, index)}
							{:else}
								{#if iconPath}
									<Icon
										path={iconPath}
										sizeClassName={iconSizeClassName}
										className="mt-0.5 shrink-0 text-neutral-500 dark:text-neutral-400 {iconClassName}"
									/>
								{/if}
								<div class="flex min-w-0 flex-1 flex-col">
									<span class="text-sm text-neutral-900 dark:text-neutral-100 {itemLabelClassName}">
										{lbl}
									</span>
									{#if dsc}
										<span class="text-xs text-neutral-500 dark:text-neutral-400 {descClassName}">
											{dsc}
										</span>
									{/if}
								</div>
							{/if}
						</button>
					</li>
				{/each}
			</ul>
		</div>
	{:else if !useNativeDatalist && isOpen && valueText.trim() && filteredItems.length === 0}
		<div
			class="absolute z-20 mt-1 w-full rounded-xl bg-white shadow-lg dark:bg-neutral-900 {dropdownClassName}"
		>
			{#if emptyMessageSnippet}
				{@render emptyMessageSnippet()}
			{:else}
				<NoData message={emptyMessage} />
			{/if}
		</div>
	{/if}
</div>
