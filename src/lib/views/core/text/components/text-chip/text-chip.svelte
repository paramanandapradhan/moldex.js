<script lang="ts">
	import type { ChipItem, TextChipProps } from '$lib/views/core/input/types';

	let {
		chipClassName = '',
		chipsContainerClassName = '',
		descFieldName = 'desc',
		identityFieldName = 'id',
		items,
		nameFieldName = 'name',
		separator = ',',
		showDesc = false,
		value
	}: TextChipProps = $props();

	const itemsById = $derived.by(() => {
		const map: Record<string, ChipItem> = {};
		(items || []).forEach((it) => {
			map[it[identityFieldName]] = it;
		});
		return map;
	});

	const chips = $derived.by(() => {
		const ids: string[] = [];
		if (value == null || value === '') return [];
		if (Array.isArray(value)) {
			value.forEach((v) => v != null && ids.push(String(v)));
		} else if (typeof value === 'string') {
			value
				.split(separator)
				.map((s) => s.trim())
				.filter(Boolean)
				.forEach((v) => ids.push(v));
		}
		return ids.map((idVal) => {
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
</script>

{#if chips.length > 0}
	<div class="flex flex-wrap items-center gap-1 {chipsContainerClassName}">
		{#each chips as chip (chip.id)}
			<span
				class="inline-flex items-center gap-1 rounded-full bg-neutral-200 px-2 py-0.5 text-xs font-medium text-neutral-700 dark:bg-neutral-700 dark:text-neutral-100 {chipClassName}"
				title={chip.desc || chip.name}
			>
				<span class="text-nowrap">{chip.name}</span>
				{#if showDesc && chip.desc}
					<span class="text-neutral-500 dark:text-neutral-400">— {chip.desc}</span>
				{/if}
			</span>
		{/each}
	</div>
{/if}
