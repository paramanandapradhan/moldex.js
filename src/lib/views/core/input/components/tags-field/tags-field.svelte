<script lang="ts">
	import Icon from '$lib/views/core/icon/components/icon/icon.svelte';
	import { mdiClose } from '$lib/views/core/icon/index.js';
	import NoData from '$lib/views/core/no-data/components/no-data/no-data.svelte';
	import { SvelteSet } from 'svelte/reactivity';
	import InputField from '../input-field/input-field.svelte';
	import type { InputFieldProps, TagItem, TagsFieldProps, TagsFieldValue } from '../../types';

	let {
		allowCreate = true,
		appearance = 'normal',
		chipClassName = '',
		chipCloseIconClassName = '',
		chipsContainerClassName = '',
		className = '',
		closeIconPath = mdiClose,
		descClassName = '',
		descFieldName = 'desc',
		disabled = false,
		dropdownClassName = '',
		dropdownItemClassName = '',
		emptyMessage = 'No items',
		hasDropdown,
		id = '',
		identityFieldName = 'id',
		items,
		label = '',
		labelClassName = '',
		name = '',
		nameFieldName = 'name',
		onChange,
		onTagsChange,
		placeholder = '',
		separator = ',',
		size = 'md',
		value = $bindable(),
		valueType,
		...props
	}: InputFieldProps & TagsFieldProps = $props();

	const hasItems = $derived(Array.isArray(items) && items.length > 0);
	const useDropdown = $derived(hasDropdown ?? hasItems);
	const resolvedValueType = $derived<'array' | 'csv'>(valueType ?? (hasItems ? 'array' : 'csv'));

	let inputFieldRef: any = $state(null);
	let inputText: string = $state('');
	let isOpen: boolean = $state(false);

	const itemsById = $derived.by(() => {
		const map: Record<string, TagItem> = {};
		(items || []).forEach((it) => {
			map[it[identityFieldName]] = it;
		});
		return map;
	});

	const selectedSet: SvelteSet<string> = $derived.by(() => {
		const set = new SvelteSet<string>();
		if (value == null || value === '') return set;
		if (Array.isArray(value)) {
			value.forEach((v) => v != null && set.add(String(v)));
		} else if (typeof value === 'string') {
			value
				.split(separator)
				.map((s) => s.trim())
				.filter(Boolean)
				.forEach((v) => set.add(v));
		}
		return set;
	});

	const selectedTags = $derived.by(() => {
		return Array.from(selectedSet).map((idVal) => {
			const item = itemsById[idVal];
			if (item) {
				return {
					id: idVal,
					name: item[nameFieldName] ?? idVal,
					desc: item[descFieldName] ?? ''
				};
			}
			return { id: idVal, name: idVal, desc: '' };
		});
	});

	const filteredItems = $derived.by(() => {
		if (!hasItems) return [] as TagItem[];
		const q = inputText.trim().toLowerCase();
		return (items || []).filter((it) => {
			if (selectedSet.has(String(it[identityFieldName]))) return false;
			if (!q) return true;
			const n = String(it[nameFieldName] ?? '').toLowerCase();
			const d = String(it[descFieldName] ?? '').toLowerCase();
			return n.includes(q) || d.includes(q);
		});
	});

	const chipSizeClassName = $derived.by(() => {
		switch (size) {
			case 'lg':
				return 'text-sm px-2 py-1';
			case 'sm':
				return 'text-xs px-1.5 py-0.5';
			case 'xs':
				return 'text-xs px-1 py-0.5';
			default:
				return 'text-xs px-2 py-0.5';
		}
	});

	function emit(next: SvelteSet<string>) {
		const arr = Array.from(next);
		const out: TagsFieldValue = resolvedValueType === 'csv' ? arr.join(separator) : arr;
		value = out;
		onTagsChange && onTagsChange(out);
		onChange && onChange(out as any);
	}

	function addTag(rawId: string) {
		const idVal = (rawId || '').trim();
		if (!idVal) return;
		if (selectedSet.has(idVal)) return;
		const next = new SvelteSet<string>(selectedSet);
		next.add(idVal);
		emit(next);
	}

	function removeTag(idVal: string) {
		if (!selectedSet.has(idVal)) return;
		const next = new SvelteSet<string>(selectedSet);
		next.delete(idVal);
		emit(next);
	}

	function handleKeyDown(ev: KeyboardEvent) {
		if (disabled) return;
		if (ev.key === 'Enter' || (separator && ev.key === separator)) {
			ev.preventDefault();
			if (!useDropdown && allowCreate && inputText.trim()) {
				addTag(inputText.trim());
				inputText = '';
			} else if (useDropdown && filteredItems.length > 0) {
				const first = filteredItems[0];
				addTag(String(first[identityFieldName]));
				inputText = '';
			} else if (useDropdown && allowCreate && inputText.trim()) {
				addTag(inputText.trim());
				inputText = '';
			}
		} else if (ev.key === 'Backspace' && !inputText && selectedSet.size > 0) {
			const last = Array.from(selectedSet).pop();
			if (last) removeTag(last);
		} else if (ev.key === 'Escape') {
			isOpen = false;
		}
	}

	function handleFocus() {
		if (useDropdown) isOpen = true;
	}

	function handleBlur() {
		setTimeout(() => {
			isOpen = false;
		}, 150);
	}

	function handleItemClick(it: TagItem) {
		addTag(String(it[identityFieldName]));
		inputText = '';
		inputFieldRef?.focus?.();
	}

	export function focus() {
		inputFieldRef?.focus?.();
	}
