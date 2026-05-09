<script lang="ts">
	import Icon from '$lib/views/core/icon/components/icon/icon.svelte';
	import { mdiClose } from '$lib/views/core/icon/index.js';
	import NoData from '$lib/views/core/no-data/components/no-data/no-data.svelte';
	import { SvelteSet } from 'svelte/reactivity';
	import Label from '../label/label.svelte';
	import type {
		ChipFieldProps,
		ChipFieldValue,
		ChipItem,
		InputFieldProps
	} from '../../types';

	let {
		allowCreate = true,
		appearance = 'normal',
		autoSuggest = true,
		autofocus = false,
		chipClassName = '',
		chipCloseIconClassName = '',
		chipsContainerClassName = '',
		className = '',
		closeIconPath = mdiClose,
		containerClassName = '',
		descClassName = '',
		descFieldName = 'desc',
		disabled = false,
		dropdownClassName = '',
		dropdownItemClassName = '',
		emptyMessage = 'No matches',
		fieldClassName = '',
		hasRequiredSymbol = true,
		id = '',
		identityFieldName = 'id',
		items,
		label = '',
		labelClassName = '',
		name = '',
		nameFieldName = 'name',
		onBlur,
		onChange,
		onChipsChange,
		onFocus,
		placeholder = '',
		readonly = false,
		required = false,
		requiredSymbol = '*',
		requiredSymbolColor = 'red',
		separator = ',',
		size = 'md',
		value = $bindable(),
		valueType
	}: InputFieldProps & ChipFieldProps = $props();

	const hasItems = $derived(Array.isArray(items) && items.length > 0);
	const resolvedValueType = $derived<'array' | 'csv'>(valueType ?? (hasItems ? 'array' : 'csv'));

	let inputRef: HTMLInputElement | null = $state(null);
	let inputText: string = $state('');
	let isOpen: boolean = $state(false);

	const nameDerived = $derived(name || id);
	const idDerived = $derived(id || name);

	const itemsById = $derived.by(() => {
		const map: Record<string, ChipItem> = {};
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

	const selectedChips = $derived.by(() => {
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
		if (!hasItems) return [] as ChipItem[];
		const q = inputText.trim().toLowerCase();
		return (items || []).filter((it) => {
			if (selectedSet.has(String(it[identityFieldName]))) return false;
			if (!q) return true;
			const n = String(it[nameFieldName] ?? '').toLowerCase();
			const d = String(it[descFieldName] ?? '').toLowerCase();
			return n.includes(q) || d.includes(q);
		});
	});

	const showDropdown = $derived(
		autoSuggest && hasItems && isOpen && filteredItems.length > 0
	);

	const sizeClassName = $derived.by(() => {
		switch (size) {
			case 'lg':
				return 'p-2 gap-1.5 text-base min-h-12';
			case 'md':
				return 'p-1.5 gap-1 text-sm min-h-10';
			case 'sm':
				return 'px-2 py-1 gap-1 text-xs min-h-8';
			case 'xs':
				return 'px-1.5 py-0 gap-0.5 text-[11px] min-h-5';
			default:
				return 'p-1.5 gap-1 text-sm min-h-10';
		}
	});

	const inputSizeClassName = $derived.by(() => {
		switch (size) {
			case 'lg':
				return 'text-base px-1';
			case 'sm':
			case 'xs':
				return 'text-xs px-1';
			default:
				return 'text-sm px-1';
		}
	});

	const chipSizeClassName = $derived.by(() => {
		switch (size) {
			case 'lg':
				return 'text-sm px-2 py-1';
			case 'sm':
				return 'text-xs px-1.5 py-0.5';
			case 'xs':
				return 'text-[10px] leading-tight px-1 py-0';
			default:
				return 'text-xs px-2 py-0.5';
		}
	});

	const chipCloseIconSizeClassName = $derived.by(() => {
		switch (size) {
			case 'lg':
				return 'h-4 w-4';
			case 'sm':
				return 'h-3 w-3';
			case 'xs':
				return 'h-2.5 w-2.5';
			default:
				return 'h-3.5 w-3.5';
		}
	});

	const appearanceClassName = $derived.by(() => {
		switch (appearance) {
			case 'normal':
				return 'border rounded-xl bg-neutral-100 dark:bg-neutral-700 border-neutral-300 dark:border-neutral-500 text-neutral-950 dark:text-neutral-50 focus-within:ring-primary-500 focus-within:border-primary-500 dark:focus-within:ring-primary-500 dark:focus-within:border-primary-500 focus-within:bg-neutral-50 dark:focus-within:bg-neutral-800';
			case 'box':
				return 'border bg-neutral-100 dark:bg-neutral-700 border-neutral-300 dark:border-neutral-500 text-neutral-950 dark:text-neutral-50 focus-within:ring-primary-500 focus-within:border-primary-500 dark:focus-within:ring-primary-500 dark:focus-within:border-primary-500 focus-within:bg-neutral-50 dark:focus-within:bg-neutral-800';
			case 'fill':
				return 'bg-neutral-100 dark:bg-neutral-700 text-neutral-950 dark:text-neutral-50 focus-within:bg-neutral-50 dark:focus-within:bg-neutral-800';
			case 'underline':
				return 'border-b-2 bg-transparent text-neutral-950 dark:text-neutral-50 border-neutral-300 dark:border-neutral-700 focus-within:border-primary-500 dark:focus-within:border-primary-500';
			case 'fill-underline':
				return 'border-b-2 bg-neutral-100 dark:bg-neutral-700 text-neutral-950 dark:text-neutral-50 border-neutral-300 dark:border-neutral-500 focus-within:border-primary-500 dark:focus-within:border-primary-500';
			case 'none':
				return 'bg-transparent text-neutral-950 dark:text-neutral-50';
			default:
				return '';
		}
	});

	function emit(next: SvelteSet<string>) {
		const arr = Array.from(next);
		const out: ChipFieldValue = resolvedValueType === 'csv' ? arr.join(separator) : arr;
		value = out;
		onChipsChange && onChipsChange(out);
		onChange && onChange(out as any);
	}

	function addChip(rawId: string) {
		const idVal = (rawId || '').trim();
		if (!idVal) return;
		if (selectedSet.has(idVal)) return;
		const next = new SvelteSet<string>(selectedSet);
		next.add(idVal);
		emit(next);
	}

	function removeChip(idVal: string) {
		if (!selectedSet.has(idVal)) return;
		const next = new SvelteSet<string>(selectedSet);
		next.delete(idVal);
		emit(next);
		focus();
	}

	function commitFromInput() {
		const txt = inputText.trim();
		if (!txt) return;
		if (hasItems) {
			const match = filteredItems[0];
			if (match) {
				addChip(String(match[identityFieldName]));
			} else if (allowCreate) {
				addChip(txt);
			}
		} else if (allowCreate) {
			addChip(txt);
		}
		inputText = '';
		focus();
	}

	function handleKeyDown(ev: KeyboardEvent) {
		if (disabled || readonly) return;
		if (ev.key === 'Enter' || (separator && ev.key === separator)) {
			ev.preventDefault();
			commitFromInput();
		} else if (ev.key === 'Backspace' && !inputText && selectedSet.size > 0) {
			ev.preventDefault();
			const last = Array.from(selectedSet).pop();
			if (last) removeChip(last);
		} else if (ev.key === 'Escape') {
			isOpen = false;
		} else if (ev.key === 'ArrowDown' && hasItems) {
			isOpen = true;
		}
	}

	function handleInput(ev: Event) {
		inputText = (ev.target as HTMLInputElement).value;
		if (autoSuggest && hasItems) isOpen = true;
	}

	function handleFocus(ev: FocusEvent) {
		if (autoSuggest && hasItems) isOpen = true;
		onFocus && onFocus(ev);
	}

	function handleBlur(ev: FocusEvent) {
		setTimeout(() => {
			isOpen = false;
		}, 150);
		onBlur && onBlur(ev);
	}

	function handleSuggestClick(it: ChipItem) {
		addChip(String(it[identityFieldName]));
		inputText = '';
		focus();
	}

	export function focus() {
		inputRef?.focus?.();
	}

	export function getElement() {
		return inputRef;
	}

	$effect(() => {
		setTimeout(() => {
			if (autofocus && inputRef) inputRef.focus();
		}, 10);
	});
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

<div class="relative w-full {containerClassName}">
	<label
		for={idDerived}
		class="flex w-full flex-wrap items-center {sizeClassName} {appearanceClassName} {fieldClassName}"
	>
		<div class="contents {chipsContainerClassName}">
			{#each selectedChips as chip (chip.id)}
				<span
					class="inline-flex items-center gap-1 rounded-full bg-neutral-200 font-medium text-neutral-700 dark:bg-neutral-600 dark:text-neutral-100 {chipSizeClassName} {chipClassName}"
					title={chip.desc || chip.name}
				>
					<span class="text-nowrap">{chip.name}</span>
					{#if !disabled && !readonly}
						<button
							type="button"
							data-chip-close
							class="inline-flex cursor-pointer items-center rounded-full hover:bg-neutral-300 dark:hover:bg-neutral-500"
							onmousedown={(e) => {
								e.preventDefault();
								removeChip(chip.id);
							}}
							aria-label="Remove {chip.name}"
						>
							<Icon
							path={closeIconPath}
							sizeClassName={chipCloseIconSizeClassName}
							className={chipCloseIconClassName}
						/>
						</button>
					{/if}
				</span>
			{/each}
		</div>
		<input
			bind:this={inputRef}
			value={inputText}
			id={idDerived}
			name={nameDerived}
			type="text"
			class="peer min-w-[6rem] flex-1 border-0 bg-transparent outline-none focus:border-0 focus:outline-none focus:ring-0 {inputSizeClassName} {className}"
			placeholder={selectedChips.length === 0 ? placeholder : ''}
			{disabled}
			{readonly}
			oninput={handleInput}
			onkeydown={handleKeyDown}
			onfocus={handleFocus}
			onblur={handleBlur}
		/>
	</label>

	{#if showDropdown}
		<div
			class="absolute z-20 mt-1 max-h-60 w-full overflow-y-auto rounded-xl bg-white shadow-lg dark:bg-neutral-900 {dropdownClassName}"
			role="listbox"
		>
			<ul class="py-1">
				{#each filteredItems as it (it[identityFieldName])}
					<li>
						<button
							type="button"
							class="flex w-full flex-col items-start px-3 py-2 text-left hover:bg-neutral-100 dark:hover:bg-neutral-800 {dropdownItemClassName}"
							onmousedown={(e) => {
								e.preventDefault();
								handleSuggestClick(it);
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
		</div>
	{:else if autoSuggest && hasItems && isOpen && inputText.trim() && filteredItems.length === 0 && !allowCreate}
		<div
			class="absolute z-20 mt-1 w-full rounded-xl bg-white shadow-lg dark:bg-neutral-900 {dropdownClassName}"
		>
			<NoData message={emptyMessage} />
		</div>
	{/if}
</div>
