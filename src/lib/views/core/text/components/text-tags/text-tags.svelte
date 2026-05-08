<script lang="ts">
	import type { TagItem, TagsFieldValue, TextTagsProps } from '$lib/views/core/input/types';

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
	}: TextTagsProps = $props();

	const itemsById = $derived.by(() => {
		const map: Record<string, TagItem> = {};
		(items || []).forEach((it) => {
			map[it[identityFieldName]] = it;
		});
		return map;
	});

	const tags = $derived.by(() => {
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

{#if tags.length > 0}
	<div class="flex flex-wrap items-center gap-1 {chipsContainerClassName}">
		{#each tags as tag (tag.id)}
			<span
				class="inline-flex items-center gap-1 rounded-full bg-neutral-200 px-2 py-0.5 text-xs font-medium text-neutral-700 dark:bg-neutral-700 dark:text-neutral-100 {chipClassName}"
				title={tag.desc || tag.name}
			>
				<span class="text-nowrap">{tag.name}</span>
				{#if showDesc && tag.desc}
					<span class="text-neutral-500 dark:text-neutral-400">— {tag.desc}</span>
				{/if}
			</span>
		{/each}
	</div>
{/if}