</script>

<div class="relative w-full">
	{#if selectedTags.length > 0}
		<div class="mb-1 flex flex-wrap items-center gap-1 {chipsContainerClassName}">
			{#each selectedTags as tag (tag.id)}
				<span
					class="inline-flex items-center gap-1 rounded-full bg-neutral-200 font-medium text-neutral-700 dark:bg-neutral-700 dark:text-neutral-100 {chipSizeClassName} {chipClassName}"
					title={tag.desc || tag.name}
				>
					<span class="text-nowrap">{tag.name}</span>
					{#if !disabled}
						<button
							type="button"
							class="ml-0.5 inline-flex cursor-pointer items-center rounded-full hover:bg-neutral-300 dark:hover:bg-neutral-600"
							onmousedown={(e) => {
								e.preventDefault();
								removeTag(tag.id);
							}}
							aria-label="Remove tag {tag.name}"
						>
							<Icon path={closeIconPath} className="h-3.5 w-3.5 {chipCloseIconClassName}" />
						</button>
					{/if}
				</span>
			{/each}
		</div>
	{/if}

	<InputField
		bind:this={inputFieldRef}
		bind:value={inputText}
		{...props}
		{id}
		{name}
		{label}
		{labelClassName}
		{appearance}
		{size}
		{disabled}
		{placeholder}
		{className}
		onKeyDown={handleKeyDown}
		onFocus={handleFocus}
		onBlur={handleBlur}
	/>

	{#if useDropdown && isOpen}
		<div
			class="absolute z-20 mt-1 max-h-60 w-full overflow-y-auto rounded-xl bg-white shadow-lg dark:bg-neutral-900 {dropdownClassName}"
			role="listbox"
		>
			{#if filteredItems.length === 0}
				<NoData message={emptyMessage} />
			{:else}
				<ul class="py-1">
					{#each filteredItems as it (it[identityFieldName])}
						<li>
							<button
								type="button"
								class="flex w-full flex-col items-start px-3 py-2 text-left hover:bg-neutral-100 dark:hover:bg-neutral-800 {dropdownItemClassName}"
								onmousedown={(e) => {
									e.preventDefault();
									handleItemClick(it);
								}}
							>
								<span class="text-sm text-neutral-900 dark:text-neutral-100">
									{it[nameFieldName]}
								</span>
								{#if it[descFieldName]}
									<span class="text-xs text-neutral-500 dark:text-neutral-400 {descClassName}">
										{it[descFieldName]}
									</span>
								{/if}
							</button>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	{/if}
</div>
